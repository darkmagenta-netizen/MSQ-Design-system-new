"use client"

import { CodeBlock } from "@/components/docs/code-block"
import { useLanguage } from "@/lib/language-provider"
import { getTranslation } from "@/lib/translations"

const gridSystemCode = `/* MSQ Grid System */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}`

const tailwindGridCode = `/* Using Tailwind CSS Grid Utilities */
<div className="container mx-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>`

const gridBreakpointsCode = `/* Breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large devices */`

export default function GridPage() {
  const { language } = useLanguage()
  const t = getTranslation(language)
  
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="scroll-mt-20 text-4xl font-bold tracking-tight">
          {t.gridTitle}
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          {t.gridDescription}
        </p>
      </div>

      <section className="scroll-mt-20 mb-12">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          {t.gridSystem}
        </h2>
        <p className="text-muted-foreground mb-4">
          {t.gridSystemDescription}
        </p>
        <CodeBlock code={gridSystemCode} />
      </section>

      <section className="scroll-mt-20 mb-12">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          {t.breakpoints}
        </h2>
        <p className="text-muted-foreground mb-4">
          {t.breakpointsDescription}
        </p>
        <CodeBlock code={gridBreakpointsCode} />
      </section>

      <section className="scroll-mt-20 mb-12">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          {t.usageWithTailwind}
        </h2>
        <p className="text-muted-foreground mb-4">
          {t.usageWithTailwindDescription}
        </p>
        <CodeBlock code={tailwindGridCode} />
      </section>

      <section className="scroll-mt-20 mb-12">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          {t.gridExamples}
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-2">
              {t.twelveColumnGrid}
            </h3>
            <div className="grid grid-cols-12 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="col-span-1 h-16 rounded bg-primary/10 flex items-center justify-center text-xs text-muted-foreground"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-2">
              {t.responsiveGrid}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded bg-primary/10 flex items-center justify-center text-sm text-muted-foreground"
                >
                  Column {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-2">
              {t.asymmetricGrid}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 h-24 rounded bg-primary/10 flex items-center justify-center text-sm text-muted-foreground">
                2/3 Width
              </div>
              <div className="h-24 rounded bg-primary/10 flex items-center justify-center text-sm text-muted-foreground">
                1/3 Width
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

