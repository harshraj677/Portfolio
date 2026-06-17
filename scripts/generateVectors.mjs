/**
 * Offline embedding generator.
 * Run once: node scripts/generateVectors.mjs
 * Requires: npm install --save-dev @xenova/transformers
 *
 * Output: data/vectors.json — used for optional cosine-similarity search.
 * The primary runtime search uses BM25 on data/chunks.json (no API needed).
 */
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dir, '../data')
const CHUNKS_PATH = join(DATA_DIR, 'chunks.json')
const VECTORS_PATH = join(DATA_DIR, 'vectors.json')

if (!existsSync(CHUNKS_PATH)) {
  console.error('✗  data/chunks.json not found. Run: node scripts/generateChunks.mjs first.')
  process.exit(1)
}

const chunks = JSON.parse(readFileSync(CHUNKS_PATH, 'utf-8'))
console.log(`Loaded ${chunks.length} chunks. Generating embeddings...`)

let pipeline
try {
  const { pipeline: createPipeline } = await import('@xenova/transformers')
  pipeline = await createPipeline('feature-extraction', 'Xenova/bge-small-en-v1.5')
} catch {
  console.error('✗  @xenova/transformers not installed.')
  console.error('   Run: npm install --save-dev @xenova/transformers')
  process.exit(1)
}

const vectors = []
for (let i = 0; i < chunks.length; i++) {
  const c = chunks[i]
  process.stdout.write(`\r  [${i + 1}/${chunks.length}] ${c.id}`)
  const output = await pipeline(c.text, { pooling: 'mean', normalize: true })
  vectors.push({
    id: c.id,
    text: c.text,
    embedding: Array.from(output.data),
    source: c.source,
    category: c.category,
    tags: c.tags,
    keywords: c.keywords,
  })
}

writeFileSync(VECTORS_PATH, JSON.stringify(vectors, null, 2), 'utf-8')
console.log(`\n✓  Generated ${vectors.length} vectors → data/vectors.json`)
