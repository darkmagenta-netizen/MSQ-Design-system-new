"use client"

import Link from "next/link"
import { Search as SearchIcon, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageSelector } from "@/components/ui/language-selector"
import { MSQLogo } from "@/components/ui/msq-logo"
import { useLanguage } from "@/lib/language-provider"
import { getTranslation } from "@/lib/translations"
import { Search } from "@/components/docs/search"
import { useState } from "react"

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { language } = useLanguage()
  const t = getTranslation(language)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center min-w-0 w-full">
          <div className="flex shrink-0 min-w-0 max-w-[calc(100%-8rem)] lg:max-w-none lg:w-[250px] xl:w-[300px] items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:border-r">
            <button
              onClick={onMenuToggle}
              className="lg:hidden shrink-0 inline-flex items-center justify-center rounded-md p-2 hover:bg-accent transition-colors"
              aria-label={t.toggleMenu}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex items-center min-w-0 shrink">
              <MSQLogo variant="horizontal" size={120} className="w-[90px] sm:w-[100px] lg:w-[120px] h-auto max-w-full" />
            </Link>
          </div>
          <div className="flex flex-1 min-w-0 items-center justify-end gap-2 sm:gap-3 px-3 sm:px-4 lg:px-8">
            <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm shrink-0">
              <Link
                href="/docs"
                className="transition-colors hover:text-foreground/80 text-foreground/60 whitespace-nowrap"
              >
                {t.docs}
              </Link>
              <Link
                href="/docs/components/button"
                className="transition-colors hover:text-foreground/80 text-foreground/60 whitespace-nowrap"
              >
                {t.components}
              </Link>
            </nav>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <ThemeToggle />
              <LanguageSelector />
              <button
                onClick={() => setSearchOpen(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 shrink-0"
                aria-label={t.search}
              >
                <SearchIcon className="h-4 w-4" />
                <span className="sr-only">{t.search}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <Search open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}

