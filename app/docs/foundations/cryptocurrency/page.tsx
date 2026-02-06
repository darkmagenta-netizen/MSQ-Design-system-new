"use client"

import * as React from "react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-provider"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { CryptoLogo, CryptoType, CryptoSize, CryptoShape, CryptoTheme } from "@/components/ui/crypto-logo"
import { Download } from "lucide-react"

const installationCode = `import { CryptoLogo } from "@/components/ui/crypto-logo"`

const basicUsageCode = `// Basic cryptocurrency logo
<CryptoLogo crypto="BTC" size="md" />

// With different shapes and themes
<CryptoLogo crypto="BTC" size="lg" shape="Square" theme="Light" />`

const sizesCode = `// All available sizes
<div className="flex items-center gap-4">
  <CryptoLogo crypto="BTC" size="xl" /> {/* 56px */}
  <CryptoLogo crypto="BTC" size="lg" /> {/* 48px */}
  <CryptoLogo crypto="BTC" size="md" /> {/* 40px */}
  <CryptoLogo crypto="BTC" size="sm" /> {/* 32px */}
</div>`

const shapesCode = `// Circle and Square shapes
<div className="flex items-center gap-4">
  <CryptoLogo crypto="BTC" size="lg" shape="Circle" />
  <CryptoLogo crypto="BTC" size="lg" shape="Square" />
</div>`

const themesCode = `// Colored and Light themes
<div className="flex items-center gap-4">
  <CryptoLogo crypto="BTC" size="lg" theme="Colored" />
  <CryptoLogo crypto="BTC" size="lg" theme="Light" />
</div>`

const allCryptosCode = `// All available cryptocurrencies
<div className="flex flex-wrap gap-4">
  <CryptoLogo crypto="BTC" size="lg" />
  <CryptoLogo crypto="MATIC" size="lg" />
  <CryptoLogo crypto="SHIB" size="lg" />
  <CryptoLogo crypto="USDT" size="lg" />
  <CryptoLogo crypto="KRW" size="lg" />
  <CryptoLogo crypto="USDC" size="lg" />
  <CryptoLogo crypto="MSQ" size="lg" />
</div>`

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "cryptocurrencies", title: "Cryptocurrencies" },
  { id: "downloads", title: "Download SVGs" },
  { id: "variants", title: "Variants" },
  { id: "all-variants", title: "All Variants" },
  { id: "api", title: "API Reference" },
]

// Logo file prefix per crypto (KRW uses "won")
const cryptoFilePrefix: Record<CryptoType, string> = {
  BTC: "btc",
  MATIC: "matic",
  SHIB: "shib",
  USDT: "usdt",
  KRW: "won",
  USDC: "usdc",
  MSQ: "msq",
}
const logoVariants = [
  { suffix: "circle", label: "Colored Circle" },
  { suffix: "square", label: "Colored Square" },
  { suffix: "white-circle", label: "Light Circle" },
  { suffix: "white-square", label: "Light Square" },
]

const cryptocurrencies: Array<{
  type: CryptoType
  name: string
  description: string
}> = [
  { type: "BTC", name: "Bitcoin", description: "The original cryptocurrency" },
  { type: "MATIC", name: "Polygon", description: "Ethereum scaling solution" },
  { type: "SHIB", name: "Shiba Inu", description: "Meme cryptocurrency" },
  { type: "USDT", name: "Tether", description: "USD-pegged stablecoin" },
  { type: "KRW", name: "Korean Won", description: "Korean currency" },
  { type: "USDC", name: "USD Coin", description: "USD-pegged stablecoin" },
  { type: "MSQ", name: "MSquare Market", description: "MSQ platform token" },
]

const sizes: Array<{ size: CryptoSize; label: string; pixels: string }> = [
  { size: "xl", label: "X-Large", pixels: "56px" },
  { size: "lg", label: "Large", pixels: "48px" },
  { size: "md", label: "Medium", pixels: "40px" },
  { size: "sm", label: "Small", pixels: "32px" },
]

