"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeNavbar } from "@/components/home-navbar"
import { ArrowRight, Component as ComponentsIcon, BookOpen, Palette } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { getTranslation } from "@/lib/translations"

export default function Home() {
  const { language } = useLanguage()
  const t = getTranslation(language)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HomeNavbar />
      <main className="flex-1">
      {/* Hero */}
      <section className="relative border-b">
        <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-6 py-24 md:py-32 lg:py-40">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-center max-w-4xl">
            {t.homeHeroTitle}
          </h1>
          <p className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
            {t.homeHeroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/docs">
              <Button size="lg" className="gap-2 text-base">
                {t.getStarted}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs/components/button">
              <Button variant="outline" size="lg" className="gap-2 text-base">
                {t.viewComponents}
                <ComponentsIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="border-b">
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-8 text-center">
            {t.examples}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            <Link
              href="/docs"
              className="flex items-center gap-3 rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-accent/50"
            >
              <BookOpen className="h-5 w-5 shrink-0 text-muted-foreground" />
              <span className="font-medium">{t.documentation}</span>
            </Link>
            <Link
              href="/docs/components/button"
              className="flex items-center gap-3 rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-accent/50"
            >
              <ComponentsIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
              <span className="font-medium">{t.components}</span>
            </Link>
            <Link
              href="/docs/foundations/cryptocurrency"
              className="flex items-center gap-3 rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-accent/50"
            >
              <Palette className="h-5 w-5 shrink-0 text-muted-foreground" />
              <span className="font-medium">{t.cryptocurrency}</span>
            </Link>
            <Link
              href="/docs/foundations/logos"
              className="flex items-center gap-3 rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-accent/50"
            >
              <Palette className="h-5 w-5 shrink-0 text-muted-foreground" />
              <span className="font-medium">{t.logos}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <footer className="py-8 text-center text-sm text-muted-foreground">
        {t.footerNote}
      </footer>
      </main>
    </div>
  )
}
