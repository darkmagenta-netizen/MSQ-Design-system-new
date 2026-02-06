"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { iconComponents } from "@/components/icons/icons"
import { Icon, IconProps } from "@/components/icons/icon"
import { useLanguage } from "@/lib/language-provider"

// Safe language hook that doesn't throw if provider is missing
function useSafeLanguage() {
  try {
    return useLanguage()
  } catch {
    return { language: "eng" as const }
  }
}

const calendarVariants = cva(
  "w-full",
  {
    variants: {},
    defaultVariants: {},
  }
)

// Fallback icons
const ChevronLeftFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
))
ChevronLeftFallback.displayName = "ChevronLeftFallback"

const ChevronRightFallback = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
))
ChevronRightFallback.displayName = "ChevronRightFallback"

// Month names
const monthNames: Record<"eng" | "kor", string[]> = {
  eng: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  kor: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
}

// Day names
const dayNames: Record<"eng" | "kor", string[]> = {
  eng: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  kor: ["일", "월", "화", "수", "목", "금", "토"],
}

export interface CalendarDate {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled?: boolean
  isHoliday?: boolean
}

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof calendarVariants> {
  /**
   * Currently selected date
   */
  value?: Date
  /**
   * Default date to show (defaults to today)
   */
  defaultDate?: Date
  /**
   * Callback when a date is selected
   */
  onDateSelect?: (date: Date) => void
  /**
   * Callback when month changes
   */
  onMonthChange?: (date: Date) => void
  /**
   * Array of dates that should be disabled
   */
  disabledDates?: Date[]
  /**
   * Array of dates that are holidays
   */
  holidays?: Date[]
  /**
   * Function to check if a date is disabled
   */
  isDateDisabled?: (date: Date) => boolean
  /**
   * Function to check if a date is a holiday
   */
  isDateHoliday?: (date: Date) => boolean
  /**
   * Language for month and day names
   */
  language?: "eng" | "kor"
  /**
   * Minimum selectable date
   */
  minDate?: Date
  /**
   * Maximum selectable date
   */
  maxDate?: Date
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      value,
      defaultDate = new Date(),
      onDateSelect,
      onMonthChange,
      disabledDates = [],
      holidays = [],
      isDateDisabled,
      isDateHoliday,
      language: propLanguage,
      minDate,
      maxDate,
      ...props
    },
    ref
  ) => {
    const { language: contextLanguage } = useSafeLanguage()
    const language = propLanguage || contextLanguage

    const [currentMonth, setCurrentMonth] = React.useState(() => {
      const date = value || defaultDate
      return new Date(date.getFullYear(), date.getMonth(), 1)
    })
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value)
    const [hoveredDate, setHoveredDate] = React.useState<Date | undefined>()

    // Sync with controlled value
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedDate(value)
        setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1))
      }
    }, [value])

    const ChevronLeftIcon = iconComponents["chevron-left"]?.component || ChevronLeftFallback
    const ChevronRightIcon = iconComponents["chevron-right"]?.component || ChevronRightFallback

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Navigate to previous month
    const goToPreviousMonth = () => {
      const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      setCurrentMonth(newMonth)
      onMonthChange?.(newMonth)
    }

    // Navigate to next month
    const goToNextMonth = () => {
      const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      setCurrentMonth(newMonth)
      onMonthChange?.(newMonth)
    }

    // Normalize date to midnight for comparison
    const normalizeDate = (date: Date): Date => {
      const normalized = new Date(date)
      normalized.setHours(0, 0, 0, 0)
      return normalized
    }

    // Check if date is disabled
    const checkIsDisabled = (date: Date): boolean => {
      if (isDateDisabled) {
        return isDateDisabled(date)
      }
      const normalizedDate = normalizeDate(date)
      if (disabledDates.some((d) => {
        const normalizedDisabled = normalizeDate(d)
        return normalizedDisabled.getTime() === normalizedDate.getTime()
      })) {
        return true
      }
      if (minDate) {
        const normalizedMin = normalizeDate(minDate)
        if (normalizedDate < normalizedMin) {
          return true
        }
      }
      if (maxDate) {
        const normalizedMax = normalizeDate(maxDate)
        if (normalizedDate > normalizedMax) {
          return true
        }
      }
      return false
    }

    // Check if date is holiday
    const checkIsHoliday = (date: Date): boolean => {
      if (isDateHoliday) {
        return isDateHoliday(date)
      }
      const normalizedDate = normalizeDate(date)
      return holidays.some((d) => {
        const normalizedHoliday = normalizeDate(d)
        return normalizedHoliday.getTime() === normalizedDate.getTime()
      })
    }

    // Check if date is today
    const isToday = (date: Date): boolean => {
      return date.toDateString() === today.toDateString()
    }

    // Check if date is selected
    const isSelected = (date: Date): boolean => {
      return selectedDate?.toDateString() === date.toDateString()
    }

    // Generate calendar dates
    const getCalendarDates = (): CalendarDate[] => {
      const year = currentMonth.getFullYear()
      const month = currentMonth.getMonth()

      // First day of the month
      const firstDay = new Date(year, month, 1)
      const firstDayOfWeek = firstDay.getDay() // 0 = Sunday

      // Last day of the month
      const lastDay = new Date(year, month + 1, 0)
      const daysInMonth = lastDay.getDate()

      // Days from previous month
      const prevMonthDays: CalendarDate[] = []
      const prevMonthLastDay = new Date(year, month, 0).getDate()

      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, prevMonthLastDay - i)
        prevMonthDays.push({
          date,
          isCurrentMonth: false,
          isToday: isToday(date),
          isSelected: isSelected(date),
          isDisabled: true,
          isHoliday: checkIsHoliday(date),
        })
      }

      // Days in current month
      const currentMonthDays: CalendarDate[] = []
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day)
        const disabled = checkIsDisabled(date)
        const holiday = checkIsHoliday(date)

        currentMonthDays.push({
          date,
          isCurrentMonth: true,
          isToday: isToday(date),
          isSelected: isSelected(date),
          isDisabled: disabled,
          isHoliday: holiday,
        })
      }

      // Days from next month to fill the grid
      const nextMonthDays: CalendarDate[] = []
      const totalCells = prevMonthDays.length + currentMonthDays.length
      const remainingCells = 42 - totalCells // 6 rows × 7 days

      for (let day = 1; day <= remainingCells; day++) {
        const date = new Date(year, month + 1, day)
        nextMonthDays.push({
          date,
          isCurrentMonth: false,
          isToday: isToday(date),
          isSelected: isSelected(date),
          isDisabled: true,
          isHoliday: checkIsHoliday(date),
        })
      }

      return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
    }

    const handleDateClick = (date: CalendarDate) => {
      if (date.isDisabled) return

      setSelectedDate(date.date)
      onDateSelect?.(date.date)
    }

    const calendarDates = getCalendarDates()
    const monthName = monthNames[language][currentMonth.getMonth()]
    const year = currentMonth.getFullYear()

    return (
      <div ref={ref} className={cn(calendarVariants(), className)} {...props}>
        {/* Month Navigation */}
        <div className="flex items-center justify-between max-w-[328px] min-w-[120px] w-full mb-4">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="flex items-center justify-center size-11 hover:bg-[var(--color-background-subtle)] rounded-md transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeftIcon size={20} className="text-[#6b6f80]" />
          </button>
          <div className="flex flex-col items-center justify-center">
            <p className="text-[20px] leading-[28px] tracking-[-0.4px] font-bold text-[#141519]">
              {monthName}
            </p>
            <p className="text-[14px] leading-[20px] tracking-[-0.56px] font-medium text-[#545766]">
              {year}
            </p>
          </div>
          <button
            type="button"
            onClick={goToNextMonth}
            className="flex items-center justify-center size-11 hover:bg-[var(--color-background-subtle)] rounded-md transition-colors"
            aria-label="Next month"
          >
            <ChevronRightIcon size={20} className="text-[#6b6f80]" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="flex gap-1 border-b border-[rgba(0,0,0,0.03)] pb-1 mb-1">
          {dayNames[language].map((day, index) => (
            <div
              key={day}
              className="flex flex-1 flex-col h-12 items-center justify-center min-w-[36px]"
            >
              <p
                className={cn(
                  "text-xs leading-[18px] tracking-[0.06px] font-bold",
                  index === 0 ? "text-[#e62e2e]" : "text-[#141519]"
                )}
              >
                {day}
              </p>
            </div>
          ))}
        </div>

        {/* Date Grid */}
        <div className="flex flex-col gap-1">
          {Array.from({ length: 6 }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex gap-1">
              {calendarDates.slice(weekIndex * 7, (weekIndex + 1) * 7).map((dateInfo, dayIndex) => {
                const isHovered = hoveredDate?.toDateString() === dateInfo.date.toDateString()
                const isHolidayDisabled = dateInfo.isHoliday && dateInfo.isDisabled

                return (
                  <button
                    key={`${dateInfo.date.getTime()}-${dayIndex}`}
                    type="button"
                    onClick={() => handleDateClick(dateInfo)}
                    onMouseEnter={() => !dateInfo.isDisabled && setHoveredDate(dateInfo.date)}
                    onMouseLeave={() => setHoveredDate(undefined)}
                    disabled={dateInfo.isDisabled}
                    className={cn(
                      "flex flex-1 flex-col gap-1 items-center min-h-[36px] min-w-[36px] py-1.5 rounded-[4px] transition-colors",
                      // Hover state (only for enabled dates in current month)
                      !dateInfo.isDisabled &&
                        dateInfo.isCurrentMonth &&
                        isHovered &&
                        !dateInfo.isSelected &&
                        !dateInfo.isToday &&
                        "bg-[rgba(0,0,0,0.03)]",
                      // Disabled state styling
                      dateInfo.isDisabled && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <div
                      className={cn(
                        "flex flex-col items-center justify-center size-6 rounded-full transition-colors",
                        // Today state (blue background, white text)
                        dateInfo.isToday &&
                          !dateInfo.isSelected &&
                          "bg-[#174fdf] text-[#f6f7f9]",
                        // Selected state (blue background, white text)
                        dateInfo.isSelected && "bg-[#174fdf] text-[#f6f7f9]",
                        // Holiday state (red text, but not if selected/today)
                        dateInfo.isHoliday &&
                          !dateInfo.isSelected &&
                          !dateInfo.isToday &&
                          !dateInfo.isDisabled &&
                          "text-[#c00]",
                        // Disabled state
                        dateInfo.isDisabled && "text-[#bbbfcc]",
                        // Default state
                        !dateInfo.isSelected &&
                          !dateInfo.isToday &&
                          !dateInfo.isDisabled &&
                          !dateInfo.isHoliday &&
                          "text-[#141519]"
                      )}
                    >
                      <p
                        className={cn(
                          "text-xs leading-[18px] tracking-[0.192px] font-semibold whitespace-nowrap",
                          dateInfo.isSelected || dateInfo.isToday ? "text-[#f6f7f9]" : "",
                          dateInfo.isHoliday &&
                            !dateInfo.isSelected &&
                            !dateInfo.isToday &&
                            !dateInfo.isDisabled &&
                            "text-[#c00]",
                          dateInfo.isDisabled && "text-[#bbbfcc]"
                        )}
                      >
                        {dateInfo.date.getDate()}
                      </p>
                    </div>
                    {/* Holiday label (optional, can be shown below date) */}
                    {dateInfo.isHoliday && !dateInfo.isDisabled && (
                      <div className="flex h-[14px] items-center justify-center px-1 w-full">
                        <p className="text-[10px] leading-[16px] tracking-[0.16px] font-medium text-[#c00] text-center whitespace-nowrap">
                          {language === "kor" ? "휴일" : "Holiday"}
                        </p>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }
)
Calendar.displayName = "Calendar"

export { Calendar, calendarVariants }
