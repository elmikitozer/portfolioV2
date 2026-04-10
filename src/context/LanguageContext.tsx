import { createContext, useContext, useState, type ReactNode } from 'react'
import { translations, type Lang, type Translations } from '../i18n'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'fr' || saved === 'en') return saved
    return navigator.language.startsWith('fr') ? 'fr' : 'en'
  })

  const handleSetLang = (l: Lang) => {
    localStorage.setItem('lang', l)
    setLang(l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
