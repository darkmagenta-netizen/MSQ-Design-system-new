"use client"

import { useState } from "react"
import { NavMenu, NavMenuItem } from "@/components/ui/nav-menu"
import { TopNavbar } from "@/components/ui/top-navbar"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { NavMenu, NavMenuItem } from "@/components/ui/nav-menu"`

const basicUsageCode = `const items: NavMenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "home-01",
    href: "/dashboard"
  },
  {
    id: "platforms",
    label: "Platforms",
    icon: "grid-01",
    href: "/platforms"
  },
  {
    id: "tokens",
    label: "Tokens",
    icon: "coins-01",
    href: "/tokens"
  }
]

<NavMenu items={items} activeItemId="dashboard" />`

const expandableCode = `const items: NavMenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "home-01",
    href: "/dashboard"
  },
  {
    id: "p2p-trade",
    label: "P2P Trade",
    icon: "trend-up-01",
    expandable: true,
    children: [
      {
        id: "p2p-management",
        label: "P2P Management",
        icon: "shield-tick",
        href: "/p2p/management"
      },
      {
        id: "kwt-management",
        label: "KWT Management",
        icon: "shield-tick",
        href: "/kwt/management"
      }
    ]
  }
]

<NavMenu items={items} />`

const controlledCode = `const [activeId, setActiveId] = useState("dashboard")

const items: NavMenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "home-01",
    onClick: () => setActiveId("dashboard")
  },
  {
    id: "platforms",
    label: "Platforms",
    icon: "grid-01",
    onClick: () => setActiveId("platforms")
  }
]

<NavMenu 
  items={items} 
  activeItemId={activeId}
  onItemClick={(item) => console.log("Clicked:", item)}
/>`

const fullMenuCode = `const items: NavMenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "home-01",
    href: "/dashboard"
  },
  {
    id: "platforms",
    label: "Platforms",
    icon: "grid-01",
    href: "/platforms"
  },
  {
    id: "qr-payments",
    label: "QR Payments",
    icon: "file-download-02",
    href: "/qr-payments"
  },
  {
    id: "platform-requests",
    label: "Platform Requests",
    icon: "file-download-03",
    href: "/platform-requests"
  },
  {
    id: "tokens",
    label: "Tokens",
    icon: "coins-01",
    href: "/tokens"
  },
  {
    id: "users",
    label: "Users",
    icon: "user-02",
    href: "/users"
  },
  {
    id: "news",
    label: "News",
    icon: "announcement-03",
    href: "/news"
  },
  {
    id: "popups",
    label: "Popups",
    icon: "layout-top",
    href: "/popups"
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "bell-ringing-01",
    href: "/notifications"
  },
  {
    id: "ads-management",
    label: "Ads Management",
    icon: "user-02",
    href: "/ads"
  },
  {
    id: "inquiry",
    label: "1:1 Inquiry",
    icon: "message-dots-circle",
    href: "/inquiry"
  },
  {
    id: "p2p-trade",
    label: "P2P Trade",
    icon: "trend-up-01",
    expandable: true,
    children: [
      {
        id: "p2p-management",
        label: "P2P Management",
        icon: "shield-tick",
        href: "/p2p/management"
      },
      {
        id: "kwt-management",
        label: "KWT Management",
        icon: "shield-tick",
        href: "/kwt/management"
      },
      {
        id: "super-save",
        label: "Super Save",
        icon: "shield-tick",
        href: "/super-save"
      }
    ]
  },
  {
    id: "admin-users",
    label: "MSQUARE Admin users",
    icon: "settings",
    href: "/admin/users"
  }
]

<NavMenu items={items} activeItemId="dashboard" />`

const apiCode = `interface NavMenuItem {
  /**
   * Unique identifier for the menu item
   */
  id: string
  /**
   * Display label for the menu item
   */
  label: string
  /**
   * Icon name from iconComponents registry
   */
  icon?: string
  /**
   * Whether the item is currently active/selected
   */
  active?: boolean
  /**
   * Whether the item is disabled
   */
  disabled?: boolean
  /**
   * Optional href for navigation (if provided, renders as Link)
   */
  href?: string
  /**
   * Optional onClick handler
   */
  onClick?: () => void
  /**
   * Whether this item is expandable (has submenu)
   */
  expandable?: boolean
  /**
   * Whether the item is currently expanded
   */
  expanded?: boolean
  /**
   * Callback when expandable item is toggled
   */
  onToggle?: (id: string) => void
  /**
   * Submenu items (for expandable items)
   */
  children?: NavMenuItem[]
}

