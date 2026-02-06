"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { iconComponents } from "@/components/icons/icons"

const inputVariants = cva(
  "flex w-full rounded-lg border bg-[var(--color-background)] text-[var(--color-text)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        md: "h-[60px] px-4 text-sm",
        lg: "h-[70px] px-4 text-base",
      },
      status: {
        placeholder: "border-[var(--color-border-subtle)]",
        focused: "border-[var(--color-primary)] shadow-[0px_0px_0px_4px_rgba(41,96,236,0.14)]",
        typing: "border-[var(--color-primary)] shadow-[0px_0px_0px_4px_rgba(41,96,236,0.14)]",
        error: "border-[var(--color-error)]",
        disabled: "border-[var(--color-border-tertiary)] bg-[var(--color-background-subtle)] text-[var(--color-text-tertiary)]",
      },
      type: {
        default: "",
        "leading-text": "pl-[72px]",
        "trailing-button": "pr-12",
        dropdown: "pr-12",
        "text-area": "min-h-[200px] py-4 resize-none",
        search: "pl-10",
      },
    },
    defaultVariants: {
      size: "md",
      status: "placeholder",
      type: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /**
   * Leading text to display before the input (e.g., "http://")
   */
  leadingText?: string
  /**
   * Trailing button element or icon
   */
  trailingButton?: React.ReactNode
  /**
   * Dropdown value to display
   */
  dropdownValue?: string
  /**
   * Whether to show error message
   */
  errorMessage?: string
  /**
   * Helper text to display below the input
   */
  helperText?: string
  /**
   * Label text
   */
  label?: string
  /**
   * Search icon name (for search input type)
   */
  searchIcon?: string
  /**
   * Search icon image URL (from Figma)
   */
  searchIconUrl?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      status,
      type,
      leadingText,
      trailingButton,
      dropdownValue,
      errorMessage,
      helperText,
      label,
      searchIcon = "search-lg",
      searchIconUrl = "https://www.figma.com/api/mcp/asset/75ce178c-4f32-43d7-a98f-62cb57a66cae",
      disabled,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(
      Boolean(props.value || props.defaultValue)
    )
    
    React.useEffect(() => {
      setHasValue(Boolean(props.value))
    }, [props.value])

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setHasValue(e.target.value.length > 0)
      if (props.onChange) {
        props.onChange(e as React.ChangeEvent<HTMLInputElement>)
      }
    }

    // Determine the visual status
    const visualStatus: "placeholder" | "focused" | "typing" | "error" | "disabled" =
      status ||
      (disabled ? "disabled" : errorMessage ? "error" : hasValue && isFocused ? "typing" : isFocused ? "focused" : "placeholder")

    const isTextArea = type === "text-area"
    
    const inputClassName = cn(inputVariants({ size, status: visualStatus, type }), className)

    const inputElement = isTextArea ? (
      <textarea
        ref={ref as any}
        className={inputClassName}
        disabled={disabled}
        onFocus={handleFocus as any}
        onBlur={handleBlur as any}
        onChange={handleChange as any}
        value={props.value}
        defaultValue={props.defaultValue}
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    ) : (
      <input
        ref={ref}
        className={inputClassName}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
    )

    // If no label or additional elements, return just the input
    if (!label && !leadingText && !trailingButton && !dropdownValue && !errorMessage && !helperText && type !== "search") {
      return inputElement
    }

    const SearchIcon = searchIcon && iconComponents[searchIcon]?.component

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            className={cn(
              "text-sm font-medium leading-5",
              disabled
                ? "text-[var(--color-text-tertiary)]"
                : errorMessage
                  ? "text-[var(--color-error)]"
                  : "text-[var(--color-text-secondary)]"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {/* Leading Text */}
          {leadingText && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-tertiary)] pointer-events-none">
              {leadingText}
            </div>
          )}

          {/* Search Icon */}
          {type === "search" && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
              {searchIconUrl ? (
                <img 
                  src={searchIconUrl} 
                  alt="Search" 
                  className="w-5 h-5"
                  style={{ 
                    width: "20px",
                    height: "20px",
                    objectFit: "contain"
                  }}
                />
              ) : SearchIcon ? (
                <SearchIcon size={20} className="text-[var(--color-text-tertiary)]" />
              ) : null}
            </div>
          )}

          {/* Input Element */}
          {inputElement}

          {/* Trailing Button */}
          {trailingButton && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {trailingButton}
            </div>
          )}

          {/* Dropdown Indicator */}
          {dropdownValue && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <span className="text-sm text-[var(--color-text-secondary)]">{dropdownValue}</span>
              {iconComponents["chevron-down"]?.component && (
                <div className="text-[var(--color-text-tertiary)]">
                  {React.createElement(iconComponents["chevron-down"].component, { size: 16 })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Error Message or Helper Text */}
        {(errorMessage || helperText) && (
          <p
            className={cn(
              "text-xs leading-4",
              errorMessage ? "text-[var(--color-error)]" : "text-[var(--color-text-tertiary)]"
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input, inputVariants }
