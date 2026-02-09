"use client"

import { Sidebar } from "@/components/docs/sidebar"
import { Header } from "@/components/docs/header"
import { useState, useEffect } from "react"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-background relative z-0">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* Main content: only this area scrolls; offset for fixed header + fixed sidebar; z-0 so header (z-[9999]) stays on top */}
      <main
        className="relative z-0 mt-14 lg:ml-[250px] xl:ml-[300px] border-l border-border bg-background h-[calc(100vh-3.5rem)] overflow-y-auto"
      >
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

