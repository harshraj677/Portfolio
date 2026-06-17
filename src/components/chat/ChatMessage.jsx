import { useState } from 'react'

// ── minimal markdown renderer ──────────────────────────────────────────────
function renderMarkdown(text) {
  const lines = text.split('\n')
  const elements = []
  let listItems = []
  let key = 0

  function flushList() {
    if (listItems.length) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 my-2">
          {listItems}
        </ul>
      )
      listItems = []
    }
  }

  function inlineFormat(str) {
    // code blocks inline
    const parts = str.split(/(`[^`]+`)/)
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-gray-700/70 text-cyan-300 text-xs font-mono">
            {part.slice(1, -1)}
          </code>
        )
      }
      // bold
      const boldParts = part.split(/(\*\*[^*]+\*\*)/)
      return boldParts.map((bp, j) => {
        if (bp.startsWith('**') && bp.endsWith('**')) {
          return <strong key={j} className="text-white font-semibold">{bp.slice(2, -2)}</strong>
        }
        return bp
      })
    })
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      flushList()
      elements.push(<br key={key++} />)
      continue
    }

    if (trimmed.startsWith('## ')) {
      flushList()
      elements.push(
        <h3 key={key++} className="text-base font-bold text-cyan-300 mt-3 mb-1">
          {trimmed.slice(3)}
        </h3>
      )
      continue
    }

    if (trimmed.startsWith('# ')) {
      flushList()
      elements.push(
        <h2 key={key++} className="text-lg font-bold text-cyan-300 mt-3 mb-1">
          {trimmed.slice(2)}
        </h2>
      )
      continue
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      listItems.push(
        <li key={key++} className="text-gray-200 text-sm">
          {inlineFormat(trimmed.slice(2))}
        </li>
      )
      continue
    }

    flushList()
    elements.push(
      <p key={key++} className="text-sm text-gray-200 leading-relaxed">
        {inlineFormat(trimmed)}
      </p>
    )
  }

  flushList()
  return elements
}

// ─────────────────────────────────────────────────────────────────────────────

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user'
  const [showSources, setShowSources] = useState(false)

  if (isUser) {
    return (
      <div className="flex justify-end px-4 py-1">
        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-tr-sm
                        bg-gradient-to-br from-cyan-600 to-purple-700 shadow-lg">
          <p className="text-sm text-white leading-relaxed">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 px-4 py-1">
      {/* Avatar + message */}
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600
                        flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
          H
        </div>
        <div className={`max-w-[88%] px-4 py-3 rounded-2xl rounded-tl-sm shadow
                         ${message.isError
                            ? 'bg-red-900/30 border border-red-500/30'
                            : 'bg-gray-800/80 border border-gray-700/40'}`}>
          <div className="space-y-1.5">{renderMarkdown(message.content)}</div>
        </div>
      </div>

      {/* Sources */}
      {message.sources?.length > 0 && (
        <div className="ml-10">
          <button
            onClick={() => setShowSources(s => !s)}
            className="text-xs text-gray-500 hover:text-cyan-400 transition-colors"
          >
            {showSources ? '▲ hide sources' : `▼ ${message.sources.length} source${message.sources.length > 1 ? 's' : ''}`}
          </button>
          {showSources && (
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {message.sources.map(src => (
                <span
                  key={src}
                  className="px-2 py-0.5 rounded text-xs bg-gray-700/60 text-gray-400 border border-gray-600/40"
                >
                  {src}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatMessage
