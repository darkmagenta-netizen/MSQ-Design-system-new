"use client"

import * as React from "react"
import Link from "next/link"
import { useState } from "react"
import { Search as SearchIcon } from "lucide-react"
import { MSQLogo } from "@/components/ui/msq-logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageSelector } from "@/components/ui/language-selector"
import { Search } from "@/components/docs/search"
import { useLanguage } from "@/lib/language-provider"
import { getTranslation } from "@/lib/translations"

const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || ""
const GITHUB_URL = GITHUB_REPO
  ? `https://github.com/${GITHUB_REPO.replace(/^https:\/\/github\.com\/|^github\.com\//i, "").replace(/\/$/, "")}`
  : "https://github.com"

function GitHubForkBadge() {
  const [forks, setForks] = useState<number | null>(null)
  const repoPath = GITHUB_REPO.replace(/^https:\/\/github\.com\/|^github\.com\//i, "").replace(/\/$/, "")

  React.useEffect(() => {
    if (!repoPath) return
    fetch(`https://api.github.com/repos/${repoPath}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { forks_count?: number } | null) => {
        if (data != null && typeof data.forks_count === "number") setForks(data.forks_count)
      })
      .catch(() => {})
  }, [repoPath])

  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="View on GitHub"
    >
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
      {forks != null && <span>{forks}</span>}
    </a>
  )
}

export function HomeNavbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { language } = useLanguage()
  const t = getTranslation(language)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
        <div className="w-full max-w-[100vw] mx-auto flex h-14 items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 md:px-6 min-w-0">
          <div className="flex items-center min-w-0 gap-4 sm:gap-6 md:gap-10">
            <Link href="/" className="flex shrink-0 items-center min-w-0 max-w-[140px] sm:max-w-[160px]">
              <MSQLogo variant="horizontal" size={120} className="w-[90px] sm:w-[110px] md:w-[120px] h-auto max-w-full" />
            </Link>
            <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm shrink-0">
              <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                {t.docs}
              </Link>
              <Link href="/docs/components/button" className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                {t.components}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0 min-w-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-9 items-center gap-1.5 sm:gap-2 rounded-md border border-input bg-background px-2 sm:px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0"
              aria-label={t.search}
            >
              <SearchIcon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline truncate max-w-[100px] md:max-w-none">{t.searchPlaceholder}</span>
            </button>
            <ThemeToggle />
            <LanguageSelector />
            <span className="hidden xs:inline-flex sm:inline-flex">
              <GitHubForkBadge />
            </span>
          </div>
        </div>
      </header>
      <Search open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
