import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const initialAssets = [
  // files placed in public/assets are served from /assets/...
  '/assets/sample-photo.svg'
]

export default function Assets() {
  const [assets, setAssets] = useState(initialAssets)
  const [uploads, setUploads] = useState([])

  function handleFile(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    // add to local uploads (client-side only)
    setUploads((s) => [url, ...s])
    setAssets((s) => [url, ...s])
  }

  return (
    <section id="assets" className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Assets</h2>
            <p className="text-gray-400 max-w-lg">Store and preview images used in the portfolio. Uploaded images are previewed client-side (not persisted to server).</p>
          </div>

          <div>
            <label className="inline-block">
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              <motion.button whileHover={{ scale: 1.03 }} className="btn-secondary">Upload Image</motion.button>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <AnimatePresence>
            {assets.map((src, idx) => (
              <motion.div
                key={src + idx}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.45, delay: idx * 0.03 }}
                className="rounded-xl overflow-hidden bg-white/5 border border-white/5 shadow-lg"
              >
                <div className="w-full aspect-[4/3] bg-black/10 flex items-center justify-center">
                  <img src={src} alt={`asset-${idx}`} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div className="text-sm text-gray-300 truncate">{src.split('/').pop()}</div>
                  <div className="text-xs text-gray-400">{idx === 0 ? 'sample' : 'uploaded'}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {uploads.length > 0 && (
          <div className="mt-6 text-sm text-gray-400">Uploads are previewed only in your browser session.</div>
        )}
      </div>
    </section>
  )
}
