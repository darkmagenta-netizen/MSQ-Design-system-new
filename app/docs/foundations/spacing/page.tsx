"use client"

import { useState } from "react"
import { mappedSpacing } from "@/tokens/mapped/spacing"
import { Copy, Check } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { getTranslation } from "@/lib/translations"

interface SpacingInfo {
  name: string
  value: string
  pixels: number
  rem: string
  tailwind: string
  css: string
}

function SpacingCard({ spacingInfo }: { spacingInfo: SpacingInfo }) {
  const [copied, setCopied] = useState<string | null>(null)
  const { language } = useLanguage()
  const t = getTranslation(language)

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text)
    setCopied(format)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="group relative">
      <div className="rounded-lg border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">{spacingInfo.name}</h3>
          <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
            <div
              className="bg-primary rounded"
              style={{
                width: `${Math.min(spacingInfo.pixels / 4, 32)}px`,
                height: `${Math.min(spacingInfo.pixels / 4, 32)}px`,
              }}
            />
          </div>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t.pixels}</span>
            <button
              onClick={() => copyToClipboard(spacingInfo.value, "pixels")}
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            >
              {copied === "pixels" ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>{spacingInfo.value}</span>
                </>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t.rem}</span>
            <button
              onClick={() => copyToClipboard(spacingInfo.rem, "rem")}
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            >
              {copied === "rem" ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>{spacingInfo.rem}</span>
                </>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t.tailwind}</span>
            <button
              onClick={() => copyToClipboard(spacingInfo.tailwind, "tailwind")}
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            >
              {copied === "tailwind" ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span className="truncate max-w-[100px]">{spacingInfo.tailwind}</span>
                </>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t.css}</span>
            <button
              onClick={() => copyToClipboard(spacingInfo.css, "css")}
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            >
              {copied === "css" ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span className="truncate max-w-[100px]">{spacingInfo.css}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SpacingPage() {
  const { language } = useLanguage()
  const t = getTranslation(language)
  
  const spacingInfos: SpacingInfo[] = Object.entries(mappedSpacing).map(([name, value]) => {
    const pixels = parseInt(value)
    const rem = (pixels / 16).toFixed(4).replace(/\.?0+$/, "")
    
    // Extract number from name (e.g., "spacing-8" -> "8")
    const numMatch = name.match(/\d+/)
    const num = numMatch ? numMatch[0] : "0"
    
    // Map to Tailwind spacing scale
    const tailwindMap: Record<string, string> = {
      "0": "0",
      "1": "0.5", // 4px = 0.5 * 8px
      "2": "1",   // 8px = 1 * 8px
      "4": "2",   // 16px = 2 * 8px
      "6": "3",   // 24px = 3 * 8px
      "8": "4",   // 32px = 4 * 8px
      "12": "6",  // 48px = 6 * 8px
      "16": "8",  // 64px = 8 * 8px
      "20": "10", // 80px = 10 * 8px
      "24": "12", // 96px = 12 * 8px
      "32": "16", // 128px = 16 * 8px
      "40": "20", // 160px = 20 * 8px
      "48": "24", // 192px = 24 * 8px
      "64": "32", // 256px = 32 * 8px
    }
    
    const tailwindValue = tailwindMap[num] || num
    
    return {
      name,
      value,
      pixels,
      rem: `${rem}rem`,
      tailwind: `p-${tailwindValue} m-${tailwindValue} gap-${tailwindValue}`,
      css: `var(--${name})`,
    }
  })

  // Sort by pixel value
  spacingInfos.sort((a, b) => a.pixels - b.pixels)

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="scroll-mt-20 text-4xl font-bold tracking-tight">
          {t.spacingTitle}
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          {t.spacingDescription}
        </p>
      </div>

      <div className="mb-8 p-4 rounded-lg border bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>{t.note}:</strong> {t.spacingNote}
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {spacingInfos.map((spacing) => (
          <SpacingCard key={spacing.name} spacingInfo={spacing} />
        ))}
      </div>
    </div>
  )
}

