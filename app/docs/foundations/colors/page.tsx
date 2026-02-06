"use client"

import { useState } from "react"
import { mappedColors } from "@/tokens/mapped/colors"
import { hexToRgb, hexToHsl, formatRgb, formatHsl } from "@/lib/color-utils"
import { Copy, Check } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { getTranslation } from "@/lib/translations"

type ColorFormat = "hex" | "rgb" | "hsl" | "css" | "tailwind"

interface ColorInfo {
  name: string
  displayName: string
  hex: string
  rgb: string
  hsl: string
  css: string
  tailwind: string
}

interface ColorCategory {
  title: string
  description: string
  colors: ColorInfo[]
}

function ColorCard({ colorInfo }: { colorInfo: ColorInfo }) {
  const [copied, setCopied] = useState<string | null>(null)
  const { language } = useLanguage()
  const t = getTranslation(language)

  const copyToClipboard = (text: string, format: ColorFormat) => {
    navigator.clipboard.writeText(text)
    setCopied(format)
    setTimeout(() => setCopied(null), 2000)
  }

  const getContrastColor = (hex: string): string => {
    const rgb = hexToRgb(hex)
    if (!rgb) return "#000000"
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
    return brightness > 128 ? "#000000" : "#FFFFFF"
  }

  return (
    <div className="group relative min-w-0">
      <div
        className="h-20 w-full rounded-lg border shadow-sm transition-all hover:shadow-md"
        style={{ backgroundColor: colorInfo.hex }}
      >
        <div className="flex h-full items-center justify-center">
          <span
            className="text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100"
            style={{ color: getContrastColor(colorInfo.hex) }}
          >
            {colorInfo.displayName}
          </span>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <div className="flex items-center justify-between gap-2 text-xs min-w-0">
          <span className="text-muted-foreground shrink-0">HEX</span>
          <button
            onClick={() => copyToClipboard(colorInfo.hex, "hex")}
            className="flex items-center gap-1 text-foreground hover:text-primary transition-colors min-w-0"
          >
            {copied === "hex" ? (
              <>
                <Check className="h-3 w-3 shrink-0" />
                <span className="shrink-0">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 shrink-0" />
                <span className="font-mono truncate">{colorInfo.hex}</span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs min-w-0">
          <span className="text-muted-foreground shrink-0">RGB</span>
          <button
            onClick={() => copyToClipboard(`rgb(${colorInfo.rgb})`, "rgb")}
            className="flex items-center gap-1 text-foreground hover:text-primary transition-colors min-w-0"
          >
            {copied === "rgb" ? (
              <>
                <Check className="h-3 w-3 shrink-0" />
                <span className="shrink-0">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 shrink-0" />
                <span className="font-mono truncate">{colorInfo.rgb}</span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs min-w-0">
          <span className="text-muted-foreground shrink-0">HSL</span>
          <button
            onClick={() => copyToClipboard(`hsl(${colorInfo.hsl})`, "hsl")}
            className="flex items-center gap-1 text-foreground hover:text-primary transition-colors min-w-0"
          >
            {copied === "hsl" ? (
              <>
                <Check className="h-3 w-3 shrink-0" />
                <span className="shrink-0">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 shrink-0" />
                <span className="font-mono truncate">{colorInfo.hsl}</span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs min-w-0">
          <span className="text-muted-foreground shrink-0">CSS</span>
          <button
            onClick={() => copyToClipboard(colorInfo.css, "css")}
            className="flex items-center gap-1 text-foreground hover:text-primary transition-colors min-w-0 flex-1"
          >
            {copied === "css" ? (
              <>
                <Check className="h-3 w-3 shrink-0" />
                <span className="shrink-0">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 shrink-0" />
                <span className="font-mono text-[10px] truncate min-w-0">{colorInfo.css}</span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs min-w-0">
          <span className="text-muted-foreground shrink-0">Token</span>
          <button
            onClick={() => copyToClipboard(colorInfo.name, "tailwind")}
            className="flex items-center gap-1 text-foreground hover:text-primary transition-colors min-w-0 flex-1"
          >
            {copied === "tailwind" ? (
              <>
                <Check className="h-3 w-3 shrink-0" />
                <span className="shrink-0">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 shrink-0" />
                <span className="font-mono text-[10px] truncate min-w-0">{colorInfo.name}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function ColorCategorySection({ category }: { category: ColorCategory }) {
  return (
    <section className="scroll-mt-20 mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">{category.title}</h2>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6">
        {category.colors.map((color) => (
          <ColorCard key={color.name} colorInfo={color} />
        ))}
      </div>
    </section>
  )
}

// Helper function to resolve color value
function resolveColorValue(tokenValue: string): string {
  if (tokenValue.startsWith('#')) {
    return tokenValue
  }
  if (tokenValue in mappedColors) {
    return mappedColors[tokenValue as keyof typeof mappedColors]
  }
  return tokenValue
}

export default function ColorsPage() {
  const { language } = useLanguage()
  const t = getTranslation(language)
  
  // Organize colors by scale - Blue first, then others
  const categories: ColorCategory[] = []

  // Primary Blue Colors - Show first
  const primaryBlueColors: ColorInfo[] = [
    'blue-50', 'blue-100', 'blue-200', 'blue-300', 'blue-400', 
    'blue-500', 'blue-600', 'blue-700', 'blue-800', 'blue-900', 'blue-950'
  ]
    .filter(key => key in mappedColors)
    .map(key => {
      const hex = resolveColorValue(mappedColors[key as keyof typeof mappedColors])
      const rgb = hexToRgb(hex)
      const hsl = hexToHsl(hex)
      
      return {
        name: key,
        displayName: key.replace('blue-', ''),
        hex,
        rgb: formatRgb(rgb),
        hsl: formatHsl(hsl),
        css: `var(--color-${key})`,
        tailwind: key,
      }
    })

  if (primaryBlueColors.length > 0) {
    categories.push({
      title: t.primaryBlue,
      description: language === "eng"
        ? "Primary brand colors used for main actions and highlights."
        : "주요 작업 및 강조 표시에 사용되는 주요 브랜드 색상.",
      colors: primaryBlueColors,
    })
  }

  // Gray Colors
  const grayColors: ColorInfo[] = [
    'gray-50', 'gray-100', 'gray-200', 'gray-300', 'gray-400', 
    'gray-500', 'gray-600', 'gray-700', 'gray-800', 'gray-900', 'gray-950'
  ]
    .filter(key => key in mappedColors)
    .map(key => {
      const hex = resolveColorValue(mappedColors[key as keyof typeof mappedColors])
      const rgb = hexToRgb(hex)
      const hsl = hexToHsl(hex)
      
      return {
        name: key,
        displayName: key.replace('gray-', ''),
        hex,
        rgb: formatRgb(rgb),
        hsl: formatHsl(hsl),
        css: `var(--color-${key})`,
        tailwind: key,
      }
    })

  if (grayColors.length > 0) {
    categories.push({
      title: t.gray,
      description: language === "eng"
        ? "Neutral colors used for text, backgrounds, borders, and dividers."
        : "텍스트, 배경, 테두리 및 구분선에 사용되는 중립 색상.",
      colors: grayColors,
    })
  }

  // Error Red Colors (only for errors, not a full scale)
  const errorRedColors: ColorInfo[] = [
    'red-50', 'red-100', 'red-200', 'red-300', 'red-400', 
    'red-500', 'red-600', 'red-700', 'red-800', 'red-900', 'red-950'
  ]
    .filter(key => key in mappedColors)
    .map(key => {
      const hex = resolveColorValue(mappedColors[key as keyof typeof mappedColors])
      const rgb = hexToRgb(hex)
      const hsl = hexToHsl(hex)
      
      return {
        name: key,
        displayName: key.replace('red-', ''),
        hex,
        rgb: formatRgb(rgb),
        hsl: formatHsl(hsl),
        css: `var(--color-${key})`,
        tailwind: key,
      }
    })

  if (errorRedColors.length > 0) {
    categories.push({
      title: t.errorRed,
      description: language === "eng"
        ? "Colors used for error states and destructive actions."
        : "오류 상태 및 파괴적 작업에 사용되는 색상.",
      colors: errorRedColors,
    })
  }

  // Base Colors
  const baseColors: ColorInfo[] = ['white', 'black']
    .filter(key => key in mappedColors)
    .map(key => {
      const hex = resolveColorValue(mappedColors[key as keyof typeof mappedColors])
      const rgb = hexToRgb(hex)
      const hsl = hexToHsl(hex)
      
      return {
        name: key,
        displayName: key.charAt(0).toUpperCase() + key.slice(1),
        hex,
        rgb: formatRgb(rgb),
        hsl: formatHsl(hsl),
        css: `var(--color-${key})`,
        tailwind: key,
      }
    })

  if (baseColors.length > 0) {
    categories.push({
      title: t.baseColors,
      description: language === "eng"
        ? "Base white and black colors."
        : "기본 흰색 및 검은색 색상.",
      colors: baseColors,
    })
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="scroll-mt-20 text-4xl font-bold tracking-tight">
          {t.colorsTitle}
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          {t.colorsDescription}
        </p>
      </div>

      <div className="mb-8 p-4 rounded-lg border bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>{t.note}:</strong> {language === "eng"
            ? "Click on any color value to copy it to your clipboard. Colors are organized by scale and displayed in all common formats."
            : "색상 값을 클릭하여 클립보드에 복사하세요. 색상은 스케일별로 구성되며 모든 일반 형식으로 표시됩니다."}
        </p>
      </div>

      {categories.map((category) => (
        <ColorCategorySection key={category.title} category={category} />
      ))}
    </div>
  )
}
