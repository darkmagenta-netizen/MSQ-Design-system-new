"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { iconComponents } from "@/components/icons/icons"
import { Icon, IconProps } from "@/components/icons/icon"

const navMenuVariants = cva(
  "flex flex-col gap-4",
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

export interface NavMenuItem {
  /**
   * Unique identifier for the menu item
   */
  id: string
  /**
   * Display label for the menu item
   */
  label: string
  /**
   * Icon name from iconComponents registry
   */
  icon?: string
  /**
   * Whether the item is currently active/selected
   */
  active?: boolean
  /**
   * Whether the item is disabled
   */
  disabled?: boolean
  /**
   * Optional href for navigation (if provided, renders as Link)
   */
  href?: string
  /**
   * Optional onClick handler
   */
  onClick?: () => void
  /**
   * Whether this item is expandable (has submenu)
   */
  expandable?: boolean
  /**
   * Whether the item is currently expanded
   */
  expanded?: boolean
  /**
   * Callback when expandable item is toggled
   */
  onToggle?: (id: string) => void
  /**
   * Submenu items (for expandable items)
   */
  children?: NavMenuItem[]
}

export interface NavMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof navMenuVariants> {
  /**
   * Array of menu items
   */
  items: NavMenuItem[]
  /**
   * Currently active item ID
   */
  activeItemId?: string
  /**
   * Callback when an item is clicked
   */
  onItemClick?: (item: NavMenuItem) => void
  /**
   * Width of the menu (default: 248px)
   */
  width?: string | number
}

// Fallback icons
const ChevronUpFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M7 14l5-5 5 5H7z" fill="currentColor" />
  </Icon>
))
ChevronUpFallback.displayName = "ChevronUpFallback"

const NavMenu = React.forwardRef<HTMLDivElement, NavMenuProps>(
  (
    {
      className,
      items,
      activeItemId,
      onItemClick,
      width = 248,
      ...props
    },
    ref
  ) => {
    const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set())

    const handleToggle = (itemId: string) => {
      setExpandedItems((prev) => {
        const next = new Set(prev)
        if (next.has(itemId)) {
          next.delete(itemId)
        } else {
          next.add(itemId)
        }
        return next
      })
    }

    const renderMenuItem = (item: NavMenuItem, level: number = 0) => {
      const isActive = activeItemId === item.id || item.active
      const isExpanded = expandedItems.has(item.id) || item.expanded
      const hasChildren = item.children && item.children.length > 0

      // Get icon component
      let IconComponent: React.ComponentType<IconProps> | null = null
      if (item.icon) {
        const iconData = iconComponents[item.icon]
        if (iconData?.component) {
          IconComponent = iconData.component
        }
      }

      const ChevronUpIcon = iconComponents["chevron-up"]?.component || ChevronUpFallback

      const content = (
        <div
          className={cn(
            "flex items-center gap-4 h-11 rounded-[8px] px-4 transition-colors",
            "bg-transparent hover:bg-[var(--color-background-subtle)]",
            item.disabled && "opacity-50 cursor-not-allowed",
            level > 0 && "ml-8" // Indent submenu items
          )}
        >
          {/* Icon */}
          {IconComponent && (
            <div className="flex-shrink-0 size-6 flex items-center justify-center">
              <IconComponent
                size={24}
                className={cn(
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-text-tertiary-hover)]"
                )}
              />
            </div>
          )}

          {/* Label */}
          <span
            className={cn(
              "flex-1 text-[14px] leading-[20px] tracking-[-0.224px] font-medium",
              isActive
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-text-tertiary-hover)]"
            )}
          >
            {item.label}
          </span>

          {/* Chevron for expandable items */}
          {item.expandable && (
            <div className="flex-shrink-0 size-6 flex items-center justify-center">
              <ChevronUpIcon
                size={24}
                className={cn(
                  "text-[var(--color-text-tertiary-hover)] transition-transform duration-200",
                  isExpanded && "rotate-180"
                )}
              />
            </div>
          )}
        </div>
      )

      const handleClick = () => {
        if (item.disabled) return

        if (item.expandable) {
          handleToggle(item.id)
          item.onToggle?.(item.id)
        }

        if (item.href) {
          // Navigation will be handled by Link component
          return
        }

        if (item.onClick) {
          item.onClick()
        }

        onItemClick?.(item)
      }

      return (
        <div key={item.id} className="flex flex-col">
          {item.href ? (
            <a
              href={item.href}
              onClick={handleClick}
              className="block"
            >
              {content}
            </a>
          ) : (
            <button
              type="button"
              onClick={handleClick}
              disabled={item.disabled}
              className="w-full text-left"
            >
              {content}
            </button>
          )}

          {/* Render submenu items if expanded */}
          {hasChildren && isExpanded && (
            <div className="mt-1 flex flex-col gap-1">
              {item.children!.map((child) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(navMenuVariants({ className }))}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
        }}
        {...props}
      >
        {items.map((item) => renderMenuItem(item))}
      </div>
    )
  }
)
NavMenu.displayName = "NavMenu"

export { NavMenu, navMenuVariants }
