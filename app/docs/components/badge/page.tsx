"use client"

import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { Badge } from "@/components/ui/badge"`

const basicUsageCode = `// Default: Medium size, Filled Bold variant
// Pending: bg #ededed, text #3e414c
<Badge status="pending">Pending</Badge>

// Applied: bg #174fdf, text #f6f7f9
<Badge status="applied">Applied</Badge>

// Approved: bg #008042, text #f6f7f9
<Badge status="approved">Approved</Badge>

// Warning: bg #db8400, text #f6f7f9
<Badge status="warning">Warning</Badge>

// Declined: bg #c00, text #f6f7f9
<Badge status="declined">Declined</Badge>`

const statusesCode = `// Pending: bg #ededed, text #3e414c
<Badge status="pending">Pending</Badge>

// Applied: bg #174fdf, text #f6f7f9
<Badge status="applied">Applied</Badge>

// Approved: bg #008042, text #f6f7f9
<Badge status="approved">Approved</Badge>

// Warning: bg #db8400, text #f6f7f9
<Badge status="warning">Warning</Badge>

// Declined: bg #c00, text #f6f7f9
<Badge status="declined">Declined</Badge>`

const sizesCode = `// Small: 24px height, 12px font, 18px line-height
<Badge status="applied" size="sm">Small</Badge>

// Medium: 26px height, 12px font, 18px line-height
<Badge status="applied" size="md">Medium</Badge>

// Large: 28px height, 14px font, 18px line-height
<Badge status="applied" size="lg">Large</Badge>

// Extra Large: 32px height, 14px font, 18px line-height
<Badge status="applied" size="xl">Extra Large</Badge>`

const variantsCode = `// Filled Bold: bg #174fdf, text #f6f7f9
<Badge status="applied" variant="filled-bold">Filled Bold</Badge>

// Filled Light: bg #e8edff, text #174fdf, border #e8edff
<Badge status="applied" variant="filled-light">Filled Light</Badge>

// Outline: bg transparent, text #174fdf, border #174fdf
<Badge status="applied" variant="outline">Outline</Badge>`

const allVariantsCode = `// Pending - Filled Bold: bg #ededed, text #3e414c
// Pending - Filled Light: bg #ededed, text #545766, border #dbdee3
// Pending - Outline: bg transparent, text #545766, border #dbdee3

// Small (24px h, 12px font, 18px line-height)
<Badge status="pending" size="sm" variant="filled-bold">Pending</Badge>
<Badge status="pending" size="sm" variant="filled-light">Pending</Badge>
<Badge status="pending" size="sm" variant="outline">Pending</Badge>

// Medium (26px h, 12px font, 18px line-height)
<Badge status="pending" size="md" variant="filled-bold">Pending</Badge>
<Badge status="pending" size="md" variant="filled-light">Pending</Badge>
<Badge status="pending" size="md" variant="outline">Pending</Badge>

// Large (28px h, 14px font, 18px line-height)
<Badge status="pending" size="lg" variant="filled-bold">Pending</Badge>
<Badge status="pending" size="lg" variant="filled-light">Pending</Badge>
<Badge status="pending" size="lg" variant="outline">Pending</Badge>

// Extra Large (32px h, 14px font, 18px line-height)
<Badge status="pending" size="xl" variant="filled-bold">Pending</Badge>
<Badge status="pending" size="xl" variant="filled-light">Pending</Badge>
<Badge status="pending" size="xl" variant="outline">Pending</Badge>

// Applied - Filled Bold: bg #174fdf, text #f6f7f9
// Applied - Filled Light: bg #e8edff, text #174fdf, border #e8edff
// Applied - Outline: bg transparent, text #174fdf, border #174fdf

<Badge status="applied" size="sm" variant="filled-bold">Applied</Badge>
<Badge status="applied" size="sm" variant="filled-light">Applied</Badge>
<Badge status="applied" size="sm" variant="outline">Applied</Badge>
<Badge status="applied" size="md" variant="filled-bold">Applied</Badge>
<Badge status="applied" size="md" variant="filled-light">Applied</Badge>
<Badge status="applied" size="md" variant="outline">Applied</Badge>
<Badge status="applied" size="lg" variant="filled-bold">Applied</Badge>
<Badge status="applied" size="lg" variant="filled-light">Applied</Badge>
<Badge status="applied" size="lg" variant="outline">Applied</Badge>
<Badge status="applied" size="xl" variant="filled-bold">Applied</Badge>
<Badge status="applied" size="xl" variant="filled-light">Applied</Badge>
<Badge status="applied" size="xl" variant="outline">Applied</Badge>

// Approved - Filled Bold: bg #008042, text #f6f7f9
// Approved - Filled Light: bg #e6f5ed, text #008042, border #e6f5ed
// Approved - Outline: bg transparent, text #008042, border #008042

