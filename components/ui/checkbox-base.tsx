"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Figma icon assets
const CHECK_ICON_URL = "https://www.figma.com/api/mcp/asset/aa44113c-d583-4584-bd4f-6e33bb2d1662"
const MINUS_ICON_URL = "https://www.figma.com/api/mcp/asset/a8a33d77-3e54-4f8c-80b8-7da96bf707f8"

const checkboxBaseVariants = cva(
  "relative flex items-center justify-center overflow-hidden transition-all",
  {
    variants: {
      size: {
        sm: "size-4", // 16px
        md: "size-5", // 20px
      },
      type: {
        Checkbox: "",
        Radio: "rounded-full",
        "Checkbox outline": "",
      },
      checked: {
        true: "",
        false: "",
      },
      indeterminate: {
        true: "",
        false: "",
      },
      state: {
        Default: "",
        Hover: "cursor-pointer",
        Focused: "",
        Disabled: "cursor-not-allowed",
      },
    },
    compoundVariants: [
      // Unchecked - Checkbox - Default
      {
        checked: false,
        indeterminate: false,
        type: "Checkbox",
        size: "sm",
        state: "Default",
        className: "border border-[var(--color-border-subtle)] rounded-[4px]",
      },
      {
        checked: false,
        indeterminate: false,
        type: "Checkbox",
        size: "md",
        state: "Default",
        className: "border border-[var(--color-border-subtle)] rounded-[6px]",
      },
      // Unchecked - Radio - Default
      {
        checked: false,
        indeterminate: false,
        type: "Radio",
        state: "Default",
        className: "border border-[var(--color-border-subtle)] rounded-full",
      },
      // Unchecked - Hover
      {
        checked: false,
        indeterminate: false,
        state: "Hover",
        className: "border border-[var(--color-border)]",
      },
      // Unchecked - Focused
      {
        checked: false,
        indeterminate: false,
        type: "Checkbox",
        state: "Focused",
        className: "bg-[var(--color-background)] border border-[var(--color-border-subtle)] shadow-[0px_0px_0px_4px_rgba(152,162,179,0.14)]",
      },
      {
        checked: false,
        indeterminate: false,
        type: "Radio",
        state: "Focused",
        className: "bg-[var(--color-background)] border border-[var(--color-border-subtle)] shadow-[0px_0px_0px_4px_rgba(152,162,179,0.14)] rounded-full",
      },
      // Unchecked - Disabled
      {
        checked: false,
        indeterminate: false,
        type: "Checkbox",
        size: "sm",
        state: "Disabled",
        className: "bg-[var(--color-background-subtle)] border border-[var(--color-border-tertiary)] rounded-[4px]",
      },
      {
        checked: false,
        indeterminate: false,
        type: "Checkbox",
        size: "md",
        state: "Disabled",
        className: "bg-[var(--color-background-subtle)] border border-[var(--color-border-tertiary)] rounded-[6px]",
      },
      {
        checked: false,
        indeterminate: false,
        type: "Radio",
        state: "Disabled",
        className: "bg-[var(--color-background-subtle)] border border-[var(--color-border-tertiary)] rounded-full",
      },
      // Checked - Checkbox - Default
      {
        checked: true,
        indeterminate: false,
        type: "Checkbox",
        size: "sm",
        state: "Default",
        className: "bg-[var(--color-primary)] rounded-[4px]",
      },
      {
        checked: true,
        indeterminate: false,
        type: "Checkbox",
        size: "md",
        state: "Default",
        className: "bg-[var(--color-primary)] rounded-[6px]",
      },
      // Checked - Checkbox outline - Default
      {
        checked: true,
        indeterminate: false,
        type: "Checkbox outline",
        size: "sm",
        state: "Default",
        className: "border border-[#648ef9] rounded-[4px]",
      },
      {
        checked: true,
        indeterminate: false,
        type: "Checkbox outline",
        size: "md",
        state: "Default",
        className: "border border-[#648ef9] rounded-[6px]",
      },
      // Checked - Radio - Default
      {
        checked: true,
        indeterminate: false,
        type: "Radio",
        state: "Default",
        className: "bg-[var(--color-primary)] rounded-full",
      },
      // Checked - Hover
      {
        checked: true,
        indeterminate: false,
        state: "Hover",
        className: "bg-[var(--color-primary)]",
      },
      {
        checked: true,
        indeterminate: false,
        type: "Checkbox outline",
        state: "Hover",
        className: "border border-[#648ef9]",
      },
      // Checked - Focused
      {
        checked: true,
        indeterminate: false,
        state: "Focused",
        className: "bg-[var(--color-primary)] shadow-[0px_0px_0px_4px_rgba(100,142,249,0.24)]",
      },
      {
        checked: true,
        indeterminate: false,
        type: "Checkbox outline",
        state: "Focused",
        className: "border border-[#648ef9] shadow-[0px_0px_0px_4px_rgba(100,142,249,0.24)]",
      },
      // Checked - Disabled
      {
        checked: true,
        indeterminate: false,
        type: "Checkbox",
        size: "sm",
        state: "Disabled",
        className: "bg-[var(--color-background-subtle)] border border-[var(--color-border-tertiary)] rounded-[4px]",
      },
      {
        checked: true,
        indeterminate: false,
        type: "Checkbox",
        size: "md",
        state: "Disabled",
        className: "bg-[var(--color-background-subtle)] border border-[var(--color-border-tertiary)] rounded-[6px]",
      },
      {
        checked: true,
        indeterminate: false,
        type: "Checkbox outline",
        size: "sm",
        state: "Disabled",
        className: "bg-[var(--color-background-subtle)] border border-[var(--color-border-tertiary)] rounded-[4px]",
      },
      {
        checked: true,
        indeterminate: false,
        type: "Checkbox outline",
        size: "md",
        state: "Disabled",
        className: "bg-[var(--color-background-subtle)] border border-[var(--color-border-tertiary)] rounded-[6px]",
      },
      {
        checked: true,
        indeterminate: false,
        type: "Radio",
        state: "Disabled",
        className: "bg-[var(--color-background-subtle)] border border-[var(--color-border-tertiary)] rounded-full",
      },
      // Indeterminate - Checkbox - Default
      {
        checked: true,
        indeterminate: true,
        type: "Checkbox",
        size: "sm",
        state: "Default",
        className: "bg-[var(--color-primary)] rounded-[4px]",
      },
      {
        checked: true,
        indeterminate: true,
        type: "Checkbox",
        size: "md",
        state: "Default",
        className: "bg-[var(--color-primary)] rounded-[6px]",
      },
      // Indeterminate - Hover
      {
        checked: true,
        indeterminate: true,
        state: "Hover",
        className: "bg-[var(--color-primary)]",
      },
      // Indeterminate - Focused
      {
        checked: true,
        indeterminate: true,
        state: "Focused",
        className: "bg-[var(--color-primary)] shadow-[0px_0px_0px_4px_rgba(100,142,249,0.24)]",
      },
      // Indeterminate - Disabled
      {
        checked: true,
        indeterminate: true,
        type: "Checkbox",
        size: "sm",
        state: "Disabled",
        className: "bg-[var(--color-background-subtle)] border border-[var(--color-border-tertiary)] rounded-[4px]",
      },
      {
        checked: true,
        indeterminate: true,
        type: "Checkbox",
        size: "md",
        state: "Disabled",
        className: "bg-[var(--color-background-subtle)] border border-[var(--color-border-tertiary)] rounded-[6px]",
      },
    ],
    defaultVariants: {
      size: "sm",
      type: "Checkbox",
      checked: false,
      indeterminate: false,
      state: "Default",
    },
  }
)

