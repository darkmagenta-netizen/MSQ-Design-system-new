"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { getIconByName } from "@/components/icons"

// Pagination and carousel use icons from the design system (same as icons library page)
const ICON_SIZE = 20

// Default carousel images (working URLs; pass imageSrc to override)
const CAROUSEL_IMAGE_SM = "https://picsum.photos/seed/msqcarousel-sm/335/300"
const CAROUSEL_IMAGE_MD = "https://picsum.photos/seed/msqcarousel-md/640/400"
const CAROUSEL_IMAGE_LG = "https://picsum.photos/seed/msqcarousel-lg/640/400"

const paginationButtonVariants = cva(
  "flex items-center justify-center min-h-[36px] px-2 py-1 border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      state: {
        default: "bg-[var(--color-background)] border-[var(--color-border-tertiary)] hover:bg-[var(--color-background-subtle)]",
        active: "bg-[#f8f5ff] border-[var(--color-border-tertiary)]",
        focused: "bg-[var(--color-background)] border-[var(--color-border-tertiary)] shadow-[0px_0px_0px_4px_rgba(41,96,236,0.14)]",
      },
      shape: {
        square: "rounded-[var(--radius-xs)]",
        circle: "rounded-full",
      },
      position: {
        first: "rounded-bl-[var(--radius-xs)] rounded-tl-[var(--radius-xs)] border-l border-t border-b",
        middle: "border-t border-b border-l",
        last: "rounded-br-[var(--radius-xs)] rounded-tr-[var(--radius-xs)] border-t border-b border-r",
        standalone: "rounded-[var(--radius-xs)] border",
      },
    },
    defaultVariants: {
      state: "default",
      shape: "square",
      position: "standalone",
    },
  }
)

