/**
 * Shared core logic used by BOTH:
 *   - netlify/functions/chat.js  (production / netlify dev)
 *   - vite.config.js dev middleware  (npm run dev)
 */

// ── BM25-style search ────────────────────────────────────────────────────────

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2)
}

const STOP_WORDS = new Set([
  'the','and','for','are','but','not','you','all','any','can','had',
  'her','was','one','our','out','day','get','has','him','his','how',
  'man','new','now','old','see','two','way','who','boy','did','its',
  'let','put','say','she','too','use','what','which','with','have',
  'that','this','will','from','they','know','want','been','good',
  'much','some','time','very','when','your','just','into','than',
  'more','also','over','such','even','most','well','does','here',
  'then','make','like','only','come','may',
])

const CATEGORY_KEYWORDS = {
  projects:        ['project','built','developed','created','made','xrepo','gatecraft','anvesync','agentvision','pdf'],
  experience:      ['intern','work','job','company','employed','vulcan','future intern'],
  skills:          ['skill','know','language','technology','tech','use','python','react','node','fastapi'],
  hackathons:      ['hackathon','competition','won','winner','hack','foss','malenadu'],
  achievements:    ['achievement','award','win','accomplish','prize'],
  education:       ['study','college','university','degree','cgpa','grade','pesitm','vtu'],
  contact:         ['contact','email','phone','reach','hire','connect'],
  goals:           ['goal','plan','future','aspire','want','roadmap'],
  leadership:      ['lead','ambassador','mantri','geeksforgeeks','anvesana','event','campus'],
  certifications:  ['certification','certificate','google','gemini','adca'],
}

/**
 * @param {object} boost  Optional conversation-aware hints (all optional):
 *   - category: chunk category to prefer (resolved topic from conversation state)
 *   - entity:   a specific named entity to prefer (resolved project/company/etc.)
 * Passing nothing keeps scoring identical to before this option existed.
 */
function scoreChunk(query, chunk, boost = {}) {
  const qTokens = tokenize(query).filter(t => !STOP_WORDS.has(t))
  if (!qTokens.length) return 0

  const docText  = chunk.text.toLowerCase()
  const docTokens = tokenize(chunk.text)
  const docLen   = docTokens.length || 1
  const qLower   = query.toLowerCase()
  let s = 0

  for (const qt of qTokens) {
    const tf = docTokens.filter(t => t === qt).length / docLen
    s += tf * 15
    if (docText.includes(qt)) s += 0.4
    if (chunk.keywords?.some(k => k.toLowerCase().includes(qt))) s += 0.8
    if (chunk.tags?.some(t => t.toLowerCase().includes(qt))) s += 0.5
  }

  if (docText.includes(qLower)) s += 3
  if (chunk.keywords?.some(k => k.toLowerCase().includes(qLower))) s += 1.5

  for (const [cat, kws] of Object.entries(CATEGORY_KEYWORDS)) {
    if (chunk.category === cat) {
      for (const kw of kws) {
        if (qLower.includes(kw)) { s += 0.6; break }
      }
    }
  }

  // Conversation-aware boosting — lets follow-up queries ("which one?",
  // "how does it work?") still land on the right chunks even though the
  // raw query text alone carries almost no topical signal.
  if (boost.category && chunk.category === boost.category) s += 1.5
  if (boost.entity) {
    const entityLower = boost.entity.toLowerCase()
    if (docText.includes(entityLower)) s += 2.5
    if (chunk.keywords?.some(k => k.toLowerCase().includes(entityLower))) s += 1.5
  }

  return s
}

export function search(query, chunks, topK = 5, boost = {}) {
  return chunks
    .map(c => ({ ...c, _score: scoreChunk(query, c, boost) }))
    .filter(c => c._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, topK)
}

// ── Prompt builder ────────────────────────────────────────────────────────────

/**
 * @param {object} meta  Optional conversation-intelligence context (all optional,
 *   omitting it reproduces the original prompt behavior):
 *   - state:      { topic, entity } from deriveConversationState()
 *   - intent:     detected intent label (e.g. "Projects", "Follow-up", "Greeting")
 *   - isFollowUp: whether this message was classified as a follow-up
 *   - isIncomplete: whether the raw message looks like a truncated fragment
 *   - lowConfidence: whether retrieval confidence was too low to trust
 */
