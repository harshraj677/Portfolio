import { useState, useRef, useCallback, useEffect } from 'react'

function getSpeechRecognitionClass() {
  if (typeof window === 'undefined') return null
  return window.SpeechRecognition || window.webkitSpeechRecognition || null
}

export function useSpeechRecognition({ onResult, lang = 'en-IN' } = {}) {
  const SpeechRecognitionClass = getSpeechRecognitionClass()
  const isSupported = !!SpeechRecognitionClass

  const [isListening, setIsListening] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [error, setError] = useState(null)

  const recognitionRef = useRef(null)
  const onResultRef = useRef(onResult)
  onResultRef.current = onResult

  // Tracks the last transcript string emitted for the CURRENT recording
  // session so an identical/duplicate onresult firing (some browsers fire
  // more than one per utterance even with the same content) is a no-op
  // instead of being reprocessed.
  const lastEmittedRef = useRef('')

  useEffect(() => {
    if (!isSupported) return

    const recognition = new SpeechRecognitionClass()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = lang

    recognition.onstart = () => {
      console.log('[SpeechRecognition] onstart — recognition session started, lang:', recognition.lang)
    }

    recognition.onaudiostart = () => {
      console.log('[SpeechRecognition] onaudiostart — mic audio capture began')
    }

    recognition.onspeechstart = () => {
      console.log('[SpeechRecognition] onspeechstart — speech detected in the audio stream')
    }

    recognition.onspeechend = () => {
      console.log('[SpeechRecognition] onspeechend — speech in the audio stream ended')
      // Audio capture is done; the engine is now finalizing the transcript —
      // this is the "Transcribing…" phase distinct from "Listening…".
      setIsTranscribing(true)
    }

    recognition.onaudioend = () => {
      console.log('[SpeechRecognition] onaudioend — mic audio capture ended')
    }

    recognition.onnomatch = (event) => {
      console.warn('[SpeechRecognition] onnomatch — recognized audio did not match with sufficient confidence', event)
      setIsTranscribing(false)
      setError("Couldn't understand that clearly. Please try again.")
    }

    recognition.onresult = (event) => {
      // `event.results` is NOT a running log of separate utterances to
      // concatenate — it is the SpeechRecognition engine's current, complete
      // best guess for this one utterance so far. With interimResults=true
      // this handler fires repeatedly as that guess is refined ("Tell" →
      // "Tell me" → "Tell me about" → "Tell me about yourself"), and each
      // firing already contains the FULL text, not just a new fragment.
      // The transcript computed below must therefore REPLACE whatever was
      // shown before, never be appended to it — appending is exactly what
      // produced the "Tell Tell me Tell me about..." duplication bug.
      const isFinal = event.results[event.results.length - 1]?.isFinal ?? false
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ')
        .trim()

      console.log('[SpeechRecognition] onresult:', { isFinal, transcript, event })

      if (isFinal) setIsTranscribing(false)

      if (!transcript) {
        if (isFinal) setError("Couldn't transcribe that. Please try again.")
        return
      }

      if (transcript === lastEmittedRef.current) return // identical re-fire — nothing changed
      lastEmittedRef.current = transcript

      onResultRef.current?.(transcript, { isFinal })
    }

    recognition.onerror = (event) => {
      // Log the full event plus the raw error code — this is what was
      // previously being swallowed, making every failure look identical.
      console.error('[SpeechRecognition] onerror — full event:', event)
      console.error('[SpeechRecognition] onerror — event.error:', event.error)

      setIsTranscribing(false)

      switch (event.error) {
        case 'not-allowed':
          setError('Microphone access denied. Allow mic permission in your browser to use voice input.')
          break
        case 'service-not-allowed':
          setError('Speech recognition service is blocked. Check your browser or OS privacy/security settings.')
          break
        case 'no-speech':
          setError('No speech detected. Try again.')
          break
        case 'audio-capture':
          setError('No microphone was found. Check that a mic is connected and not in use by another app.')
          break
        case 'network':
          setError('Network error reaching the speech recognition service. Check your internet connection.')
          break
        case 'language-not-supported':
          setError(`The language "${recognition.lang}" is not supported for voice input on this browser.`)
          break
        case 'bad-grammar':
          setError('Voice input failed due to a grammar configuration error.')
          break
        case 'aborted':
          // Intentional stop (user pressed Stop, component unmounted) — not a real error.
          break
        default:
          // Surface the real browser-reported code instead of a fully generic message.
          setError(`Voice input failed: ${event.error || 'unknown error'}. Please try again.`)
      }
    }

    recognition.onend = () => {
      console.log('[SpeechRecognition] onend — recognition session ended')
      setIsListening(false)
      setIsTranscribing(false)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.onstart = null
      recognition.onaudiostart = null
      recognition.onspeechstart = null
      recognition.onspeechend = null
      recognition.onaudioend = null
      recognition.onnomatch = null
      recognition.onresult = null
      recognition.onerror = null
      recognition.onend = null
      recognition.abort()
      recognitionRef.current = null
    }
    // Recreate the recognition instance whenever the selected language
    // changes — recognition.lang must be set before start() is called, and
    // the cleanup above (abort + nulled handlers) prevents any leak from the
    // previous instance.
  }, [isSupported, SpeechRecognitionClass, lang])

  const start = useCallback(() => {
    if (!recognitionRef.current || isListening) {
      console.log('[SpeechRecognition] start() skipped — recognitionRef:', !!recognitionRef.current, 'isListening:', isListening)
      return
    }
    setError(null)
    setIsTranscribing(false)
    lastEmittedRef.current = ''
    try {
      console.log('[SpeechRecognition] start() calling recognition.start()')
      recognitionRef.current.start()
      setIsListening(true)
    } catch (err) {
      // start() throws InvalidStateError if a session is already active
      console.error('[SpeechRecognition] start() threw synchronously:', err)
    }
  }, [isListening])

  const stop = useCallback(() => {
    console.log('[SpeechRecognition] stop() calling recognition.stop()')
    recognitionRef.current?.stop()
  }, [])

  const toggle = useCallback(() => {
    if (isListening) stop()
    else start()
  }, [isListening, start, stop])

  return { isSupported, isListening, isTranscribing, error, start, stop, toggle }
}
