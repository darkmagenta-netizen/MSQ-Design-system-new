"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { iconComponents } from "@/components/icons/icons"
import { Icon, IconProps } from "@/components/icons/icon"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-[4px] font-medium transition-colors",
  {
    variants: {
      status: {
        pending: "",
        applied: "",
        approved: "",
        warning: "",
        declined: "",
      },
      size: {
        sm: "px-2 py-1 text-xs leading-[18px] tracking-[-0.06px] h-6",
        md: "px-2 py-1 text-xs leading-[18px] tracking-[-0.06px] h-[26px]",
        lg: "px-2 py-1.5 text-sm leading-[18px] tracking-[-0.06px] h-7",
        xl: "px-2.5 py-2 text-sm leading-[18px] tracking-[-0.06px] h-8",
      },
      variant: {
        "filled-bold": "",
        "filled-light": "",
        outline: "border",
      },
    },
    compoundVariants: [
      // Pending - Filled Bold
      {
        status: "pending",
        variant: "filled-bold",
        className: "bg-[#ededed] text-[#3e414c]",
      },
      // Pending - Filled Light
      {
        status: "pending",
        variant: "filled-light",
        className: "bg-[#ededed] border border-[#dbdee3] text-[#545766]",
      },
      // Pending - Outline
      {
        status: "pending",
        variant: "outline",
        className: "bg-transparent border-[#dbdee3] text-[#545766]",
      },
      // Applied - Filled Bold
      {
        status: "applied",
        variant: "filled-bold",
        className: "bg-[#174fdf] text-[#f6f7f9]",
      },
      // Applied - Filled Light
      {
        status: "applied",
        variant: "filled-light",
        className: "bg-[#e8edff] border border-[#e8edff] text-[#174fdf]",
      },
      // Applied - Outline
      {
        status: "applied",
        variant: "outline",
        className: "bg-transparent border-[#174fdf] text-[#174fdf]",
      },
      // Approved - Filled Bold
      {
        status: "approved",
        variant: "filled-bold",
        className: "bg-[#008042] text-[#f6f7f9]",
      },
      // Approved - Filled Light
      {
        status: "approved",
        variant: "filled-light",
        className: "bg-[#e6f5ed] border border-[#e6f5ed] text-[#008042]",
      },
      // Approved - Outline
      {
        status: "approved",
        variant: "outline",
        className: "bg-transparent border-[#008042] text-[#008042]",
      },
      // Warning - Filled Bold
      {
        status: "warning",
        variant: "filled-bold",
        className: "bg-[#db8400] text-[#f6f7f9]",
      },
      // Warning - Filled Light
      {
        status: "warning",
        variant: "filled-light",
        className: "bg-[#fdebc3] border border-[#fdebc3] text-[#db8400]",
      },
      // Warning - Outline
      {
        status: "warning",
        variant: "outline",
        className: "bg-transparent border-[#db8400] text-[#db8400]",
      },
      // Declined - Filled Bold
      {
        status: "declined",
        variant: "filled-bold",
        className: "bg-[#c00] text-[#f6f7f9]",
      },
      // Declined - Filled Light
      {
        status: "declined",
        variant: "filled-light",
        className: "bg-[#ffe6e6] border border-[#ffe6e6] text-[#c00]",
      },
      // Declined - Outline
      {
        status: "declined",
        variant: "outline",
        className: "bg-transparent border-[#c00] text-[#c00]",
      },
    ],
    defaultVariants: {
      status: "pending",
      size: "md",
      variant: "filled-bold",
    },
  }
)

// Status labels mapping
const statusLabels: Record<NonNullable<VariantProps<typeof badgeVariants>["status"]>, string> = {
  pending: "Pending",
  applied: "Applied",
  approved: "Approved",
  warning: "Warning",
  declined: "Declined",
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Badge label text. If not provided, uses default label based on status.
   */
  label?: string
  /**
   * Optional icon to display. If provided, shows icon-only badge.
   */
  icon?: React.ReactNode
  /**
   * Whether to show as icon-only badge
   */
  iconOnly?: boolean
}

// Fallback icon component
const ChevronDownFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
))
ChevronDownFallback.displayName = "ChevronDownFallback"

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, status = "pending", size = "md", variant = "filled-bold", label, icon, iconOnly = false, ...props }, ref) => {
    // Get default label if not provided
    const badgeLabel = label ?? statusLabels[status!]

    // Icon-only badge
    if (iconOnly || icon) {
      const iconSize = size === "sm" || size === "md" ? 20 : 20
      
      // If custom icon is provided as ReactNode, use it directly
      if (icon && React.isValidElement(icon)) {
        return (
          <div
            ref={ref}
            className={cn(badgeVariants({ status, size, variant }), "justify-center", className)}
            {...props}
          >
            <div className="flex-shrink-0">{icon}</div>
          </div>
        )
      }
      
      // Otherwise, use icon component from registry or fallback
      const IconComponent = icon || (iconComponents["chevron-down"]?.component || ChevronDownFallback)

      return (
        <div
          ref={ref}
          className={cn(badgeVariants({ status, size, variant }), "justify-center", className)}
          {...props}
        >
          <div className="flex-shrink-0">
            <IconComponent size={iconSize} className="shrink-0" />
          </div>
        </div>
      )
    }

    // Text-only badge
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ status, size, variant }), className)}
        {...props}
      >
        <span className="whitespace-nowrap">{badgeLabel}</span>
      </div>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants, statusLabels }
