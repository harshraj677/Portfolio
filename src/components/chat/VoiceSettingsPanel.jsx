import { motion } from 'framer-motion'

const VoiceSettingsPanel = ({
  languages,
  languageId,
  onLanguageChange,
  isTtsSupported,
  isLanguageVoiceAvailable,
  voices,
  settings,
  onVoiceChange,
  onRateChange,
  onPitchChange,
  onVolumeChange,
}) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.22, ease: 'easeOut' }}
    className="overflow-hidden border-b border-gray-700/50 bg-gray-900/60 shrink-0"
  >
    <div className="px-4 py-3 space-y-3">
      <div>
        <label className="block text-xs text-gray-400 mb-1">Language</label>
        <select
          value={languageId}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full bg-gray-800/80 border border-gray-600/50 rounded-lg px-2.5 py-1.5
                     text-xs text-gray-200 outline-none focus:border-cyan-500/60 transition-colors"
        >
          {languages.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </select>
        {isTtsSupported && !isLanguageVoiceAvailable && (
          <p className="text-xs text-amber-400/90 italic mt-1">
            No voice found for this language on your device — replies will be spoken in English (India) instead.
          </p>
        )}
      </div>

      {isTtsSupported && (
        <>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Voice</label>
            {voices.length > 0 ? (
              <select
                value={settings.voiceURI || ''}
                onChange={(e) => onVoiceChange(e.target.value)}
                className="w-full bg-gray-800/80 border border-gray-600/50 rounded-lg px-2.5 py-1.5
                           text-xs text-gray-200 outline-none focus:border-cyan-500/60 transition-colors"
              >
                <option value="">Auto (matches selected language)</option>
                {voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-xs text-gray-500 italic">
                No voices available in this browser — using the system default.
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Speed</span>
              <span className="text-gray-300 font-mono">{settings.rate.toFixed(1)}x</span>
            </label>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={settings.rate}
              onChange={(e) => onRateChange(parseFloat(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Pitch</span>
              <span className="text-gray-300 font-mono">{settings.pitch.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min={0}
              max={2}
              step={0.1}
              value={settings.pitch}
              onChange={(e) => onPitchChange(parseFloat(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Volume</span>
              <span className="text-gray-300 font-mono">{Math.round(settings.volume * 100)}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={settings.volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>
        </>
      )}
    </div>
  </motion.div>
)

export default VoiceSettingsPanel
