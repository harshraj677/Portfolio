import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dir, '../data')

let _id = 0
function readJSON(file) {
  const p = join(DATA_DIR, file)
  if (!existsSync(p)) return null
  try { return JSON.parse(readFileSync(p, 'utf-8')) } catch { return null }
}

function chunk(text, source, category, tags = [], keywords = []) {
  return { id: `${category}_${++_id}`, text: text.trim(), source, category, tags, keywords }
}

const chunks = []

// ── about ──────────────────────────────────────────────────────────────────
const about = readJSON('about.json')
if (about) {
  chunks.push(chunk(
    `Harsh Raj Gupta is a ${about.headline}. ${about.summary} ${about.bio} He is based in ${about.location} and currently works as ${about.role} at ${about.current_company}. His portfolio is at ${about.portfolio_url}.`,
    'about.json', 'about',
    ['identity', 'profile', 'summary'],
    ['who is harsh', 'about harsh', 'harsh raj gupta', 'bio', 'profile', 'introduction']
  ))
  chunks.push(chunk(
    `Contact Harsh Raj Gupta: Email: ${about.email} | Phone: ${about.phone} | Portfolio: ${about.portfolio_url} | GitHub: ${about.github_url} | LinkedIn: ${about.linkedin_url}`,
    'contact.json', 'contact',
    ['contact', 'email', 'phone', 'reach'],
    ['contact', 'email', 'phone', 'hire', 'reach out', 'connect', 'linkedin', 'github']
  ))
  chunks.push(chunk(
    `Harsh Raj Gupta is interested in: ${about.areas_of_interest.join(', ')}. Currently learning: ${about.current_learning.join(', ')}. Mission: ${about.mission}`,
    'about.json', 'interests',
    ['interests', 'learning', 'focus'],
    ['interests', 'learning', 'focus', 'mission', 'goals', 'passionate about']
  ))
}

// ── education ──────────────────────────────────────────────────────────────
const education = readJSON('education.json')
if (education?.education) {
  for (const edu of education.education) {
    if (!edu.cgpa) continue
    chunks.push(chunk(
      `Harsh Raj Gupta is pursuing ${edu.degree} in ${edu.branch} from ${edu.institution} affiliated to ${edu.university}, located in ${edu.location}. CGPA: ${edu.cgpa}. Duration: ${edu.start_year}–${edu.end_year}. Currently in ${edu.year_of_study}. Academic highlights: ${edu.highlights?.join(', ')}.`,
      'education.json', 'education',
      ['education', 'college', 'degree', 'cgpa'],
      ['education', 'college', 'pesitm', 'vtu', 'cgpa', 'university', 'degree', 'btech', 'computer science']
    ))
  }
}

// ── experience ─────────────────────────────────────────────────────────────
const experience = readJSON('experience.json')
if (experience?.experience) {
  for (const exp of experience.experience) {
    chunks.push(chunk(
      `Harsh Raj Gupta worked as ${exp.role} at ${exp.company} (${exp.duration}, ${exp.location}). ${exp.description} Key responsibilities: ${exp.responsibilities?.join('; ')}. Technologies used: ${exp.technologies?.join(', ')}. Achievements: ${exp.achievements?.join('; ')}.`,
      'experience.json', 'experience',
      ['experience', 'work', 'internship', 'job'],
      [exp.company.toLowerCase().split(' ')[0], exp.role.toLowerCase(), 'internship', 'work experience', 'job', exp.type]
    ))
  }
}

// ── projects ───────────────────────────────────────────────────────────────
const projects = readJSON('projects.json')
if (projects?.projects) {
  for (const proj of projects.projects) {
    const links = [
      proj.github_url ? `GitHub: ${proj.github_url}` : '',
      proj.live_url ? `Live demo: ${proj.live_url}` : '',
    ].filter(Boolean).join(' | ')
    chunks.push(chunk(
      `Project: ${proj.name} — ${proj.tagline || proj.description}. ${proj.long_description} Tech stack: ${proj.tech_stack?.join(', ')}. Year: ${proj.year}. Status: ${proj.status}. Key features: ${proj.features?.join('; ')}. Category: ${proj.category}. ${links}`,
      'projects.json', 'projects',
      proj.tags || [],
      [proj.name.toLowerCase(), ...(proj.aliases || []).map(a => a.toLowerCase()), ...(proj.tech_stack || []).map(t => t.toLowerCase()), 'project', 'built', 'developed']
    ))
  }
}

