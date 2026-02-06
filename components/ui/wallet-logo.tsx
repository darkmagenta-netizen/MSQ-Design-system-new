"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type WalletType = "MetaMask" | "Trust Wallet Token" | "OKX Wallet" | "Uniswap Wallet"

export interface WalletLogoProps {
  /**
   * Wallet type
   */
  wallet?: WalletType
  /**
   * Size of the logo (default: 24px)
   */
  size?: number | string
  /**
   * Additional className
   */
  className?: string
}

// Local paths: public/logos "wallet={name}.svg"
function getWalletLogoPath(wallet: WalletType): string {
  return `/logos/wallet=${encodeURIComponent(wallet)}.svg`
}

const walletDimensions: Record<WalletType, { width: number; height: number; aspectRatio: number }> = {
  "MetaMask": { width: 212, height: 212, aspectRatio: 1 },
  "Trust Wallet Token": { width: 24, height: 24, aspectRatio: 1 },
  "OKX Wallet": { width: 24, height: 24, aspectRatio: 1 },
  "Uniswap Wallet": { width: 24, height: 24, aspectRatio: 1 },
}

export function WalletLogo({ wallet = "MetaMask", size, className }: WalletLogoProps) {
  const dimensions = walletDimensions[wallet]
  const logoSize = size || dimensions.width

  return (
    <img
      src={getWalletLogoPath(wallet)}
      alt={`${wallet} Logo`}
      className={cn("flex-shrink-0", className)}
      style={{
        width: typeof logoSize === "number" ? `${logoSize}px` : logoSize,
        height: typeof logoSize === "number" ? `${logoSize}px` : logoSize,
        objectFit: "contain",
      }}
    />
  )
}
