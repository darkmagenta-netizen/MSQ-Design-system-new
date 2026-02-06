"use client"

import { useState } from "react"
import { BottomNav, BottomNavItem } from "@/components/ui/bottom-nav"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { BottomNav, BottomNavItem } from "@/components/ui/bottom-nav"`

const basicUsageCode = `const items: BottomNavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "home-02",
    href: "/home"
  },
  {
    id: "wallets",
    label: "Wallets",
    icon: "wallet-04",
    href: "/wallets"
  },
  {
    id: "history",
    label: "History",
    icon: "file-07", // Note: file-06 not in registry, using file-07
    href: "/history"
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    href: "/settings"
  }
]

<BottomNav items={items} activeItemId="home" />`

const controlledCode = `const [activeId, setActiveId] = useState("home")

const items: BottomNavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "home-02",
    onClick: () => setActiveId("home")
  },
  {
    id: "wallets",
    label: "Wallets",
    icon: "wallet-04",
    onClick: () => setActiveId("wallets")
  },
  {
    id: "history",
    label: "History",
    icon: "file-07",
    onClick: () => setActiveId("history")
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    onClick: () => setActiveId("settings")
  }
]

<BottomNav 
  items={items} 
  activeItemId={activeId}
  onItemClick={(item) => console.log("Clicked:", item)}
/>`

const withoutIndicatorCode = `<BottomNav 
  items={items} 
  activeItemId="home"
  showHomeIndicator={false}
/>`

const apiCode = `interface BottomNavItem {
  /**
   * Unique identifier for the nav item
   */
  id: string
  /**
   * Display label for the nav item
   */
  label: string
  /**
   * Icon name from iconComponents registry
   */
  icon: string
  /**
   * Optional href for navigation
   */
  href?: string
  /**
   * Optional onClick handler
   */
  onClick?: () => void
  /**
   * Whether the item is disabled
   */
  disabled?: boolean
}

interface BottomNavProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Array of navigation items
   */
  items: BottomNavItem[]
  /**
   * Currently active item ID
   */
  activeItemId?: string
  /**
   * Callback when an item is clicked
   */
  onItemClick?: (item: BottomNavItem) => void
  /**
   * Show home indicator (iOS style) at the bottom
   */
  showHomeIndicator?: boolean
}`

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "api", title: "API Reference" },
]

export default function BottomNavPage() {
  const [activeId, setActiveId] = useState("home")

  const items: BottomNavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: "home-02",
    },
    {
      id: "wallets",
      label: "Wallets",
      icon: "wallet-04",
    },
    {
      id: "history",
      label: "History",
      icon: "file-07", // Using file-07 as file-06 is not in registry
    },
    {
      id: "settings",
      label: "Settings",
      icon: "settings",
    },
  ]

  const controlledItems: BottomNavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: "home-02",
      onClick: () => setActiveId("home"),
    },
    {
      id: "wallets",
      label: "Wallets",
      icon: "wallet-04",
      onClick: () => setActiveId("wallets"),
    },
    {
      id: "history",
      label: "History",
      icon: "file-07",
      onClick: () => setActiveId("history"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: "settings",
      onClick: () => setActiveId("settings"),
    },
  ]

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
            BottomNav
          </h1>
          <p className="text-muted-foreground text-lg">
            A bottom navigation bar component for mobile applications with support for icons, labels, and active states.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The BottomNav component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Use BottomNav with items and activeItemId. Copy the example below to get started.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="w-full max-w-sm mx-auto">
                  <BottomNav items={items} activeItemId="home" />
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={basicUsageCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="examples" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Examples
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Controlled Component</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="w-full max-w-sm mx-auto">
                      <BottomNav items={controlledItems} activeItemId={activeId} />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={controlledCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Without Home Indicator</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="w-full max-w-sm mx-auto">
                      <BottomNav items={items} activeItemId="wallets" showHomeIndicator={false} />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={withoutIndicatorCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">All States</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="w-full max-w-sm mx-auto space-y-4">
                      <BottomNav items={items} activeItemId="home" />
                      <BottomNav items={items} activeItemId="wallets" />
                      <BottomNav items={items} activeItemId="history" />
                      <BottomNav items={items} activeItemId="settings" />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={`<BottomNav items={items} activeItemId="home" />
<BottomNav items={items} activeItemId="wallets" />
<BottomNav items={items} activeItemId="history" />
<BottomNav items={items} activeItemId="settings" />`} />
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
            The BottomNav component displays a mobile bottom navigation bar with items and active state. See the interface below for full prop details.
          </p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
