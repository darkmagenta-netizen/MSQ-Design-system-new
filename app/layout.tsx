import type { Metadata } from "next"
import "@/app/globals.css"
import { ThemeProvider } from "@/lib/theme-provider"
import { LanguageProvider } from "@/lib/language-provider"

export const metadata: Metadata = {
  title: "MSQ Design System",
  description: "MSQ Design System Component Library",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="msq-theme">
          <LanguageProvider defaultLanguage="eng" storageKey="msq-language">
            {children}
          </LanguageProvider>
        </ThemeProvider>
        {/* Portal root: last in DOM so dropdowns/modals render on top of everything */}
        <div
          id="portal-root"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483647,
            pointerEvents: "none",
          }}
        />
      </body>
    </html>
  )
}

