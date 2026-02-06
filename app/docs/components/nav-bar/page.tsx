"use client"

import { useState } from "react"
import { NavMenu, NavMenuItem } from "@/components/ui/nav-menu"
import { TopNavbar } from "@/components/ui/top-navbar"
import { BottomNav, BottomNavItem } from "@/components/ui/bottom-nav"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"

// Desktop Navigation Code
const desktopInstallationCode = `import { NavMenu, NavMenuItem } from "@/components/ui/nav-menu"
import { TopNavbar } from "@/components/ui/top-navbar"`

const desktopBasicUsageCode = `const items: NavMenuItem[] = [
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

const desktopExpandableCode = `const items: NavMenuItem[] = [
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

const desktopControlledCode = `const [activeId, setActiveId] = useState("dashboard")

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

const desktopFullMenuCode = `const items: NavMenuItem[] = [
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

const topNavbarCode = `import { TopNavbar } from "@/components/ui/top-navbar"

<TopNavbar
  user={{
    name: "Sneha Gupta",
    nameSecondary: "사용자명"
  }}
  timezone="(GMT+9:00)SEOUL"
/>`

const desktopApiCode = `interface NavMenuItem {
  id: string
  label: string
  icon?: string
  active?: boolean
  disabled?: boolean
  href?: string
  onClick?: () => void
  expandable?: boolean
  expanded?: boolean
  onToggle?: (id: string) => void
  children?: NavMenuItem[]
}

interface NavMenuProps {
  items: NavMenuItem[]
  activeItemId?: string
  onItemClick?: (item: NavMenuItem) => void
  width?: string | number
}`

// Mobile Navigation Code
const mobileInstallationCode = `import { BottomNav, BottomNavItem } from "@/components/ui/bottom-nav"`

const mobileBasicUsageCode = `const items: BottomNavItem[] = [
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
    icon: "file-07",
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

const mobileControlledCode = `const [activeId, setActiveId] = useState("home")

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

const mobileWithoutIndicatorCode = `<BottomNav 
  items={items} 
  activeItemId="home"
  showHomeIndicator={false}
/>`

const mobileApiCode = `interface BottomNavItem {
  id: string
  label: string
  icon: string
  href?: string
  onClick?: () => void
  disabled?: boolean
}

interface BottomNavProps {
  items: BottomNavItem[]
  activeItemId?: string
  onItemClick?: (item: BottomNavItem) => void
  showHomeIndicator?: boolean
}`

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "api", title: "API Reference" },
]

export default function NavBarPage() {
  const [desktopActiveId, setDesktopActiveId] = useState("dashboard")
  const [mobileActiveId, setMobileActiveId] = useState("home")

  // Desktop Navigation Items
  const desktopBasicItems: NavMenuItem[] = [
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

  const desktopExpandableItems: NavMenuItem[] = [
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

  const desktopControlledItems: NavMenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "home-01",
      onClick: () => setDesktopActiveId("dashboard"),
    },
    {
      id: "platforms",
      label: "Platforms",
      icon: "grid-01",
      onClick: () => setDesktopActiveId("platforms"),
    },
    {
      id: "tokens",
      label: "Tokens",
      icon: "coins-01",
      onClick: () => setDesktopActiveId("tokens"),
    },
  ]

  const desktopFullMenuItems: NavMenuItem[] = [
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

  // Mobile Navigation Items
  const mobileItems: BottomNavItem[] = [
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
      icon: "file-07",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "settings",
    },
  ]

  const mobileControlledItems: BottomNavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: "home-02",
      onClick: () => setMobileActiveId("home"),
    },
    {
      id: "wallets",
      label: "Wallets",
      icon: "wallet-04",
      onClick: () => setMobileActiveId("wallets"),
    },
    {
      id: "history",
      label: "History",
      icon: "file-07",
      onClick: () => setMobileActiveId("history"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: "settings",
      onClick: () => setMobileActiveId("settings"),
    },
  ]

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
            Nav Bar
          </h1>
          <p className="text-muted-foreground text-lg">
            Navigation components for desktop and mobile applications with support for icons, labels, expandable items, and active states.
          </p>
        </div>

        {/* Main Tabs: Desktop and Mobile */}
        <Tabs defaultValue="desktop" className="w-full mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>

          {/* Desktop Tab Content */}
          <TabsContent value="desktop" className="space-y-8">
            <section id="installation" className="scroll-mt-20">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
                Installation
              </h2>
              <p className="text-muted-foreground mb-4">
                The TopNavbar component is part of the design system. Import it from the UI package.
              </p>
              <CodeBlock code={desktopInstallationCode} />
            </section>

            <section id="usage" className="scroll-mt-20">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
                Usage
              </h2>
              <p className="text-muted-foreground mb-4">
                Use TopNavbar with user, timezone, and optional menu. Copy the example below to get started.
              </p>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <NavMenu items={desktopBasicItems} activeItemId="dashboard" />
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={desktopBasicUsageCode} />
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
                        <NavMenu items={desktopExpandableItems} />
                      </ComponentPreview>
                    </TabsContent>
                    <TabsContent value="code">
                      <CodeBlock code={desktopExpandableCode} />
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
                        <NavMenu items={desktopControlledItems} activeItemId={desktopActiveId} />
                      </ComponentPreview>
                    </TabsContent>
                    <TabsContent value="code">
                      <CodeBlock code={desktopControlledCode} />
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
                        <NavMenu items={desktopFullMenuItems} activeItemId="dashboard" />
                      </ComponentPreview>
                    </TabsContent>
                    <TabsContent value="code">
                      <CodeBlock code={desktopFullMenuCode} />
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
                The TopNavbar component displays a top navigation bar with logo, user, and timezone. See the interface below for full prop details.
              </p>
              <CodeBlock code={desktopApiCode} />
            </section>
          </TabsContent>

          {/* Mobile Tab Content */}
          <TabsContent value="mobile" className="space-y-8">
            <section id="installation" className="scroll-mt-20">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
                Installation
              </h2>
              <p className="text-muted-foreground mb-4">
                The BottomNav component is part of the design system. Import it from the UI package.
              </p>
              <CodeBlock code={mobileInstallationCode} />
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
                      <BottomNav items={mobileItems} activeItemId="home" />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={mobileBasicUsageCode} />
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
                          <BottomNav items={mobileControlledItems} activeItemId={mobileActiveId} />
                        </div>
                      </ComponentPreview>
                    </TabsContent>
                    <TabsContent value="code">
                      <CodeBlock code={mobileControlledCode} />
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
                          <BottomNav items={mobileItems} activeItemId="wallets" showHomeIndicator={false} />
                        </div>
                      </ComponentPreview>
                    </TabsContent>
                    <TabsContent value="code">
                      <CodeBlock code={mobileWithoutIndicatorCode} />
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
                          <BottomNav items={mobileItems} activeItemId="home" />
                          <BottomNav items={mobileItems} activeItemId="wallets" />
                          <BottomNav items={mobileItems} activeItemId="history" />
                          <BottomNav items={mobileItems} activeItemId="settings" />
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
                The BottomNav component displays a mobile bottom navigation bar. See the interface below for full prop details.
              </p>
              <CodeBlock code={mobileApiCode} />
            </section>
          </TabsContent>
        </Tabs>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
