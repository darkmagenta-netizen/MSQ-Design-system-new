import * as React from "react"
import { cn } from "@/lib/utils"

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "width" | "height"> {
  size?: number | string
  className?: string
  children?: React.ReactNode
}

/**
 * Base Icon component
 * 
 * Wraps SVG content and provides consistent sizing and styling
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, className, children, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("inline-block flex-shrink-0", className)}
        {...props}
      >
        {children}
      </svg>
    )
  }
)
Icon.displayName = "Icon"

