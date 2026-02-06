"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type MobileLogoType = "KWT" | "MSQ" | "MSQP" | "P2UP" | "SuperSave circle" | "Super Save" | "Dollar coin" | "WON" | "USDT" | "MATIC"
export type LogoShape = "Default" | "Square" | "Circle"

export interface MobileLogoProps {
  /**
   * Logo type
   */
  logo?: MobileLogoType
  /**
   * Shape: Default, Square, or Circle
   */
  shape?: LogoShape
  /**
   * Size of the logo (default: 40px)
   */
  size?: number | string
  /**
   * Additional className
   */
  className?: string
}

// Build path: public/logos uses "Logo={name}, Shape={shape}.svg" (or .png for MATIC/MSQP)
function getMobileLogoPath(logo: MobileLogoType, shape: LogoShape): string {
  const fileName = `Logo=${logo}, Shape=${shape}`
  const ext = (logo === "MATIC" || logo === "MSQP") && (shape === "Circle" || shape === "Square") ? "png" : "svg"
  return `/logos/${encodeURIComponent(fileName)}.${ext}`
}

// Background colors and styles for each logo
const logoStyles: Record<string, { bg: string; borderRadius: string }> = {
  "KWT": { bg: "rgba(0,0,0,0.08)", borderRadius: "100px" },
  "MSQ": { bg: "var(--color-primary, #2960ec)", borderRadius: "100px" },
  "MSQP": { bg: "linear-gradient(to bottom, #15498f 13.542%, #47bdb3 78.745%)", borderRadius: "100px" },
  "P2UP": { bg: "linear-gradient(to bottom, #11338c 13.542%, #3768a4 78.745%)", borderRadius: "100px" },
  "SuperSave circle": { bg: "#364291", borderRadius: "100px" },
  "Super Save": { bg: "transparent", borderRadius: "100px" },
  "Dollar coin": { bg: "transparent", borderRadius: "100px" },
  "WON": { bg: "transparent", borderRadius: "100px" },
  "USDT": { bg: "transparent", borderRadius: "0px" },
  "MATIC": { bg: "#8247e5", borderRadius: "100px" },
}

const squareStyles: Record<string, { bg: string; borderRadius: string }> = {
  "MSQ": { bg: "var(--color-primary, #2960ec)", borderRadius: "12px" },
  "MSQP": { bg: "linear-gradient(to bottom, #15498f 13.542%, #47bdb3 78.745%)", borderRadius: "12px" },
  "P2UP": { bg: "linear-gradient(to bottom, #11338c 13.542%, #3768a4 78.745%)", borderRadius: "12px" },
  "SuperSave circle": { bg: "#364291", borderRadius: "12px" },
  "MATIC": { bg: "#8247e5", borderRadius: "12px" },
}

export function MobileLogo({ logo = "MSQ", shape = "Circle", size = 40, className }: MobileLogoProps) {
  const logoSize = typeof size === "number" ? `${size}px` : size
  const isSquare = shape === "Square"
  const isCircle = shape === "Circle"
  const isDefault = shape === "Default"
  
  const styles = isSquare ? squareStyles[logo] : logoStyles[logo]
  const borderRadius = isSquare ? "12px" : isCircle ? "100px" : "0px"
  const background = styles?.bg || "transparent"
  const hasGradient = background.startsWith("linear-gradient")

  const [imageError, setImageError] = React.useState(false)

  const imageUrl = getMobileLogoPath(logo, shape)

  if (imageError) {
    // Fallback: show logo text in a styled container
    return (
      <div
        className={cn("relative flex-shrink-0 flex items-center justify-center overflow-hidden text-white font-bold text-xs", className)}
        style={{
          width: logoSize,
          height: logoSize,
          background: hasGradient ? undefined : background,
          backgroundImage: hasGradient ? background : undefined,
          borderRadius,
        }}
      >
        {logo.charAt(0)}
      </div>
    )
  }

  const sizeNum = typeof size === "number" ? size : parseInt(size.toString().replace("px", "")) || 40

  return (
    <div
      className={cn("relative flex-shrink-0 flex items-center justify-center overflow-hidden", className)}
      style={{
        width: logoSize,
        height: logoSize,
        background: hasGradient ? undefined : background,
        backgroundImage: hasGradient ? background : undefined,
        borderRadius,
      }}
    >
      <img
        src={imageUrl}
        alt={`${logo} Logo`}
        className="w-full h-full"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        onError={() => setImageError(true)}
      />
    </div>
  )
}
