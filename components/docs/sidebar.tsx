"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight, X } from "lucide-react"
import { useEffect } from "react"
import { useLanguage } from "@/lib/language-provider"
import { getTranslation } from "@/lib/translations"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { language } = useLanguage()
  const t = getTranslation(language)

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isOpen && onClose) {
      onClose()
    }
  }, [pathname])

  const navigation = [
    {
      title: t.getStarted,
      items: [
        { title: t.installation, href: "/docs" },
      ],
    },
    {
      title: t.foundations,
      items: [
        { title: t.colors, href: "/docs/foundations/colors" },
        { title: t.cryptocurrency, href: "/docs/foundations/cryptocurrency" },
        { title: t.grid, href: "/docs/foundations/grid" },
        { title: t.icons, href: "/docs/foundations/icons" },
        { title: t.logos, href: "/docs/foundations/logos" },
        { title: t.radius, href: "/docs/foundations/radius" },
        { title: t.spacing, href: "/docs/foundations/spacing" },
        { title: t.typography, href: "/docs/foundations/typography" },
      ],
    },
    {
      title: t.components,
      items: [
        { title: t.alert, href: "/docs/components/alert" },
        { title: t.badge, href: "/docs/components/badge" },
        { title: t.button, href: "/docs/components/button" },
        { title: t.calendar, href: "/docs/components/calendar" },
        { title: t.checkbox, href: "/docs/components/checkbox" },
        { title: t.dropdown, href: "/docs/components/dropdown" },
        { title: t.input, href: "/docs/components/input" },
        { title: t.navBar, href: "/docs/components/nav-bar" },
        { title: t.pagination, href: "/docs/components/pagination" },
        { title: t.tabs, href: "/docs/components/tabs" },
        { title: t.toggle, href: "/docs/components/toggle" },
        { title: t.tooltip, href: "/docs/components/tooltip" },
        { title: t.progress, href: "/docs/components/progress" },
        { title: t.banner, href: "/docs/components/banner" },
      ],
    },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar: fixed below header on desktop, fixed overlay on mobile */}
      <aside
        className={cn(
          "w-[250px] xl:w-[300px] shrink-0 border-r bg-background transition-transform duration-300 ease-in-out",
          "h-[calc(100vh-3.5rem)]",
          // Mobile: fixed overlay, slides in/out
          "fixed top-14 left-0 z-50 lg:block",
          // Desktop: fixed below header
          "lg:fixed lg:top-14 lg:left-0 lg:z-40",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="relative h-full w-full overflow-hidden">
          <div className="h-full w-full overflow-y-auto scrollbar-hide">
            <div className="p-4 lg:p-4">
              {/* Mobile close button */}
              <div className="mb-4 flex items-center justify-between lg:hidden">
                <span className="text-sm font-semibold">Navigation</span>
                <button
                  onClick={onClose}
                  className="rounded-md p-1 hover:bg-accent"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <nav className="space-y-0.5">
                {navigation.map((section) => (
                  <div key={section.title} className="pb-4">
                    <h4 className="mb-1 px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      {section.title}
                    </h4>
                    <div className="space-y-0.5">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                              "group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm leading-none",
                              "hover:bg-accent hover:text-accent-foreground",
                              "transition-colors",
                              isActive
                                ? "bg-accent font-medium text-accent-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            <span>{item.title}</span>
                            {isActive && (
                              <ChevronRight className="ml-auto h-4 w-4" />
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

