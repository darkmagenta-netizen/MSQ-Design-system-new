import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const socialButtonVariants = cva(
  "inline-flex items-center justify-center gap-3 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 h-11 px-4",
  {
    variants: {
      platform: {
        google: "",
        facebook: "",
        apple: "",
        twitter: "",
      },
      theme: {
        brand: "",
        color: "bg-white border border-[var(--color-border)] shadow-sm",
        gray: "bg-white border border-[var(--color-border)] shadow-sm",
      },
      supportingText: {
        true: "",
        false: "w-11 px-0",
      },
    },
    compoundVariants: [
      // Facebook Brand theme
      {
        platform: "facebook",
        theme: "brand",
        className: "bg-[#1877F2] text-white hover:bg-[#0c63d4]",
      },
      // Google Brand theme
      {
        platform: "google",
        theme: "brand",
        className: "bg-white border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-background-subtle)]",
      },
      // Apple Brand theme
      {
        platform: "apple",
        theme: "brand",
        className: "bg-[#141519] text-white hover:bg-[#1a1b1f]",
      },
      // Twitter Brand theme
      {
        platform: "twitter",
        theme: "brand",
        className: "bg-[#141519] text-white hover:bg-[#1a1b1f]",
      },
      // Color theme (all platforms)
      {
        theme: "color",
        className: "text-[var(--color-text)] hover:bg-[var(--color-background-subtle)]",
      },
      // Gray theme (all platforms)
      {
        theme: "gray",
        className: "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
      },
    ],
    defaultVariants: {
      platform: "google",
      theme: "brand",
      supportingText: true,
    },
  }
)

export interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof socialButtonVariants> {
  asChild?: boolean
}

const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ className, platform, theme, supportingText, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "button" : "button"
    
    const getIcon = () => {
      const iconSize = supportingText ? "w-6 h-6" : "w-5 h-5"
      
      switch (platform) {
        case "google":
          return (
            <svg className={iconSize} viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )
        case "facebook":
          return (
            <svg className={iconSize} viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          )
        case "apple":
          return (
            <svg className={iconSize} viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          )
        case "twitter":
          return (
            <svg className={iconSize} viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          )
        default:
          return null
      }
    }

    const getText = () => {
      if (!supportingText) return null
      
      switch (platform) {
        case "google":
          return "Sign in with Google"
        case "facebook":
          return "Sign in with Facebook"
        case "apple":
          return "Sign in with Apple"
        case "twitter":
          return "Sign in with X"
        default:
          return ""
      }
    }

    return (
      <Comp
        className={cn(socialButtonVariants({ platform, theme, supportingText, className }))}
        ref={ref}
        {...props}
      >
        {getIcon()}
        {supportingText && (
          <span>{getText()}</span>
        )}
      </Comp>
    )
  }
)
SocialButton.displayName = "SocialButton"

export { SocialButton, socialButtonVariants }

