"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckboxBase, type CheckboxBaseSize, type CheckboxBaseType, type CheckboxBaseState } from "./checkbox-base"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /**
   * Size of the checkbox
   */
  size?: CheckboxBaseSize
  /**
   * Type of checkbox (Checkbox or Radio)
   */
  type?: "Checkbox" | "Radio"
  /**
   * Whether the checkbox is in indeterminate state
   */
  indeterminate?: boolean
  /**
   * Label text for the checkbox
   */
  label?: string
  /**
   * Supporting text below the label
   */
  supportingText?: string
  /**
   * Whether to show supporting text
   */
  showSupportingText?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size = "sm",
      type = "Checkbox",
      indeterminate = false,
      checked,
      disabled,
      label,
      supportingText = "Save my login details for next time.",
      showSupportingText = false,
      onChange,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLInputElement>) => {
      setIsHovered(true)
      onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
      setIsHovered(false)
      onMouseLeave?.(e)
    }

    const state: CheckboxBaseState = disabled
      ? "Disabled"
      : isFocused
        ? "Focused"
        : isHovered
          ? "Hover"
          : "Default"

    const checkboxBase = (
      <CheckboxBase
        checked={checked}
        indeterminate={indeterminate}
        size={size}
        type={type as CheckboxBaseType}
        state={state}
      />
    )

    // If no label, return just the checkbox base
    if (!label) {
      return (
        <label
          className={cn("relative inline-flex items-center justify-center cursor-pointer", className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <input
            type={type === "Radio" ? "radio" : "checkbox"}
            className="sr-only peer"
            ref={ref}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {checkboxBase}
        </label>
      )
    }

    // With label and supporting text
    const gap = size === "sm" ? "gap-2" : "gap-3"
    const textSize = size === "sm" ? "text-sm" : "text-base"
    const supportingTextSize = size === "sm" ? "text-sm" : "text-base"

    return (
      <label
        className={cn(
          "flex items-start cursor-pointer",
          gap,
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-center pt-0.5 shrink-0">
          <input
            type={type === "Radio" ? "radio" : "checkbox"}
            className="sr-only peer"
            ref={ref}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {checkboxBase}
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <p
            className={cn(
              "font-medium text-[var(--color-text-secondary)]",
              textSize,
              size === "sm" ? "leading-5 tracking-[0.224px]" : "leading-5 tracking-[-0.32px]"
            )}
          >
            {label}
          </p>
          {showSupportingText && supportingText && (
            <p
              className={cn(
                "font-normal text-[var(--color-text-tertiary)] mt-0.5",
                supportingTextSize,
                size === "sm" ? "leading-5 tracking-[0.224px]" : "leading-6 tracking-[0.256px]"
              )}
            >
              {supportingText}
            </p>
          )}
        </div>
      </label>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
