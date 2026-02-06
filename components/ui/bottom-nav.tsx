"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { iconComponents } from "@/components/icons/icons"
import { Icon, IconProps } from "@/components/icons/icon"

const bottomNavVariants = cva(
  "flex flex-col w-full bg-[var(--color-text-inverse)] border-t border-[var(--color-border-subtle)]",
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

export interface BottomNavItem {
  /**
   * Unique identifier for the nav item
   */
  id: string
  /**
   * Display label for the nav item
   */
  label: string
  /**
   * Icon name from iconComponents registry
   */
  icon: string
  /**
   * Optional href for navigation
   */
  href?: string
  /**
   * Optional onClick handler
   */
  onClick?: () => void
  /**
   * Whether the item is disabled
   */
  disabled?: boolean
}

export interface BottomNavProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof bottomNavVariants> {
  /**
   * Array of navigation items
   */
  items: BottomNavItem[]
  /**
   * Currently active item ID
   */
  activeItemId?: string
  /**
   * Callback when an item is clicked
   */
  onItemClick?: (item: BottomNavItem) => void
  /**
   * Show home indicator (iOS style) at the bottom
   */
  showHomeIndicator?: boolean
}

// Fallback icons
const HomeFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" fill="none" />
    <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" fill="none" />
  </Icon>
))
HomeFallback.displayName = "HomeFallback"

const BottomNav = React.forwardRef<HTMLDivElement, BottomNavProps>(
  (
    {
      className,
      items,
      activeItemId,
      onItemClick,
      showHomeIndicator = true,
      ...props
    },
    ref
  ) => {
    const renderNavItem = (item: BottomNavItem) => {
      const isActive = activeItemId === item.id

      // Get icon component
      let IconComponent: React.ComponentType<IconProps> | null = null
      if (item.icon) {
        const iconData = iconComponents[item.icon]
        if (iconData?.component) {
          IconComponent = iconData.component
        } else {
          // Fallback to home icon if not found
          IconComponent = HomeFallback
        }
      }

      const handleClick = () => {
        if (item.disabled) return

        if (item.href) {
          // Navigation will be handled by Link component
          return
        }

        if (item.onClick) {
          item.onClick()
        }

        onItemClick?.(item)
      }

      const content = (
        <div className="flex flex-col items-center justify-center gap-0.5 h-[50px] w-full relative">
          {/* Icon */}
          {IconComponent && (
            <div className="flex-shrink-0 size-6 flex items-center justify-center">
              <IconComponent
                size={24}
                className={cn(
                  "transition-colors",
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-text-tertiary)]"
                )}
              />
            </div>
          )}

          {/* Label */}
          <span
            className={cn(
              "text-[10px] leading-[14px] font-medium transition-colors",
              isActive
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-text-tertiary)]"
            )}
          >
            {item.label}
          </span>

          {/* Active indicator - black underline */}
          {isActive && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[20px] h-[2px] bg-[var(--color-text)] rounded-full" />
          )}
        </div>
      )

      return (
        <div key={item.id} className="flex-1">
          {item.href ? (
            <a
              href={item.href}
              onClick={handleClick}
              className={cn(
                "block",
                item.disabled && "pointer-events-none opacity-50"
              )}
            >
              {content}
            </a>
          ) : (
            <button
              type="button"
              onClick={handleClick}
              disabled={item.disabled}
              className={cn(
                "w-full h-full",
                item.disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {content}
            </button>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(bottomNavVariants({ className }))}
        {...props}
      >
        {/* Navigation Items */}
        <div className="flex items-center w-full">
          {items.map((item) => renderNavItem(item))}
        </div>

        {/* Home Indicator (iOS style) */}
        {showHomeIndicator && (
          <div className="h-[34px] w-full flex items-end justify-center pb-2">
            <div className="w-[134px] h-[5px] bg-[var(--color-text)] rounded-full" />
          </div>
        )}
      </div>
    )
  }
)
BottomNav.displayName = "BottomNav"

export { BottomNav, bottomNavVariants }
