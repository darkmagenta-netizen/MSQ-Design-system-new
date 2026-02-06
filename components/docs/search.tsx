"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search as SearchIcon, FileText, Component, Palette, Type, Grid, X, Command } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-provider"
import { getTranslation } from "@/lib/translations"
import { searchItems, searchData, type SearchItem } from "@/lib/search-data"

interface SearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const categoryIcons = {
  component: Component,
  foundation: FileText,
  "getting-started": FileText,
}

const categoryLabels = {
  component: { eng: "Components", kor: "컴포넌트" },
  foundation: { eng: "Foundations", kor: "기초" },
  "getting-started": { eng: "Getting Started", kor: "시작하기" },
}

export function Search({ open, onOpenChange }: SearchProps) {
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const router = useRouter()
  const { language } = useLanguage()
  const t = getTranslation(language)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const results = React.useMemo(() => searchItems(query, language), [query, language])
  const groupedResults = React.useMemo(() => {
    const groups: Record<string, SearchItem[]> = {}
    results.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })
    return groups
  }, [results])

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(true)
      }
      // Escape to close
      if (e.key === "Escape" && open) {
        onOpenChange(false)
        setQuery("")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  // Focus input when opened
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setSelectedIndex(0)
    } else {
      setQuery("")
    }
  }, [open])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault()
      handleSelect(results[selectedIndex])
    }
  }

  const handleSelect = (item: SearchItem) => {
    router.push(item.href)
    onOpenChange(false)
    setQuery("")
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, "gi"))
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-primary/20 text-primary rounded px-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    )
  }

  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Search Modal */}
      <div className="fixed left-1/2 top-[15%] z-50 w-full max-w-2xl -translate-x-1/2 transform">
        <div className="overflow-hidden rounded-lg border bg-popover shadow-lg">
          {/* Search Input */}
          <div className="flex items-center border-b px-4">
            <SearchIcon className="h-4 w-4 text-muted-foreground mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedIndex(0)
              }}
              onKeyDown={handleKeyDown}
              placeholder={t.searchPlaceholder}
              className="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
            />
            <div className="flex items-center gap-2 ml-3">
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <Command className="h-3 w-3" />K
              </kbd>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-sm p-1 hover:bg-accent"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query && results.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                {t.noResults}
              </div>
            ) : query && results.length > 0 ? (
              <div className="p-2">
                {Object.entries(groupedResults).map(([category, items]) => {
                  const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons] || FileText
                  const categoryLabel = categoryLabels[category as keyof typeof categoryLabels]
                  
                  return (
                    <div key={category} className="mb-4">
                      <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        <CategoryIcon className="h-3.5 w-3.5" />
                        {language === "kor" ? categoryLabel.kor : categoryLabel.eng}
                      </div>
                      {items.map((item, index) => {
                        const globalIndex = results.findIndex(r => r.id === item.id)
                        const isSelected = globalIndex === selectedIndex
                        const displayTitle = language === "kor" && item.titleKor ? item.titleKor : item.title
                        const displayDesc = language === "kor" && item.descriptionKor ? item.descriptionKor : item.description
                        
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            className={cn(
                              "w-full flex items-start gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                              isSelected && "bg-accent text-accent-foreground"
                            )}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                          >
                            <div className="mt-0.5 shrink-0">
                              {item.category === "component" && <Component className="h-4 w-4 text-muted-foreground" />}
                              {item.category === "foundation" && item.id === "colors" && <Palette className="h-4 w-4 text-muted-foreground" />}
                              {item.category === "foundation" && item.id === "typography" && <Type className="h-4 w-4 text-muted-foreground" />}
                              {item.category === "foundation" && item.id === "spacing" && <Grid className="h-4 w-4 text-muted-foreground" />}
                              {item.category === "foundation" && item.id === "grid" && <Grid className="h-4 w-4 text-muted-foreground" />}
                              {item.category === "getting-started" && <FileText className="h-4 w-4 text-muted-foreground" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">
                                {highlightText(displayTitle, query)}
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-1">
                                {highlightText(displayDesc, query)}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="px-4 py-8">
                <div className="text-sm text-muted-foreground mb-4">
                  {t.recentSearches}
                </div>
                <div className="space-y-1">
                  {searchData.slice(0, 5).map((item) => {
                    const displayTitle = language === "kor" && item.titleKor ? item.titleKor : item.title
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
                      >
                        {item.category === "component" && <Component className="h-4 w-4 text-muted-foreground" />}
                        {item.category === "foundation" && <FileText className="h-4 w-4 text-muted-foreground" />}
                        {item.category === "getting-started" && <FileText className="h-4 w-4 text-muted-foreground" />}
                        <span>{displayTitle}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

