import { useState, useCallback, useRef, useEffect } from 'react'

const STORAGE_KEY = 'harx_chat_history'
const MAX_STORED  = 30

function friendlyError(status, data) {
  if (!status) return "Connection failed — please check your internet connection."
  if (status === 404) return "API endpoint not found. Make sure the dev server is running correctly."
  if (status === 503) {
    if (data?.answer) return data.answer      // server already has a user-friendly message
    return "Service temporarily unavailable. Please try again in a moment."
  }
  if (status === 500) {
    if (data?.answer) return data.answer
    return "Something went wrong on the server. Please try again."
  }
  return `Unexpected error (${status}). Please try again.`
}

export function useChatMemory() {
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch { return [] }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error,     setError]     = useState(null)
  const abortRef = useRef(null)

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED)))
    } catch { /* quota exceeded */ }
  }, [messages])

  const send = useCallback(async (userText) => {
    if (!userText.trim() || isLoading) return

    const userMsg = { role: 'user', content: userText.trim(), ts: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)
    setError(null)

    const history = messages.map(m => ({ role: m.role, content: m.content }))

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ query: userText.trim(), messages: history }),
        signal:  controller.signal,
      })

      let data = {}
      try { data = await res.json() } catch { /* non-JSON body */ }

      if (!res.ok) {
        const msg = friendlyError(res.status, data)
        setError(msg)
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: msg,
          sources: [],
          ts: Date.now(),
          isError: true,
        }])
        return
      }

      setMessages(prev => [...prev, {
        role:    'assistant',
        content: data.answer || "I couldn't generate a response. Please try again.",
        sources: data.sources || [],
        ts:      Date.now(),
      }])
    } catch (err) {
      if (err.name === 'AbortError') return

      const msg = err.name === 'TypeError'
        ? "Connection failed. Is the dev server running? Try restarting it."
        : "Something went wrong. Please try again."

      setError(msg)
      setMessages(prev => [...prev, {
        role: 'assistant', content: msg, sources: [], ts: Date.now(), isError: true,
      }])
    } finally {
      setIsLoading(false)
      abortRef.current = null
    }
  }, [messages, isLoading])

  const clear = useCallback(() => {
    setMessages([])
    setError(null)
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* noop */ }
  }, [])

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    setIsLoading(false)
  }, [])

  return { messages, isLoading, error, send, clear, cancel }
}