interface NavMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Array of menu items
   */
  items: NavMenuItem[]
  /**
   * Currently active item ID
   */
  activeItemId?: string
  /**
   * Callback when an item is clicked
   */
  onItemClick?: (item: NavMenuItem) => void
  /**
   * Width of the menu (default: 248px)
   */
  width?: string | number
}`

const topNavbarCode = `import { TopNavbar } from "@/components/ui/top-navbar"

<TopNavbar
  user={{
    name: "Sneha Gupta",
    nameSecondary: "사용자명"
  }}
  timezone="(GMT+9:00)SEOUL"
/>`

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "top-navbar", title: "Top Navbar" },
  { id: "examples", title: "Examples" },
  { id: "api", title: "API Reference" },
]

export default function NavMenuPage() {
  const [activeId, setActiveId] = useState("dashboard")

  const basicItems: NavMenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "home-01",
    },
    {
      id: "platforms",
      label: "Platforms",
      icon: "grid-01",
    },
    {
      id: "tokens",
      label: "Tokens",
      icon: "coins-01",
    },
  ]

  const expandableItems: NavMenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "home-01",
    },
    {
      id: "p2p-trade",
      label: "P2P Trade",
      icon: "trend-up-01",
      expandable: true,
      children: [
        {
          id: "p2p-management",
          label: "P2P Management",
          icon: "shield-tick",
        },
        {
          id: "kwt-management",
          label: "KWT Management",
          icon: "shield-tick",
        },
      ],
    },
  ]

  const controlledItems: NavMenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "home-01",
      onClick: () => setActiveId("dashboard"),
    },
    {
      id: "platforms",
      label: "Platforms",
      icon: "grid-01",
      onClick: () => setActiveId("platforms"),
    },
    {
      id: "tokens",
      label: "Tokens",
      icon: "coins-01",
      onClick: () => setActiveId("tokens"),
    },
  ]

  const fullMenuItems: NavMenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "home-01",
    },
    {
      id: "platforms",
      label: "Platforms",
      icon: "grid-01",
    },
    {
      id: "qr-payments",
      label: "QR Payments",
      icon: "file-download-02",
    },
    {
      id: "platform-requests",
      label: "Platform Requests",
      icon: "file-download-03",
    },
    {
      id: "tokens",
      label: "Tokens",
      icon: "coins-01",
    },
    {
      id: "users",
      label: "Users",
      icon: "user-02",
    },
    {
      id: "news",
      label: "News",
      icon: "announcement-03",
    },
    {
      id: "popups",
      label: "Popups",
      icon: "layout-top",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "bell-ringing-01",
    },
    {
      id: "ads-management",
      label: "Ads Management",
      icon: "user-02",
    },
    {
      id: "inquiry",
      label: "1:1 Inquiry",
      icon: "message-dots-circle",
    },
    {
      id: "p2p-trade",
      label: "P2P Trade",
      icon: "trend-up-01",
      expandable: true,
      children: [
        {
          id: "p2p-management",
          label: "P2P Management",
          icon: "shield-tick",
        },
        {
          id: "kwt-management",
          label: "KWT Management",
          icon: "shield-tick",
        },
        {
          id: "super-save",
          label: "Super Save",
          icon: "shield-tick",
        },
      ],
    },
    {
      id: "admin-users",
      label: "MSQUARE Admin users",
      icon: "settings",
    },
  ]

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
            NavMenu
          </h1>
          <p className="text-muted-foreground text-lg">
            A navigation menu component with support for icons, expandable items, and active states.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The NavMenu / TopNavbar components are part of the design system. Import them from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Use TopNavbar with user, timezone, and optional expandable menu. Copy the example below to get started.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <NavMenu items={basicItems} activeItemId="dashboard" />
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={basicUsageCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="top-navbar" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Top Navbar
          </h2>
          <p className="text-muted-foreground mb-4">
            The top navigation bar component displays the logo, timezone selector, language selector, and user profile.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <TopNavbar
                  user={{
                    name: "Sneha Gupta",
                    nameSecondary: "사용자명"
                  }}
                  timezone="(GMT+9:00)SEOUL"
                />
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={topNavbarCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="examples" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Examples
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Expandable Items</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <NavMenu items={expandableItems} />
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={expandableCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Controlled Component</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <NavMenu items={controlledItems} activeItemId={activeId} />
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={controlledCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Full Menu Example</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <NavMenu items={fullMenuItems} activeItemId="dashboard" />
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={fullMenuCode} />
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
            The TopNavbar component displays a top navigation bar with logo, user, timezone, and optional menu. See the interface below for full prop details.
          </p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
