"use client"

import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { Toggle } from "@/components/ui/toggle"`

const basicUsageCode = `const [enabled, setEnabled] = useState(false)

<Toggle aria-label="Enable setting" checked={enabled} onCheckedChange={setEnabled} />`

const tocItems = [
  { title: "Installation", id: "installation" },
  { title: "Usage", id: "usage" },
  { title: "Examples", id: "examples" },
  { title: "API Reference", id: "api" },
]

const apiCode = `interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}`

export default function TogglePage() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6 sm:mb-8">
          <h1 id="toggle" className="scroll-mt-20 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Toggle
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2">
            Toggle component typically representing an on/off or yes/no selection.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The Toggle component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Use Toggle with checked and onCheckedChange for controlled state. Copy the example below to get started.
          </p>
          <ComponentPreview>
            <div className="flex items-center gap-4">
              <Toggle aria-label="Enable setting" checked={enabled} onCheckedChange={setEnabled} />
              <span className="text-sm text-[var(--color-text-secondary)]">
                {enabled ? "On" : "Off"}
              </span>
            </div>
          </ComponentPreview>
          <CodeBlock code={basicUsageCode} />
        </section>

        <section id="examples" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Examples
          </h2>
          <p className="text-muted-foreground mb-4">
            Copy any example below to use in your project. Toggle supports checked, defaultChecked, and disabled states.
          </p>
          <ComponentPreview title="States">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-6 max-w-xs">
                <span className="text-sm text-[var(--color-text-secondary)]">Hidden</span>
                <Toggle aria-label="Toggle hidden" defaultChecked={false} />
              </div>
              <div className="flex items-center justify-between gap-6 max-w-xs">
                <span className="text-sm text-[var(--color-text-secondary)]">Hidden</span>
                <Toggle aria-label="Toggle hidden" defaultChecked />
              </div>
              <div className="flex items-center justify-between gap-6 max-w-xs opacity-70">
                <span className="text-sm text-[var(--color-text-secondary)]">Disabled</span>
                <Toggle aria-label="Disabled toggle" disabled defaultChecked={false} />
              </div>
              <div className="flex items-center justify-between gap-6 max-w-xs opacity-70">
                <span className="text-sm text-[var(--color-text-secondary)]">Disabled</span>
                <Toggle aria-label="Disabled toggle" disabled defaultChecked />
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            API Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            The Toggle component represents an on/off or yes/no selection. It supports checked, defaultChecked, and onCheckedChange.
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
                <tr className="border-b"><td className="p-3 font-mono text-xs">checked</td><td className="p-3 text-muted-foreground">boolean</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr className="border-b"><td className="p-3 font-mono text-xs">defaultChecked</td><td className="p-3 text-muted-foreground">boolean</td><td className="p-3 text-muted-foreground">—</td></tr>
                <tr><td className="p-3 font-mono text-xs">onCheckedChange</td><td className="p-3 text-muted-foreground">(checked: boolean) =&gt; void</td><td className="p-3 text-muted-foreground">—</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm mb-2">Toggle also accepts all standard <code className="text-xs bg-muted px-1 rounded">HTMLButtonElement</code> attributes.</p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}