export default function CryptocurrencyPage() {
  const { language } = useLanguage()
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoType>("BTC")
  const [expandedCryptos, setExpandedCryptos] = useState<Set<CryptoType>>(new Set())

  const toggleCrypto = (crypto: CryptoType) => {
    const newExpanded = new Set(expandedCryptos)
    if (newExpanded.has(crypto)) {
      newExpanded.delete(crypto)
    } else {
      newExpanded.add(crypto)
    }
    setExpandedCryptos(newExpanded)
  }

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
            Cryptocurrency Logos
          </h1>
          <p className="text-muted-foreground text-lg">
            A collection of cryptocurrency logos with multiple sizes, shapes, and themes. Perfect for displaying crypto assets in your application.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="flex items-center gap-4">
                  <CryptoLogo crypto="BTC" size="lg" />
                  <CryptoLogo crypto="MATIC" size="lg" shape="Square" theme="Light" />
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={basicUsageCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="cryptocurrencies" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Cryptocurrencies
          </h2>
          <p className="text-muted-foreground mb-6">
            All available cryptocurrency logos in the design system.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cryptocurrencies.map((crypto) => (
              <div
                key={crypto.type}
                className="flex items-center gap-4 p-4 border rounded-lg bg-background"
              >
                <CryptoLogo crypto={crypto.type} size="lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{crypto.name}</h3>
                  <p className="text-xs text-muted-foreground">{crypto.description}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{crypto.type}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="downloads" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Download SVGs
          </h2>
          <p className="text-muted-foreground mb-4">
            Download the cryptocurrency logo SVGs from <code className="text-sm bg-muted px-1.5 py-0.5 rounded">public/logos</code>. Each logo has four variants: Colored Circle, Colored Square, Light Circle, Light Square.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex flex-wrap gap-2">
              {cryptocurrencies.map((c) => {
                const prefix = cryptoFilePrefix[c.type]
                return logoVariants.map((v) => {
                  const filename = `${prefix}-${v.suffix}.svg`
                  const href = `/logos/${filename}`
                  return (
                    <a
                      key={`${c.type}-${v.suffix}`}
                      href={href}
                      download={filename}
                      className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      <Download className="h-4 w-4 shrink-0" />
                      {filename}
                    </a>
                  )
                })
              })}
            </div>
          </div>
        </section>

        <section id="variants" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Variants
          </h2>
          <p className="text-muted-foreground mb-4">
            Explore all available sizes, shapes, and themes for cryptocurrency logos.
          </p>
          <Tabs defaultValue="sizes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sizes">Sizes</TabsTrigger>
              <TabsTrigger value="shapes">Shapes</TabsTrigger>
              <TabsTrigger value="themes">Themes</TabsTrigger>
            </TabsList>
            <TabsContent value="sizes" className="mt-4">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="flex items-center gap-6">
                      {sizes.map(({ size, label, pixels }) => (
                        <div key={size} className="flex flex-col items-center gap-2">
                          <CryptoLogo crypto="BTC" size={size} />
                          <div className="text-center">
                            <p className="text-xs font-medium">{label}</p>
                            <p className="text-xs text-muted-foreground">{pixels}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={sizesCode} />
                </TabsContent>
              </Tabs>
            </TabsContent>
            <TabsContent value="shapes" className="mt-4">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <CryptoLogo crypto="BTC" size="lg" shape="Circle" />
                        <p className="text-xs font-medium">Circle</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <CryptoLogo crypto="BTC" size="lg" shape="Square" />
                        <p className="text-xs font-medium">Square</p>
                      </div>
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={shapesCode} />
                </TabsContent>
              </Tabs>
            </TabsContent>
            <TabsContent value="themes" className="mt-4">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <CryptoLogo crypto="BTC" size="lg" theme="Colored" />
                        <p className="text-xs font-medium">Colored</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <CryptoLogo crypto="BTC" size="lg" theme="Light" />
                        <p className="text-xs font-medium">Light</p>
                      </div>
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={themesCode} />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </section>

        <section id="all-variants" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            All Variants
          </h2>
          <p className="text-muted-foreground mb-4">
            Complete showcase of all cryptocurrency logos. Click on a cryptocurrency to view all variants.
          </p>
          
          <div className="space-y-2">
            {cryptocurrencies.map((crypto) => {
              const isExpanded = expandedCryptos.has(crypto.type)
              return (
                <div key={crypto.type} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCrypto(crypto.type)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CryptoLogo crypto={crypto.type} size="md" />
                      <div className="text-left">
                        <h3 className="font-semibold text-sm">{crypto.name}</h3>
                        <p className="text-xs text-muted-foreground font-mono">{crypto.type}</p>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isExpanded && (
                    <div className="p-4 pt-0 border-t bg-muted/20">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Colored Theme */}
                        <div>
                          <h4 className="text-sm font-medium mb-3">Colored Theme</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-2">Circle</p>
                              <div className="flex items-center gap-3">
                                {sizes.map(({ size, pixels }) => (
                                  <div key={size} className="flex flex-col items-center gap-1">
                                    <CryptoLogo crypto={crypto.type} size={size} shape="Circle" theme="Colored" />
                                    <p className="text-[10px] text-muted-foreground">{pixels}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-2">Square</p>
                              <div className="flex items-center gap-3">
                                {sizes.map(({ size, pixels }) => (
                                  <div key={size} className="flex flex-col items-center gap-1">
                                    <CryptoLogo crypto={crypto.type} size={size} shape="Square" theme="Colored" />
                                    <p className="text-[10px] text-muted-foreground">{pixels}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Light Theme */}
                        <div>
                          <h4 className="text-sm font-medium mb-3">Light Theme</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-2">Circle</p>
                              <div className="flex items-center gap-3">
                                {sizes.map(({ size, pixels }) => (
                                  <div key={size} className="flex flex-col items-center gap-1">
                                    <CryptoLogo crypto={crypto.type} size={size} shape="Circle" theme="Light" />
                                    <p className="text-[10px] text-muted-foreground">{pixels}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-2">Square</p>
                              <div className="flex items-center gap-3">
                                {sizes.map(({ size, pixels }) => (
                                  <div key={size} className="flex flex-col items-center gap-1">
                                    <CryptoLogo crypto={crypto.type} size={size} shape="Square" theme="Light" />
                                    <p className="text-[10px] text-muted-foreground">{pixels}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            API Reference
          </h2>
          <CodeBlock code={`interface CryptoLogoProps {
  /**
   * Cryptocurrency type
   */
  crypto: "BTC" | "MATIC" | "SHIB" | "USDT" | "KRW" | "USDC" | "MSQ"
  
  /**
   * Size of the logo
   * @default "md"
   */
  size?: "xl" | "lg" | "md" | "sm" | number
  
  /**
   * Shape of the container
   * @default "Circle"
   */
  shape?: "Circle" | "Square"
  
  /**
   * Theme variant
   * @default "Colored"
   */
  theme?: "Colored" | "Light"
  
  /**
   * Additional className
   */
  className?: string
}`} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
