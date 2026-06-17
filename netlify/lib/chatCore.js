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

function scoreChunk(query, chunk) {
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

  const catMap = {
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
  for (const [cat, kws] of Object.entries(catMap)) {
    if (chunk.category === cat) {
      for (const kw of kws) {
        if (qLower.includes(kw)) { s += 0.6; break }
      }
    }
  }

  return s
}

export function search(query, chunks, topK = 5) {
  return chunks
    .map(c => ({ ...c, _score: scoreChunk(query, c) }))
    .filter(c => c._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, topK)
}

// ── Prompt builder ────────────────────────────────────────────────────────────

export function buildMessages(context, history, userQuery) {
  const system = `You are the AI assistant on Harsh Raj Gupta's personal portfolio website.
Your job is to answer questions about Harsh in a friendly, professional, and accurate way.

RULES:
1. Refer to him in third person: "Harsh has...", "He built...", "His CGPA is..."
2. Use ONLY the information provided in the CONTEXT section — never invent facts
3. If the answer is not in the context, say exactly: "I don't have that information right now."
4. Be concise but complete (2–5 sentences unless the topic needs more detail)
5. For project questions: mention the tech stack and key features
6. For achievement questions: include the position and outcomes
7. Use bullet points when listing multiple items

CONTEXT:
${context}

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
