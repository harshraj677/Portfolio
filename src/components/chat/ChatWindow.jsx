import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import TypingIndicator from './TypingIndicator'
import SuggestedQuestions from './SuggestedQuestions'

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
       strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const ChatWindow = ({ onClose, messages, isLoading, error, onSend, onClear }) => {
  const bottomRef = useRef(null)
  const isEmpty = messages.length === 0

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] max-w-[440px]
                 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden
                 bg-gray-900/95 backdrop-blur-xl border border-gray-700/60"
      style={{ height: 'min(600px, calc(100dvh - 120px))' }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3
                      bg-gradient-to-r from-gray-900 to-gray-800
                      border-b border-gray-700/50 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600
                          flex items-center justify-center text-sm font-bold text-white">
            H
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Ask about Harsh</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-xs text-gray-400">AI-powered portfolio assistant</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={onClear}
              title="Clear chat"
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10
                         transition-all"
            >
              <TrashIcon />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50
                       transition-all"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* ── Messages ────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto py-3 space-y-1
                      scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {isEmpty && !isLoading ? (
          <>
            {/* Welcome */}
            <div className="px-4 py-4 text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl
                              bg-gradient-to-br from-cyan-500/20 to-purple-600/20
                              border border-cyan-500/20
                              flex items-center justify-center text-2xl">
                🤖
              </div>
              <p className="text-white font-semibold mb-1">Hi there!</p>
              <p className="text-sm text-gray-400">
                I can answer anything about Harsh's projects, experience, skills, and more.
              </p>
            </div>
            <SuggestedQuestions onSelect={onSend} />
          </>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.ts ?? i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <ChatMessage message={msg} />
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-3 px-4"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600
                                flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                  H
                </div>
                <div className="bg-gray-800/80 border border-gray-700/40 rounded-2xl rounded-tl-sm">
                  <TypingIndicator />
                </div>
              </motion.div>
            )}

            {error && (
              <p className="px-4 text-xs text-red-400 text-center">{error}</p>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input ───────────────────────────────────────────────────────────── */}
      <ChatInput onSend={onSend} isLoading={isLoading} />
    </motion.div>
  )
}

export default ChatWindow