const paginationNumberVariants = cva(
  "flex items-center justify-center px-3 py-2 rounded-[var(--radius-sm)] text-sm font-medium leading-5 tracking-[0.224px] transition-colors",
  {
    variants: {
      state: {
        default:
          "bg-[var(--color-background)] border-[0.5px] border-[var(--color-border-tertiary)] text-[var(--color-text-secondary)] dark:bg-[var(--color-background)] dark:border-[var(--color-border-tertiary)] dark:text-[var(--color-text-secondary)]",
        active:
          "bg-[#f8f5ff] border border-[var(--color-border-tertiary)] text-[var(--color-text-secondary)] dark:bg-[var(--color-primary)] dark:border-[var(--color-primary)] dark:text-[var(--color-text-on-primary)]",
        focused:
          "bg-[var(--color-background)] border-[0.5px] border-[var(--color-border-tertiary)] text-[var(--color-text-secondary)] shadow-[0px_0px_0px_4px_rgba(41,96,236,0.14)] dark:bg-[var(--color-background)] dark:border-[var(--color-border-tertiary)] dark:text-[var(--color-text-secondary)]",
      },
      shape: {
        square: "rounded-[var(--radius-sm)]",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      state: "default",
      shape: "square",
    },
  }
)

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current page number (1-indexed)
   */
  currentPage?: number
  /**
   * Total number of pages
   */
  totalPages?: number
  /**
   * Total number of items
   */
  totalItems?: number
  /**
   * Items per page
   */
  itemsPerPage?: number
  /**
   * Whether to show table count
   */
  showTableCount?: boolean
  /**
   * Whether to show page numbers
   */
  showPageNumbers?: boolean
  /**
   * Size variant
   */
  size?: "desktop" | "mobile"
  /**
   * Language
   */
  lang?: "eng" | "kor"
  /**
   * Callback when page changes
   */
  onPageChange?: (page: number) => void
  /**
   * Callback when items per page changes
   */
  onItemsPerPageChange?: (itemsPerPage: number) => void
  /**
   * Maximum number of page buttons to show
   */
  maxPageButtons?: number
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      currentPage = 1,
      totalPages = 24,
      totalItems = 678,
      itemsPerPage = 10,
      showTableCount = true,
      showPageNumbers = true,
      size = "desktop",
      lang = "eng",
      onPageChange,
      onItemsPerPageChange,
      maxPageButtons = 5,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState<number | null>(null)

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange?.(page)
      }
    }

    const handleItemsPerPageChange = (value: number) => {
      onItemsPerPageChange?.(value)
    }

    // Calculate page range to display
    const getPageNumbers = () => {
      const pages: (number | string)[] = []
      const maxButtons = maxPageButtons

      if (totalPages <= maxButtons) {
        // Show all pages if total is less than max
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Always show first page
        pages.push(1)

        // Calculate start and end of middle range
        let start = Math.max(2, currentPage - 1)
        let end = Math.min(totalPages - 1, currentPage + 1)

        // Adjust if we're near the start
        if (currentPage <= 3) {
          start = 2
          end = Math.min(4, totalPages - 1)
        }

        // Adjust if we're near the end
        if (currentPage >= totalPages - 2) {
          start = Math.max(2, totalPages - 3)
          end = totalPages - 1
        }

        // Add ellipsis and middle pages
        if (start > 2) {
          pages.push("...")
        }

        for (let i = start; i <= end; i++) {
          pages.push(i)
        }

        if (end < totalPages - 1) {
          pages.push("...")
        }

        // Always show last page
        if (totalPages > 1) {
          pages.push(totalPages)
        }
      }

      return pages
    }

    const pageNumbers = getPageNumbers()
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    const tableCountText =
      lang === "eng"
        ? `Showing ${startItem} to ${endItem} of ${totalItems} entries.Items on page`
        : `${startItem}부터 ${endItem}까지, 총 ${totalItems}개 항목.페이지당 항목`

    return (
      <div ref={ref} className={cn("flex flex-col gap-4", size === "mobile" && "w-full", className)} {...props}>
        {showTableCount && (
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium leading-5 text-[var(--color-text-tertiary)] tracking-[0.224px]">
              {tableCountText}
            </p>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="h-9 w-[88px] rounded-[var(--radius-xs)] border border-[var(--color-border-tertiary)] bg-[var(--color-background)] px-3 pr-8 text-sm font-medium text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] appearance-none cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {(() => {
                  const iconData = getIconByName("chevron-down")
                  const Icon = iconData?.component
                  return Icon ? <Icon size={ICON_SIZE} className="text-[var(--color-text-secondary)]" aria-hidden /> : null
                })()}
              </div>
            </div>
          </div>
        )}

        {showPageNumbers && (
          <div className="flex items-center">
            {/* First Page Button */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              onFocus={() => setIsFocused(0)}
              onBlur={() => setIsFocused(null)}
              className={cn(
                paginationButtonVariants({
                  state: isFocused === 0 ? "focused" : "default",
                  position: "first",
                }),
                "w-9"
              )}
            >
              {(() => {
                const iconData = getIconByName("chevrons-left")
                const Icon = iconData?.component
                return Icon ? <Icon size={ICON_SIZE} className="text-[var(--color-text)] shrink-0" aria-hidden /> : null
              })()}
            </button>

            {/* Previous Page Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              onFocus={() => setIsFocused(-1)}
              onBlur={() => setIsFocused(null)}
              className={cn(
                paginationButtonVariants({
                  state: isFocused === -1 ? "focused" : "default",
                  position: "middle",
                }),
                "w-9"
              )}
            >
              {(() => {
                const iconData = getIconByName("chevron-left")
                const Icon = iconData?.component
                return Icon ? <Icon size={ICON_SIZE} className="text-[var(--color-text)] shrink-0" aria-hidden /> : null
              })()}
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((page, index) => {
              if (page === "...") {
                return (
                  <div
                    key={`ellipsis-${index}`}
                    className={cn(
                      paginationNumberVariants({ state: "default" }),
                      "w-9 cursor-default"
                    )}
                  >
                    ...
                  </div>
                )
              }

              const pageNum = page as number
              const isActive = pageNum === currentPage

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  onFocus={() => setIsFocused(pageNum)}
                  onBlur={() => setIsFocused(null)}
                  className={cn(
                    paginationNumberVariants({
                      state: isFocused === pageNum ? "focused" : isActive ? "active" : "default",
                    }),
                    "w-9 min-w-[36px]"
                  )}
                >
                  {pageNum}
                </button>
              )
            })}

            {/* Next Page Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              onFocus={() => setIsFocused(-2)}
              onBlur={() => setIsFocused(null)}
              className={cn(
                paginationButtonVariants({
                  state: isFocused === -2 ? "focused" : "default",
                  position: "middle",
                }),
                "w-9"
              )}
            >
              {(() => {
                const iconData = getIconByName("chevron-right")
                const Icon = iconData?.component
                return Icon ? <Icon size={ICON_SIZE} className="text-[var(--color-text)] shrink-0" aria-hidden /> : null
              })()}
            </button>

            {/* Last Page Button */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              onFocus={() => setIsFocused(-3)}
              onBlur={() => setIsFocused(null)}
              className={cn(
                paginationButtonVariants({
                  state: isFocused === -3 ? "focused" : "default",
                  position: "last",
                }),
                "w-9"
              )}
            >
              {(() => {
                const iconData = getIconByName("chevrons-right")
                const Icon = iconData?.component
                return Icon ? <Icon size={ICON_SIZE} className="text-[var(--color-text)] shrink-0" aria-hidden /> : null
              })()}
            </button>
          </div>
        )}
      </div>
    )
  }
)

