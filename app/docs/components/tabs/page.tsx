"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { iconComponents } from "@/components/icons/icons"

const installationCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`

const basicUsageCode = `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
</Tabs>`

const defaultVariantCode = `<Tabs defaultValue="activity" variant="default">
  <TabsList>
    <TabsTrigger value="activity">Activity history</TabsTrigger>
    <TabsTrigger value="access">Access history</TabsTrigger>
    <TabsTrigger value="excel">Excel Download History</TabsTrigger>
  </TabsList>
</Tabs>`

const selectedVariantCode = `<Tabs defaultValue="activity" variant="default">
  <TabsList>
    <TabsTrigger value="activity" icon="check-circle">Activity history</TabsTrigger>
    <TabsTrigger value="access">Access history</TabsTrigger>
    <TabsTrigger value="excel">Excel Download History</TabsTrigger>
  </TabsList>
</Tabs>`

const underlineVariantCode = `<Tabs defaultValue="msqp" variant="underline">
  <TabsList>
    <TabsTrigger value="msqp">MSQP</TabsTrigger>
    <TabsTrigger value="p2u">P2U</TabsTrigger>
  </TabsList>
</Tabs>`

const filledVariantCode = `<Tabs defaultValue="msqp" variant="filled">
  <TabsList>
    <TabsTrigger value="msqp">MSQP</TabsTrigger>
    <TabsTrigger value="p2u">P2U</TabsTrigger>
  </TabsList>
</Tabs>`

const colorVariantCode = `<Tabs defaultValue="msqp" variant="color">
  <TabsList>
    <TabsTrigger value="msqp">MSQP</TabsTrigger>
    <TabsTrigger value="p2u">P2U</TabsTrigger>
  </TabsList>
</Tabs>`

const filterVariantCode = `<Tabs defaultValue="all" variant="filter">
  <TabsList>
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="today">Today</TabsTrigger>
    <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
    <TabsTrigger value="week">1 Week</TabsTrigger>
    <TabsTrigger value="month">1 Month</TabsTrigger>
    <TabsTrigger value="quarter">3 Month</TabsTrigger>
  </TabsList>
</Tabs>`

const selectVariantCode = `<Tabs defaultValue="individual" variant="select">
  <TabsList>
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="individual">Individual</TabsTrigger>
    <TabsTrigger value="corporate">Corporate</TabsTrigger>
  </TabsList>
