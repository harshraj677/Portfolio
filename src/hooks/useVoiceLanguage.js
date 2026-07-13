import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'harx_voice_language'

// Hindi and Hinglish intentionally share the same BCP-47 locale (hi-IN) —
// there is no separate "code-switched" locale exposed by the Web Speech API,
// and Chrome's hi-IN recognition model already handles natural Hindi/English
// mixing reasonably well. The two remain distinct, separately-labeled options
// purely so the user can express their preference; the underlying
// recognition/synthesis locale used is identical for both.
export const SUPPORTED_LANGUAGES = [
  { id: 'en-IN', label: 'English (India)', short: 'EN', locale: 'en-IN' },
  { id: 'hi-IN', label: 'Hindi', short: 'HI', locale: 'hi-IN' },
  { id: 'hi-IN-hinglish', label: 'Hinglish', short: 'HI/EN', locale: 'hi-IN' },
  { id: 'kn-IN', label: 'Kannada', short: 'KN', locale: 'kn-IN' },
]

const DEFAULT_LANGUAGE_ID = 'en-IN'

function loadLanguageId() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED_LANGUAGES.some((l) => l.id === stored)) return stored
  } catch {
    // localStorage unavailable (private browsing, disabled, etc.)
  }
  return DEFAULT_LANGUAGE_ID
}

export function useVoiceLanguage() {
  const [languageId, setLanguageId] = useState(loadLanguageId)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, languageId)
    } catch {
      // storage unavailable/full — selection just won't persist across reloads
    }
  }, [languageId])

  const setLanguage = useCallback((id) => {
    if (SUPPORTED_LANGUAGES.some((l) => l.id === id)) setLanguageId(id)
  }, [])

  const language = SUPPORTED_LANGUAGES.find((l) => l.id === languageId) || SUPPORTED_LANGUAGES[0]

  return { language, languageId, setLanguage, languages: SUPPORTED_LANGUAGES }
}
