"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /**
   * Controlled state of the toggle.
   */
  checked?: boolean
  /**
   * Uncontrolled initial state of the toggle.
   */
  defaultChecked?: boolean
  /**
   * Called whenever the checked state changes (controlled or uncontrolled).
   */
  onCheckedChange?: (checked: boolean) => void
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, checked, defaultChecked = false, onCheckedChange, disabled, onClick, ...props }, ref) => {
    const isControlled = checked !== undefined
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked)
    const isChecked = isControlled ? checked : uncontrolledChecked

    const setChecked = React.useCallback(
      (next: boolean) => {
        if (!isControlled) setUncontrolledChecked(next)
        onCheckedChange?.(next)
      },
      [isControlled, onCheckedChange]
    )

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={!!isChecked}
        disabled={disabled}
        data-state={isChecked ? "checked" : "unchecked"}
        className={cn(
          "group relative inline-flex h-[18px] w-[36px] shrink-0 items-center rounded-full transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
          "disabled:cursor-not-allowed",
          // Track colors (matches Figma tokens)
          "bg-[var(--color-border-tertiary)] hover:bg-[var(--color-border-subtle)]",
          "data-[state=checked]:bg-[var(--color-primary)] data-[state=checked]:hover:bg-[var(--color-primary-hover)]",
          // Disabled track
          "disabled:bg-[var(--color-background-subtle)] disabled:hover:bg-[var(--color-background-subtle)]",
          "disabled:data-[state=checked]:bg-[color-mix(in_srgb,var(--color-primary)_15%,var(--color-background))]",
          className
        )}
        onClick={(e) => {
          onClick?.(e)
          if (e.defaultPrevented || disabled) return
          setChecked(!isChecked)
        }}
        {...props}
      >
        {/* Thumb */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-[3px] top-[3px] flex h-[12px] w-[12px] items-center justify-center rounded-full bg-[var(--color-background)]",
            "border border-[var(--color-border-subtle)]",
            "transition-transform",
            "group-data-[state=checked]:translate-x-[18px]"
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-[6px] w-[6px] rounded-full transition-colors",
              "bg-[var(--color-border-subtle)]",
              "group-data-[state=checked]:bg-[var(--color-primary)]",
              "group-data-[state=checked]:group-hover:bg-[var(--color-primary-hover)]",
              "group-disabled:bg-[var(--color-border-disabled-subtle)]"
            )}
          />
        </span>
      </button>
    )
  }
)

Toggle.displayName = "Toggle"