Pagination.displayName = "Pagination"

// Pagination Dot Indicator Component
const paginationDotVariants = cva("rounded-full shrink-0", {
  variants: {
    size: {
      md: "size-2",
      lg: "size-[10px]",
    },
    current: {
      true: "bg-[var(--color-primary)]",
      false: "bg-[var(--color-background-subtle)]",
    },
  },
  defaultVariants: {
    size: "md",
    current: false,
  },
})

export interface PaginationDotIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paginationDotVariants> {
  current?: boolean
}

export const PaginationDotIndicator = React.forwardRef<HTMLDivElement, PaginationDotIndicatorProps>(
  ({ className, size, current, ...props }, ref) => {
    return <div ref={ref} className={cn(paginationDotVariants({ size, current }), className)} {...props} />
  }
)

PaginationDotIndicator.displayName = "PaginationDotIndicator"

// Pagination Dot Group Component
export interface PaginationDotGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
  /**
   * Total number of dots
   */
  total?: number
  /**
   * Current active dot index (0-indexed)
   */
  current?: number
  /**
   * Size of dots
   */
  size?: "md" | "lg"
  /**
   * Style of indicator: dot or line
   */
  style?: "dot" | "line"
  /**
   * Whether to show frame/border
   */
  framed?: boolean
}

export const PaginationDotGroup = React.forwardRef<HTMLDivElement, PaginationDotGroupProps>(
  ({ className, total = 3, current = 0, size = "md", style = "dot", framed = false, ...props }, ref) => {
    const dots = Array.from({ length: total }, (_, i) => i)

    if (style === "line") {
      return (
        <div ref={ref} className={cn("flex items-center gap-1", className)} {...props}>
          {dots.map((index) => (
            <div
              key={index}
              className={cn(
                "rounded-full transition-colors",
                size === "md" ? "h-1.5 w-10" : "h-2 w-10",
                index === current
                  ? "bg-[var(--color-primary)]"
                  : "bg-[var(--color-background-subtle)]"
              )}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2",
          framed && "px-3 py-2 border border-[var(--color-border-tertiary)] rounded-lg bg-[var(--color-background)]",
          className
        )}
        {...props}
      >
        {dots.map((index) => (
          <PaginationDotIndicator key={index} size={size} current={index === current} />
        ))}
      </div>
    )
  }
)

PaginationDotGroup.displayName = "PaginationDotGroup"

// Carousel Arrow Component
const carouselArrowVariants = cva(
  "absolute flex items-center justify-center rounded-full backdrop-blur-sm bg-[var(--color-background)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]",
  {
    variants: {
      size: {
        sm: "size-9 p-2",
        md: "size-9 p-2",
        lg: "size-11 p-2",
      },
      position: {
        left: "",
        right: "",
      },
    },
    defaultVariants: {
      size: "md",
      position: "left",
    },
  }
)

export interface CarouselArrowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Direction of the arrow
   */
  direction?: "left" | "right"
  /**
   * Size of the arrow button
   */
  size?: "sm" | "md" | "lg"
  /**
   * Click handler
   */
  onClick?: () => void
}

export const CarouselArrow = React.forwardRef<HTMLButtonElement, CarouselArrowProps>(
  ({ className, direction = "left", size = "md", onClick, ...props }, ref) => {
    const iconData = getIconByName(direction === "left" ? "chevron-left" : "chevron-right")
    const IconComponent = iconData?.component

    return (
      <button
        ref={ref}
        onClick={onClick}
        aria-label={direction === "left" ? "Previous" : "Next"}
        className={cn(
          carouselArrowVariants({ size, position: direction }),
          direction === "left"
            ? size === "sm"
              ? "left-[-16px]"
              : size === "lg"
                ? "left-5"
                : "left-4"
            : size === "sm"
              ? "right-[-16px]"
              : size === "lg"
                ? "right-5"
                : "right-4",
          "top-1/2 -translate-y-1/2",
          className
        )}
        {...props}
      >
        {IconComponent ? <IconComponent size={20} className="text-[var(--color-text)] shrink-0" aria-hidden /> : null}
      </button>
    )
  }
)

CarouselArrow.displayName = "CarouselArrow"

// Carousel Image Component
export interface CarouselImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the carousel
   */
  size?: "sm" | "md" | "lg"
  /**
   * Image source URL (optional, uses default if not provided)
   */
  imageSrc?: string
  /**
   * Current slide index (0-indexed)
   */
  currentSlide?: number
  /**
   * Total number of slides
   */
  totalSlides?: number
  /**
   * Callback when previous button is clicked
   */
  onPrevious?: () => void
  /**
   * Callback when next button is clicked
   */
  onNext?: () => void
}

