"use client"

import { Tooltip } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { Tooltip } from "@/components/ui/tooltip"`

const basicUsageCode = `<Tooltip content="This is a tooltip">
  <Button variant="primary">Hover me</Button>
</Tooltip>`

const withSupportingTextCode = `<Tooltip
  content="This is a tooltip"
  supportingText="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
  side="top"
  align="center"
  arrow
>
  <Button variant="outline">Hover me</Button>
</Tooltip>`

const tocItems = [
  { title: "Installation", id: "installation" },
  { title: "Usage", id: "usage" },
  { title: "Examples", id: "examples" },
  { title: "API Reference", id: "api" },
]

const apiCode = `interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  content: React.ReactNode
  supportingText?: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  arrow?: boolean
  delayDuration?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  asChild?: boolean
  children: React.ReactElement
}`

const supportingText =
  "Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."

export default function TooltipPage() {
  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6 sm:mb-8">
          <h1 id="tooltip" className="scroll-mt-20 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Tooltip
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2">
            Tooltips display informative text when users hover over, focus on, or tap an element.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The Tooltip component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Wrap a trigger element with Tooltip and set content. Copy the example below to get started.
          </p>
          <ComponentPreview>
            <Tooltip content="This is a tooltip">
              <Button variant="primary">Hover me</Button>
            </Tooltip>
          </ComponentPreview>
          <CodeBlock code={basicUsageCode} />
        </section>

        <section id="examples" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Examples
          </h2>
          <p className="text-muted-foreground mb-4">
            Copy any example below to use in your project. Tooltip supports side, align, arrow, and optional supporting text.
          </p>

          <ComponentPreview title="Without supporting text">
            <div className="flex flex-wrap items-center gap-4">
              <Tooltip content="This is a tooltip" arrow={false} side="top">
                <Button variant="outline" size="sm">
                  Arrow none
                </Button>
              </Tooltip>
              <Tooltip content="This is a tooltip" side="top" align="center" arrow>
                <Button variant="outline" size="sm">
                  Bottom center
                </Button>
              </Tooltip>
              <Tooltip content="This is a tooltip" side="top" align="start" arrow>
                <Button variant="outline" size="sm">
                  Bottom left
                </Button>
              </Tooltip>
              <Tooltip content="This is a tooltip" side="top" align="end" arrow>
                <Button variant="outline" size="sm">
                  Bottom right
                </Button>
              </Tooltip>
              <Tooltip content="This is a tooltip" side="bottom" align="center" arrow>
                <Button variant="outline" size="sm">
                  Top center
                </Button>
              </Tooltip>
              <Tooltip content="This is a tooltip" side="right" arrow>
                <Button variant="outline" size="sm">
                  Arrow left
                </Button>
              </Tooltip>
              <Tooltip content="This is a tooltip" side="left" arrow>
                <Button variant="outline" size="sm">
                  Arrow right
                </Button>
              </Tooltip>
            </div>
          </ComponentPreview>

          <ComponentPreview title="With supporting text">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <Tooltip content="This is a tooltip" supportingText={supportingText} arrow={false} side="top">
                  <Button variant="outline">Arrow none</Button>
                </Tooltip>
                <Tooltip content="This is a tooltip" supportingText={supportingText} side="top" align="center" arrow>
                  <Button variant="outline">Bottom center</Button>
                </Tooltip>
                <Tooltip content="This is a tooltip" supportingText={supportingText} side="bottom" align="center" arrow>
                  <Button variant="outline">Top center</Button>
                </Tooltip>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Tooltip content="This is a tooltip" supportingText={supportingText} side="top" align="start" arrow>
                  <Button variant="outline">Bottom left</Button>
                </Tooltip>
                <Tooltip content="This is a tooltip" supportingText={supportingText} side="top" align="end" arrow>
                  <Button variant="outline">Bottom right</Button>
                </Tooltip>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Tooltip content="This is a tooltip" supportingText={supportingText} side="right" arrow>
                  <Button variant="outline">Arrow left</Button>
                </Tooltip>
                <Tooltip content="This is a tooltip" supportingText={supportingText} side="left" arrow>
                  <Button variant="outline">Arrow right</Button>
                </Tooltip>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock code={withSupportingTextCode} />
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            API Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            The Tooltip component displays informative text on hover, focus, or tap. It supports content, supporting text, side, align, and arrow.
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
                <tr className="border-b"><td className="p-3 font-mono text-xs">content</td><td className="p-3 text-muted-foreground">React.ReactNode</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">supportingText</td><td className="p-3 text-muted-foreground">React.ReactNode</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">side</td><td className="p-3 text-muted-foreground">&quot;top&quot; | &quot;bottom&quot; | &quot;left&quot; | &quot;right&quot;</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">align</td><td className="p-3 text-muted-foreground">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">arrow</td><td className="p-3 text-muted-foreground">boolean</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">delayDuration</td><td className="p-3 text-muted-foreground">number</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">open</td><td className="p-3 text-muted-foreground">boolean</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">defaultOpen</td><td className="p-3 text-muted-foreground">boolean</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">onOpenChange</td><td className="p-3 text-muted-foreground">(open: boolean) =&gt; void</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr><td className="p-3 font-mono text-xs">asChild</td><td className="p-3 text-muted-foreground">boolean</td><td className="p-3 text-muted-foreground">—</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm mb-2">Tooltip also accepts all standard <code className="text-xs bg-muted px-1 rounded">HTMLSpanElement</code> attributes.</p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}