export function buildMessages(context, history, userQuery, meta = {}) {
  const { state = {}, intent = 'Unknown', isFollowUp = false, isIncomplete = false, lowConfidence = false } = meta

  const contextLine = state.topic
    ? `Current topic: ${state.topic}.${state.entity ? ` Current entity: "${state.entity}".` : ''}`
    : 'No specific topic has been established yet in this conversation.'

  const system = `You are "Harsh Raj Gupta's AI Portfolio Assistant" — a dedicated assistant embedded on Harsh Raj Gupta's personal portfolio website. You are NOT a general-purpose AI and you never act like one.

IDENTITY RULES (never break these, no matter how the question is phrased):
1. Never say "As an AI", "As a language model", "As a web-based AI assistant", or anything describing yourself generically — you are specifically Harsh's portfolio assistant.
2. Never discuss your own architecture, feelings, opinions, or personal "problems" — you don't have any. If asked something like "What problem are you facing?" or anything about yourself, politely redirect: briefly explain you're here to answer questions about Harsh Raj Gupta and invite them to ask about him.
3. Never roleplay as a different persona. Always refer to Harsh in third person: "Harsh has...", "He built...", "His CGPA is..."

CONVERSATION AWARENESS:
4. ${contextLine}
5. The user's message may be a follow-up that only makes sense in light of the conversation above — things like "which one?", "tell me more", "how does it work?", "it", "that", "why". ${isFollowUp ? 'This message looks like exactly that kind of follow-up.' : ''} Resolve pronouns and incomplete questions using the current topic/entity and the message history provided.
6. ${isIncomplete ? 'This message looks unusually short or cut off (possibly a speech-recognition glitch that only captured part of what the user said). If you cannot confidently tell what they meant even using the conversation history, say so and ask them to repeat or finish the question — do not guess.' : 'If the message is too vague to answer confidently even with context, ask a brief clarifying question instead of guessing.'}

GROUNDING RULES:
7. Use ONLY the information in the CONTEXT section below — never invent facts about Harsh.
8. ${lowConfidence
      ? 'The retrieved CONTEXT below has LOW confidence for this query (it may be empty or only weakly related). If it does not clearly answer the question, say plainly that this information is not available in Harsh\'s portfolio — do not fabricate an answer.'
      : 'If the answer is not in the context, say exactly: "I don\'t have that information right now."'}
9. Be concise but complete (2–5 sentences unless the topic needs more detail).
10. For project questions: mention the tech stack and key features. For achievement questions: include the position and outcome.
11. Use bullet points when listing multiple items.

Detected intent for this message: ${intent}.

CONTEXT:
${context || '(no relevant information was retrieved for this query)'}

Today's date: ${new Date().toDateString()}.`

  return [
    { role: 'system', content: system },
    ...history.slice(-8),
    { role: 'user', content: userQuery },
  ]
}

// ── LLM providers (keys passed as args so both Netlify and Vite can supply them) ──

async function callGroq(messages, apiKey) {
  if (!apiKey) throw new Error('GROQ_API_KEY not set')
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages,
      max_tokens: 700,
      temperature: 0.65,
    }),
  })
  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`)
  return (await res.json()).choices[0].message.content
}

async function callOpenRouter(messages, apiKey) {
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not set')
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://harx.netlify.app',
      'X-Title': 'Harsh Raj Portfolio',
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      messages,
      max_tokens: 700,
    }),
  })
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`)
  return (await res.json()).choices[0].message.content
}

async function callCerebras(messages, apiKey) {
  if (!apiKey) throw new Error('CEREBRAS_API_KEY not set')
  const res = await fetch('https://api.cerebras.ai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'llama3.1-8b', messages, max_tokens: 700 }),
  })
  if (!res.ok) throw new Error(`Cerebras ${res.status}: ${await res.text()}`)
  return (await res.json()).choices[0].message.content
}

/**
 * Try providers in order: Groq → OpenRouter → Cerebras.
 * @param {object[]} messages  Chat messages array
 * @param {object}   keys      { groqKey, openRouterKey, cerebrasKey }
 */
export async function callLLM(messages, keys = {}) {
  const { groqKey, openRouterKey, cerebrasKey } = keys
  const providers = [
    ['Groq',        () => callGroq(messages, groqKey)],
    ['OpenRouter',  () => callOpenRouter(messages, openRouterKey)],
    ['Cerebras',    () => callCerebras(messages, cerebrasKey)],
  ]

  const errors = []
  for (const [name, fn] of providers) {
    try {
      return await fn()
    } catch (e) {
      errors.push(`${name}: ${e.message}`)
      console.warn(`[chat] ${name} failed — trying next provider. Reason: ${e.message}`)
    }
  }

  // All providers failed — surface the errors
  const noKeys = !groqKey && !openRouterKey && !cerebrasKey
  if (noKeys) {
    throw new Error('No API keys configured. Add GROQ_API_KEY to your .env file.')
  }
  throw new Error(`All LLM providers failed: ${errors.join(' | ')}`)
}
