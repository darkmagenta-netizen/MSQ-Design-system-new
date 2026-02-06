"use client"

import { Banner } from "@/components/ui/banner"
import { MobileLogo } from "@/components/ui/mobile-logo"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { Banner } from "@/components/ui/banner"`

const basicUsageCode = `<Banner
  variant="brand"
  title="KWT"
  icon={<MobileLogo logo="KWT" size={48} />}
/>`

const tocItems = [
  { title: "Installation", id: "installation" },
  { title: "Usage", id: "usage" },
  { title: "Variants", id: "variants" },
  { title: "API Reference", id: "api" },
]

const apiCode = `interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "mobile" | "modal" | "card"
  size?: "sm" | "md" | "lg"
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  gradient?: { from: string; to: string }
  backgroundImage?: string
  action?: {
    label: string
    onClick?: () => void
    variant?: "primary" | "secondary" | "outline"
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
    variant?: "primary" | "secondary" | "outline"
  }
  dismissible?: boolean
  onDismiss?: () => void
  children?: React.ReactNode
}`

export default function BannerPage() {
  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6 sm:mb-8">
          <h1 id="banner" className="scroll-mt-20 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Banner
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2">
            A Banner displays an important, succinct message, and provides actions for users to address (or dismiss the banner). It requires a user action to be dismissed.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The Banner component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Use Banner with a variant (brand, mobile, modal, card), optional title, description, icon, and actions. Copy the example below to get started.
          </p>
          <ComponentPreview>
            <Banner
              variant="brand"
              title="KWT"
              icon={<MobileLogo logo="KWT" size={48} />}
            />
          </ComponentPreview>
          <CodeBlock code={basicUsageCode} />
        </section>

        <section id="variants" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Variants
          </h2>
          <p className="text-muted-foreground mb-4">
            Copy any example below to use in your project. Each variant is suited for different contexts (brand hero, mobile promo, modal, card).
          </p>

          <ComponentPreview title="Brand Banner">
            <Banner
              variant="brand"
              title="KWT"
              icon={<MobileLogo logo="KWT" size={48} />}
            />
          </ComponentPreview>

          <ComponentPreview title="Mobile Promotional Banner">
            <div className="flex gap-4">
              <Banner
                variant="mobile"
                title="KWT Conversion Pre-Application"
                description="Only KWT conversion applicants can participate in the KWT version DeCT Super Save."
                icon={<MobileLogo logo="KWT" size={40} />}
                action={{
                  label: "Apply",
                  onClick: () => {},
                }}
                dismissible
              />
            </div>
          </ComponentPreview>

          <ComponentPreview title="Modal Banner">
            <Banner
              variant="modal"
              title="Let's trade MSQ daily!"
              description="Daily Trading Event - 24.5.29(Wed)~6.18(Tue)"
              icon={<MobileLogo logo="Dollar coin" size={64} />}
              action={{
                label: "Download File",
                onClick: () => {},
                variant: "outline",
              }}
              secondaryAction={{
                label: "Close",
                onClick: () => {},
                variant: "outline",
              }}
              dismissible
            />
          </ComponentPreview>

          <ComponentPreview title="Card Banner">
            <div className="flex flex-col gap-4">
              <Banner
                variant="card"
                title="World's first"
                description="Blockchain real economy based coin"
                icon={<MobileLogo logo="SuperSave circle" size={32} />}
                dismissible
              />
              <Banner
                variant="card"
                title="Venture Company Certification"
                description="Innovative Growth Type"
                icon={<MobileLogo logo="MSQP" size={32} />}
                action={{
                  label: "Learn More",
                  onClick: () => {},
                  variant: "outline",
                }}
                dismissible
              />
            </div>
          </ComponentPreview>
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            API Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            The Banner component displays a prominent message with optional icon, actions, and dismiss. It supports four variants and three sizes.
          </p>
          <div className="overflow-x-auto rounded-lg border mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium p-3">Prop</th>
                  <th className="text-left font-medium p-3">Type</th>
                  <th className="text-left font-medium p-3">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-3 font-mono text-xs">variant</td><td className="p-3 text-muted-foreground">&quot;brand&quot; | &quot;mobile&quot; | &quot;modal&quot; | &quot;card&quot;</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">size</td><td className="p-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">title</td><td className="p-3 text-muted-foreground">React.ReactNode</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">description</td><td className="p-3 text-muted-foreground">React.ReactNode</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">icon</td><td className="p-3 text-muted-foreground">React.ReactNode</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">action</td><td className="p-3 text-muted-foreground">&#123; label, onClick?, variant? &#125;</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">secondaryAction</td><td className="p-3 text-muted-foreground">&#123; label, onClick?, variant? &#125;</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">dismissible</td><td className="p-3 text-muted-foreground">boolean</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr><td className="p-3 font-mono text-xs">onDismiss</td><td className="p-3 text-muted-foreground">() =&gt; void</td><td className="p-3 text-muted-foreground">—</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm mb-2">Banner also accepts all standard <code className="text-xs bg-muted px-1 rounded">HTMLDivElement</code> attributes.</p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
