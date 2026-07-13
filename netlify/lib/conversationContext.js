/**
 * Lightweight, dependency-free conversational layer sitting IN FRONT of the
 * existing BM25-style `search()` and `buildMessages()` in chatCore.js.
 *
 * Everything here is a pure function operating on the `history` array the
 * frontend already sends on every request — there is no server-side session
 * state, no new storage, no vector DB. Netlify Functions are stateless, so
 * "memory" is recomputed each request by re-reading the conversation so far.
 */

import { search } from './chatCore.js'

// Chunk category -> human-readable topic label used in the prompt and for intent display.
const TOPIC_LABELS = {
  about:          'Profile',
  faq:            'Profile',
  goals:          'Profile',
  current_focus:  'Profile',
  timeline:       'Profile',
  interests:      'Profile',
  projects:       'Projects',
  skills:         'Skills',
  soft_skills:    'Skills',
  experience:     'Experience',
  education:      'Education',
  achievements:   'Achievements',
  leadership:     'Leadership',
  hackathons:     'Hackathons',
  certifications: 'Certifications',
  contact:        'Contact',
  socials:        'Contact',
}

// Per-category patterns for pulling out a single named "entity" (project name,
// company name, institution, etc.) from a chunk's text. Categories that hold
// aggregate/listy information (skills, achievements, certifications, faq...)
// intentionally have no pattern — topic-only context is more honest there
// than guessing a specific item.
const ENTITY_PATTERNS = {
  projects:   /^Project:\s*([^—]+?)\s*—/,
  experience: / at ([^(]+?)\(/,
  leadership: / at ([^(]+?)\(/,
  hackathons: /^Hackathon:\s*([^(]+?)\(/,
  education:  /from ([^(.,]+)/,
}

function extractEntity(chunk) {
  const pattern = ENTITY_PATTERNS[chunk.category]
  if (!pattern) return null
  const match = chunk.text.match(pattern)
  return match?.[1] ? match[1].trim() : null
}

// ── Follow-up / incomplete-question detection ───────────────────────────────
// Deliberately rule-based (no extra LLM round-trip, no new dependency) so it
// stays instant and free — this is a classification problem simple enough
// that regex + a word-count heuristic handles the vast majority of real
// follow-ups ("it", "that", "which one", "tell me more", "how does it work").

const FOLLOW_UP_EXACT = new Set([
  'it', 'this', 'that', 'these', 'those', 'one', 'ones',
  'why', 'how', 'when', 'where', 'who', 'which',
  'which one', 'which one is it', 'the other one', 'another one',
  'tell me more', 'more', 'go on', 'continue', 'explain', 'elaborate',
  'and', 'so', 'really', 'seriously',
])

const FOLLOW_UP_PATTERNS = [
  /^which (one|ones)\b/,
  /^how (does|did) (it|this|that|he|she) work$/,
  /^what about (it|this|that|him|his|her)$/,
  /^(is|was) (it|this|that|he|she)\b/,
  /^tell me more about (it|this|that)$/,
]

function normalize(query) {
  return query.trim().toLowerCase().replace(/[?.!,]+$/g, '')
}

export function isFollowUpQuery(query) {
  const q = normalize(query)
  if (!q) return false
  if (FOLLOW_UP_EXACT.has(q)) return true
  if (FOLLOW_UP_PATTERNS.some((p) => p.test(q))) return true

  // Short + pronoun-bearing ("what about it", "why though") also counts.
  const words = q.split(/\s+/).filter(Boolean)
  if (words.length <= 3 && /\b(it|this|that|these|those|one|ones|he|she|him|his)\b/.test(q)) return true

  return false
}

// A query with almost no content at all — e.g. "Tell" instead of "Tell me
// about your internship" from a speech-recognition result that got cut off.
// These can't be resolved even with context; the prompt needs to know to ask
// the user to repeat themselves instead of guessing from a single word.
export function isLikelyIncompleteFragment(query) {
  const words = normalize(query).split(/\s+/).filter(Boolean)
  return words.length <= 1 && !isGreeting(query)
}

const GREETING_RE = /^(hi|hey|hello|yo|sup|good\s?(morning|afternoon|evening)|greetings|namaste)\b/i

export function isGreeting(query) {
  return GREETING_RE.test(query.trim())
}

// ── Conversation state — derived fresh from history on every request ───────

export function deriveConversationState(history = [], chunks = []) {
  // Only the last exchange — concatenating more turns dilutes the BM25 signal
  // with generic bio/profile text and drowns out the specific thing that was
  // actually just discussed (e.g. a named project).
  const recentTurns = history.slice(-2)
  const textForContext = recentTurns.map((m) => m.content).filter(Boolean).join(' ')

  if (!textForContext.trim()) {
    return { topic: null, entity: null, category: null, hasHistory: false }
  }

  const results = search(textForContext, chunks, 5)
  if (!results.length) {
    return { topic: null, entity: null, category: null, hasHistory: true }
  }

  // Prefer the highest-ranked result that names a specific entity (a project,
  // company, institution...) over a merely-higher-scoring generic about/faq
  // chunk that happens to mention it in passing — specificity beats rank here.
  const specific = results.find((r) => extractEntity(r))
  const top = specific || results[0]

  return {
    topic:      TOPIC_LABELS[top.category] || null,
    entity:     extractEntity(top),
    category:   top.category,
    hasHistory: true,
  }
}

// ── Query rewriting (retrieval-facing, not a literal transcript rewrite) ───
// Goal: turn a short/ambiguous follow-up into a keyword-rich string so the
// BM25 `search()` step has real signal to work with. The ORIGINAL user
// message is still what's sent to the LLM in the chat transcript — this
// rewritten string is only used to drive retrieval + category/entity boosting.

const PRONOUN_RE = /\b(it|this|that|these|those|one|ones)\b/gi

export function rewriteQuery(query, state) {
  const trimmed = query.trim()
  if (!state?.hasHistory || (!state.topic && !state.entity)) return trimmed
  if (!isFollowUpQuery(trimmed)) return trimmed

  const subject = state.entity
    ? `Harsh Raj Gupta's ${state.topic ? state.topic.toLowerCase() : ''} "${state.entity}"`.replace(/\s+/g, ' ').trim()
    : state.topic
      ? `Harsh Raj Gupta's ${state.topic.toLowerCase()}`
      : null

  if (!subject) return trimmed

  const rewritten = trimmed.replace(PRONOUN_RE, subject)
  return rewritten === trimmed ? `${trimmed} — regarding ${subject}` : rewritten
}

// ── Intent detection ─────────────────────────────────────────────────────────

const INTENT_KEYWORDS = {
  Projects:       ['project', 'built', 'developed', 'xrepo', 'gatecraft', 'anvesync', 'agentvision', 'pdf designer', 'harx portfolio'],
  Experience:     ['intern', 'internship', 'work', 'job', 'company', 'employed', 'vulcan', 'future intern'],
  Skills:         ['skill', 'know', 'language', 'technology', 'tech stack', 'framework'],
  Hackathons:     ['hackathon', 'competition', 'won', 'winner', 'hack'],
  Achievements:   ['achievement', 'award', 'accomplishment', 'prize'],
  Education:      ['study', 'college', 'university', 'degree', 'cgpa', 'pesitm', 'vtu', 'education'],
  Contact:        ['contact', 'email', 'phone', 'reach', 'hire', 'connect', 'linkedin', 'github'],
  Leadership:     ['lead', 'ambassador', 'mantri', 'geeksforgeeks', 'anvesana'],
  Certifications: ['certification', 'certificate'],
  Profile:        ['who is', 'about harsh', 'bio', 'yourself', 'introduce'],
}

export function detectIntent(query, state, isFollowUp) {
  if (isGreeting(query)) return 'Greeting'
  if (isFollowUp) return 'Follow-up'

  const q = query.toLowerCase()
  for (const [intent, kws] of Object.entries(INTENT_KEYWORDS)) {
    if (kws.some((kw) => q.includes(kw))) return intent
  }
  if (state?.topic) return state.topic
  return 'Unknown'
}

// ── Confidence ───────────────────────────────────────────────────────────────
// Calibrated empirically against real chunks.json: unrelated/noise queries
// top out well under 1.0, genuine topic matches clear 1.3+ (and much higher
// once boosted). Anything under the threshold is treated as "don't know".
const CONFIDENCE_THRESHOLD = 1.0

export function isLowConfidence(results, query) {
  if (!results.length) return true
  if (results[0]._score < CONFIDENCE_THRESHOLD) return true
  if (isLikelyIncompleteFragment(query)) return true
  return false
}
