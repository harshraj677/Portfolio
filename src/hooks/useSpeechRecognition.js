import { useState, useRef, useCallback, useEffect } from 'react'

function getSpeechRecognitionClass() {
  if (typeof window === 'undefined') return null
  return window.SpeechRecognition || window.webkitSpeechRecognition || null
}

export function useSpeechRecognition({ onResult } = {}) {
  const SpeechRecognitionClass = getSpeechRecognitionClass()
  const isSupported = !!SpeechRecognitionClass

  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState(null)

  const recognitionRef = useRef(null)
  const onResultRef = useRef(onResult)
  onResultRef.current = onResult

  useEffect(() => {
    if (!isSupported) return

    const recognition = new SpeechRecognitionClass()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ')
        .trim()
      if (transcript) onResultRef.current?.(transcript)
    }

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Microphone access denied. Allow mic permission in your browser to use voice input.')
      } else if (event.error === 'no-speech') {
        setError('No speech detected. Try again.')
      } else if (event.error !== 'aborted') {
        setError('Voice input failed. Please try again.')
      }
    }

    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition

    return () => {
      recognition.onresult = null
      recognition.onerror = null
      recognition.onend = null
      recognition.abort()
      recognitionRef.current = null
    }
  }, [isSupported, SpeechRecognitionClass])

  const start = useCallback(() => {
    if (!recognitionRef.current || isListening) return
    setError(null)
    try {
      recognitionRef.current.start()
      setIsListening(true)
    } catch {
      // start() throws if a recognition session is already active; ignore
    }
  }, [isListening])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
  }, [])

  const toggle = useCallback(() => {
    if (isListening) stop()
    else start()
  }, [isListening, start, stop])

  return { isSupported, isListening, error, start, stop, toggle }
}
