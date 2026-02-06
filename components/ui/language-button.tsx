"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, Check } from "lucide-react"

const languageButtonVariants = cva(
  "inline-flex items-center justify-between gap-3 rounded-2xl px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-white/70 to-[rgba(250,250,250,0.6)] border border-white backdrop-blur-sm",
        solid: "bg-white border border-[var(--color-border)] backdrop-blur-sm",
        expanded: "bg-gradient-to-r from-white/70 to-[rgba(250,250,250,0.6)] border border-white backdrop-blur-sm",
      },
      size: {
        default: "h-9",
        expanded: "min-h-[144px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type Language = "eng" | "kor" | "viet"

export interface LanguageButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof languageButtonVariants> {
  language?: Language
  isExpanded?: boolean
  selectedLanguage?: Language
  onLanguageChange?: (language: Language) => void
}

const LanguageButton = React.forwardRef<HTMLButtonElement, LanguageButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    language = "eng",
    isExpanded = false,
    selectedLanguage,
    onLanguageChange,
    ...props 
  }, ref) => {
    const [expanded, setExpanded] = React.useState(isExpanded)
    
    const languages: { code: Language; label: string }[] = [
      { code: "eng", label: "ENG" },
      { code: "kor", label: "KOR" },
      { code: "viet", label: "VIET" },
    ]

    const getFlagIcon = (lang: Language) => {
      // Simplified flag representation - in production, use actual flag SVGs
      const flagColors: Record<Language, string> = {
        eng: "🇬🇧",
        kor: "🇰🇷",
        viet: "🇻🇳",
      }
      return (
        <span className="text-xl w-6 h-6 flex items-center justify-center">
          {flagColors[lang]}
        </span>
      )
    }

    const currentLanguage = selectedLanguage || language

    if (expanded && variant === "expanded") {
      return (
        <div className={cn("flex flex-col gap-1.5", className)}>
          <button
            ref={ref}
            className={cn(languageButtonVariants({ variant, size: "default" }))}
            onClick={() => setExpanded(false)}
            {...props}
          >
            <div className="flex items-center gap-3">
              {getFlagIcon(currentLanguage)}
              <span className="text-[var(--color-text-secondary)]">
                {languages.find(l => l.code === currentLanguage)?.label}
              </span>
            </div>
            <ChevronUp className="w-6 h-6 text-[var(--color-text-secondary)]" />
          </button>
          
          <div className={cn(
            "flex flex-col gap-2 p-3 rounded-2xl",
            "bg-gradient-to-r from-white/70 to-[rgba(250,250,250,0.6)] border border-white backdrop-blur-sm"
          )}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                className="flex items-center justify-between w-full py-1.5 px-3 rounded-lg hover:bg-white/50 transition-colors"
                onClick={() => {
                  onLanguageChange?.(lang.code)
                  setExpanded(false)
                }}
              >
                <div className="flex items-center gap-3">
                  {getFlagIcon(lang.code)}
                  <span className="text-[var(--color-text-secondary)]">
                    {lang.label}
                  </span>
                </div>
                {lang.code === currentLanguage && (
                  <Check className="w-5 h-5 text-[var(--color-text-secondary)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(languageButtonVariants({ variant, size }), className)}
        onClick={() => setExpanded(true)}
        {...props}
      >
        <div className="flex items-center gap-3">
          {getFlagIcon(currentLanguage)}
          <span className="text-[var(--color-text-secondary)]">
            {languages.find(l => l.code === currentLanguage)?.label}
          </span>
        </div>
        <ChevronDown className="w-6 h-6 text-[var(--color-text-secondary)]" />
      </button>
    )
  }
)
LanguageButton.displayName = "LanguageButton"

export { LanguageButton, languageButtonVariants }

