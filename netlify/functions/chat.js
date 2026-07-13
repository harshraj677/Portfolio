import { search, buildMessages, callLLM } from '../lib/chatCore.js'
import {
  deriveConversationState,
  isFollowUpQuery,
  isLikelyIncompleteFragment,
  rewriteQuery,
  detectIntent,
  isLowConfidence,
} from '../lib/conversationContext.js'
import chunksRaw from '../../data/chunks.json'

// esbuild inlines the JSON at bundle time — no runtime filesystem access needed
const chunks = Array.isArray(chunksRaw) ? chunksRaw : []

// ── CORS ──────────────────────────────────────────────────────────────────────
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// ── Handler ───────────────────────────────────────────────────────────────────
export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: CORS, body: '' }
  if (event.httpMethod !== 'POST')    return { statusCode: 405, headers: CORS, body: 'Method Not Allowed' }

  let body
  try   { body = JSON.parse(event.body || '{}') }
  catch { return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Invalid JSON' }) } }

  const { query, messages: history = [] } = body

  if (!query?.trim()) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'query is required' }) }
  }
  if (chunks.length === 0) {
    return {
      statusCode: 503,
      headers: CORS,
      body: JSON.stringify({
        error: 'Knowledge base not loaded',
        answer: "I'm still initializing. Please try again in a moment.",
      }),
    }
  }

  try {
    const trimmedQuery = query.trim()

    // Conversational layer: figure out what's actually being asked before
    // handing anything to retrieval — this is what lets "which one?" or
    // "how does it work?" resolve against the prior turns instead of
    // being searched for literally.
    const state        = deriveConversationState(history, chunks)
    const isFollowUp   = isFollowUpQuery(trimmedQuery)
    const isIncomplete = isLikelyIncompleteFragment(trimmedQuery)
    const searchQuery  = rewriteQuery(trimmedQuery, state)
    const intent       = detectIntent(trimmedQuery, state, isFollowUp)

    const relevant  = search(searchQuery, chunks, 5, { category: state.category, entity: state.entity })
    const context   = relevant.map(c => `[${c.category}] ${c.text}`).join('\n\n---\n\n')
    const sources   = [...new Set(relevant.map(c => c.source))].filter(Boolean)
    const lowConfidence = isLowConfidence(relevant, trimmedQuery)
    const messages  = buildMessages(context, history, trimmedQuery, {
      state, intent, isFollowUp, isIncomplete, lowConfidence,
    })

    const answer = await callLLM(messages, {
      groqKey:        process.env.GROQ_API_KEY,
      openRouterKey:  process.env.OPENROUTER_API_KEY,
      cerebrasKey:    process.env.CEREBRAS_API_KEY,
    })

    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer, sources }),
    }
  } catch (err) {
    console.error('[chat function]', err.message)
    return {
      statusCode: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: err.message,
        answer: err.message.includes('API key')
          ? "No API key is configured. Please add a GROQ_API_KEY to your environment."
          : "I'm having trouble connecting right now. Please try again in a moment.",
        sources: [],
      }),
    }
  }
}
