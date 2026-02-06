import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-provider"
import { LanguageProvider } from "@/lib/language-provider"

// Use system font stack instead of Google Fonts to avoid network issues
const fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

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
      <body style={{ fontFamily }}>
        <ThemeProvider defaultTheme="light" storageKey="msq-theme">
          <LanguageProvider defaultLanguage="eng" storageKey="msq-language">
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

