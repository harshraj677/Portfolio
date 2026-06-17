/**
 * Browser-side cosine similarity search over pre-computed vectors.
 * Used only if you load data/vectors.json as a static asset.
 * The primary runtime search is BM25 inside the Netlify Function.
 */

export function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10)
}

export function searchVectors(queryEmbedding, vectors, topK = 5) {
  return vectors
    .map(v => ({ ...v, score: cosineSimilarity(queryEmbedding, v.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
}
