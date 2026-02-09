"use client"

import * as React from "react"
import { useTheme } from "@/lib/theme-provider"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        style={{
          width: 51,
          height: 31,
          borderRadius: 9999,
          backgroundColor: "#e5e7eb",
        }}
        aria-hidden
      />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{
        position: "relative",
        width: 51,
        height: 31,
        borderRadius: 9999,
        border: "none",
        cursor: "pointer",
        backgroundColor: "transparent",
        padding: 0,
        flexShrink: 0,
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      role="switch"
      aria-checked={isDark}
    >
      {/* Track - always visible with inline style */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 9999,
          backgroundColor: isDark ? "#34C759" : "#e5e7eb",
        }}
      />
      {/* Thumb - always visible with inline style */}
      <span
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 27,
          height: 27,
          borderRadius: 9999,
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          transform: isDark ? "translateX(22px)" : "translateX(2px)",
          transition: "transform 0.2s ease",
        }}
      >
        {isDark ? (
          <Moon size={14} color="#1f2937" />
        ) : (
          <Sun size={14} color="#f59e0b" />
        )}
      </span>
    </button>
  )
}