</Tabs>`

const controlledCode = `const [activeTab, setActiveTab] = useState("tab1")

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
</Tabs>`

const apiCode = `interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: "default" | "underline" | "filled" | "color" | "filter" | "select"
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "underline" | "filled" | "color" | "filter" | "select"
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  icon?: string | React.ReactNode
  iconPosition?: "left" | "right"
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}`

const tocItems = [
  { title: "Installation", id: "installation" },
  { title: "Usage", id: "usage" },
  { title: "Variants", id: "variants" },
  { title: "Examples", id: "examples" },
  { title: "API Reference", id: "api" },
]

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState("activity")
  const [activeTab2, setActiveTab2] = useState("msqp")
  const [activeTab3, setActiveTab3] = useState("msqp")
  const [activeTab4, setActiveTab4] = useState("msqp")
  const [activeTab5, setActiveTab5] = useState("all")
  const [activeTab6, setActiveTab6] = useState("individual")

  const CheckCircleIcon = iconComponents["check-circle"]?.component

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6 sm:mb-8">
          <h1 id="tabs" className="scroll-mt-20 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Tabs
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2">
            Tab component for organizing content into multiple panels. Supports multiple variants including default, underline, filled, color, filter, and select styles.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The Tabs component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Use Tabs with TabsList, TabsTrigger, and TabsContent. Copy the example below to get started.
          </p>
          <ComponentPreview>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentPreview>
          <CodeBlock code={basicUsageCode} />
        </section>

        <section id="variants" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Variants
          </h2>
          <p className="text-muted-foreground mb-6">
            Tabs component supports multiple visual variants to match different use cases.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Default</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Standard tabs with rounded corners. Selected tab has primary blue background.
              </p>
              <ComponentPreview>
                <Tabs value={activeTab} onValueChange={setActiveTab} variant="default">
                  <TabsList>
                    <TabsTrigger value="activity">Activity history</TabsTrigger>
                    <TabsTrigger value="access">Access history</TabsTrigger>
                    <TabsTrigger value="excel">Excel Download History</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ComponentPreview>
              <CodeBlock code={defaultVariantCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Default with Icon</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Default variant with icon support. Icons can be placed on the left or right.
              </p>
              <ComponentPreview>
                <Tabs value={activeTab} onValueChange={setActiveTab} variant="default">
                  <TabsList>
                    <TabsTrigger value="activity" icon="check-circle">
                      Activity history
                    </TabsTrigger>
                    <TabsTrigger value="access">Access history</TabsTrigger>
                    <TabsTrigger value="excel">Excel Download History</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ComponentPreview>
              <CodeBlock code={selectedVariantCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Underline</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tabs with underline indicator. Selected tab shows a blue underline.
              </p>
              <ComponentPreview>
                <Tabs value={activeTab2} onValueChange={setActiveTab2} variant="underline">
                  <TabsList>
                    <TabsTrigger value="msqp">MSQP</TabsTrigger>
                    <TabsTrigger value="p2u">P2U</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ComponentPreview>
              <CodeBlock code={underlineVariantCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Filled</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tabs with filled background. Selected tab has white background with blue text.
              </p>
              <ComponentPreview>
                <Tabs value={activeTab3} onValueChange={setActiveTab3} variant="filled">
                  <TabsList>
                    <TabsTrigger value="msqp">MSQP</TabsTrigger>
                    <TabsTrigger value="p2u">P2U</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ComponentPreview>
              <CodeBlock code={filledVariantCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Color</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tabs with colored background. Selected tab has primary blue background with white text.
              </p>
              <ComponentPreview>
                <Tabs value={activeTab4} onValueChange={setActiveTab4} variant="color">
                  <TabsList>
                    <TabsTrigger value="msqp">MSQP</TabsTrigger>
                    <TabsTrigger value="p2u">P2U</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ComponentPreview>
              <CodeBlock code={colorVariantCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Filter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Filter-style tabs with borders. Each tab looks like a button with border.
              </p>
              <ComponentPreview>
                <Tabs value={activeTab5} onValueChange={setActiveTab5} variant="filter">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
                    <TabsTrigger value="week">1 Week</TabsTrigger>
                    <TabsTrigger value="month">1 Month</TabsTrigger>
                    <TabsTrigger value="quarter">3 Month</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ComponentPreview>
              <CodeBlock code={filterVariantCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Select</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connected tabs with shared borders, similar to a segmented control.
              </p>
              <ComponentPreview>
                <Tabs value={activeTab6} onValueChange={setActiveTab6} variant="select">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="individual">Individual</TabsTrigger>
                    <TabsTrigger value="corporate">Corporate</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ComponentPreview>
              <CodeBlock code={selectVariantCode} />
            </div>
          </div>
        </section>

        <section id="examples" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Examples
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Controlled</h3>
              <ComponentPreview>
                <Tabs value={activeTab} onValueChange={setActiveTab} variant="default">
                  <TabsList>
                    <TabsTrigger value="activity">Activity history</TabsTrigger>
                    <TabsTrigger value="access">Access history</TabsTrigger>
                    <TabsTrigger value="excel">Excel Download History</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ComponentPreview>
              <CodeBlock code={controlledCode} />
            </div>
          </div>
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            API Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            The Tabs component organizes content into switchable panels. It supports defaultValue, value, onValueChange, and variant.
          </p>
          <p className="text-muted-foreground text-sm mb-2">Tabs, TabsList, TabsTrigger, and TabsContent accept standard HTML and Radix UI props. See the interface below for details.</p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
