/**
 * Browser-side knowledge loader.
 * Provides typed access to the static JSON files in /public/data/ (if served),
 * or falls back to the API for dynamic queries.
 */

let _about = null

export async function loadAbout() {
  if (_about) return _about
  try {
    const res = await fetch('/data/about.json')
    if (!res.ok) throw new Error('not found')
    _about = await res.json()
  } catch {
    _about = null
  }
  return _about
}
