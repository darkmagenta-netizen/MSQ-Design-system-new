"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MSQLogoProps {
  /**
   * Logo variant: horizontal, vertical, icon, app_icon, or circle (for header/nav)
   */
  variant?: "horizontal" | "vertical" | "icon" | "app_icon" | "circle"
  /**
   * Size for the logo (width for horizontal/vertical, or both dimensions for icon/app_icon)
   */
  size?: number | string
  /**
   * When true (default), in dark mode the logo is inverted to white. Set to false to keep the logo blue in dark mode.
   */
  invertInDarkMode?: boolean
  /**
   * Additional className
   */
  className?: string
}

// Local paths: public/logos "Type={type}, size={size}.svg"
const msqLogoFiles: Record<Exclude<MSQLogoProps["variant"], undefined>, string> = {
  horizontal: "Type=logo_horizontal, size=32",
  vertical: "Type=logo_vertical, size=80",
  icon: "Type=icon, size=24",
  app_icon: "Type=app_icon, size=110",
  circle: "msq-circle", // no Type= variant; use legacy filename
}

const logoImages = {
  horizontal: `/logos/${encodeURIComponent(msqLogoFiles.horizontal)}.svg`,
  vertical: `/logos/${encodeURIComponent(msqLogoFiles.vertical)}.svg`,
  icon: `/logos/${encodeURIComponent(msqLogoFiles.icon)}.svg`,
  app_icon: `/logos/${encodeURIComponent(msqLogoFiles.app_icon)}.svg`,
  circle: "/logos/msq-circle.svg",
}

const logoDimensions = {
  horizontal: { width: 145, height: 32, aspectRatio: 145 / 32 },
  vertical: { width: 59, height: 80, aspectRatio: 59 / 80 },
  icon: { width: 24, height: 24, aspectRatio: 1 },
  app_icon: { width: 110, height: 110, aspectRatio: 1 },
  circle: { width: 48, height: 48, aspectRatio: 1 },
}

export function MSQLogo({ variant = "horizontal", size, invertInDarkMode = true, className }: MSQLogoProps) {
  const dimensions = logoDimensions[variant]
  
  // Calculate dimensions
  let width: number | string
  let height: number | string
  
  if (size) {
    const sizeNum = typeof size === "number" ? size : parseInt(size.toString().replace("px", "")) || dimensions.width
    
    if (variant === "vertical") {
      // For vertical logo, use size as width and set height to 30px
      width = sizeNum
      height = 30
    } else if (variant === "horizontal") {
      // For horizontal logo, use size as width and set height to 40px
      width = sizeNum
      height = 40
    } else {
      // For other variants, use square dimensions (same width and height)
      width = sizeNum
      height = sizeNum
    }
  } else {
    // Use default dimensions maintaining aspect ratio
    width = dimensions.width
    height = dimensions.height
  }

  const [imageError, setImageError] = React.useState(false)

  const imageUrl = logoImages[variant]

  if (imageError) {
    return (
      <div
        className={cn("flex items-center justify-center bg-muted text-muted-foreground text-xs font-semibold", className)}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
        }}
      >
        MSQ
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt="MSQ Logo"
      className={cn("flex-shrink-0", invertInDarkMode && "dark:brightness-0 dark:invert", className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        objectFit: "contain",
      }}
      onError={() => setImageError(true)}
    />
  )
}
