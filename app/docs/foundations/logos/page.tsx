"use client"

import * as React from "react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-provider"
import { getTranslation } from "@/lib/translations"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { MSQLogo } from "@/components/ui/msq-logo"
import { MobileLogo } from "@/components/ui/mobile-logo"
import { WalletLogo } from "@/components/ui/wallet-logo"
import { BankLogo } from "@/components/ui/bank-logo"
import { Download, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoAsset {
  name: string
  variant?: "horizontal" | "vertical" | "icon" | "app_icon"
  logo?: string
  shape?: "Circle" | "Square" | "Default"
  wallet?: string
  bank?: string
  description: string
  url: string
  width: number
  height: number
  type: "msq" | "mobile" | "wallet" | "bank"
}

// Local path for mobile logos: public/logos "Logo={name}, Shape={shape}.svg|png"
function getMobileLogoUrl(logo: string, shape: string): string {
  const fileName = `Logo=${logo}, Shape=${shape}`
  const ext = (logo === "MATIC" || logo === "MSQP") && (shape === "Circle" || shape === "Square") ? "png" : "svg"
  return `/logos/${encodeURIComponent(fileName)}.${ext}`
}

// Local path for bank logos: public/logos/Bank logos "state={name}.svg"
function getBankLogoUrl(bankName: string): string {
  return `/logos/${encodeURIComponent("Bank logos")}/state=${encodeURIComponent(bankName)}.svg`
}

// Local path for MSQ logos: public/logos "Type={type}, size={size}.svg"
const msqLogoFiles: Record<string, { file: string; width: number; height: number }> = {
  horizontal: { file: "Type=logo_horizontal, size=32", width: 32, height: 32 },
  vertical: { file: "Type=logo_vertical, size=80", width: 59, height: 80 },
  icon: { file: "Type=icon, size=24", width: 24, height: 24 },
  app_icon: { file: "Type=app_icon, size=110", width: 110, height: 110 },
}
function getMsqLogoUrl(variant: keyof typeof msqLogoFiles): string {
  const { file } = msqLogoFiles[variant]
  return `/logos/${encodeURIComponent(file)}.svg`
}

// Local path for wallet logos: public/logos "wallet={name}.svg"
function getWalletLogoUrl(wallet: string): string {
  return `/logos/wallet=${encodeURIComponent(wallet)}.svg`
}

const logoAssets: LogoAsset[] = [
  // MSQ Logos (local: public/logos "Type={type}, size={size}.svg")
  {
    name: "MSQ Logo Horizontal",
    variant: "horizontal",
    description: "Horizontal logo for headers and navigation",
    url: getMsqLogoUrl("horizontal"),
    width: 32,
    height: 32,
    type: "msq",
  },
  {
    name: "MSQ Logo Vertical",
    variant: "vertical",
    description: "Vertical logo for sidebars and vertical layouts",
    url: getMsqLogoUrl("vertical"),
    width: 59,
    height: 80,
    type: "msq",
  },
  {
    name: "MSQ Icon",
    variant: "icon",
    description: "Icon-only version for favicons and small spaces",
    url: getMsqLogoUrl("icon"),
    width: 24,
    height: 24,
    type: "msq",
  },
  {
    name: "MSQ App Icon",
    variant: "app_icon",
    description: "App icon for mobile applications",
    url: getMsqLogoUrl("app_icon"),
    width: 110,
    height: 110,
    type: "msq",
  },
  // Mobile Logos (local: public/logos "Logo={name}, Shape={shape}.svg|png")
  {
    name: "KWT Circle",
    logo: "KWT",
    shape: "Circle",
    description: "KWT token logo in circle shape",
    url: getMobileLogoUrl("KWT", "Circle"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "MSQ Circle",
    logo: "MSQ",
    shape: "Circle",
    description: "MSQ token logo in circle shape",
    url: getMobileLogoUrl("MSQ", "Circle"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "MSQP Circle",
    logo: "MSQP",
    shape: "Circle",
    description: "MSQP token logo in circle shape",
    url: getMobileLogoUrl("MSQP", "Circle"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "P2UP Circle",
    logo: "P2UP",
    shape: "Circle",
    description: "P2UP token logo in circle shape",
    url: getMobileLogoUrl("P2UP", "Circle"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "SuperSave Circle",
    logo: "SuperSave circle",
    shape: "Circle",
    description: "SuperSave logo in circle shape",
    url: getMobileLogoUrl("SuperSave circle", "Circle"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "Super Save Circle",
    logo: "Super Save",
    shape: "Circle",
    description: "Super Save logo in circle shape",
    url: getMobileLogoUrl("Super Save", "Circle"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "Dollar Coin Circle",
    logo: "Dollar coin",
    shape: "Circle",
    description: "Dollar coin logo in circle shape",
    url: getMobileLogoUrl("Dollar coin", "Circle"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "WON Circle",
    logo: "WON",
    shape: "Circle",
    description: "WON token logo in circle shape",
    url: getMobileLogoUrl("WON", "Circle"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "USDT Default",
    logo: "USDT",
    shape: "Default",
    description: "USDT token logo",
    url: getMobileLogoUrl("USDT", "Default"),
    width: 24,
    height: 24,
    type: "mobile",
  },
  {
    name: "MATIC Circle",
    logo: "MATIC",
    shape: "Circle",
    description: "MATIC token logo in circle shape",
    url: getMobileLogoUrl("MATIC", "Circle"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "MSQ Square",
    logo: "MSQ",
    shape: "Square",
    description: "MSQ token logo in square shape",
    url: getMobileLogoUrl("MSQ", "Square"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "MSQP Square",
    logo: "MSQP",
    shape: "Square",
    description: "MSQP token logo in square shape",
    url: getMobileLogoUrl("MSQP", "Square"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "P2UP Square",
    logo: "P2UP",
    shape: "Square",
    description: "P2UP token logo in square shape",
    url: getMobileLogoUrl("P2UP", "Square"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "SuperSave Square",
    logo: "SuperSave circle",
    shape: "Square",
    description: "SuperSave logo in square shape",
    url: getMobileLogoUrl("SuperSave circle", "Square"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  {
    name: "MATIC Square",
    logo: "MATIC",
    shape: "Square",
    description: "MATIC token logo in square shape",
    url: getMobileLogoUrl("MATIC", "Square"),
    width: 40,
    height: 40,
    type: "mobile",
  },
  // Wallet Logos (local: public/logos "wallet={name}.svg")
  {
    name: "MetaMask",
    wallet: "MetaMask",
    description: "MetaMask wallet logo",
    url: getWalletLogoUrl("MetaMask"),
    width: 212,
    height: 212,
    type: "wallet",
  },
  {
    name: "Trust Wallet",
    wallet: "Trust Wallet Token",
    description: "Trust Wallet logo",
    url: getWalletLogoUrl("Trust Wallet Token"),
    width: 24,
    height: 24,
    type: "wallet",
  },
  {
    name: "OKX Wallet",
    wallet: "OKX Wallet",
    description: "OKX Wallet logo",
    url: getWalletLogoUrl("OKX Wallet"),
    width: 24,
    height: 24,
    type: "wallet",
  },
  {
    name: "Uniswap Wallet",
    wallet: "Uniswap Wallet",
    description: "Uniswap Wallet logo",
    url: getWalletLogoUrl("Uniswap Wallet"),
    width: 24,
    height: 24,
    type: "wallet",
  },
]

// Bank logos from public/logos/Bank logos (state={name}.svg)
const bankLogoNames = [
  "Shinhan Bank",
  "Shinhan",
  "KB Kookmin Bank",
  "Woori Bank",
  "Hana Bank",
  "NH Nonghyup",
  "Kakao Bank",
  "KBank",
  "Toss Bank",
  "KDB",
  "IBK Industrial Bank",
  "Saemaul Geumgo",
  "SC제일은행",
  "HSBC",
  "hyundai card",
  "citi",
  "JP",
  "SBI",
  "BNP",
  "BOA",
  "DGB",
  "im bank",
  "bank logo",
  "우체국예금",
  "저축은행",
  "수협",
  "신협은행",
  "광주은행",
  "도이치뱅크",
  "산림조합중앙회",
  "중국은행",
  "중국공상은행",
  "중국건설은행",
] as const

const installationCode = `import { MSQLogo } from "@/components/ui/msq-logo"
import { MobileLogo } from "@/components/ui/mobile-logo"
import { WalletLogo } from "@/components/ui/wallet-logo"
import { BankLogo } from "@/components/ui/bank-logo"`

const basicUsageCode = `<MSQLogo variant="horizontal" />`

const variantsCode = `<MSQLogo variant="horizontal" />
<MSQLogo variant="vertical" />
<MSQLogo variant="icon" />
<MSQLogo variant="app_icon" />`

const mobileLogosCode = `<MobileLogo logo="MSQ" shape="Circle" />
<MobileLogo logo="MSQP" shape="Circle" />
<MobileLogo logo="P2UP" shape="Circle" />
<MobileLogo logo="MATIC" shape="Circle" />
<MobileLogo logo="MSQ" shape="Square" />
<MobileLogo logo="MSQP" shape="Square" />`

const walletLogosCode = `<WalletLogo wallet="MetaMask" />
<WalletLogo wallet="Trust Wallet Token" />
<WalletLogo wallet="OKX Wallet" />
<WalletLogo wallet="Uniswap Wallet" />`

const sizesCode = `<MSQLogo variant="horizontal" size={200} />
<MSQLogo variant="horizontal" size={120} />
<MSQLogo variant="horizontal" size={80} />`

const htmlCode = `<img src="/logos/msq-horizontal.svg" alt="MSQ Logo" width="145" height="32" />`

const tocItems = [
  { title: "Installation", id: "installation" },
  { title: "Usage", id: "usage" },
  { title: "MSQ Logos", id: "msq-logos" },
  { title: "Mobile Logos", id: "mobile-logos" },
  { title: "Bank Logos", id: "bank-logos" },
  { title: "Wallet Logos", id: "wallet-logos" },
  { title: "Sizes", id: "sizes" },
  { title: "Download", id: "download" },
  { title: "HTML Usage", id: "html" },
]

export default function LogosPage() {
  const { language } = useLanguage()
  const t = getTranslation(language)
  const [downloadedLogo, setDownloadedLogo] = useState<string | null>(null)

  const handleDownload = async (logo: LogoAsset) => {
    try {
      const response = await fetch(logo.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      const ext = logo.url.endsWith(".svg") ? "svg" : "png"
      a.download = `${logo.name.toLowerCase().replace(/\s+/g, "-")}.${ext}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      setDownloadedLogo(logo.name)
      setTimeout(() => setDownloadedLogo(null), 2000)
    } catch (error) {
      console.error("Failed to download logo:", error)
    }
  }

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6 sm:mb-8">
          <h1 id="logos" className="scroll-mt-20 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Logos
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2">
            MSQ brand logos and assets. Download logos in various formats and sizes for use in your projects.
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
                <MSQLogo variant="horizontal" size={120} />
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={basicUsageCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="msq-logos" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            MSQ Logos
          </h2>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {[
                    { variant: "horizontal" as const, label: "Horizontal" },
                    { variant: "vertical" as const, label: "Vertical" },
                    { variant: "icon" as const, label: "Icon" },
                    { variant: "app_icon" as const, label: "App Icon" },
                  ].map(({ variant, label }) => (
                    <div
                      key={variant}
                      className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg border border-border/50 bg-muted/30 min-h-[140px]"
                    >
                      <p className="text-sm text-muted-foreground shrink-0">{label}</p>
                      <div className="flex items-center justify-center min-h-[80px] w-full rounded-lg dark:bg-[var(--color-background-elevated)] dark:p-3">
                        <MSQLogo variant={variant} size={80} invertInDarkMode={variant !== "app_icon"} />
                      </div>
                    </div>
                  ))}
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={variantsCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="mobile-logos" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Mobile Logos
          </h2>
          <p className="text-muted-foreground mb-4">
            Token and currency logos available in Circle and Square shapes.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Circle Shape</p>
                    <div className="flex flex-wrap gap-4">
                      <MobileLogo logo="MSQ" shape="Circle" />
                      <MobileLogo logo="MSQP" shape="Circle" />
                      <MobileLogo logo="P2UP" shape="Circle" />
                      <MobileLogo logo="MATIC" shape="Circle" />
                      <MobileLogo logo="KWT" shape="Circle" />
                      <span className="inline-flex rounded-full dark:bg-[var(--color-logo-surface)] dark:p-0.5">
                        <MobileLogo logo="WON" shape="Circle" />
                      </span>
                      <MobileLogo logo="USDT" shape="Default" />
                      <MobileLogo logo="Dollar coin" shape="Circle" />
                      <MobileLogo logo="SuperSave circle" shape="Circle" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Square Shape</p>
                    <div className="flex flex-wrap gap-4">
                      <MobileLogo logo="MSQ" shape="Square" />
                      <MobileLogo logo="MSQP" shape="Square" />
                      <MobileLogo logo="P2UP" shape="Square" />
                      <MobileLogo logo="MATIC" shape="Square" />
                      <MobileLogo logo="SuperSave circle" shape="Square" />
                    </div>
                  </div>
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={mobileLogosCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="bank-logos" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Bank Logos
          </h2>
          <p className="text-muted-foreground mb-4">
            Bank logos from <code className="text-xs bg-muted px-1.5 py-0.5 rounded">public/logos/Bank logos</code> (state=Name.svg).
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-6">
                  {bankLogoNames.map((bank) => (
                    <div
                      key={bank}
                      className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg border border-border/50 bg-muted/30 min-h-[100px]"
                    >
                      <div className="flex items-center justify-center w-12 h-12 shrink-0 rounded-md bg-[var(--color-logo-surface)] p-1">
                        <BankLogo bank={bank} size={48} />
                      </div>
                      <span className="text-xs text-muted-foreground text-center line-clamp-2 leading-tight" title={bank}>
                        {bank}
                      </span>
                    </div>
                  ))}
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={`<BankLogo bank="Shinhan Bank" size={40} />
<BankLogo bank="KB Kookmin Bank" size={40} />
<BankLogo bank="Kakao Bank" size={40} />`} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="wallet-logos" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Wallet Logos
          </h2>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="flex flex-wrap gap-4 p-4 rounded-lg bg-[var(--color-logo-surface)]">
                  <WalletLogo wallet="MetaMask" size={32} />
                  <WalletLogo wallet="Trust Wallet Token" size={32} />
                  <WalletLogo wallet="OKX Wallet" size={32} />
                  <WalletLogo wallet="Uniswap Wallet" size={32} />
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={walletLogosCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="sizes" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Sizes
          </h2>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[200, 120, 80].map((size) => (
                    <div
                      key={size}
                      className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg border border-border/50 bg-muted/30 min-h-[120px]"
                    >
                      <p className="text-sm text-muted-foreground shrink-0">{size}px</p>
                      <div className="flex items-center justify-center w-full rounded-lg dark:bg-[var(--color-background-elevated)] dark:p-3">
                        <MSQLogo variant="horizontal" size={size} />
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
        </section>

        <section id="download" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Download Logos
          </h2>
          <p className="text-muted-foreground mb-6">
            Click the download button to save logos in PNG format. Logos are provided in their original resolution.
          </p>
          <div className="space-y-6">
            {/* MSQ Logos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">MSQ Logos</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {logoAssets.filter(logo => logo.type === "msq").map((logo) => (
                  <div
                    key={logo.name}
                    className="flex items-center justify-between p-4 border rounded-lg bg-background"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 rounded-lg dark:bg-[var(--color-background-elevated)] dark:p-2">
                        <MSQLogo
                          variant={logo.variant!}
                          size={logo.variant === "app_icon" ? 60 : logo.variant === "vertical" ? 40 : 80}
                          invertInDarkMode={logo.variant !== "app_icon"}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{logo.name}</h4>
                        <p className="text-xs text-muted-foreground">{logo.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {logo.width} × {logo.height}px
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(logo)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      )}
                    >
                      {downloadedLogo === logo.name ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Logos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Mobile Logos</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {logoAssets.filter(logo => logo.type === "mobile").map((logo) => (
                  <div
                    key={logo.name}
                    className="flex items-center justify-between p-4 border rounded-lg bg-background"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-[var(--color-logo-surface)] p-2">
                        <MobileLogo
                          logo={logo.logo as any}
                          shape={logo.shape as any}
                          size={40}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{logo.name}</h4>
                        <p className="text-xs text-muted-foreground">{logo.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {logo.width} × {logo.height}px
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(logo)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      )}
                    >
                      {downloadedLogo === logo.name ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Logos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Bank Logos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {bankLogoNames.map((bank) => (
                  <div
                    key={bank}
                    className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-background hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-md bg-[var(--color-logo-surface)] p-1">
                      <BankLogo bank={bank} size={40} />
                    </div>
                    <div className="w-full min-w-0 text-center">
                      <h4 className="font-medium text-sm truncate" title={bank}>
                        {bank}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate" title={`state=${bank}.svg`}>
                        <code className="bg-muted px-1 rounded text-[10px]">{`state=${bank}.svg`}</code>
                      </p>
                    </div>
                    <a
                      href={getBankLogoUrl(bank)}
                      download={`${bank.replace(/\s+/g, "-")}.svg`}
                      className={cn(
                        "flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-md text-xs font-medium transition-colors shrink-0",
                        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      )}
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Wallet Logos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Wallet Logos</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {logoAssets.filter(logo => logo.type === "wallet").map((logo) => (
                  <div
                    key={logo.name}
                    className="flex items-center justify-between p-4 border rounded-lg bg-background"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-[var(--color-logo-surface)] p-2">
                        <WalletLogo
                          wallet={logo.wallet as any}
                          size={logo.width === 212 ? 48 : 32}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{logo.name}</h4>
                        <p className="text-xs text-muted-foreground">{logo.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {logo.width} × {logo.height}px
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(logo)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      )}
                    >
                      {downloadedLogo === logo.name ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="html" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Using Logos in HTML
          </h2>
          <p className="text-muted-foreground mb-4">
            You can also use logos directly in HTML by referencing the image URL:
          </p>
          <CodeBlock code={htmlCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