export type CheckboxBaseSize = "sm" | "md"
export type CheckboxBaseType = "Checkbox" | "Radio" | "Checkbox outline"
export type CheckboxBaseState = "Default" | "Hover" | "Focused" | "Disabled"

export interface CheckboxBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof checkboxBaseVariants> {
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean
  /**
   * Whether the checkbox is in indeterminate state
   */
  indeterminate?: boolean
  /**
   * Size of the checkbox
   */
  size?: CheckboxBaseSize
  /**
   * Type of checkbox (Checkbox, Radio, or Checkbox outline)
   */
  type?: CheckboxBaseType
  /**
   * Visual state of the checkbox
   */
  state?: CheckboxBaseState
}

export function CheckboxBase({
  checked = false,
  indeterminate = false,
  size = "sm",
  type = "Checkbox",
  state = "Default",
  className,
  ...props
}: CheckboxBaseProps) {
  const isChecked = checked || indeterminate
  const isDisabled = state === "Disabled"
  const iconSize = size === "sm" ? 12 : 16

  // Radio button inner circle
  if (type === "Radio" && isChecked) {
    const innerSize = size === "sm" ? "31.25%" : "30%"
    return (
      <div
        className={cn(checkboxBaseVariants({ size, type, checked, indeterminate, state }), className)}
        {...props}
      >
        <div
          className={cn(
            "absolute rounded-full",
            size === "sm" ? "inset-[31.25%]" : "inset-[30%]",
            isDisabled ? "bg-[#bbbfcc]" : "bg-[var(--color-foreground-white)]"
          )}
        />
      </div>
    )
  }

  // Checkbox with check or minus icon
  if (isChecked && type !== "Radio") {
    return (
      <div
        className={cn(checkboxBaseVariants({ size, type, checked, indeterminate, state }), className)}
        {...props}
      >
        {indeterminate ? (
          <div className={cn("absolute overflow-hidden", size === "sm" ? "inset-[12.5%]" : "inset-[10%]")}>
            <div className="absolute inset-[45.83%_16.67%]">
              <div className={cn("absolute", size === "sm" ? "inset-[-100%_-12.5%]" : "inset-[-75%_-9.37%]")}>
                <img
                  src={MINUS_ICON_URL}
                  alt="Indeterminate"
                  className="block max-w-none size-full"
                  style={{
                    filter: isDisabled ? "brightness(0) saturate(100%) invert(72%) sepia(5%) saturate(500%) hue-rotate(202deg) brightness(95%) contrast(88%)" : "none"
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden" style={{ width: iconSize, height: iconSize }}>
            <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]">
              <div className={cn("absolute", size === "sm" ? "inset-[-7.69%_-5.56%]" : "inset-[-5.77%_-4.17%]")}>
                <img
                  src={CHECK_ICON_URL}
                  alt="Checked"
                  className="block max-w-none size-full"
                  style={{
                    filter: isDisabled ? "brightness(0) saturate(100%) invert(72%) sepia(5%) saturate(500%) hue-rotate(202deg) brightness(95%) contrast(88%)" : "none"
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Unchecked state
  return (
    <div
      className={cn(checkboxBaseVariants({ size, type, checked, indeterminate, state }), className)}
      {...props}
    />
  )
}
