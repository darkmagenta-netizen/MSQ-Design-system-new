"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { iconComponents } from "@/components/icons/icons"
import { Icon, IconProps } from "@/components/icons/icon"

const calendarSearchVariants = cva(
  "relative w-full h-10 px-[15px] py-[9px] border border-[var(--color-border)] rounded-md bg-[var(--color-background)]",
  {
    variants: {
      status: {
        calendar: "",
        search: "",
      },
    },
    defaultVariants: {
      status: "calendar",
    },
  }
)

// Fallback icons
const CalendarDateFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path
      d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
))
CalendarDateFallback.displayName = "CalendarDateFallback"

const SearchSmFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
))
SearchSmFallback.displayName = "SearchSmFallback"

export interface CalendarSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">,
    VariantProps<typeof calendarSearchVariants> {
  /**
   * Status variant: "calendar" for date picker, "search" for search input
   */
  status?: "calendar" | "search"
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Value for date picker (MM/DD/YY - MM/DD/YY format)
   */
  value?: string
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void
}

const CalendarSearch = React.forwardRef<HTMLInputElement, CalendarSearchProps>(
  ({ className, status = "calendar", placeholder, value, onChange, ...props }, ref) => {
    const CalendarDateIcon = iconComponents["calendar-date"]?.component || CalendarDateFallback
    const SearchSmIcon = iconComponents["search-sm"]?.component || SearchSmFallback

    const defaultPlaceholder = status === "calendar" ? "MM/DD/YY - MM/DD/YY" : "Search"

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    return (
      <div className={cn(calendarSearchVariants({ status }), className)}>
        <div className="absolute left-[15px] top-1/2 -translate-y-1/2 size-6">
          {status === "calendar" ? (
            <CalendarDateIcon size={24} className="text-[#838799]" />
          ) : (
            <SearchSmIcon size={24} className="text-[#838799]" />
          )}
        </div>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder || defaultPlaceholder}
          className="absolute left-[45px] top-[9px] w-[calc(100%-60px)] h-5 bg-transparent border-none outline-none text-[14px] leading-[20px] tracking-[-0.56px] font-medium text-[#545766] placeholder:text-[#545766]"
          {...props}
        />
      </div>
    )
  }
)
CalendarSearch.displayName = "CalendarSearch"

export { CalendarSearch, calendarSearchVariants }
