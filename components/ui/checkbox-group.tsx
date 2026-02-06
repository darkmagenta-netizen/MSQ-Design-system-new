"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckboxBase } from "./checkbox-base"
import { Checkbox } from "./checkbox"

export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Label text for the checkbox group
   */
  label: string
  /**
   * Supporting text below the label
   */
  supportingText?: string
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean
  /**
   * Whether the checkbox group is disabled
   */
  disabled?: boolean
  /**
   * Visual state of the checkbox group
   */
  state?: "Default" | "Hover" | "Focused" | "Disabled"
  /**
   * Size of the checkbox
   */
  size?: "sm" | "md"
  /**
   * Callback when checkbox state changes
   */
  onCheckedChange?: (checked: boolean) => void
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      className,
      label,
      supportingText = "Content will go here",
      checked = false,
      disabled = false,
      state,
      size = "sm",
      onCheckedChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled) {
        setIsHovered(true)
      }
      onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false)
      onMouseLeave?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      if (!disabled) {
        setIsFocused(true)
      }
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    const handleClick = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked)
      }
    }

    // Determine the visual state
    const visualState: "Default" | "Hover" | "Focused" | "Disabled" =
      state || (disabled ? "Disabled" : isFocused ? "Focused" : isHovered ? "Hover" : "Default")

    const isSelected = checked
    const isDisabled = visualState === "Disabled"

    // Container styles based on state
    const containerStyles = cn(
      "flex items-start justify-between p-3 rounded-lg border border-solid transition-all cursor-pointer",
      {
        // Unselected states
        "border-[var(--color-border-tertiary)] bg-transparent":
          !isSelected && visualState === "Default",
        "border-[var(--color-border)] bg-transparent":
          !isSelected && visualState === "Hover",
        "border-[#8faefc] bg-[var(--color-background)] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]":
          !isSelected && visualState === "Focused",
        "bg-[var(--color-background-subtle)] border-[var(--color-border-tertiary)] cursor-not-allowed":
          isDisabled && !isSelected,
        // Selected states
        "bg-[var(--color-background)] border-[#4375f4]":
          isSelected && (visualState === "Default" || visualState === "Hover"),
        "bg-[var(--color-background)] border-[#4375f4] shadow-[0px_0px_0px_4px_rgba(100,142,249,0.24)]":
          isSelected && visualState === "Focused",
        "bg-[var(--color-background-subtle)] border-[var(--color-border-tertiary)] cursor-not-allowed":
          isDisabled && isSelected,
      },
      className
    )

    // Text styles
    const labelStyles = cn(
      "font-medium leading-5 tracking-[-0.56px]",
      size === "sm" ? "text-sm" : "text-base",
      {
        "text-[var(--color-text-primary)]": !isDisabled && (isSelected || !isSelected),
        "text-[var(--color-text-tertiary)]": isDisabled,
      }
    )

    const supportingTextStyles = cn(
      "font-normal leading-[18px] tracking-[0.192px] text-xs",
      {
        "text-[var(--color-text-tertiary)]": !isDisabled,
        "text-[var(--color-text-tertiary)]": isDisabled,
      }
    )

    return (
      <div
        ref={ref}
        className={containerStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        tabIndex={disabled ? -1 : 0}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        {...props}
      >
        <div className="flex flex-col gap-3 items-start justify-center flex-1 min-w-0">
          <p className={labelStyles}>{label}</p>
          {supportingText && <p className={supportingTextStyles}>{supportingText}</p>}
        </div>
        <div className="shrink-0">
          {isDisabled && isSelected ? (
            <CheckboxBase
              checked={true}
              size={size}
              type="Checkbox"
              state="Disabled"
            />
          ) : (
            <CheckboxBase
              checked={isSelected}
              size={size}
              type="Checkbox"
              state={visualState}
            />
          )}
        </div>
      </div>
    )
  }
)

CheckboxGroup.displayName = "CheckboxGroup"
