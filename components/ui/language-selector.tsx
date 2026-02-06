"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { useLanguage, type Language } from "@/lib/language-provider"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const [dropdownStyle, setDropdownStyle] = React.useState({ top: 0, right: 0 })

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "eng", label: "ENG", flag: "🇬🇧" },
    { code: "kor", label: "KOR", flag: "🇰🇷" },
  ]

  const currentLanguage = languages.find((l) => l.code === language) || languages[0]

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-language-selector]')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen || !triggerRef.current || typeof document === "undefined") return
    const rect = triggerRef.current.getBoundingClientRect()
    setDropdownStyle({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    })
  }, [isOpen])

  const dropdownContent = isOpen && (
    <>
      <div
        className="fixed inset-0 z-[100]"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <div
        className="fixed z-[101] min-w-[120px] rounded-md border bg-popover shadow-md"
        style={{ top: dropdownStyle.top, right: dropdownStyle.right }}
        role="menu"
      >
        <div className="p-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              role="menuitem"
              className={cn(
                "w-full flex items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm",
                "hover:bg-accent hover:text-accent-foreground",
                "transition-colors",
                language === lang.code && "bg-accent text-accent-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{lang.flag}</span>
                <span>{lang.label}</span>
              </div>
              {language === lang.code && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <div className="relative" data-language-selector>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium",
          "hover:bg-accent hover:text-accent-foreground",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "h-9 min-w-[80px]"
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span>{currentLanguage.label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {typeof document !== "undefined" &&
        createPortal(dropdownContent, document.body)}
    </div>
  )
}

