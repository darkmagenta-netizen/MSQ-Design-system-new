"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { iconComponents } from "@/components/icons/icons"
import { Icon, IconProps } from "@/components/icons/icon"
import { X } from "lucide-react"

const bannerVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      brand: "w-full",
      mobile: "w-full max-w-sm",
      modal: "w-full max-w-md rounded-lg",
      card: "w-full max-w-xs rounded-lg",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "brand",
    size: "md",
  },
})

const XIconFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
))
XIconFallback.displayName = "XIconFallback"

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  /**
   * Banner title/headline
   */
  title?: React.ReactNode
  /**
   * Banner description/subtitle
   */
  description?: React.ReactNode
  /**
   * Optional icon/logo to display
   */
  icon?: React.ReactNode
  /**
   * Background gradient colors (for brand/mobile variants)
   */
  gradient?: {
    from: string
    to: string
  }
  /**
   * Background image or pattern
   */
  backgroundImage?: string
  /**
   * Primary action button
   */
  action?: {
    label: string
    onClick?: () => void
    variant?: "primary" | "secondary" | "outline"
  }
  /**
   * Secondary action button (for modal variant)
   */
  secondaryAction?: {
    label: string
    onClick?: () => void
    variant?: "primary" | "secondary" | "outline"
  }
  /**
   * Whether the banner can be dismissed
   */
  dismissible?: boolean
  /**
   * Called when banner is dismissed
   */
  onDismiss?: () => void
  /**
   * Custom content (overrides title/description)
   */
  children?: React.ReactNode
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant = "brand",
      size = "md",
      title,
      description,
      icon,
      gradient,
      backgroundImage,
      action,
      secondaryAction,
      dismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const [isDismissed, setIsDismissed] = React.useState(false)

    const handleDismiss = React.useCallback(() => {
      setIsDismissed(true)
      onDismiss?.()
    }, [onDismiss])

    if (isDismissed) return null

    const defaultGradient =
      variant === "brand" || variant === "mobile"
        ? { from: "#1a1a2e", to: "#16213e" }
        : { from: "#e8eeff", to: "#1a1a2e" }

    const gradientColors = gradient ?? defaultGradient

    // Brand variant - full width with logo and text
    if (variant === "brand") {
      return (
        <div
          ref={ref}
          className={cn(
            bannerVariants({ variant, size }),
            "flex items-center justify-center gap-4 py-8 px-6",
            className
          )}
          style={{
            background: `linear-gradient(135deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          {...props}
        >
          {icon && <div className="flex-shrink-0">{icon}</div>}
          {title && (
            <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
          )}
          {children}
        </div>
      )
    }

    // Mobile variant - vertical layout with CTA
    if (variant === "mobile") {
      return (
        <div
          ref={ref}
          className={cn(
            bannerVariants({ variant, size }),
            "flex flex-col items-center gap-4 rounded-lg p-6 text-center",
            className
          )}
          style={{
            background: `linear-gradient(180deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          {...props}
        >
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute right-3 top-3 rounded-md p-1 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div className="flex flex-col gap-2">
            {title && (
              <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-white/90 leading-relaxed">{description}</p>
            )}
          </div>
          {action && (
            <Button
              variant={action.variant ?? "primary"}
              onClick={action.onClick}
              className="mt-2"
            >
              {action.label}
            </Button>
          )}
          {children}
        </div>
      )
    }

    // Modal variant - with close button and action buttons
    if (variant === "modal") {
      return (
        <div
          ref={ref}
          className={cn(
            bannerVariants({ variant, size }),
            "flex flex-col gap-4 p-6",
            className
          )}
          style={{
            background: `linear-gradient(180deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          {...props}
        >
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-4 rounded-md p-1 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close banner"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <div className="flex items-start gap-4">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <div className="flex-1 flex flex-col gap-2">
              {title && (
                <h3 className="text-lg font-semibold text-white leading-tight">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-white/90 leading-relaxed">{description}</p>
              )}
            </div>
          </div>
          {(action || secondaryAction) && (
            <div className="flex gap-2">
              {action && (
                <Button
                  variant={action.variant ?? "outline"}
                  onClick={action.onClick}
                  className="flex-1"
                >
                  {action.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  variant={secondaryAction.variant ?? "outline"}
                  onClick={secondaryAction.onClick}
                  className="flex-1"
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
          {children}
        </div>
      )
    }

    // Card variant - compact horizontal card
    return (
      <div
        ref={ref}
        className={cn(
          bannerVariants({ variant, size }),
          "flex flex-col gap-3 p-4",
          className
        )}
        style={{
          background: `linear-gradient(135deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        {...props}
      >
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute right-2 top-2 rounded-md p-1 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex flex-col gap-1">
          {title && <h4 className="text-sm font-semibold text-white leading-tight">{title}</h4>}
          {description && (
            <p className="text-xs text-white/90 leading-relaxed">{description}</p>
          )}
        </div>
        {action && (
          <Button
            variant={action.variant ?? "outline"}
            size="sm"
            onClick={action.onClick}
            className="self-end"
          >
            {action.label}
          </Button>
        )}
        {children}
      </div>
    )
  }
)

Banner.displayName = "Banner"

export { Banner, bannerVariants }
