import { useState, useRef, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'harx_voice_settings'

const DEFAULT_SETTINGS = {
  voiceURI: null,
  rate: 1,
  pitch: 1,
  volume: 1,
}

function clamp(value, min, max, fallback) {
  const n = Number(value)
  if (Number.isNaN(n)) return fallback
  return Math.min(max, Math.max(min, n))
}

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return DEFAULT_SETTINGS
    const parsed = JSON.parse(stored)
    return {
      voiceURI: typeof parsed.voiceURI === 'string' ? parsed.voiceURI : null,
      rate: clamp(parsed.rate, 0.5, 2, DEFAULT_SETTINGS.rate),
      pitch: clamp(parsed.pitch, 0, 2, DEFAULT_SETTINGS.pitch),
      volume: clamp(parsed.volume, 0, 1, DEFAULT_SETTINGS.volume),
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

function getSynth() {
  return typeof window !== 'undefined' ? window.speechSynthesis : null
}

const FALLBACK_LOCALE = 'en-IN'

// Exact locale match first ("hi-IN" === "hi-IN"), then same primary subtag
// ("hi-IN" ~ "hi-something-else"), so a close-enough regional voice is still
// preferred over silently doing nothing.
function findVoiceForLocale(voices, locale) {
  if (!locale || !voices.length) return null
  const lower = locale.toLowerCase()
  const primary = lower.split('-')[0]
  return (
    voices.find((v) => v.lang?.toLowerCase() === lower) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith(`${primary}-`)) ||
    voices.find((v) => v.lang?.toLowerCase() === primary) ||
    null
  )
}

export function useSpeechSynthesis(languageLocale = FALLBACK_LOCALE) {
  const synth = getSynth()
  const isSupported = !!synth

  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [voices, setVoices] = useState([])
  const [settings, setSettings] = useState(loadSettings)
  const utteranceRef = useRef(null)

  // Voice lists load asynchronously in some browsers (notably Chrome)
  useEffect(() => {
    if (!isSupported) return
    const updateVoices = () => setVoices(synth.getVoices())
    updateVoices()
    synth.addEventListener?.('voiceschanged', updateVoices)
    return () => synth.removeEventListener?.('voiceschanged', updateVoices)
  }, [isSupported, synth])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // storage unavailable or full — settings just won't persist
    }
  }, [settings])

  useEffect(() => {
    return () => {
      synth?.cancel()
    }
  }, [synth])

  // Manually-picked voice (from the voice dropdown) — only honored while it
  // still exists AND actually matches the currently selected language, so
  // switching language doesn't leave a stale, mismatched voice in effect.
  const manualVoice = settings.voiceURI
    ? voices.find((v) => v.voiceURI === settings.voiceURI) || null
    : null
  const manualVoiceMatchesLanguage =
    manualVoice && manualVoice.lang?.toLowerCase().split('-')[0] === languageLocale.toLowerCase().split('-')[0]

  const languageVoice = findVoiceForLocale(voices, languageLocale)
  const isLanguageVoiceAvailable = !!languageVoice

  // Requirement: if no voice matches the selected language, fall back to en-IN.
  const fallbackVoice = languageVoice || findVoiceForLocale(voices, FALLBACK_LOCALE)

  const resolvedVoice = manualVoiceMatchesLanguage ? manualVoice : fallbackVoice

  const speak = useCallback((text) => {
    if (!isSupported || isMuted || !text) return

    synth.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    // Always set .lang as a hint even when no specific voice object is
    // available — some engines can still attempt the right pronunciation.
    utterance.lang = resolvedVoice?.lang || languageLocale
    if (resolvedVoice) utterance.voice = resolvedVoice
    utterance.rate = settings.rate
    utterance.pitch = settings.pitch
    utterance.volume = settings.volume
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    synth.speak(utterance)
  }, [isSupported, isMuted, synth, resolvedVoice, languageLocale, settings])

  const stop = useCallback(() => {
    if (!isSupported) return
    synth.cancel()
    setIsSpeaking(false)
  }, [isSupported, synth])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      if (next) {
        synth?.cancel()
        setIsSpeaking(false)
      }
      return next
    })
  }, [synth])

  const setVoiceURI = useCallback((voiceURI) => {
    setSettings((prev) => ({ ...prev, voiceURI: voiceURI || null }))
  }, [])

  const setRate = useCallback((rate) => {
    setSettings((prev) => ({ ...prev, rate: clamp(rate, 0.5, 2, prev.rate) }))
  }, [])

  const setPitch = useCallback((pitch) => {
    setSettings((prev) => ({ ...prev, pitch: clamp(pitch, 0, 2, prev.pitch) }))
  }, [])

  const setVolume = useCallback((volume) => {
    setSettings((prev) => ({ ...prev, volume: clamp(volume, 0, 1, prev.volume) }))
  }, [])

  return {
    isSupported,
    isSpeaking,
    isMuted,
    voices,
    selectedVoice: resolvedVoice,
    isLanguageVoiceAvailable,
    settings,
    speak,
    stop,
    toggleMute,
    setVoiceURI,
    setRate,
    setPitch,
    setVolume,
  }
}
