import { createContext, useContext, useEffect, useState } from 'react'
import { LOCALES, translate } from './translations'

const STORAGE_KEY = 'cambio-lang'
const LanguageContext = createContext(null)

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch { /* storage indisponível */ }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = LOCALES[lang]
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* ignora */ }
  }, [lang])

  const value = { lang, setLang, locale: LOCALES[lang], t: (key, vars) => translate(lang, key, vars) }
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage deve ser usado dentro de LanguageProvider')
  return ctx
}