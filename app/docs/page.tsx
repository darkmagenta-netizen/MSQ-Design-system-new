"use client"

import Link from "next/link"
import { CodeBlock } from "@/components/docs/code-block"
import { useLanguage } from "@/lib/language-provider"
import { getTranslation } from "@/lib/translations"

const installationCode = `npm install
# or
yarn install
# or
pnpm install`

const importCode = `import { Button } from "@/components/ui/button"
import { SocialButton } from "@/components/ui/social-button"
import { LanguageButton } from "@/components/ui/language-button"`

export default function DocsPage() {
  const { language } = useLanguage()
  const t = getTranslation(language)

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="scroll-mt-20 text-4xl font-bold tracking-tight">
          {t.docsPageTitle}
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          {t.docsPageIntro}
        </p>
      </div>

      <section className="scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          {t.docsInstallation}
        </h2>
        <p className="text-muted-foreground mb-4">
          {t.docsInstallDescription}
        </p>
        <CodeBlock code={installationCode} />
        <p className="text-muted-foreground mt-4">
          {t.docsThenImport}
        </p>
        <CodeBlock code={importCode} />
      </section>

      <section className="scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          {t.docsQuickStart}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-2">
              {t.docsStep1}
            </h3>
            <CodeBlock code={`import { Button } from "@/components/ui/button"`} />
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-2">
              {t.docsStep2}
            </h3>
            <CodeBlock code={`<Button variant="primary">Click me</Button>`} />
          </div>
        </div>
      </section>

      <section className="scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          {t.docsComponentsSection}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/docs/components/button">
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="font-semibold mb-2">{t.button}</h3>
              <p className="text-sm text-muted-foreground">
                {t.docsButtonCardDesc}
              </p>
            </div>
          </Link>
          <Link href="/docs/components/social-button">
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="font-semibold mb-2">{t.socialButton}</h3>
              <p className="text-sm text-muted-foreground">
                {t.docsSocialButtonCardDesc}
              </p>
            </div>
          </Link>
          <Link href="/docs/components/language-button">
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="font-semibold mb-2">{t.languageButton}</h3>
              <p className="text-sm text-muted-foreground">
                {t.docsLanguageButtonCardDesc}
              </p>
            </div>
          </Link>
          <Link href="/docs/components/dropdown">
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="font-semibold mb-2">{t.dropdown}</h3>
              <p className="text-sm text-muted-foreground">
                {t.docsDropdownCardDesc}
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
