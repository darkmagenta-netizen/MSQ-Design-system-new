"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { getTranslation } from "@/lib/translations"

type TypographyStyle = {
  name: string
  fontSize: string
  lineHeight: string
  letterSpacing: string
  fontWeight: string
  fontFamily: string
  example: string
}

type TypographySystem = {
  title: string
  description: string
  fontFamily: string
  weights: { name: string; value: string }[]
  headings: TypographyStyle[]
  body: TypographyStyle[]
  display?: TypographyStyle[]
}

function TypographyCard({ style, system }: { style: TypographyStyle; system: TypographySystem }) {
  const [copied, setCopied] = useState(false)
  const { language } = useLanguage()
  const t = getTranslation(language)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const cssStyle = `font-family: ${style.fontFamily}; font-size: ${style.fontSize}; line-height: ${style.lineHeight}; letter-spacing: ${style.letterSpacing}; font-weight: ${style.fontWeight};`

  return (
    <div className="group relative border rounded-lg p-6 bg-background hover:border-border-strong transition-colors">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">{style.name}</h3>
          <button
            onClick={() => copyToClipboard(cssStyle)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-accent rounded"
            aria-label="Copy CSS"
          >
            {copied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
        <div
          className="border rounded p-4 bg-muted/30 min-h-[60px] flex items-center"
          style={{
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            fontWeight: style.fontWeight,
          }}
        >
          {style.example}
        </div>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{t.fontSize}</span>
          <span className="font-mono">{style.fontSize}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{t.lineHeight}</span>
          <span className="font-mono">{style.lineHeight}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{t.letterSpacing}</span>
          <span className="font-mono">{style.letterSpacing}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{t.fontWeight}</span>
          <span className="font-mono">{style.fontWeight}</span>
        </div>
      </div>
    </div>
  )
}

function TypographySystemSection({ system }: { system: TypographySystem }) {
  const { language } = useLanguage()
  const t = getTranslation(language)

  return (
    <section className="scroll-mt-20 mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">{system.title}</h2>
        <p className="text-lg text-muted-foreground mb-4">{system.description}</p>
        <div className="p-4 rounded-lg border bg-muted/50">
          <p className="text-sm font-medium mb-2">{t.fontFamily}: {system.fontFamily}</p>
          <div className="flex flex-wrap gap-2">
            {system.weights.map((weight) => (
              <span
                key={weight.value}
                className="px-2 py-1 rounded bg-background border text-xs font-mono"
              >
                {weight.name} ({weight.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      {system.display && system.display.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold tracking-tight mb-6">{t.display}</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {system.display.map((style) => (
              <TypographyCard key={style.name} style={style} system={system} />
            ))}
          </div>
        </div>
      )}

      <div className="mb-12">
        <h3 className="text-2xl font-semibold tracking-tight mb-6">{t.headings}</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {system.headings.map((style) => (
            <TypographyCard key={style.name} style={style} system={system} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold tracking-tight mb-6">{t.bodyText}</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {system.body.map((style) => (
            <TypographyCard key={style.name} style={style} system={system} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function TypographyPage() {
  const { language } = useLanguage()
  const t = getTranslation(language)

  const typographySystems: TypographySystem[] = [
    {
      title: t.englishMobileTypography,
      description: language === "eng" 
        ? "Typography system for the English version of the MSQ mobile app using Poppins font family."
        : "Poppins 글꼴 패밀리를 사용하는 MSQ 모바일 앱 영어 버전을 위한 타이포그래피 시스템.",
      fontFamily: "Poppins, sans-serif",
      weights: [
        { name: "Regular", value: "400" },
        { name: "Medium", value: "500" },
        { name: "Semibold", value: "600" },
        { name: "Bold", value: "700" },
      ],
      headings: [
        {
          name: "Heading 1",
          fontSize: "40px",
          lineHeight: "48px",
          letterSpacing: "-1.6px",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          example: "Title - H1",
        },
        {
          name: "Heading 2",
          fontSize: "36px",
          lineHeight: "40px",
          letterSpacing: "-1.28px",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          example: "Title - H2",
        },
        {
          name: "Heading 3",
          fontSize: "32px",
          lineHeight: "36px",
          letterSpacing: "-1.12px",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          example: "Title - H3",
        },
        {
          name: "Heading 4",
          fontSize: "28px",
          lineHeight: "32px",
          letterSpacing: "-0.96px",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          example: "Heading - H4",
        },
        {
          name: "Heading 5",
          fontSize: "24px",
          lineHeight: "28px",
          letterSpacing: "-0.8px",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          example: "Heading - H5",
        },
        {
          name: "Heading 6",
          fontSize: "20px",
          lineHeight: "20px",
          letterSpacing: "-0.64px",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          example: "Heading - H6",
        },
      ],
      body: [
        {
          name: "Body XLarge",
          fontSize: "18px",
          lineHeight: "28px",
          letterSpacing: "-0.09px",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          example: "Create a design playbook that outlines the department's expectations, best practices.",
        },
        {
          name: "Body Large",
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "-0.08px",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          example: "Create a design playbook that outlines the department's expectations, best practices.",
        },
        {
          name: "Body Medium",
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "-0.07px",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          example: "Create a design playbook that outlines the department's expectations, best practices.",
        },
        {
          name: "Body Small",
          fontSize: "14px",
          lineHeight: "18px",
          letterSpacing: "-0.06px",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          example: "Create a design playbook that outlines the department's expectations, best practices.",
        },
        {
          name: "Body XSmall",
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "0px",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          example: "Create a design playbook that outlines the department's expectations, best practices.",
        },
        {
          name: "Label Text",
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "-0.07px",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          example: "Label text",
        },
      ],
    },
    {
      title: t.koreanMobileTypography,
      description: language === "eng"
        ? "Typography system for the Korean version of the MSQ mobile app using Pretendard font family."
        : "Pretendard 글꼴 패밀리를 사용하는 MSQ 모바일 앱 한국어 버전을 위한 타이포그래피 시스템.",
      fontFamily: "Pretendard, sans-serif",
      weights: [
        { name: "Regular", value: "400" },
        { name: "Medium", value: "500" },
        { name: "Semibold", value: "600" },
        { name: "Bold", value: "700" },
      ],
      display: [
        {
          name: "Display Large",
          fontSize: "56px",
          lineHeight: "72px",
          letterSpacing: "-1.68px",
          fontWeight: "400",
          fontFamily: "Pretendard, sans-serif",
          example: "로렘 입숨 텍스트",
        },
        {
          name: "Display Small",
          fontSize: "40px",
          lineHeight: "52px",
          letterSpacing: "-0.8px",
          fontWeight: "400",
          fontFamily: "Pretendard, sans-serif",
          example: "로렘 입숨 텍스트",
        },
      ],
      headings: [
        {
          name: "Title / H1",
          fontSize: "32px",
          lineHeight: "40px",
          letterSpacing: "-0.64px",
          fontWeight: "400",
          fontFamily: "Pretendard, sans-serif",
          example: "로렘 입숨 텍스트",
        },
        {
          name: "Title / H2",
          fontSize: "28px",
          lineHeight: "36px",
          letterSpacing: "-0.56px",
          fontWeight: "400",
          fontFamily: "Pretendard, sans-serif",
          example: "로렘 입숨 텍스트",
        },
        {
          name: "Title / H3",
          fontSize: "24px",
          lineHeight: "32px",
          letterSpacing: "-0.48px",
          fontWeight: "400",
          fontFamily: "Pretendard, sans-serif",
          example: "로렘 입숨 텍스트",
        },
        {
          name: "Headings / H4",
          fontSize: "20px",
          lineHeight: "28px",
          letterSpacing: "-0.4px",
          fontWeight: "400",
          fontFamily: "Pretendard, sans-serif",
          example: "로렘 입숨 텍스트",
        },
        {
          name: "Headings / H5",
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "-0.32px",
          fontWeight: "400",
          fontFamily: "Pretendard, sans-serif",
          example: "로렘 입숨 텍스트",
        },
        {
          name: "Label / H6",
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "0.14px",
          fontWeight: "400",
          fontFamily: "Pretendard, sans-serif",
          example: "로렘 입숨 텍스트",
        },
      ],
      body: [
        {
          name: "Body / Large",
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "0.0057em",
          fontWeight: "400",
          fontFamily: "Pretendard, sans-serif",
          example: "로렘 입숨 텍스트",
        },
        {
          name: "Body / Medium",
          fontSize: "16px",
          lineHeight: "26px",
          letterSpacing: "0.0057em",
          fontWeight: "400",
          fontFamily: "Pretendard, sans-serif",
          example: "로렘 입숨 텍스트",
        },
        {
          name: "Body / Small",
          fontSize: "12px",
          lineHeight: "18px",
          letterSpacing: "0.0096em",
          fontWeight: "400",
          fontFamily: "Pretendard, sans-serif",
          example: "로렘 입숨 텍스트",
        },
      ],
    },
    {
      title: t.adminTypography,
      description: language === "eng"
        ? "Typography system for the MSQ admin app using Inter font family."
        : "Inter 글꼴 패밀리를 사용하는 MSQ 관리자 앱을 위한 타이포그래피 시스템.",
      fontFamily: "Inter, sans-serif",
      weights: [
        { name: "Regular", value: "400" },
        { name: "Medium", value: "500" },
        { name: "Semibold", value: "600" },
        { name: "Bold", value: "700" },
      ],
      headings: [
        {
          name: "Heading 1",
          fontSize: "32px",
          lineHeight: "36px",
          letterSpacing: "-0.64px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          example: "Heading H1",
        },
        {
          name: "Heading 2",
          fontSize: "28px",
          lineHeight: "32px",
          letterSpacing: "-0.56px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          example: "Heading H4",
        },
        {
          name: "Heading 3",
          fontSize: "24px",
          lineHeight: "28px",
          letterSpacing: "-0.48px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          example: "Heading H5",
        },
        {
          name: "Heading 4",
          fontSize: "20px",
          lineHeight: "20px",
          letterSpacing: "-0.4px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          example: "Heading H4",
        },
        {
          name: "Heading 5",
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "-0.32px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          example: "Heading H5",
        },
        {
          name: "Heading 6",
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "-0.32px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          example: "Heading H6",
        },
      ],
      body: [
        {
          name: "Body XLarge",
          fontSize: "18px",
          lineHeight: "28px",
          letterSpacing: "0.288px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          example: "Create a design playbook that outlines the department's expectations, best practices.",
        },
        {
          name: "Body Large",
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "0.256px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          example: "Create a design playbook that outlines the department's expectations, best practices.",
        },
        {
          name: "Body Medium",
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "0.224px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          example: "Create a design playbook that outlines the department's expectations, best practices.",
        },
        {
          name: "Body Small",
          fontSize: "14px",
          lineHeight: "18px",
          letterSpacing: "0.192px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          example: "Create a design playbook that outlines the department's expectations, best practices.",
        },
        {
          name: "Body XSmall",
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "0.16px",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          example: "Create a design playbook that outlines the department's expectations, best practices.",
        },
      ],
    },
  ]

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="scroll-mt-20 text-4xl font-bold tracking-tight">
          {t.typographyTitle}
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          {t.typographyDescription}
        </p>
      </div>

      <div className="mb-8 p-4 rounded-lg border bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>{t.note}:</strong> {language === "eng"
            ? "Hover over any typography card to copy the CSS class. Each system includes display text, headings, and body text styles with complete specifications."
            : "타이포그래피 카드에 마우스를 올려 CSS 클래스를 복사하세요. 각 시스템에는 완전한 사양을 가진 디스플레이 텍스트, 제목 및 본문 스타일이 포함됩니다."}
        </p>
      </div>

      {typographySystems.map((system) => (
        <TypographySystemSection key={system.title} system={system} />
      ))}
    </div>
  )
}