// ── achievements ───────────────────────────────────────────────────────────
const achievements = readJSON('achievements.json')
if (achievements?.achievements) {
  const top = achievements.achievements.slice(0, 5)
  const rest = achievements.achievements.slice(5)
  chunks.push(chunk(
    `Harsh Raj Gupta's top achievements: ${top.map(a => `${a.title} (${a.year}) — ${a.description}${a.outcome ? '. Outcome: ' + a.outcome : ''}`).join(' | ')}`,
    'achievements.json', 'achievements',
    ['achievements', 'awards', 'wins'],
    ['achievement', 'award', 'winner', 'won', 'prize', 'hack for hire', 'foss', 'hackathon winner']
  ))
  if (rest.length > 0) {
    chunks.push(chunk(
      `More achievements: ${rest.map(a => `${a.title} (${a.year}) — ${a.description}`).join(' | ')}`,
      'achievements.json', 'achievements',
      ['achievements', 'workshops', 'events'],
      ['workshop', 'rag', 'google cloud', 'agentic ai', 'zoho', 'leadership']
    ))
  }
}

// ── hackathons ─────────────────────────────────────────────────────────────
const hackathons = readJSON('hackathons.json')
if (hackathons?.hackathons) {
  for (const h of hackathons.hackathons) {
    chunks.push(chunk(
      `Hackathon: ${h.name} (${h.year}). Position: ${h.position}. Organizer: ${h.organizer}. Teams: ${h.teams_competed || 'N/A'}. ${h.solution ? 'Solution: ' + h.solution : ''} Outcomes: ${h.outcomes?.join('; ')}. Tech: ${h.tech_stack?.join(', ') || 'N/A'}.`,
      'hackathons.json', 'hackathons',
      ['hackathon', 'competition', 'winner'],
      [h.name.toLowerCase(), 'hackathon', 'competition', 'winner', 'finalist']
    ))
  }
}

// ── certifications ─────────────────────────────────────────────────────────
const certs = readJSON('certifications.json')
if (certs?.certifications) {
  chunks.push(chunk(
    `Harsh Raj Gupta's certifications: ${certs.certifications.map(c => `${c.name} by ${c.issuer} (${c.status === 'in_progress' ? 'in progress' : 'completed'}, ${c.year}). ${c.description}`).join(' | ')}`,
    'certifications.json', 'certifications',
    ['certifications', 'credentials'],
    ['certification', 'certificate', 'google cloud', 'gemini', 'adca', 'techzonce', 'credential']
  ))
}

// ── skills ─────────────────────────────────────────────────────────────────
const skills = readJSON('skills.json')
if (skills?.skills) {
  const s = skills.skills
  chunks.push(chunk(
    `Harsh Raj Gupta's technical skills — Languages: ${s.languages?.join(', ')}. Frontend: ${s.frontend?.join(', ')}. Backend: ${s.backend?.join(', ')}. Databases: ${s.databases?.join(', ')}. Cloud: ${s.cloud?.join(', ')}. AI/ML tools: ${s.AI?.join(', ')}. Data Science: ${s.data_science?.join(', ')}. Developer Tools: ${s.tools?.join(', ')}. Concepts: ${s.concepts?.join(', ')}.`,
    'skills.json', 'skills',
    ['skills', 'technologies', 'tech stack'],
    ['skills', 'technologies', 'tech stack', 'programming', 'languages', 'frameworks', 'python', 'react', 'node', 'fastapi', 'mongodb']
  ))
  chunks.push(chunk(
    `Harsh Raj Gupta's soft skills and leadership capabilities: ${s.soft_skills?.join(', ')}. He has demonstrated these through campus leadership roles, event management, and technical community building.`,
    'skills.json', 'soft_skills',
    ['soft skills', 'leadership', 'communication'],
    ['soft skills', 'leadership', 'communication', 'teamwork', 'public speaking']
  ))
}

