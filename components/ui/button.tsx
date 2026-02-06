import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { tokens } from "@/tokens"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary - filled with brand color
        primary: "bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]",
        // Secondary - filled with secondary color
        secondary: "bg-[var(--color-secondary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)]",
        // Outline - border with transparent background
        outline: "border border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-background-subtle)]",
        // Error - filled with error color
        error: "bg-[var(--color-error)] text-[var(--color-text-inverse)] hover:bg-[var(--color-error-hover)] active:bg-[var(--color-error-active)]",
        // Error secondary - lighter error background
        "error-secondary": "bg-[var(--color-error)]/10 text-[var(--color-error)]",
        // Error outline - error border
        "error-outline": "border border-[var(--color-error)] bg-transparent text-[var(--color-error)] hover:bg-[var(--color-error)]/10",
        // Grey text - grey background with text color
        "grey-text": "bg-[var(--color-background-subtle)] text-[var(--color-text)]",
        // Grey disabled - grey background disabled state
        "grey-disabled": "bg-[var(--color-background-subtle)] text-[var(--color-text-tertiary)]",
        // Color text - colored text on white background
        "color-text": "bg-[var(--color-background)] text-[var(--color-primary)]",
        // Disabled - primary disabled state
        disabled: "bg-[var(--color-primary-disabled)] text-[var(--color-text-tertiary)]",
        // Disabled outline - disabled outline state
        "disabled-outline": "border border-[var(--color-border)] bg-transparent text-[var(--color-text-tertiary)]",
        // Ghost - transparent with text
        ghost: "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-background-subtle)]",
      },
      size: {
        xl: "h-[52px] px-8 text-base",
        lg: "h-[44px] px-6 text-base",
        md: "h-10 px-4 text-sm",
        sm: "h-9 px-3 text-sm",
        icon: "h-10 w-10",
        "icon-xl": "h-12 w-12",
        "icon-lg": "h-11 w-11",
        "icon-md": "h-10 w-10",
        "icon-sm": "h-9 w-9",
      },
      radius: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      radius: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, radius, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, radius, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