export const CarouselImage = React.forwardRef<HTMLDivElement, CarouselImageProps>(
  (
    {
      className,
      size = "sm",
      imageSrc,
      currentSlide = 0,
      totalSlides = 3,
      onPrevious,
      onNext,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false)
    const defaultImageSrc =
      size === "sm" ? CAROUSEL_IMAGE_SM : size === "lg" ? CAROUSEL_IMAGE_LG : CAROUSEL_IMAGE_MD
    const imageUrl = imageSrc || defaultImageSrc
    const showPlaceholder = imageError

    const dimensions =
      size === "sm"
        ? "h-[300px] w-[335px]"
        : size === "md" || size === "lg"
          ? "h-[400px] w-[640px]"
          : "h-[300px] w-[335px]"

    const dotGap = size === "lg" ? "gap-4" : "gap-3"
    const dotPadding = size === "lg" ? "p-3" : "p-2"

    return (
      <div
        ref={ref}
        className={cn("relative rounded-[var(--radius-md)] overflow-hidden", dimensions, className)}
        {...props}
      >
        {/* Fallback gradient only when image fails to load */}
        {showPlaceholder && (
          <div
            className={cn(
              "absolute inset-0 w-full h-full pointer-events-none rounded-[var(--radius-md)]",
              "bg-gradient-to-br from-[var(--color-background-subtle)] via-[var(--color-background)] to-[var(--color-border-subtle)]",
              "dark:from-[var(--color-background-overlay)] dark:via-[var(--color-background)] dark:to-[var(--color-border-tertiary)]"
            )}
            aria-hidden
          />
        )}
        <img
          src={imageUrl}
          alt="Carousel"
          onError={() => setImageError(true)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[var(--radius-md)]",
            showPlaceholder && "hidden"
          )}
        />

        {/* Dot indicators: light overlay in light mode, solid dark in dark mode (not white) */}
        <div
          className={cn(
            "absolute bottom-4 left-1/2 -translate-x-1/2 backdrop-blur-sm flex items-center justify-center rounded-full",
            "bg-white/90 border border-[var(--color-border-tertiary)]/50",
            "dark:bg-[#1a1d23] dark:border-[var(--color-border-tertiary)]",
            dotGap,
            dotPadding
          )}
        >
          <PaginationDotGroup
            total={totalSlides}
            current={currentSlide}
            size={size === "lg" ? "lg" : "md"}
            style="dot"
            framed
          />
        </div>

        {/* Navigation Arrows */}
        <CarouselArrow direction="left" size={size} onClick={onPrevious} />
        <CarouselArrow direction="right" size={size} onClick={onNext} />
      </div>
    )
  }
)

CarouselImage.displayName = "CarouselImage"

export { paginationButtonVariants, paginationNumberVariants, paginationDotVariants, carouselArrowVariants }
