"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Bank names match public/logos/Bank logos filenames: state={name}.svg
export interface BankLogoProps {
  /**
   * Bank name (matches filename: state={name}.svg in public/logos/Bank logos)
   */
  bank: string
  /**
   * Size of the logo (default: 40px)
   */
  size?: number | string
  /**
   * Additional className
   */
  className?: string
}

function getBankLogoPath(bank: string): string {
  return `/logos/${encodeURIComponent("Bank logos")}/state=${encodeURIComponent(bank)}.svg`
}

export function BankLogo({ bank, size = 40, className }: BankLogoProps) {
  const logoSize = typeof size === "number" ? `${size}px` : size

  return (
    <img
      src={getBankLogoPath(bank)}
      alt={`${bank} Logo`}
      className={cn("flex-shrink-0 object-contain", className)}
      style={{
        width: logoSize,
        height: logoSize,
      }}
    />
  )
}
