"use client"

import { useState } from "react"
import { mappedBorderRadius } from "@/tokens/mapped/borderRadius"
import { Copy, Check } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { getTranslation } from "@/lib/translations"

interface RadiusInfo {
  name: string
  value: string
  pixels: number
  rem: string
  tailwind: string
  css: string
}

function RadiusCard({ radiusInfo }: { radiusInfo: RadiusInfo }) {
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
          <h3 className="font-semibold text-sm">{radiusInfo.name}</h3>
          <div 
            className="h-16 w-16 rounded bg-primary/10 flex items-center justify-center border-2 border-primary/20"
            style={{ borderRadius: radiusInfo.value }}
          >
            <div
              className="bg-primary rounded"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: radiusInfo.value,
              }}
            />
          </div>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t.pixels}</span>
            <button
              onClick={() => copyToClipboard(radiusInfo.value, "pixels")}
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
                  <span>{radiusInfo.value}</span>
                </>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t.rem}</span>
            <button
              onClick={() => copyToClipboard(radiusInfo.rem, "rem")}
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
                  <span>{radiusInfo.rem}</span>
                </>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t.tailwind}</span>
            <button
              onClick={() => copyToClipboard(radiusInfo.tailwind, "tailwind")}
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
                  <span className="truncate max-w-[100px]">{radiusInfo.tailwind}</span>
                </>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t.css}</span>
            <button
              onClick={() => copyToClipboard(radiusInfo.css, "css")}
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
                  <span className="truncate max-w-[100px]">{radiusInfo.css}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RadiusPage() {
  const { language } = useLanguage()
  const t = getTranslation(language)
  
  const radiusInfos: RadiusInfo[] = Object.entries(mappedBorderRadius).map(([name, value]) => {
    // Extract pixels from value (e.g., "4px" -> 4, "9999px" -> 9999)
    const pixels = value === "9999px" ? 9999 : parseInt(value)
    const rem = pixels === 9999 ? "9999px" : (pixels / 16).toFixed(4).replace(/\.?0+$/, "")
    
    // Map to Tailwind radius classes
    const tailwindMap: Record<string, string> = {
      "radius-none": "rounded-none",
      "radius-sm": "rounded-sm",
      "radius-md": "rounded-md",
      "radius-lg": "rounded-lg",
      "radius-xl": "rounded-xl",
      "radius-2xl": "rounded-2xl",
      "radius-full": "rounded-full",
    }
    
    const tailwindClass = tailwindMap[name] || name
    
    return {
      name: name.replace("radius-", "").toUpperCase(),
      value,
      pixels,
      rem: pixels === 9999 ? "9999px" : `${rem}rem`,
      tailwind: tailwindClass,
      css: `var(--${name})`,
    }
  })

  // Sort by pixel value (except full which should be last)
  radiusInfos.sort((a, b) => {
    if (a.name === "FULL") return 1
    if (b.name === "FULL") return -1
    return a.pixels - b.pixels
  })

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="scroll-mt-20 text-4xl font-bold tracking-tight">
          {t.radiusTitle}
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          {t.radiusDescription}
        </p>
      </div>

      <div className="mb-8 p-4 rounded-lg border bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>{t.note}:</strong> {t.radiusNote}
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {radiusInfos.map((radius) => (
          <RadiusCard key={radius.name} radiusInfo={radius} />
        ))}
      </div>
    </div>
  )
}

