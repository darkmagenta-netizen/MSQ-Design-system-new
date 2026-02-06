"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LanguageButton } from "@/components/ui/language-button"
import { SocialButton } from "@/components/ui/social-button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"

// Button Variants Code
const buttonInstallationCode = `import { Button } from "@/components/ui/button"`

const buttonBasicUsageCode = `<Button>Button</Button>`

const buttonVariantsCode = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="error">Error</Button>`

const buttonSizesCode = `<Button size="xl">Extra Large</Button>
<Button size="lg">Large</Button>
<Button size="md">Medium</Button>
<Button size="sm">Small</Button>`

const buttonWithIconCode = `<Button>
  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
  Add Item
</Button>`

const buttonApiCode = `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "error" | "error-secondary" | "error-outline" | "grey-text" | "grey-disabled" | "color-text" | "disabled" | "disabled-outline" | "ghost"
  size?: "xl" | "lg" | "md" | "sm" | "icon" | "icon-xl" | "icon-lg" | "icon-md" | "icon-sm"
  radius?: "default" | "full" | "none"
  asChild?: boolean
}`

// Language Button Code
const languageButtonInstallationCode = `import { LanguageButton } from "@/components/ui/language-button"`

const languageButtonBasicUsageCode = `import { useState } from "react"

const [language, setLanguage] = useState<"eng" | "kor" | "viet">("eng")

<LanguageButton 
  variant="default"
  language={language}
  selectedLanguage={language}
  onLanguageChange={setLanguage}
