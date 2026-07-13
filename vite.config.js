import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export default defineConfig(({ mode }) => {
  // Load ALL env vars (not just VITE_*) so server-side keys are available in the middleware
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      devChatMiddleware(env),
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    server: {
      port: 3000,
      open: true,
    },
  }
})

/**
 * Vite plugin — only active during `npm run dev`.
 * Registers /api/chat as a local HTTP handler so Netlify Functions
 * are NOT required for local development.
 *
 * Production / netlify dev: the netlify.toml redirect handles it instead.
 */
function devChatMiddleware(env) {
  // Chunk cache — loaded once per dev-server session
  let _chunks = null

  function loadChunks() {
    if (_chunks) return _chunks
    const p = join(process.cwd(), 'data/chunks.json')
    if (!existsSync(p)) {
      console.warn('\n[chat] ⚠  data/chunks.json not found. Run: node scripts/generateChunks.mjs\n')
      return []
    }
    _chunks = JSON.parse(readFileSync(p, 'utf-8'))
    console.log(`\n[chat] ✓ Loaded ${_chunks.length} knowledge chunks\n`)
    return _chunks
  }

  return {
    name:  'harx-chat-dev-api',
    apply: 'serve', // only runs during vite dev, never in build

    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        // CORS headers (needed if browser talks to this from another port)
        res.setHeader('Access-Control-Allow-Origin',  '*')
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') { res.statusCode = 200; res.end(); return }
        if (req.method !== 'POST')    { res.statusCode = 405; res.end('Method Not Allowed'); return }

        // Collect request body
        let rawBody = ''
        await new Promise((resolve, reject) => {
          req.on('data',  d => { rawBody += d.toString() })
          req.on('end',   resolve)
          req.on('error', reject)
        })

        const respond = (status, payload) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(payload))
        }

        let parsed
        try   { parsed = JSON.parse(rawBody || '{}') }
        catch { return respond(400, { error: 'Invalid JSON' }) }

        const { query, messages: history = [] } = parsed

        if (!query?.trim()) {
          return respond(400, { error: 'query is required' })
        }

        const chunks = loadChunks()
        if (!chunks.length) {
          return respond(503, {
            error: 'Knowledge base empty',
            answer: "⚠ Knowledge base not found. Run `node scripts/generateChunks.mjs` in the project root, then restart the dev server.",
          })
        }

        // Resolve API keys — prefer .env values loaded by loadEnv, fall back to process.env
        const groqKey       = env.GROQ_API_KEY       || process.env.GROQ_API_KEY       || ''
        const openRouterKey = env.OPENROUTER_API_KEY  || process.env.OPENROUTER_API_KEY  || ''
        const cerebrasKey   = env.CEREBRAS_API_KEY    || process.env.CEREBRAS_API_KEY    || ''

        if (!groqKey && !openRouterKey && !cerebrasKey) {
          return respond(503, {
            error: 'No API keys configured',
            answer: "⚠ No LLM API key found. Add GROQ_API_KEY to your .env file, then restart the dev server.",
          })
        }

        try {
          // Dynamically import the shared core so it is evaluated AFTER startup
          // (avoids issues with top-level await in ESM during Vite init)
          const { search, buildMessages, callLLM } = await import('./netlify/lib/chatCore.js')
          const {
            deriveConversationState,
            isFollowUpQuery,
            isLikelyIncompleteFragment,
            rewriteQuery,
            detectIntent,
            isLowConfidence,
          } = await import('./netlify/lib/conversationContext.js')

          const trimmedQuery = query.trim()

          const state        = deriveConversationState(history, chunks)
          const isFollowUp   = isFollowUpQuery(trimmedQuery)
          const isIncomplete = isLikelyIncompleteFragment(trimmedQuery)
          const searchQuery  = rewriteQuery(trimmedQuery, state)
          const intent       = detectIntent(trimmedQuery, state, isFollowUp)

          const relevant = search(searchQuery, chunks, 5, { category: state.category, entity: state.entity })
          const context  = relevant.map(c => `[${c.category}] ${c.text}`).join('\n\n---\n\n')
          const sources  = [...new Set(relevant.map(c => c.source))].filter(Boolean)
          const lowConfidence = isLowConfidence(relevant, trimmedQuery)

          const llmMessages = buildMessages(context, history, trimmedQuery, {
            state, intent, isFollowUp, isIncomplete, lowConfidence,
          })
          const answer      = await callLLM(llmMessages, { groqKey, openRouterKey, cerebrasKey })

          respond(200, { answer, sources })
        } catch (err) {
          console.error('[chat dev]', err.message)
          respond(500, {
            error:  err.message,
            answer: err.message.includes('API key')
              ? "⚠ API key error: " + err.message
              : "I'm having trouble connecting right now. Please try again.",
            sources: [],
          })
        }
      })
    },
  }
}
