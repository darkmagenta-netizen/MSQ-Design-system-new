"use client"

import * as React from "react"
import { useTheme } from "@/lib/theme-provider"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-[31px] w-[51px] rounded-full bg-muted" />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-[31px] w-[51px] items-center rounded-full transition-all duration-300 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "bg-gray-200 dark:bg-gray-700",
        "hover:bg-gray-300 dark:hover:bg-gray-600",
        "active:scale-95"
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      role="switch"
      aria-checked={isDark}
    >
      {/* Track background */}
      <span
        className={cn(
          "absolute inset-0 rounded-full transition-colors duration-300 ease-in-out",
          isDark ? "bg-[#34C759]" : "bg-gray-200"
        )}
      />
      
      {/* Thumb with icon */}
      <span
        className={cn(
          "relative flex h-[27px] w-[27px] items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ease-in-out",
          "transform",
          isDark ? "translate-x-[22px]" : "translate-x-[2px]"
        )}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-gray-800 transition-opacity duration-300" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500 transition-opacity duration-300" />
        )}
      </span>
    </button>
  )
}

