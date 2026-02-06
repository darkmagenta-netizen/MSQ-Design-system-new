"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cryptoLogoVariants = cva(
  "relative flex-shrink-0 flex items-center justify-center overflow-hidden",
  {
    variants: {
      shape: {
        Circle: "rounded-full",
        Square: "rounded-[12px]",
      },
    },
    defaultVariants: {
      shape: "Circle",
    },
  }
)

export type CryptoType =
  | "BTC"
  | "MATIC"
  | "SHIB"
  | "USDT"
  | "KRW"
  | "USDC"
  | "MSQ"

export type CryptoSize = "xl" | "lg" | "md" | "sm"
export type CryptoShape = "Circle" | "Square"
export type CryptoTheme = "Colored" | "Light"

export interface CryptoLogoProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof cryptoLogoVariants> {
  /**
   * Cryptocurrency type
   */
  crypto: CryptoType
  /**
   * Size of the logo
   */
  size?: CryptoSize | number
  /**
   * Shape of the container
   */
  shape?: CryptoShape
  /**
   * Theme variant (Colored or Light)
   */
  theme?: CryptoTheme
}

// Size mappings
const sizeMap: Record<CryptoSize, number> = {
  xl: 56,
  lg: 48,
  md: 40,
  sm: 32,
}

// SVG filenames in public/logos follow Figma export naming:
// {prefix}-circle.svg, {prefix}-square.svg, {prefix}-white-circle.svg, {prefix}-white-square.svg
// KRW uses prefix "won" (won-circle.svg etc.); others use lowercase crypto code.
const cryptoFilePrefix: Record<CryptoType, string> = {
  BTC: "btc",
  MATIC: "matic",
  SHIB: "shib",
  USDT: "usdt",
  KRW: "won",
  USDC: "usdc",
  MSQ: "msq",
}

// Structure: crypto[theme][shape][size] — paths follow Figma export naming in public/logos
type LogoUrls = Record<CryptoType, Record<CryptoTheme, Record<CryptoShape, Record<CryptoSize, string>>>>
function buildLogoUrls(): LogoUrls {
  const urls = {} as LogoUrls
  const sizes = { xl: "", lg: "", md: "", sm: "" }
  for (const crypto of (["BTC", "MATIC", "SHIB", "USDT", "KRW", "USDC", "MSQ"] as CryptoType[])) {
    const prefix = cryptoFilePrefix[crypto]
    urls[crypto] = {
      Colored: {
        Circle: { ...sizes, xl: `/logos/${prefix}-circle.svg`, lg: `/logos/${prefix}-circle.svg`, md: `/logos/${prefix}-circle.svg`, sm: `/logos/${prefix}-circle.svg` },
        Square: { ...sizes, xl: `/logos/${prefix}-square.svg`, lg: `/logos/${prefix}-square.svg`, md: `/logos/${prefix}-square.svg`, sm: `/logos/${prefix}-square.svg` },
      },
      Light: {
        Circle: { ...sizes, xl: `/logos/${prefix}-white-circle.svg`, lg: `/logos/${prefix}-white-circle.svg`, md: `/logos/${prefix}-white-circle.svg`, sm: `/logos/${prefix}-white-circle.svg` },
        Square: { ...sizes, xl: `/logos/${prefix}-white-square.svg`, lg: `/logos/${prefix}-white-square.svg`, md: `/logos/${prefix}-white-square.svg`, sm: `/logos/${prefix}-white-square.svg` },
      },
    }
  }
  return urls
}
const logoUrls = buildLogoUrls()

// Background colors for colored theme (for square shapes)
const coloredBackgrounds: Record<CryptoType, string> = {
  BTC: "#f7931a", // Bitcoin orange
  MATIC: "#8247e5", // Polygon purple
  SHIB: "#e62e2e", // Shiba Inu red
  USDT: "#26a17b", // Tether teal
  KRW: "#000000", // Won black
  USDC: "#2775ca", // USD Coin blue
  MSQ: "#2960ec", // MSQ blue
}

// Background colors for light theme (for square shapes)
const lightBackgrounds: Record<CryptoType, string> = {
  BTC: "#ffffff",
  MATIC: "#ffffff",
  SHIB: "#ffffff",
  USDT: "#ffffff",
  KRW: "#ffffff",
  USDC: "#ffffff",
  MSQ: "#ffffff",
}

// Border colors for light theme
const lightBorders: Record<CryptoType, string> = {
  BTC: "#f7931a",
  MATIC: "#8247e5",
  SHIB: "#e62e2e",
  USDT: "#26a17b",
  KRW: "#000000",
  USDC: "#2775ca",
  MSQ: "#2960ec",
}

export function CryptoLogo({
  crypto,
  size = "md",
  shape = "Circle",
  theme = "Colored",
  className,
  ...props
}: CryptoLogoProps) {
  const logoSize = typeof size === "number" ? size : sizeMap[size]
  const sizeKey: CryptoSize = typeof size === "number" ? "md" : size
  
  // Get logo URL with fallback: try specific size, then xl, then md, then empty string
  const getLogoUrl = (): string => {
    const urls = logoUrls[crypto]?.[theme]?.[shape]
    if (!urls) return ""
    return urls[sizeKey] || urls.xl || urls.md || urls.lg || urls.sm || ""
  }
  
  const logoUrl = getLogoUrl()
  const isSquare = shape === "Square"
  const isLight = theme === "Light"

  // Background and border styles
  let background: string | undefined
  let border: string | undefined

  if (isSquare) {
    if (isLight) {
      background = lightBackgrounds[crypto]
      border = `1px solid ${lightBorders[crypto]}`
    } else {
      background = coloredBackgrounds[crypto]
    }
  } else if (isLight) {
    // Circle with light theme has border
    border = `1px solid ${lightBorders[crypto]}`
    background = lightBackgrounds[crypto]
  }

  const [imageError, setImageError] = React.useState(false)

  // Show fallback if image fails to load
  if (imageError || !logoUrl) {
    return (
      <div
        className={cn(cryptoLogoVariants({ shape }), className)}
        style={{
          width: `${logoSize}px`,
          height: `${logoSize}px`,
          background,
          border,
        }}
        {...props}
      >
        <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
          {crypto}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(cryptoLogoVariants({ shape }), className)}
      style={{
        width: `${logoSize}px`,
        height: `${logoSize}px`,
        background,
        border,
      }}
      {...props}
    >
      <img
        src={logoUrl}
        alt={`${crypto} Logo`}
        className="w-full h-full"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          padding: isLight && isSquare ? "8px" : "0px",
        }}
        onError={() => {
          console.error(`Failed to load ${crypto} logo from:`, logoUrl)
          setImageError(true)
        }}
      />
    </div>
  )
}
