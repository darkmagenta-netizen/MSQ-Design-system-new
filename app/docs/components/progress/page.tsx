"use client"

import { Progress } from "@/components/ui/progress"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { Progress } from "@/components/ui/progress"`

const basicUsageCode = `<Progress value={30} />`

const tocItems = [
  { title: "Installation", id: "installation" },
  { title: "Usage", id: "usage" },
  { title: "Variants", id: "variants" },
  { title: "API Reference", id: "api" },
]

const apiCode = `interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  label?: string
  labelPlacement?: "none" | "right" | "top" | "floating-top" | "floating-bottom"
  variant?: "solid" | "inset"
  showMinDot?: boolean
}`

const values = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

export default function ProgressPage() {
  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6 sm:mb-8">
          <h1 id="progress" className="scroll-mt-20 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Progress
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2">
            Progress bars communicate the status of a task or process.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The Progress component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Use Progress with a value (0–100) and optional label placement and variant. Copy the example below to get started.
          </p>
          <ComponentPreview>
            <div className="w-[320px] max-w-full">
              <Progress value={30} />
            </div>
          </ComponentPreview>
          <CodeBlock code={basicUsageCode} />
        </section>

        <section id="variants" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Variants
          </h2>
          <p className="text-muted-foreground mb-4">
            Copy any example below to use in your project. Progress supports label placements (none, right, top, floating) and solid/inset variants.
          </p>

          <ComponentPreview title="Label placements (matches Figma examples)">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">Label: none (inset)</p>
                {values.map((v) => (
                  <Progress key={`none-${v}`} value={v} labelPlacement="none" variant="inset" />
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">Label: right</p>
                {values.map((v) => (
                  <Progress key={`right-${v}`} value={v} labelPlacement="right" variant="solid" />
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">Label: top</p>
                {values.map((v) => (
                  <Progress key={`top-${v}`} value={v} labelPlacement="top" variant="solid" />
                ))}
              </div>
            </div>
          </ComponentPreview>

          <ComponentPreview title="Floating labels">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <p className="text-xs text-muted-foreground">Top floating</p>
                {[0, 10, 30, 60, 90, 100].map((v) => (
                  <div key={`ft-${v}`} className="pt-12">
                    <Progress value={v} labelPlacement="floating-top" variant="solid" />
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <p className="text-xs text-muted-foreground">Bottom floating</p>
                {[0, 10, 30, 60, 90, 100].map((v) => (
                  <div key={`fb-${v}`} className="pb-12">
                    <Progress value={v} labelPlacement="floating-bottom" variant="solid" />
                  </div>
                ))}
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            API Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            The Progress component displays the status of a task or process. It supports value, max, label placement, and variant.
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
                <tr className="border-b"><td className="p-3 font-mono text-xs">value</td><td className="p-3 text-muted-foreground">number</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">max</td><td className="p-3 text-muted-foreground">number</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">label</td><td className="p-3 text-muted-foreground">string</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">labelPlacement</td><td className="p-3 text-muted-foreground">&quot;none&quot; | &quot;right&quot; | &quot;top&quot; | &quot;floating-top&quot; | &quot;floating-bottom&quot;</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">variant</td><td className="p-3 text-muted-foreground">&quot;solid&quot; | &quot;inset&quot;</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr><td className="p-3 font-mono text-xs">showMinDot</td><td className="p-3 text-muted-foreground">boolean</td><td className="p-3 text-muted-foreground">—</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm mb-2">Progress also accepts all standard <code className="text-xs bg-muted px-1 rounded">HTMLDivElement</code> attributes.</p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}