<Badge status="approved" size="sm" variant="filled-bold">Approved</Badge>
<Badge status="approved" size="sm" variant="filled-light">Approved</Badge>
<Badge status="approved" size="sm" variant="outline">Approved</Badge>
<Badge status="approved" size="md" variant="filled-bold">Approved</Badge>
<Badge status="approved" size="md" variant="filled-light">Approved</Badge>
<Badge status="approved" size="md" variant="outline">Approved</Badge>
<Badge status="approved" size="lg" variant="filled-bold">Approved</Badge>
<Badge status="approved" size="lg" variant="filled-light">Approved</Badge>
<Badge status="approved" size="lg" variant="outline">Approved</Badge>
<Badge status="approved" size="xl" variant="filled-bold">Approved</Badge>
<Badge status="approved" size="xl" variant="filled-light">Approved</Badge>
<Badge status="approved" size="xl" variant="outline">Approved</Badge>

// Warning - Filled Bold: bg #db8400, text #f6f7f9
// Warning - Filled Light: bg #fdebc3, text #db8400, border #fdebc3
// Warning - Outline: bg transparent, text #db8400, border #db8400

<Badge status="warning" size="sm" variant="filled-bold">Warning</Badge>
<Badge status="warning" size="sm" variant="filled-light">Warning</Badge>
<Badge status="warning" size="sm" variant="outline">Warning</Badge>
<Badge status="warning" size="md" variant="filled-bold">Warning</Badge>
<Badge status="warning" size="md" variant="filled-light">Warning</Badge>
<Badge status="warning" size="md" variant="outline">Warning</Badge>
<Badge status="warning" size="lg" variant="filled-bold">Warning</Badge>
<Badge status="warning" size="lg" variant="filled-light">Warning</Badge>
<Badge status="warning" size="lg" variant="outline">Warning</Badge>
<Badge status="warning" size="xl" variant="filled-bold">Warning</Badge>
<Badge status="warning" size="xl" variant="filled-light">Warning</Badge>
<Badge status="warning" size="xl" variant="outline">Warning</Badge>

// Declined - Filled Bold: bg #c00, text #f6f7f9
// Declined - Filled Light: bg #ffe6e6, text #c00, border #ffe6e6
// Declined - Outline: bg transparent, text #c00, border #c00

