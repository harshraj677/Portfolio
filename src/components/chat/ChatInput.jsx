import { useState, useRef } from 'react'

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const ChatInput = ({ onSend, isLoading, disabled }) => {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed || isLoading || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    // Auto-resize
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  return (
    <div className="p-3 border-t border-gray-700/50">
      <div className="flex items-end gap-2 bg-gray-800/80 rounded-xl border border-gray-600/50
                      focus-within:border-cyan-500/60 transition-colors px-3 py-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about Harsh…"
          rows={1}
          disabled={isLoading || disabled}
          className="flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-500
                     resize-none outline-none min-h-[24px] max-h-[120px] py-0.5
                     disabled:opacity-50"
          style={{ lineHeight: '1.5' }}
        />
        <button
          onClick={submit}
          disabled={!value.trim() || isLoading || disabled}
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600
                     flex items-center justify-center text-white shrink-0 mb-0.5
                     hover:opacity-90 active:scale-95 transition-all
                     disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Send"
        >
          <SendIcon />
        </button>
      </div>
      <p className="text-xs text-gray-600 mt-1.5 px-1">
        Press Enter to send · Shift+Enter for newline
      </p>
    </div>
  )
}

export default ChatInput
