import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ChatWindow from './ChatWindow'
import { useChatMemory } from '../../hooks/useChatMemory'

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
       strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const FloatingButton = () => {
  const [open, setOpen] = useState(false)
  const { messages, isLoading, error, send, clear } = useChatMemory()

  const unread = !open && messages.filter(m => m.role === 'assistant').length > 0

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <ChatWindow
            onClose={() => setOpen(false)}
            messages={messages}
            isLoading={isLoading}
            error={error}
            onSend={send}
            onClear={clear}
          />
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full
                   bg-gradient-to-br from-cyan-500 to-purple-600
                   text-white shadow-lg shadow-cyan-500/30
                   flex items-center justify-center
                   hover:shadow-cyan-500/50 hover:scale-110 active:scale-95
                   transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              className="text-xl font-light"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <ChatIcon />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {unread && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full
                       bg-green-400 border-2 border-gray-900"
          />
        )}
      </motion.button>

      {/* Tooltip (first visit, no chat yet) */}
      {!open && messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.5 }}
          className="fixed bottom-[5.5rem] right-[4.5rem] sm:right-[5.5rem] z-40
                     px-3 py-1.5 rounded-xl bg-gray-800 border border-gray-700/60
                     text-xs text-gray-200 shadow-lg whitespace-nowrap pointer-events-none"
        >
          Ask me anything about Harsh! 👋
        </motion.div>
      )}
    </>
  )
}

export default FloatingButton
