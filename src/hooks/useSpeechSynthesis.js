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

export function useSpeechSynthesis() {
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

  // Fall back to the browser default whenever the saved voice isn't
  // present on this device/browser (never loaded, uninstalled, etc.)
  const selectedVoice = settings.voiceURI
    ? voices.find((v) => v.voiceURI === settings.voiceURI) || null
    : null

  const speak = useCallback((text) => {
    if (!isSupported || isMuted || !text) return

    synth.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    if (selectedVoice) utterance.voice = selectedVoice
    utterance.rate = settings.rate
    utterance.pitch = settings.pitch
    utterance.volume = settings.volume
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    synth.speak(utterance)
  }, [isSupported, isMuted, synth, selectedVoice, settings])

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
    selectedVoice,
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
