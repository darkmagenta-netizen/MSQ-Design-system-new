"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { iconComponents } from "@/components/icons/icons"

const tabsVariants = cva("items-center", {
  variants: {
    variant: {
      default: "flex gap-1",
      underline: "grid gap-0 relative border-b border-[var(--color-border-subtle)]",
      filled: "grid gap-1",
      color: "grid gap-1",
      filter: "flex gap-2 flex-wrap",
      select: "flex gap-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const tabItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "px-3 py-2 rounded-[var(--radius-sm)] flex-none w-fit text-sm leading-5 tracking-[0.224px]",
        underline: "px-0 py-2 relative flex-1 min-w-0",
        filled: "px-3 py-2 rounded-[var(--radius-xs)] flex-1 min-w-0 text-base leading-6 tracking-[0.256px]",
        color: "px-3 py-2 rounded-[var(--radius-xs)] flex-1 min-w-0 text-base leading-6 tracking-[0.256px]",
        filter: "h-[38px] px-3 py-2 rounded-[var(--radius-xs)] border border-[var(--color-border-subtle)] bg-[var(--color-background)] text-sm leading-5 tracking-[0.224px]",
        select: "px-8 py-2 border border-[var(--color-border-subtle)] text-sm leading-5 tracking-[0.224px]",
      },
      state: {
        default: "",
        selected: "",
      },
    },
    compoundVariants: [
      // Default variant
      {
        variant: "default",
        state: "default",
        className: "text-[var(--color-text-tertiary-hover)] hover:text-[var(--color-text-secondary)]",
      },
      {
        variant: "default",
        state: "selected",
        className: "bg-[var(--color-primary)] text-[var(--color-text-on-primary)]",
      },
      // Underline variant
      {
        variant: "underline",
        state: "default",
        className: "text-[var(--color-text-tertiary)] text-base leading-6 tracking-[0.256px]",
      },
      {
        variant: "underline",
        state: "selected",
        className: "text-[var(--color-primary)] text-base leading-6 tracking-[0.256px]",
      },
      // Filled variant
      {
        variant: "filled",
        state: "default",
        className: "bg-[var(--color-background)] text-[var(--color-text-tertiary)]",
      },
      {
        variant: "filled",
        state: "selected",
        className: "bg-[var(--color-background)] text-[var(--color-primary)]",
      },
      // Color variant
      {
        variant: "color",
        state: "default",
        className: "bg-[var(--color-background)] text-[var(--color-text-tertiary)]",
      },
      {
        variant: "color",
        state: "selected",
        className: "bg-[var(--color-primary)] text-[var(--color-text-on-primary)]",
      },
      // Filter variant
      {
        variant: "filter",
        state: "default",
        className: "text-[var(--color-text-primary)]",
      },
      {
        variant: "filter",
        state: "selected",
        className: "bg-[var(--color-primary)] text-[var(--color-text-on-primary)] border-[var(--color-primary)]",
      },
      // Select variant
      {
        variant: "select",
        state: "default",
        className: "text-[var(--color-text-tertiary-hover)] bg-[var(--color-background)]",
      },
      {
        variant: "select",
        state: "selected",
        className: "bg-[var(--color-primary-hover)] text-[var(--color-text-on-primary)] border-[var(--color-primary-hover)]",
      },
    ],
    defaultVariants: {
      variant: "default",
      state: "default",
    },
  }
)

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
  variant?: "default" | "underline" | "filled" | "color" | "filter" | "select"
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: "default" | "underline" | "filled" | "color" | "filter" | "select"
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value: controlledValue, onValueChange, variant = "default", children, className, ...props }, ref) => {
    // If controlled (value provided), use it. Otherwise use defaultValue or empty string
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
    const value = controlledValue ?? internalValue
    const handleValueChange = onValueChange ?? setInternalValue

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange, variant }}>
        <div ref={ref} className={cn(tabsVariants({ variant }), className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

Tabs.displayName = "Tabs"

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "underline" | "filled" | "color" | "filter" | "select"
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    const tabVariant = variant ?? context?.variant ?? "default"

    const baseClasses =
      tabVariant === "default"
        ? "inline-flex items-center max-w-full overflow-x-auto"
        : tabVariant === "filter"
          ? "flex items-center gap-2 flex-wrap"
          : "flex items-center w-full"

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          tabVariant === "select" && "gap-0",
          className
        )}
        {...props}
      />
    )
  }
)

TabsList.displayName = "TabsList"

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  icon?: string | React.ReactNode
  iconPosition?: "left" | "right"
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, icon, iconPosition = "left", children, title, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    if (!context) throw new Error("TabsTrigger must be used within Tabs")

    const isActive = context.value === value
    const variant = context.variant ?? "default"
    const computedTitle = title ?? (typeof children === "string" ? children : undefined)

    // Handle icon rendering
    const IconComponent = typeof icon === "string" ? iconComponents[icon]?.component : null
    const iconElement = icon ? (
      typeof icon === "string" && IconComponent ? (
        React.createElement(IconComponent, { size: 20 })
      ) : (
        icon
      )
    ) : null

    // Select variant special handling (first, middle, last)
    const selectClasses = variant === "select" && {
      first: "rounded-bl-[var(--radius-xs)] rounded-tl-[var(--radius-xs)] border-l border-t border-b",
      middle: "border-t border-b border-l",
      last: "rounded-br-[var(--radius-xs)] rounded-tr-[var(--radius-xs)] border-t border-b border-r",
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          tabItemVariants({ variant, state: isActive ? "selected" : "default" }),
          variant === "select" && "first:rounded-bl-[var(--radius-xs)] first:rounded-tl-[var(--radius-xs)] first:border-l first:border-t first:border-b last:rounded-br-[var(--radius-xs)] last:rounded-tr-[var(--radius-xs)] last:border-t last:border-b last:border-r [&:not(:first-child):not(:last-child)]:border-t [&:not(:first-child):not(:last-child)]:border-b [&:not(:first-child):not(:last-child)]:border-l",
          className
        )}
        onClick={() => context.onValueChange(value)}
        title={computedTitle}
        {...props}
      >
        <div className="flex items-center gap-1 min-w-0">
          {iconPosition === "left" && iconElement && <span className="flex-shrink-0">{iconElement}</span>}
          {children && <span>{children}</span>}
          {iconPosition === "right" && iconElement && <span className="flex-shrink-0">{iconElement}</span>}
        </div>
        {/* Underline indicator */}
        {variant === "underline" && isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
        )}
      </button>
    )
  }
)

TabsTrigger.displayName = "TabsTrigger"

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    if (!context) throw new Error("TabsContent must be used within Tabs")

    if (context.value !== value) return null

    return (
      <div
        ref={ref}
        className={cn("mt-2 focus-visible:outline-none", className)}
        {...props}
      />
    )
  }
)

TabsContent.displayName = "TabsContent"

export { tabsVariants, tabItemVariants }
