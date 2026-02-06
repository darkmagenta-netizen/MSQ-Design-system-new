"use client"

import * as React from "react"

export type Language = "eng" | "kor"

interface LanguageProviderProps {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}

interface LanguageProviderState {
  language: Language
  setLanguage: (language: Language) => void
}

const initialState: LanguageProviderState = {
  language: "eng",
  setLanguage: () => null,
}

const LanguageProviderContext = React.createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
  defaultLanguage = "eng",
  storageKey = "msq-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguageState] = React.useState<Language>(defaultLanguage)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(storageKey) as Language | null
    if (stored && (stored === "eng" || stored === "kor")) {
      setLanguageState(stored)
    }
  }, [storageKey])

  React.useEffect(() => {
    if (!mounted) return
    localStorage.setItem(storageKey, language)
  }, [language, storageKey, mounted])

  const setLanguage = React.useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage)
  }, [])

  const value = {
    language,
    setLanguage,
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = React.useContext(LanguageProviderContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