// ── leadership ─────────────────────────────────────────────────────────────
const leadership = readJSON('leadership.json')
if (leadership?.leadership_roles) {
  for (const role of leadership.leadership_roles) {
    chunks.push(chunk(
      `Leadership: Harsh served as ${role.role} at ${role.organization} (${role.duration}, ${role.location}). ${role.description} Responsibilities: ${role.responsibilities?.join('; ')}. Impact: ${role.impact?.join('; ')}. Events organized: ${role.events_organized?.join(', ')}.`,
      'leadership.json', 'leadership',
      ['leadership', 'community', 'ambassador'],
      [role.organization.toLowerCase().split(' ')[0], role.role.toLowerCase(), 'leadership', 'campus', 'ambassador', 'mantri']
    ))
  }
}

// ── goals ──────────────────────────────────────────────────────────────────
const goals = readJSON('goals.json')
if (goals?.goals) {
  const g = goals.goals
  chunks.push(chunk(
    `Harsh Raj Gupta's goals — Short-term: ${g.short_term?.join('; ')}. Long-term: ${g.long_term?.join('; ')}. 2026 goals: ${g.goals_2026?.join('; ')}. Career goal: ${g.career}.`,
    'goals.json', 'goals',
    ['goals', 'future', 'career', 'ambitions'],
    ['goals', 'future plans', 'career', 'ambitions', 'roadmap', 'aspire', 'want to']
  ))
}

// ── current focus ──────────────────────────────────────────────────────────
const focus = readJSON('current_focus.json')
if (focus?.current_focus) {
  const cf = focus.current_focus
  const areas = cf.primary_areas?.map(a => `${a.area}: ${a.description}`).join('; ')
  chunks.push(chunk(
    `Harsh Raj Gupta is currently focused on: ${areas}. Technologies being actively learned: ${cf.technologies_actively_learning?.join(', ')}. 2026 learning roadmap: ${cf.learning_roadmap_2026?.join('; ')}.`,
    'current_focus.json', 'current_focus',
    ['current work', 'learning now', 'focus'],
    ['current', 'focus', 'learning', 'now', 'working on', 'agentic', 'rag', 'llm']
  ))
}

// ── timeline ───────────────────────────────────────────────────────────────
const timeline = readJSON('timeline.json')
if (timeline?.timeline) {
  const tText = timeline.timeline.map(y =>
    `${y.year} (${y.period}): ${y.events.map(e => e.title).join(', ')}`
  ).join('. ')
  chunks.push(chunk(
    `Harsh Raj Gupta's chronological journey: ${tText}`,
    'timeline.json', 'timeline',
    ['timeline', 'journey', 'history', 'when'],
    ['timeline', 'journey', 'history', 'when', 'year', 'chronological', 'started']
  ))
}

// ── socials ────────────────────────────────────────────────────────────────
const socials = readJSON('socials.json')
if (socials?.socials) {
  const links = Object.entries(socials.socials)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(' | ')
  chunks.push(chunk(
    `Harsh Raj Gupta's online presence and social profiles: ${links}`,
    'socials.json', 'socials',
    ['social', 'links', 'profiles'],
    ['github', 'linkedin', 'portfolio', 'leetcode', 'geeksforgeeks', 'social', 'links', 'profiles', 'online']
  ))
}

// ── knowledge master ───────────────────────────────────────────────────────
const knowledge = readJSON('knowledge.json')
if (knowledge?.entities?.person) {
  const p = knowledge.entities.person
  chunks.push(chunk(
    `Quick reference: ${p.full_name} — ${p.headline}. ${p.summary}. Contact: ${p.email} | ${p.phone}. Portfolio: ${p.portfolio_url}. GitHub: ${p.github_url}. LinkedIn: ${p.linkedin_url}.`,
    'knowledge.json', 'about',
    ['quick reference', 'summary', 'contact'],
    ['summary', 'overview', 'quick', 'tldr', 'who', 'contact']
  ))

  if (knowledge.entities?.person?.faq_answers) {
    // not in knowledge.json root but nested under entities; skip (covered by other chunks)
  }

  if (knowledge.faq_answers) {
    for (const [key, answer] of Object.entries(knowledge.faq_answers)) {
      chunks.push(chunk(
        answer,
        'knowledge.json', 'faq',
        ['faq', 'quick answer'],
        [key.replace(/_/g, ' ')]
      ))
    }
  }
}

// ── write output ───────────────────────────────────────────────────────────
const outPath = join(DATA_DIR, 'chunks.json')
writeFileSync(outPath, JSON.stringify(chunks, null, 2), 'utf-8')
console.log(`✓  Generated ${chunks.length} chunks → data/chunks.json`)
