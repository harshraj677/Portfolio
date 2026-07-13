import { useState, useRef } from 'react'
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

const resizeTextarea = (el) => {
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}

const ChatInput = ({ onSend, isLoading, disabled }) => {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const submit = (text = value) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const { isSupported: isMicSupported, isListening, error: micError, toggle: toggleMic } =
    useSpeechRecognition({
      onResult: (transcript) => {
        const combined = value ? `${value.trim()} ${transcript}` : transcript
        submit(combined)
      },
    })

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

  return (
    <div className="p-2.5 sm:p-3 border-t border-gray-700/50">
      <AnimatePresence>
        {isListening && (
          <motion.div
            key="listening-indicator"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex items-center gap-2 mb-2 px-3 py-1.5 rounded-lg
                       bg-red-500/10 border border-red-500/20"
          >
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
            <span className="text-xs text-red-300 font-medium">Listening…</span>
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
          placeholder={isListening ? 'Listening…' : 'Ask anything about Harsh…'}
          rows={1}
          disabled={isLoading || disabled}
          className="flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-500
                     resize-none outline-none min-h-[24px] max-h-[120px] py-0.5
                     disabled:opacity-50 transition-opacity duration-200"
          style={{ lineHeight: '1.5' }}
        />
        <button
          type="button"
          onClick={toggleMic}
          disabled={isLoading || disabled || !isMicSupported}
          title={
            !isMicSupported
              ? 'Voice input is not supported in this browser'
              : isListening
                ? 'Stop listening'
                : 'Start voice input'
          }
          aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
          aria-pressed={isListening}
          className={`relative w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-0.5
                     transition-all duration-300 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed
                     ${isListening
                       ? 'bg-red-500/20 text-red-400'
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
            animate={{ scale: isListening ? [1, 1.15, 1] : 1 }}
            transition={{ duration: 1, repeat: isListening ? Infinity : 0, ease: 'easeInOut' }}
          >
            <MicIcon />
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