/>`

const languageButtonVariantsCode = `<LanguageButton variant="default" />
<LanguageButton variant="solid" />
<LanguageButton variant="expanded" isExpanded={true} />`

const languageButtonApiCode = `interface LanguageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "solid" | "expanded"
  size?: "default" | "expanded"
  language?: "eng" | "kor" | "viet"
  isExpanded?: boolean
  selectedLanguage?: "eng" | "kor" | "viet"
  onLanguageChange?: (language: "eng" | "kor" | "viet") => void
}`

// Social Button Code
const socialButtonInstallationCode = `import { SocialButton } from "@/components/ui/social-button"`

const socialButtonBasicUsageCode = `<SocialButton platform="google" theme="brand" />`

const socialButtonBrandThemeCode = `<SocialButton platform="google" theme="brand" />
<SocialButton platform="facebook" theme="brand" />
<SocialButton platform="apple" theme="brand" />
<SocialButton platform="twitter" theme="brand" />`

const socialButtonColorThemeCode = `<SocialButton platform="google" theme="color" />
<SocialButton platform="facebook" theme="color" />
<SocialButton platform="apple" theme="color" />
<SocialButton platform="twitter" theme="color" />`

const socialButtonIconOnlyCode = `<SocialButton platform="google" theme="brand" supportingText={false} />
<SocialButton platform="facebook" theme="brand" supportingText={false} />
<SocialButton platform="apple" theme="brand" supportingText={false} />
<SocialButton platform="twitter" theme="brand" supportingText={false} />`

const socialButtonApiCode = `interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  platform?: "google" | "facebook" | "apple" | "twitter"
  theme?: "brand" | "color" | "gray"
  supportingText?: boolean
  asChild?: boolean
}`

const tocItems = [
  { title: "Button Variants", id: "button-variants" },
  { title: "Language Buttons", id: "language-buttons" },
  { title: "Social Buttons", id: "social-buttons" },
]

export default function ButtonsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<"eng" | "kor" | "viet">("eng")

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
      <div className="mb-6 sm:mb-8">
          <h1 id="buttons" className="scroll-mt-20 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Buttons
          </h1>
        <p className="text-base sm:text-lg text-muted-foreground mt-2">
            Button components for various use cases including standard buttons, language selectors, and social login buttons.
          </p>
        </div>

        <Tabs defaultValue="button-variants" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="button-variants">Button Variants</TabsTrigger>
            <TabsTrigger value="language-buttons">Language Buttons</TabsTrigger>
            <TabsTrigger value="social-buttons">Social Buttons</TabsTrigger>
          </TabsList>

          {/* Button Variants Tab */}
          <TabsContent value="button-variants" className="space-y-8">
            <section id="button-variants" className="scroll-mt-20">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
                  Button Variants
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
      </div>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Installation</h3>
                  <p className="text-muted-foreground mb-4">
                    The Button component is part of the design system. Import it from the UI package.
                  </p>
                  <CodeBlock code={buttonInstallationCode} />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Usage</h3>
                  <p className="text-muted-foreground mb-4">
                    Use Button with variant and size. Copy the example below to get started.
                  </p>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <ComponentPreview>
              <Button>Button</Button>
            </ComponentPreview>
          </TabsContent>
          <TabsContent value="code">
                      <CodeBlock code={buttonBasicUsageCode} />
          </TabsContent>
        </Tabs>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Examples</h3>
        
        <div className="space-y-6 sm:space-y-8">
          <div>
                      <h4 className="text-base sm:text-lg font-semibold tracking-tight mb-3 sm:mb-4">Variants</h4>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <ComponentPreview>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="error">Error</Button>
                    <Button variant="error-secondary">Error Secondary</Button>
                    <Button variant="error-outline">Error Outline</Button>
                    <Button variant="grey-text">Grey Text</Button>
                    <Button variant="color-text">Color Text</Button>
                  </div>
                </ComponentPreview>
              </TabsContent>
              <TabsContent value="code">
                          <CodeBlock code={buttonVariantsCode} />
              </TabsContent>
            </Tabs>
          </div>

          <div>
                      <h4 className="text-base sm:text-lg font-semibold tracking-tight mb-3 sm:mb-4">Sizes</h4>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <ComponentPreview>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="xl">Extra Large</Button>
                    <Button size="lg">Large</Button>
                    <Button size="md">Medium</Button>
                    <Button size="sm">Small</Button>
                  </div>
                </ComponentPreview>
              </TabsContent>
              <TabsContent value="code">
                          <CodeBlock code={buttonSizesCode} />
              </TabsContent>
            </Tabs>
          </div>

          <div>
                      <h4 className="text-base sm:text-lg font-semibold tracking-tight mb-3 sm:mb-4">With Icon</h4>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <ComponentPreview>
                  <div className="flex flex-wrap gap-4">
                    <Button>
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Item
                    </Button>
                    <Button variant="outline">
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Remove
                    </Button>
                  </div>
                </ComponentPreview>
              </TabsContent>
              <TabsContent value="code">
                          <CodeBlock code={buttonWithIconCode} />
              </TabsContent>
            </Tabs>
          </div>

          <div>
                      <h4 className="text-base sm:text-lg font-semibold tracking-tight mb-3 sm:mb-4">States</h4>
            <ComponentPreview>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button disabled variant="disabled">Disabled</Button>
                <Button variant="disabled-outline">Disabled Outline</Button>
                <Button variant="grey-disabled">Grey Disabled</Button>
              </div>
            </ComponentPreview>
          </div>

          <div>
                      <h4 className="text-base sm:text-lg font-semibold tracking-tight mb-3 sm:mb-4">Border Radius</h4>
            <ComponentPreview>
              <div className="flex flex-wrap gap-4">
                <Button radius="default">Default Radius</Button>
                <Button radius="full">Full Radius</Button>
                <Button radius="none">No Radius</Button>
              </div>
            </ComponentPreview>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">API Reference</h3>
                  <p className="text-muted-foreground mb-4">
                    The Button component supports variant, size, and radius. See the interface below for full prop details.
                  </p>
                  <CodeBlock code={buttonApiCode} />
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Language Buttons Tab */}
          <TabsContent value="language-buttons" className="space-y-8">
            <section id="language-buttons" className="scroll-mt-20">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
                  Language Buttons
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Language selector button with expandable dropdown for multiple language options.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Installation</h3>
                  <p className="text-muted-foreground mb-4">
                    The LanguageButton component is part of the design system. Import it from the UI package.
                  </p>
                  <CodeBlock code={languageButtonInstallationCode} />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Usage</h3>
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
                      <CodeBlock code={languageButtonBasicUsageCode} />
                    </TabsContent>
                  </Tabs>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Examples</h3>
                  
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold tracking-tight mb-3 sm:mb-4">Variants</h4>
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
                          <CodeBlock code={languageButtonVariantsCode} />
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-semibold tracking-tight mb-3 sm:mb-4">Expanded</h4>
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
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">API Reference</h3>
                  <p className="text-muted-foreground mb-4">
                    The LanguageButton component supports variant, language, selectedLanguage, and onLanguageChange. See the interface below for full prop details.
                  </p>
                  <CodeBlock code={languageButtonApiCode} />
          </div>
        </div>
      </section>
          </TabsContent>

          {/* Social Buttons Tab */}
          <TabsContent value="social-buttons" className="space-y-8">
            <section id="social-buttons" className="scroll-mt-20">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
                  Social Buttons
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Social login buttons for Google, Facebook, Apple, and Twitter with multiple themes.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Installation</h3>
                  <p className="text-muted-foreground mb-4">
                    The SocialButton component is part of the design system. Import it from the UI package.
                  </p>
                  <CodeBlock code={socialButtonInstallationCode} />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Usage</h3>
                  <p className="text-muted-foreground mb-4">
                    Use SocialButton with platform and theme. Copy the example below to get started.
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
                      <CodeBlock code={socialButtonBasicUsageCode} />
                    </TabsContent>
                  </Tabs>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Examples</h3>
                  
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold tracking-tight mb-3 sm:mb-4">Brand Theme</h4>
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
                          <CodeBlock code={socialButtonBrandThemeCode} />
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-semibold tracking-tight mb-3 sm:mb-4">Color Theme</h4>
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
                          <CodeBlock code={socialButtonColorThemeCode} />
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-semibold tracking-tight mb-3 sm:mb-4">Gray Theme</h4>
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
                      <h4 className="text-base sm:text-lg font-semibold tracking-tight mb-3 sm:mb-4">Icon Only</h4>
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
                          <CodeBlock code={socialButtonIconOnlyCode} />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">API Reference</h3>
                  <p className="text-muted-foreground mb-4">
                    The SocialButton component supports platform, theme, and supportingText. See the interface below for full prop details.
                  </p>
                  <CodeBlock code={socialButtonApiCode} />
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
