import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { search, buildMessages, callLLM } from '../lib/chatCore.js'

// ── Load knowledge chunks at cold-start ───────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url))

let chunks = []
for (const p of [
  join(__dir, 'data/chunks.json'),        // Netlify bundles included_files here
  join(__dir, '../../data/chunks.json'),  // local fallback
]) {
  try { chunks = JSON.parse(readFileSync(p, 'utf-8')); break } catch { /* try next */ }
}

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
    const relevant  = search(query.trim(), chunks)
    const context   = relevant.map(c => `[${c.category}] ${c.text}`).join('\n\n---\n\n')
    const sources   = [...new Set(relevant.map(c => c.source))].filter(Boolean)
    const messages  = buildMessages(context, history, query.trim())

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
