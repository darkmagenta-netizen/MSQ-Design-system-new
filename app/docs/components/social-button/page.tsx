"use client"

import { SocialButton } from "@/components/ui/social-button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { SocialButton } from "@/components/ui/social-button"`

const basicUsageCode = `<SocialButton platform="google" theme="brand" />`

const brandThemeCode = `<SocialButton platform="google" theme="brand" />
<SocialButton platform="facebook" theme="brand" />
<SocialButton platform="apple" theme="brand" />
<SocialButton platform="twitter" theme="brand" />`

const colorThemeCode = `<SocialButton platform="google" theme="color" />
<SocialButton platform="facebook" theme="color" />
<SocialButton platform="apple" theme="color" />
<SocialButton platform="twitter" theme="color" />`

const iconOnlyCode = `<SocialButton platform="google" theme="brand" supportingText={false} />
<SocialButton platform="facebook" theme="brand" supportingText={false} />
<SocialButton platform="apple" theme="brand" supportingText={false} />
<SocialButton platform="twitter" theme="brand" supportingText={false} />`

const apiCode = `interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  platform?: "google" | "facebook" | "apple" | "twitter"
  theme?: "brand" | "color" | "gray"
  supportingText?: boolean
  asChild?: boolean
}`

const tocItems = [
  { title: "Installation", id: "installation" },
  { title: "Usage", id: "usage" },
  { title: "Examples", id: "examples" },
  { title: "API Reference", id: "api" },
]

export default function SocialButtonPage() {
  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
      <div className="mb-8">
        <h1 id="social-button" className="scroll-mt-20 text-4xl font-bold tracking-tight">Social Button</h1>
        <p className="text-lg text-muted-foreground">
          Social login buttons for Google, Facebook, Apple, and Twitter with multiple themes.
        </p>
      </div>

      <section id="installation" className="scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">Installation</h2>
        <p className="text-muted-foreground mb-4">
          The SocialButton component is part of the design system. Import it from the UI package.
        </p>
        <CodeBlock code={installationCode} />
      </section>

      <section id="usage" className="scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">Usage</h2>
        <p className="text-muted-foreground mb-4">
          Use SocialButton with platform (google, facebook, apple, twitter) and theme. Copy the example below to get started.
        </p>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <ComponentPreview>
              <SocialButton platform="google" theme="brand" />
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
            <h3 className="text-xl font-semibold tracking-tight mb-4">Brand Theme</h3>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <ComponentPreview>
                  <div className="flex flex-wrap gap-4">
                    <SocialButton platform="google" theme="brand" />
                    <SocialButton platform="facebook" theme="brand" />
                    <SocialButton platform="apple" theme="brand" />
                    <SocialButton platform="twitter" theme="brand" />
                  </div>
                </ComponentPreview>
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock code={brandThemeCode} />
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-4">Color Theme</h3>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <ComponentPreview>
                  <div className="flex flex-wrap gap-4">
                    <SocialButton platform="google" theme="color" />
                    <SocialButton platform="facebook" theme="color" />
                    <SocialButton platform="apple" theme="color" />
                    <SocialButton platform="twitter" theme="color" />
                  </div>
                </ComponentPreview>
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock code={colorThemeCode} />
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-4">Gray Theme</h3>
            <ComponentPreview>
              <div className="flex flex-wrap gap-4">
                <SocialButton platform="google" theme="gray" />
                <SocialButton platform="facebook" theme="gray" />
                <SocialButton platform="apple" theme="gray" />
                <SocialButton platform="twitter" theme="gray" />
              </div>
            </ComponentPreview>
          </div>

          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-4">Icon Only</h3>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <ComponentPreview>
                  <div className="flex flex-wrap gap-4">
                    <SocialButton platform="google" theme="brand" supportingText={false} />
                    <SocialButton platform="facebook" theme="brand" supportingText={false} />
                    <SocialButton platform="apple" theme="brand" supportingText={false} />
                    <SocialButton platform="twitter" theme="brand" supportingText={false} />
                  </div>
                </ComponentPreview>
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock code={iconOnlyCode} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section id="api" className="scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">API Reference</h2>
        <p className="text-muted-foreground mb-4">
          The SocialButton component displays a social login button (Google, Facebook, Apple, Twitter). It supports platform, theme, and supportingText. See the interface below for full prop details.
        </p>
        <CodeBlock code={apiCode} />
      </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}

