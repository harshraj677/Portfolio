import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition'

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
)

const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
       strokeLinecap="round" className="w-4 h-4">
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
)

const resizeTextarea = (el) => {
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}

const ChatInput = ({ onSend, isLoading, disabled, onListeningChange }) => {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  // Snapshot of whatever text was already in the box the moment recording
  // started. The live transcript is appended AFTER this fixed prefix exactly
  // once per session — it must never be recomputed from the live `value`,
  // otherwise every re-firing of onResult (interim updates) would glue a
  // growing transcript onto an already-updated box and duplicate words.
  const baseValueRef = useRef('')

  const submit = (text = value) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const {
    isSupported: isMicSupported,
    isListening,
    isTranscribing,
    error: micError,
    toggle: toggleMic,
  } = useSpeechRecognition({
    // Transcription-first: place the recognized text into the input for the
    // user to review/edit. Nothing is sent automatically — the user still
    // presses Send (or Enter) themselves, exactly like typed input.
    //
    // `transcript` is always the full current transcript for this recording
    // session (never a fragment to accumulate), so it REPLACES the portion
    // of the box this session owns rather than being appended to it.
    onResult: (transcript) => {
      const base = baseValueRef.current
      setValue(base ? `${base.trim()} ${transcript}` : transcript)
      requestAnimationFrame(() => {
        resizeTextarea(textareaRef.current)
        textareaRef.current?.focus()
      })
    },
  })

  const handleMicClick = () => {
    if (!isListening && !isTranscribing) {
      baseValueRef.current = value
    }
    toggleMic()
  }

  // Let the parent know when the mic is active so it can interrupt any
  // in-progress spoken response (avoids the AI talking over the user).
  useEffect(() => {
    onListeningChange?.(isListening)
  }, [isListening, onListeningChange])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    resizeTextarea(e.target)
  }

  const placeholder = isTranscribing
    ? 'Transcribing…'
    : isListening
      ? 'Listening…'
      : 'Ask anything about Harsh…'

  return (
    <div className="p-2.5 sm:p-3 border-t border-gray-700/50">
      <AnimatePresence>
        {(isListening || isTranscribing) && (
          <motion.div
            key="voice-status"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`flex items-center gap-2 mb-2 px-3 py-1.5 rounded-lg border
                       ${isTranscribing
                         ? 'bg-amber-500/10 border-amber-500/20'
                         : 'bg-red-500/10 border-red-500/20'}`}
          >
            {isTranscribing ? (
              <motion.span
                className="text-amber-400 shrink-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              >
                <SpinnerIcon />
              </motion.span>
            ) : (
              <span className="flex items-end gap-0.5 h-3 shrink-0">
                {[0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="w-0.5 rounded-full bg-red-400"
                    animate={{ height: ['25%', '100%', '25%'] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.12,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </span>
            )}
            <span className={`text-xs font-medium ${isTranscribing ? 'text-amber-300' : 'text-red-300'}`}>
              {isTranscribing ? 'Transcribing…' : 'Listening…'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end gap-1.5 sm:gap-2 bg-gray-800/80 rounded-xl border border-gray-600/50
                      focus-within:border-cyan-500/60 transition-colors duration-300 px-3 py-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={isLoading || disabled}
          className="flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-500
                     resize-none outline-none min-h-[24px] max-h-[120px] py-0.5
                     disabled:opacity-50 transition-opacity duration-200"
          style={{ lineHeight: '1.5' }}
        />
        <button
          type="button"
          onClick={handleMicClick}
          disabled={isLoading || disabled || !isMicSupported || isTranscribing}
          title={
            !isMicSupported
              ? 'Voice input is not supported in this browser'
              : isTranscribing
                ? 'Transcribing…'
                : isListening
                  ? 'Stop recording'
                  : 'Start recording'
          }
          aria-label={isListening ? 'Stop recording' : 'Start recording'}
          aria-pressed={isListening}
          className={`relative w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-0.5
                     transition-all duration-300 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed
                     ${isListening
                       ? 'bg-red-500/20 text-red-400'
                       : isTranscribing
                         ? 'bg-amber-500/20 text-amber-400'
                         : 'bg-gray-700/60 text-gray-300 hover:text-cyan-400 hover:bg-gray-700 hover:scale-105'}`}
        >
          <AnimatePresence>
            {isListening && (
              <>
                <motion.span
                  key="ring-1"
                  className="absolute inset-0 rounded-lg bg-red-500/50"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  key="ring-2"
                  className="absolute inset-0 rounded-lg bg-red-500/40"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                />
              </>
            )}
          </AnimatePresence>
          <motion.span
            className="relative z-10 flex items-center justify-center"
            animate={
              isTranscribing
                ? { rotate: 360 }
                : { scale: isListening ? [1, 1.15, 1] : 1 }
            }
            transition={
              isTranscribing
                ? { duration: 0.8, repeat: Infinity, ease: 'linear' }
                : { duration: 1, repeat: isListening ? Infinity : 0, ease: 'easeInOut' }
            }
          >
            {isTranscribing ? <SpinnerIcon /> : <MicIcon />}
          </motion.span>
        </button>
        <button
          onClick={() => submit()}
          disabled={!value.trim() || isLoading || disabled}
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600
                     flex items-center justify-center text-white shrink-0 mb-0.5
                     hover:opacity-90 hover:scale-105 active:scale-90 transition-all duration-200
                     disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Send"
        >
          <SendIcon />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {micError ? (
          <motion.p
            key="mic-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-red-400 mt-1.5 px-1"
          >
            {micError}
          </motion.p>
        ) : (
          <motion.p
            key="mic-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-gray-600 mt-1.5 px-1"
          >
            Press Enter to send · Shift+Enter for newline
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChatInput
