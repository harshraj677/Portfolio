import { useState, useRef, useCallback, useEffect } from 'react'

function getSynth() {
  return typeof window !== 'undefined' ? window.speechSynthesis : null
}

export function useSpeechSynthesis() {
  const synth = getSynth()
  const isSupported = !!synth

  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const utteranceRef = useRef(null)

  useEffect(() => {
    return () => {
      synth?.cancel()
    }
  }, [synth])

  const speak = useCallback((text) => {
    if (!isSupported || isMuted || !text) return

    synth.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    synth.speak(utterance)
  }, [isSupported, isMuted, synth])

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

  return { isSupported, isSpeaking, isMuted, speak, stop, toggleMute }
}
