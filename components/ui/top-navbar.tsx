"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { MSQLogo } from "./msq-logo"
import { LanguageSelector } from "./language-selector"
import { iconComponents } from "@/components/icons/icons"
import { Icon, IconProps } from "@/components/icons/icon"

const topNavbarVariants = cva(
  "flex items-center justify-between w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-background)] px-9 py-4",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TopNavbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof topNavbarVariants> {
  /**
   * User profile information
   */
  user?: {
    name: string
    nameSecondary?: string // For bilingual names
    avatar?: string
  }
  /**
   * Timezone information
   */
  timezone?: string
  /**
   * Show timezone selector
   */
  showTimezone?: boolean
  /**
   * Show user profile dropdown
   */
  showUserProfile?: boolean
  /**
   * Callback when user profile is clicked
   */
  onUserClick?: () => void
  /**
   * Callback when timezone selector is clicked
   */
  onTimezoneClick?: () => void
}

// Fallback icons
const ChevronDownFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
  </Icon>
))
ChevronDownFallback.displayName = "ChevronDownFallback"

const TopNavbar = React.forwardRef<HTMLDivElement, TopNavbarProps>(
  (
    {
      className,
      user,
      timezone = "(GMT+9:00)SEOUL",
      showTimezone = true,
      showUserProfile = true,
      onUserClick,
      onTimezoneClick,
      ...props
    },
    ref
  ) => {
    const ChevronDownIcon = iconComponents["chevron-down"]?.component || ChevronDownFallback

    return (
      <div
        ref={ref}
        className={cn(topNavbarVariants({ className }))}
        {...props}
      >
        {/* Left side - Logo */}
        <div className="flex items-center gap-2">
          <MSQLogo variant="horizontal" size={120} />
        </div>

        {/* Right side - Timezone, Language, User Profile */}
        <div className="flex items-center gap-6">
          {showTimezone && (
            <div className="flex items-center gap-3">
              {/* Timezone Selector */}
              <button
                type="button"
                onClick={onTimezoneClick}
                className={cn(
                  "flex items-center gap-2 px-4 py-3.5",
                  "bg-[var(--color-background-subtle)] border border-[var(--color-border-tertiary)] rounded-[4px]",
                  "text-[14px] leading-[20px] tracking-[0.224px] font-normal",
                  "text-[var(--color-text)]",
                  "hover:bg-[var(--color-background-hover)]",
                  "transition-colors",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1"
                )}
                style={{ width: "280px" }}
              >
                <span className="flex-1 text-left">{timezone}</span>
                <ChevronDownIcon
                  size={24}
                  className="text-[var(--color-text)] shrink-0"
                />
              </button>

              {/* Language Selector */}
              <LanguageSelector />
            </div>
          )}

          {showUserProfile && user && (
            <div className="flex items-center gap-4">
              {/* User Profile */}
              <button
                type="button"
                onClick={onUserClick}
                className={cn(
                  "flex items-center gap-3",
                  "hover:opacity-80 transition-opacity",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 rounded-md"
                )}
              >
                {/* Avatar */}
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="size-[42px] rounded-full object-cover"
                  />
                ) : (
                  <div className="size-[42px] rounded-full bg-[var(--color-background-subtle)] flex items-center justify-center">
                    <span className="text-[14px] font-medium text-[var(--color-text)]">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* User Name(s) */}
                <div className="flex flex-col items-start">
                  {user.nameSecondary && (
                    <span className="text-[14px] leading-[20px] tracking-[-0.25px] font-medium text-[var(--color-text)]">
                      {user.nameSecondary}
                    </span>
                  )}
                  <span className="text-[14px] leading-[20px] tracking-[-0.25px] font-medium text-[var(--color-text)]">
                    {user.name}
                  </span>
                </div>

                {/* Chevron */}
                <ChevronDownIcon
                  size={24}
                  className="text-[var(--color-text)] shrink-0 rotate-180"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
)
TopNavbar.displayName = "TopNavbar"

export { TopNavbar, topNavbarVariants }
