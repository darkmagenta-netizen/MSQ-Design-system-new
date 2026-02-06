"use client"

import { LanguageButton } from "@/components/ui/language-button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { useState } from "react"

const installationCode = `import { LanguageButton } from "@/components/ui/language-button"`

const basicUsageCode = `import { useState } from "react"

const [language, setLanguage] = useState<"eng" | "kor" | "viet">("eng")

<LanguageButton 
  variant="default"
  language={language}
  selectedLanguage={language}
  onLanguageChange={setLanguage}
/>`

const variantsCode = `<LanguageButton variant="default" />
<LanguageButton variant="solid" />
<LanguageButton variant="expanded" isExpanded={true} />`

const apiCode = `interface LanguageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "solid" | "expanded"
  size?: "default" | "expanded"
  language?: "eng" | "kor" | "viet"
  isExpanded?: boolean
  selectedLanguage?: "eng" | "kor" | "viet"
  onLanguageChange?: (language: "eng" | "kor" | "viet") => void
}`

const tocItems = [
  { title: "Installation", id: "installation" },
  { title: "Usage", id: "usage" },
  { title: "Examples", id: "examples" },
  { title: "API Reference", id: "api" },
]

export default function LanguageButtonPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<"eng" | "kor" | "viet">("eng")

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
      <div className="mb-8">
        <h1 id="language-button" className="scroll-mt-20 text-4xl font-bold tracking-tight">Language Button</h1>
        <p className="text-lg text-muted-foreground">
          Language selector button with expandable dropdown for multiple language options.
        </p>
      </div>

      <section id="installation" className="scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">Installation</h2>
        <p className="text-muted-foreground mb-4">
          The LanguageButton component is part of the design system. Import it from the UI package.
        </p>
        <CodeBlock code={installationCode} />
      </section>

      <section id="usage" className="scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">Usage</h2>
        <p className="text-muted-foreground mb-4">
          Use LanguageButton with language, selectedLanguage, and onLanguageChange. Copy the example below to get started.
        </p>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <ComponentPreview>
              <LanguageButton 
                variant="default"
                language={selectedLanguage}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
            </ComponentPreview>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock code={basicUsageCode} />
          </TabsContent>
        </Tabs>
      </section>

      <section id="examples" className="scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-4">Variants</h3>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <ComponentPreview>
                  <div className="flex flex-wrap gap-4">
                    <LanguageButton 
                      variant="default"
                      language={selectedLanguage}
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={setSelectedLanguage}
                    />
                    <LanguageButton 
                      variant="solid"
                      language={selectedLanguage}
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={setSelectedLanguage}
                    />
                  </div>
                </ComponentPreview>
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock code={variantsCode} />
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-4">Expanded</h3>
            <ComponentPreview>
              <LanguageButton 
                variant="expanded"
                language={selectedLanguage}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                isExpanded={true}
              />
            </ComponentPreview>
          </div>
        </div>
      </section>

      <section id="api" className="scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">API Reference</h2>
        <p className="text-muted-foreground mb-4">
          The LanguageButton component displays a language selector (eng, kor, viet). It supports variant, language, selectedLanguage, and onLanguageChange. See the interface below for full prop details.
        </p>
        <CodeBlock code={apiCode} />
      </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}

