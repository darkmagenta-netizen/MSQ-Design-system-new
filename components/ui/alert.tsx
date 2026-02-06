"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { iconComponents } from "@/components/icons/icons"
import { Icon, IconProps } from "@/components/icons/icon"

const alertVariants = cva(
  "flex items-center gap-3 rounded-md transition-colors",
  {
    variants: {
      state: {
        info: "",
        error: "",
        success: "",
        warning: "",
      },
      size: {
        sm: "h-8 px-3 py-2",
        md: "h-12 px-4 py-3",
      },
      type: {
        unselected: "border",
        filled: "",
        text: "",
      },
      interaction: {
        default: "",
        hover: "",
        selected: "",
      },
    },
    compoundVariants: [
      // Info – tokens (default/hover/selected/filled/text)
      {
        state: "info",
        type: "unselected",
        interaction: "default",
        className: "bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-alert-info-bg)]",
      },
      {
        state: "info",
        type: "unselected",
        interaction: "hover",
        className: "bg-[var(--color-alert-info-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)]",
      },
      {
        state: "info",
        type: "unselected",
        interaction: "selected",
        className: "bg-[var(--color-alert-info-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)]",
      },
      {
        state: "info",
        type: "filled",
        className: "bg-[var(--color-alert-info-bg)] text-[var(--color-text-secondary)]",
      },
      {
        state: "info",
        type: "text",
        className: "bg-transparent text-[var(--color-text-secondary)]",
      },
      // Error – design tokens (accessible light/dark)
      {
        state: "error",
        type: "unselected",
        interaction: "default",
        className: "bg-[var(--color-alert-error-bg-subtle)] border border-[var(--color-alert-error-border)] text-[var(--color-alert-error-text)] hover:bg-[var(--color-alert-error-bg)]",
      },
      {
        state: "error",
        type: "unselected",
        interaction: "hover",
        className: "bg-[var(--color-alert-error-bg)] border border-[var(--color-alert-error-border)] text-[var(--color-alert-error-text)]",
      },
      {
        state: "error",
        type: "unselected",
        interaction: "selected",
        className: "bg-[var(--color-alert-error-bg)] border border-[var(--color-alert-error-border)] text-[var(--color-alert-error-text)]",
      },
      {
        state: "error",
        type: "filled",
        className: "bg-[var(--color-alert-error-bg)] text-[var(--color-alert-error-text)]",
      },
      {
        state: "error",
        type: "text",
        className: "bg-transparent text-[var(--color-alert-error-text)]",
      },
      // Success – design tokens
      {
        state: "success",
        type: "unselected",
        interaction: "default",
        className: "bg-[var(--color-alert-success-bg-subtle)] border border-[var(--color-alert-success-border)] text-[var(--color-alert-success-text)] hover:bg-[var(--color-alert-success-bg)]",
      },
      {
        state: "success",
        type: "unselected",
        interaction: "hover",
        className: "bg-[var(--color-alert-success-bg)] border border-[var(--color-alert-success-border)] text-[var(--color-alert-success-text)]",
      },
      {
        state: "success",
        type: "unselected",
        interaction: "selected",
        className: "bg-[var(--color-alert-success-bg)] border border-[var(--color-alert-success-border)] text-[var(--color-alert-success-text)]",
      },
      {
        state: "success",
        type: "filled",
        className: "bg-[var(--color-alert-success-bg)] text-[var(--color-alert-success-text)]",
      },
      {
        state: "success",
        type: "text",
        className: "bg-transparent text-[var(--color-alert-success-text)]",
      },
      // Warning – design tokens
      {
        state: "warning",
        type: "unselected",
        interaction: "default",
        className: "bg-[var(--color-alert-warning-bg-subtle)] border border-[var(--color-alert-warning-border)] text-[var(--color-alert-warning-text)] hover:bg-[var(--color-alert-warning-bg)]",
      },
      {
        state: "warning",
        type: "unselected",
        interaction: "hover",
        className: "bg-[var(--color-alert-warning-bg)] border border-[var(--color-alert-warning-border)] text-[var(--color-alert-warning-text)]",
      },
      {
        state: "warning",
        type: "unselected",
        interaction: "selected",
        className: "bg-[var(--color-alert-warning-bg)] border border-[var(--color-alert-warning-border)] text-[var(--color-alert-warning-text)]",
      },
      {
        state: "warning",
        type: "filled",
        className: "bg-[var(--color-alert-warning-bg)] text-[var(--color-alert-warning-text)]",
      },
      {
        state: "warning",
        type: "text",
        className: "bg-transparent text-[var(--color-alert-warning-text)]",
      },
    ],
    defaultVariants: {
      state: "info",
      size: "md",
      type: "unselected",
      interaction: "default",
    },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /**
   * Alert message text
   */
  children: React.ReactNode
  /**
   * Optional icon override
   */
  icon?: React.ReactNode
  /**
   * Whether to show the icon (default: true)
   */
  showIcon?: boolean
  /**
   * Interaction state: default (unselected), hover, or selected
   * @default "default"
   */
  interaction?: "default" | "hover" | "selected"
}

// Fallback icon components
const InfoCircleFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Icon>
))
InfoCircleFallback.displayName = "InfoCircleFallback"

const AlertCircleFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Icon>
))
AlertCircleFallback.displayName = "AlertCircleFallback"

const CheckCircleFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
))
CheckCircleFallback.displayName = "CheckCircleFallback"

const AlertTriangleFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Icon>
))
AlertTriangleFallback.displayName = "AlertTriangleFallback"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, state = "info", size = "md", type = "unselected", interaction = "default", children, icon, showIcon = true, ...props }, ref) => {
    // Get icon based on state
    let IconComponent: React.ComponentType<IconProps> | null = null
    
    if (icon) {
      // Custom icon provided
      return (
        <div
          ref={ref}
          className={cn(alertVariants({ state, size, type, interaction }), className)}
          {...props}
        >
          {showIcon && <div className="flex-shrink-0">{icon}</div>}
          <p className={cn(
            "flex-1",
            size === "sm" && "text-xs leading-[18px] tracking-[-0.06px]",
            size === "md" && "text-sm leading-5 tracking-[-0.56px]"
          )}>
            {children}
          </p>
        </div>
      )
    }

    // Default icons based on state
    switch (state) {
      case "info":
        IconComponent = iconComponents["info-circle"]?.component || InfoCircleFallback
        break
      case "error":
        IconComponent = iconComponents["alert-circle"]?.component || AlertCircleFallback
        break
      case "success":
        IconComponent = iconComponents["check-circle"]?.component || CheckCircleFallback
        break
      case "warning":
        IconComponent = iconComponents["alert-triangle"]?.component || AlertTriangleFallback
        break
    }

    const iconSize = size === "sm" ? 20 : 20

    return (
      <div
        ref={ref}
        className={cn(alertVariants({ state, size, type, interaction }), className)}
        {...props}
      >
        {showIcon && IconComponent && (
          <div className="flex-shrink-0">
            <IconComponent size={iconSize} className="shrink-0" />
          </div>
        )}
        <p className={cn(
          "flex-1",
          size === "sm" && "text-xs leading-[18px] tracking-[-0.06px]",
          size === "md" && "text-sm leading-5 tracking-[-0.56px]"
        )}>
          {children}
        </p>
      </div>
    )
  }
)
Alert.displayName = "Alert"

export { Alert, alertVariants }
