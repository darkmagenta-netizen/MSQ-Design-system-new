"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
  items: Array<{
    title: string
    id: string
  }>
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -66%", threshold: 0 }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <div className="hidden text-sm xl:block">
      <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-16">
        <div className="space-y-2">
          <h4 className="mb-4 font-medium uppercase text-muted-foreground">
            On this page
          </h4>
          <div className="space-y-1">
            {items.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "block transition-colors",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.title}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