<Badge status="declined" size="sm" variant="filled-bold">Declined</Badge>
<Badge status="declined" size="sm" variant="filled-light">Declined</Badge>
<Badge status="declined" size="sm" variant="outline">Declined</Badge>
<Badge status="declined" size="md" variant="filled-bold">Declined</Badge>
<Badge status="declined" size="md" variant="filled-light">Declined</Badge>
<Badge status="declined" size="md" variant="outline">Declined</Badge>
<Badge status="declined" size="lg" variant="filled-bold">Declined</Badge>
<Badge status="declined" size="lg" variant="filled-light">Declined</Badge>
<Badge status="declined" size="lg" variant="outline">Declined</Badge>
<Badge status="declined" size="xl" variant="filled-bold">Declined</Badge>
<Badge status="declined" size="xl" variant="filled-light">Declined</Badge>
<Badge status="declined" size="xl" variant="outline">Declined</Badge>`

const iconOnlyCode = `<Badge status="pending" iconOnly />
<Badge status="applied" iconOnly />
<Badge status="approved" iconOnly />
<Badge status="warning" iconOnly />
<Badge status="declined" iconOnly />`

const customLabelCode = `<Badge status="pending" label="Custom Label" />
<Badge status="applied" label="In Progress" />
<Badge status="approved" label="Completed" />`

const apiCode = `interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Badge status/variant
   * @default "pending"
   */
  status?: "pending" | "applied" | "approved" | "warning" | "declined"
  
  /**
   * Badge size
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl"
  
  /**
   * Badge variant/style
   * @default "filled-bold"
   */
  variant?: "filled-bold" | "filled-light" | "outline"
  
  /**
   * Badge label text. If not provided, uses default label based on status.
   */
  label?: string
  
  /**
   * Optional icon to display. If provided, shows icon-only badge.
   */
  icon?: React.ReactNode
  
  /**
   * Whether to show as icon-only badge
   */
  iconOnly?: boolean
}`

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "statuses", title: "Statuses" },
  { id: "sizes", title: "Sizes" },
  { id: "variants", title: "Variants" },
  { id: "examples", title: "Examples" },
  { id: "api", title: "API Reference" },
]

export default function BadgePage() {
  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
            Badge
          </h1>
          <p className="text-muted-foreground text-lg">
            Badge components for displaying status indicators with labels like Pending, Applied, Approved, Warning, and Declined.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The Badge component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Use Badge with a status (pending, applied, approved, warning, declined) and optional size and variant. Copy the example below to get started.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="flex flex-wrap gap-2">
                  <Badge status="pending" />
                  <Badge status="applied" />
                  <Badge status="approved" />
                  <Badge status="warning" />
                  <Badge status="declined" />
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={basicUsageCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="statuses" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Statuses
          </h2>
          <p className="text-muted-foreground mb-4">
            Badges support five status types with specific labels: Pending (neutral), Applied (primary), Approved (success), Warning, and Declined (error).
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="flex flex-wrap gap-2">
                  <Badge status="pending" />
                  <Badge status="applied" />
                  <Badge status="approved" />
                  <Badge status="warning" />
                  <Badge status="declined" />
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={statusesCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="sizes" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Sizes
          </h2>
          <p className="text-muted-foreground mb-4">
            Badges come in four sizes: small (24px), medium (26px), large (28px), and extra-large (32px).
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge status="applied" size="sm">Small</Badge>
                  <Badge status="applied" size="md">Medium</Badge>
                  <Badge status="applied" size="lg">Large</Badge>
                  <Badge status="applied" size="xl">Extra Large</Badge>
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={sizesCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="variants" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Variants
          </h2>
          <p className="text-muted-foreground mb-4">
            Badges support three variants: filled-bold (solid colors), filled-light (lighter backgrounds), and outline (transparent with border).
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="flex flex-wrap gap-2">
                  <Badge status="applied" variant="filled-bold">Filled Bold</Badge>
                  <Badge status="applied" variant="filled-light">Filled Light</Badge>
                  <Badge status="applied" variant="outline">Outline</Badge>
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={variantsCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="examples" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Examples
          </h2>
          <p className="text-muted-foreground mb-6">
            Copy any example below to use in your project. Each shows a common pattern (statuses, sizes, icon-only, custom labels).
          </p>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">All Variants</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="space-y-8">
                      {/* Organize by Variant Type */}
                      {[
                        { variant: "filled-bold" as const, label: "Filled Bold", description: "Solid background with white text" },
                        { variant: "filled-light" as const, label: "Filled Light", description: "Light background with colored text" },
                        { variant: "outline" as const, label: "Outline", description: "Transparent with colored border" },
                      ].map(({ variant, label, description }) => (
                        <div key={variant} className="space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold mb-1">{label}</h4>
                            <p className="text-xs text-muted-foreground">{description}</p>
                          </div>
                          
                          {/* Table for this variant */}
                          <div className="overflow-x-auto">
                            <div className="min-w-[600px]">
                              {/* Header */}
                              <div className="grid grid-cols-6 gap-3 mb-2 pb-2 border-b">
                                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</div>
                                <div className="text-xs font-semibold text-muted-foreground text-center">Small</div>
                                <div className="text-xs font-semibold text-muted-foreground text-center">Medium</div>
                                <div className="text-xs font-semibold text-muted-foreground text-center">Large</div>
                                <div className="text-xs font-semibold text-muted-foreground text-center">XL</div>
                              </div>

                              {/* Status rows */}
                              {[
                                { status: "pending" as const, label: "Pending" },
                                { status: "applied" as const, label: "Applied" },
                                { status: "approved" as const, label: "Approved" },
                                { status: "warning" as const, label: "Warning" },
                                { status: "declined" as const, label: "Declined" },
                              ].map(({ status, label }) => (
                                <div key={status} className="grid grid-cols-6 gap-3 py-2 border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                                  <div className="flex items-center">
                                    <span className="text-sm font-medium">{label}</span>
                                  </div>
                                  {(["sm", "md", "lg", "xl"] as const).map((size) => (
                                    <div key={size} className="flex items-center justify-center">
                                      <Badge status={status} size={size} variant={variant} />
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={allVariantsCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-1">Icon Only</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Use <code className="text-xs bg-muted px-1 rounded">iconOnly</code> for status indicators without text.
              </p>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="flex flex-wrap gap-2">
                      <Badge status="pending" iconOnly />
                      <Badge status="applied" iconOnly />
                      <Badge status="approved" iconOnly />
                      <Badge status="warning" iconOnly />
                      <Badge status="declined" iconOnly />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={iconOnlyCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-1">Custom Labels</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Override the default label with the <code className="text-xs bg-muted px-1 rounded">label</code> prop.
              </p>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="flex flex-wrap gap-2">
                      <Badge status="pending" label="Custom Label" />
                      <Badge status="applied" label="In Progress" />
                      <Badge status="approved" label="Completed" />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={customLabelCode} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            API Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            The Badge component displays a status indicator with optional label and icon. It supports five statuses, four sizes, and three variants.
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
                <tr className="border-b"><td className="p-3 font-mono text-xs">status</td><td className="p-3 text-muted-foreground">&quot;pending&quot; | &quot;applied&quot; | &quot;approved&quot; | &quot;warning&quot; | &quot;declined&quot;</td><td className="p-3 text-muted-foreground">&quot;pending&quot;</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">size</td><td className="p-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot;</td><td className="p-3 text-muted-foreground">&quot;md&quot;</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">variant</td><td className="p-3 text-muted-foreground">&quot;filled-bold&quot; | &quot;filled-light&quot; | &quot;outline&quot;</td><td className="p-3 text-muted-foreground">&quot;filled-bold&quot;</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">label</td><td className="p-3 text-muted-foreground">string</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">icon</td><td className="p-3 text-muted-foreground">React.ReactNode</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr><td className="p-3 font-mono text-xs">iconOnly</td><td className="p-3 text-muted-foreground">boolean</td><td className="p-3 text-muted-foreground">—</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm mb-2">Badge also accepts all standard <code className="text-xs bg-muted px-1 rounded">HTMLDivElement</code> attributes.</p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
