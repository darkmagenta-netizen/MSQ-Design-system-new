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
  const [dropdownStyle, setDropdownStyle] = React.useState({ top: 0, left: 0 })

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "eng", label: "ENG", flag: "🇬🇧" },
    { code: "kor", label: "KOR", flag: "🇰🇷" },
  ]

  const currentLanguage = languages.find((l) => l.code === language) || languages[0]

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest("[data-language-selector]") && !target.closest("[data-language-dropdown]")) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen || !triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    setDropdownStyle({
      top: rect.bottom + 4,
      left: rect.left,
    })
  }, [isOpen])

  const portalTarget =
    typeof document !== "undefined"
      ? document.getElementById("portal-root") ?? document.body
      : null

  const portalContent = isOpen && portalTarget && (
    <>
      {/* Full-screen overlay: in portal root so it's on top; pointerEvents auto so clicks work */}
      <div
        aria-hidden
        role="presentation"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          pointerEvents: "auto",
        }}
        onClick={() => setIsOpen(false)}
      />
      {/* Dropdown: in portal root so it's on top; pointerEvents auto so ENG/KOR are clickable */}
      <div
        data-language-dropdown
        role="listbox"
        style={{
          position: "fixed",
          top: dropdownStyle.top,
          left: dropdownStyle.left,
          zIndex: 2,
          minWidth: 120,
          borderRadius: 6,
          border: "1px solid #d1d5db",
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
          padding: 4,
          pointerEvents: "auto",
        }}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            role="option"
            onClick={() => {
              setLanguage(lang.code)
              setIsOpen(false)
            }}
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              padding: "6px 8px",
              borderRadius: 4,
              border: "none",
              background: language === lang.code ? "#f3f4f6" : "transparent",
              color: "#111827",
              fontSize: 14,
              cursor: "pointer",
              textAlign: "left",
              fontWeight: language === lang.code ? 600 : 400,
            }}
            onMouseEnter={(e) => {
              if (language !== lang.code) e.currentTarget.style.backgroundColor = "#f3f4f6"
            }}
            onMouseLeave={(e) => {
              if (language !== lang.code) e.currentTarget.style.backgroundColor = "transparent"
            }}
          >
            <span style={{ fontSize: 16 }}>{lang.flag}</span>
            <span>{lang.label}</span>
            {language === lang.code && <Check size={16} style={{ flexShrink: 0 }} />}
          </button>
        ))}
      </div>
    </>
  )

  return (
    <div className="relative" data-language-selector>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "h-9 min-w-[80px]"
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span>{currentLanguage.label}</span>
        <ChevronDown className={cn("h-4 w-4", isOpen && "rotate-180")} />
      </button>

      {/* Portal into #portal-root (last in body) so overlay + dropdown are on top of page */}
      {portalContent && createPortal(portalContent, portalTarget)}
    </div>
  )
}

