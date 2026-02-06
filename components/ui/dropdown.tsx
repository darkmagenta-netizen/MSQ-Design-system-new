"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { iconComponents } from "@/components/icons/icons"
import { Icon, IconProps } from "@/components/icons/icon"
import { Checkbox } from "./checkbox"

const dropdownVariants = cva(
  "relative",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface DropdownOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof dropdownVariants> {
  /**
   * Dropdown state: collapsed or expanded
   */
  state?: "collapsed" | "expanded"
  /**
   * Dropdown type: Token, location, or P2U
   */
  type?: "Token" | "location" | "P2U"
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Label text (shown above dropdown when expanded)
   */
  label?: string
  /**
   * Selected value(s)
   */
  value?: string | string[]
  /**
   * Options for the dropdown
   */
  options?: DropdownOption[]
  /**
   * Whether multiple selection is allowed (for Token type)
   */
  multiple?: boolean
  /**
   * Callback when selection changes
   */
  onChange?: (value: string | string[]) => void
  /**
   * Callback when dropdown is opened/closed
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Search value (for location type)
   */
  searchValue?: string
  /**
   * Callback when search value changes (for location type)
   */
  onSearchChange?: (value: string) => void
  /**
   * Width of the dropdown
   */
  width?: string | number
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      state = "collapsed",
      type = "Token",
      placeholder,
      label,
      value,
      options = [],
      multiple = false,
      onChange,
      onOpenChange,
      searchValue = "",
      onSearchChange,
      width = type === "P2U" ? 300 : 344,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(state === "expanded")
    const [internalSearchValue, setInternalSearchValue] = React.useState(searchValue)
    
    // Fallback components for missing icons
    const ChevronDownFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
      <Icon ref={ref} {...props}>
        <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
      </Icon>
    ))
    ChevronDownFallback.displayName = "ChevronDownFallback"
    
    const CheckFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
      <Icon ref={ref} {...props}>
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Icon>
    ))
    CheckFallback.displayName = "CheckFallback"
    
    const InfoCircleFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </Icon>
    ))
    InfoCircleFallback.displayName = "InfoCircleFallback"
    
    const MarkerPinFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
      <Icon ref={ref} {...props}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
      </Icon>
    ))
    MarkerPinFallback.displayName = "MarkerPinFallback"
    
    const ChevronDownIcon = iconComponents["chevron-down"]?.component || ChevronDownFallback
    const CheckIcon = iconComponents["check"]?.component || CheckFallback
    const InfoCircleIcon = iconComponents["info-circle"]?.component || InfoCircleFallback
    const MarkerPinIcon = iconComponents["marker-pin-01"]?.component || MarkerPinFallback
    const MarkIcon = iconComponents["mark"]?.component || MarkerPinFallback
    const SearchIcon = iconComponents["search"]?.component || ChevronDownFallback

    // Sync with controlled state
    React.useEffect(() => {
      setIsOpen(state === "expanded")
    }, [state])

    const handleToggle = () => {
      const newOpen = !isOpen
      setIsOpen(newOpen)
      onOpenChange?.(newOpen)
    }

    const handleSelect = (optionValue: string) => {
      if (multiple && Array.isArray(value)) {
        const newValue = value.includes(optionValue)
          ? value.filter((v) => v !== optionValue)
          : [...value, optionValue]
        onChange?.(newValue)
      } else {
        onChange?.(optionValue)
        setIsOpen(false)
        onOpenChange?.(false)
      }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInternalSearchValue(newValue)
      onSearchChange?.(newValue)
    }

    const selectedOption = React.useMemo(() => {
      if (multiple && Array.isArray(value)) {
        return options.filter((opt) => value.includes(opt.value))
      }
      return options.find((opt) => opt.value === value)
    }, [value, options, multiple])

    const displayValue = React.useMemo(() => {
      if (multiple && Array.isArray(value) && value.length > 0) {
        return `${value.length} selected`
      }
      return selectedOption?.label || placeholder || "Select..."
    }, [selectedOption, placeholder, value, multiple])

    const isSelected = (optionValue: string) => {
      if (multiple && Array.isArray(value)) {
        return value.includes(optionValue)
      }
      return value === optionValue
    }

    const filteredOptions = React.useMemo(() => {
      if (type === "location" && internalSearchValue) {
        return options.filter((opt) =>
          opt.label.toLowerCase().includes(internalSearchValue.toLowerCase())
        )
      }
      return options
    }, [options, internalSearchValue, type])

    return (
      <div
        ref={ref}
        className={cn(dropdownVariants({ className }), "relative")}
        style={{ 
          width: typeof width === "number" ? `${width}px` : width
        }}
        {...props}
      >
        {/* Label (shown when expanded) */}
        {isOpen && label && (
          <p className="mb-2 text-[12px] leading-[18px] tracking-[-0.24px] font-medium text-[var(--color-text-tertiary)]">
            {label}
          </p>
        )}

        {/* Dropdown Container */}
        <div className="relative w-full">
          {/* Trigger Button */}
          <button
            type="button"
            onClick={handleToggle}
            className={cn(
              "w-full flex items-center justify-between",
              "bg-[var(--color-background-subtle)] border border-[var(--color-border-subtle)] rounded-[8px]",
              "px-4 py-3",
              "transition-colors",
              "hover:bg-[var(--color-background-subtle)]",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1"
            )}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {/* Icon for location type when collapsed */}
              {type === "location" && !isOpen && (
                <MarkIcon size={24} className="shrink-0 text-[var(--color-text-tertiary)]" />
              )}

              {/* Selected value or placeholder */}
              <span
                className={cn(
                  "text-[12px] leading-[18px] tracking-[-0.24px] font-medium truncate",
                  selectedOption || (multiple && Array.isArray(value) && value.length > 0)
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-tertiary)]"
                )}
              >
                {displayValue}
              </span>

              {/* Info icon for Token type when collapsed */}
              {type === "Token" && !isOpen && (
                <InfoCircleIcon size={16} className="shrink-0 text-[var(--color-text-tertiary)]" />
              )}
            </div>

            {/* Chevron icon */}
            <ChevronDownIcon
              size={20}
              className={cn(
                "shrink-0 text-[var(--color-text-tertiary)] transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className={cn(
                "absolute z-10 mt-2 w-full",
                "bg-[var(--color-background-subtle)] border border-[var(--color-border-subtle)] rounded-[8px]",
                "shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]"
              )}
              style={{ 
                top: 'calc(100% + 8px)',
                left: 0,
                width: '100%'
              }}
            >
              {/* Search Input (for location type) */}
              {type === "location" && (
                <div className="px-4 py-3 border-b border-[var(--color-border-subtle)]">
                  <div className="relative flex items-center gap-2">
                    <MarkerPinIcon size={20} className="shrink-0 text-[var(--color-text-tertiary)]" />
                    <input
                      type="text"
                      value={internalSearchValue}
                      onChange={handleSearchChange}
                      placeholder="Search for a location"
                      className={cn(
                        "w-full bg-transparent",
                        "text-[14px] leading-[20px] tracking-[-0.07px] font-medium",
                        "text-[var(--color-text-tertiary)]",
                        "placeholder:text-[var(--color-text-tertiary)]",
                        "focus-visible:outline-none"
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Options List */}
              <div className={cn(
                "relative w-full",
                type === "P2U" && "max-h-[224px]"
              )}>
                <div className={cn(
                  "w-full",
                  type === "P2U" && "max-h-[224px] overflow-y-auto pr-1"
                )}>
                  {filteredOptions.length === 0 ? (
                    <div className="px-4 py-3 text-[14px] leading-[20px] text-[var(--color-text-tertiary)]">
                      No options found
                    </div>
                  ) : (
                    filteredOptions.map((option, index) => {
                      const selected = isSelected(option.value)
                      const isLast = index === filteredOptions.length - 1

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => !option.disabled && handleSelect(option.value)}
                          disabled={option.disabled}
                          className={cn(
                            "w-full flex items-center gap-5 px-4 py-3",
                            "text-left transition-colors",
                            "hover:bg-[var(--color-background-subtle)]",
                            "focus-visible:outline-none focus-visible:bg-[var(--color-background-subtle)]",
                            option.disabled && "opacity-50 cursor-not-allowed",
                            !isLast && type !== "P2U" && "border-b border-[var(--color-border-subtle)]",
                            type === "P2U" && "h-11",
                            index === 0 && type === "location" && "rounded-t-[8px]",
                            isLast && "rounded-b-[8px]"
                          )}
                        >
                          {/* Checkbox (for Token type) */}
                          {type === "Token" && (
                            <Checkbox
                              checked={selected}
                              size="sm"
                              onChange={() => {}}
                              className="pointer-events-none"
                            />
                          )}

                          {/* Marker icon (for location type) */}
                          {type === "location" && (
                            <MarkerPinIcon
                              size={20}
                              className={cn(
                                "shrink-0",
                                selected
                                  ? "text-[var(--color-text-tertiary)]"
                                  : "text-[var(--color-text-tertiary)]"
                              )}
                            />
                          )}

                          {/* Option Label */}
                          <span
                            className={cn(
                              "flex-1 text-[14px] leading-[20px] tracking-[-0.07px] font-medium",
                              selected
                                ? "text-[var(--color-text)]"
                                : "text-[var(--color-text-tertiary)]"
                            )}
                          >
                            {option.label}
                          </span>

                          {/* Check icon (for P2U type) */}
                          {type === "P2U" && selected && (
                            <CheckIcon
                              size={16}
                              className="shrink-0 text-[var(--color-primary)]"
                            />
                          )}
                        </button>
                      )
                    })
                  )}
                </div>
                {/* Scrollbar indicator for P2U type */}
                {type === "P2U" && filteredOptions.length > 5 && (
                  <div className="absolute right-[4px] top-[7px] bottom-[7px] w-1 bg-[var(--color-border-subtle)] rounded-[4px]" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)
Dropdown.displayName = "Dropdown"

export { Dropdown, dropdownVariants }
