"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { iconComponents } from "@/components/icons/icons"

// Figma icon assets for pagination
const CHEVRON_LEFT_URL = "https://www.figma.com/api/mcp/asset/8f1955f6-9be3-4725-8647-5e0c56ba54a8"
const CHEVRON_RIGHT_URL = "https://www.figma.com/api/mcp/asset/4059d892-3003-4774-8134-fc8b59bda1ca"
const CHEVRON_LEFT_DOUBLE_URL = "https://www.figma.com/api/mcp/asset/1e00a726-d6e8-49ef-bc86-41ae6dec3bee"
const CHEVRON_RIGHT_DOUBLE_URL = "https://www.figma.com/api/mcp/asset/357267a1-fc28-44e0-a8f5-999a92424df5"
const CHEVRON_DOWN_URL = "https://www.figma.com/api/mcp/asset/5d3d3709-98ba-448a-8994-2c87f31fad09"
const CHEVRON_UP_URL = "https://www.figma.com/api/mcp/asset/5d3d3709-98ba-448a-8994-2c87f31fad09" // Same as down, rotated 180deg

// Figma icon assets for carousel arrows (using same icons as pagination)
const CAROUSEL_CHEVRON_LEFT_SM = CHEVRON_LEFT_URL
const CAROUSEL_CHEVRON_RIGHT_SM = CHEVRON_RIGHT_URL
const CAROUSEL_CHEVRON_LEFT_MD = CHEVRON_LEFT_URL
const CAROUSEL_CHEVRON_RIGHT_MD = CHEVRON_RIGHT_URL
const CAROUSEL_CHEVRON_LEFT_LG = CHEVRON_LEFT_URL
const CAROUSEL_CHEVRON_RIGHT_LG = CHEVRON_RIGHT_URL

// Figma image assets for carousel
const CAROUSEL_IMAGE_SM = "https://www.figma.com/api/mcp/asset/060143df-13e6-4861-be2e-9fb7192746f7"
const CAROUSEL_IMAGE_MD = "https://www.figma.com/api/mcp/asset/0d8c5078-5548-44e8-b116-208437408dd1"
const CAROUSEL_IMAGE_LG = "https://www.figma.com/api/mcp/asset/13bb4146-55aa-457e-810d-5be70f9874d6"

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
        default: "bg-[var(--color-background)] border-[0.5px] border-[var(--color-border-tertiary)] text-[var(--color-text-secondary)]",
        active: "bg-[#f8f5ff] border border-[var(--color-border-tertiary)] text-[var(--color-text-secondary)]",
        focused: "bg-[var(--color-background)] border-[0.5px] border-[var(--color-border-tertiary)] text-[var(--color-text-secondary)] shadow-[0px_0px_0px_4px_rgba(41,96,236,0.14)]",
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
                <img src={CHEVRON_DOWN_URL} alt="" className="w-5 h-5" />
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
              <img src={CHEVRON_LEFT_DOUBLE_URL} alt="First" className="w-5 h-5" />
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
              <img src={CHEVRON_LEFT_URL} alt="Previous" className="w-5 h-5" />
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
              <img src={CHEVRON_RIGHT_URL} alt="Next" className="w-5 h-5" />
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
              <img src={CHEVRON_RIGHT_DOUBLE_URL} alt="Last" className="w-5 h-5" />
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
export interface PaginationDotGroupProps extends React.HTMLAttributes<HTMLDivElement> {
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
   * Style of indicator
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
    const chevronUrl =
      direction === "left"
        ? size === "sm"
          ? CAROUSEL_CHEVRON_LEFT_SM
          : size === "lg"
            ? CAROUSEL_CHEVRON_LEFT_LG
            : CAROUSEL_CHEVRON_LEFT_MD
        : size === "sm"
          ? CAROUSEL_CHEVRON_RIGHT_SM
          : size === "lg"
            ? CAROUSEL_CHEVRON_RIGHT_LG
            : CAROUSEL_CHEVRON_RIGHT_MD

    return (
      <button
        ref={ref}
        onClick={onClick}
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
        <img src={chevronUrl} alt={direction === "left" ? "Previous" : "Next"} className="w-5 h-5" />
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
    const defaultImageSrc =
      size === "sm" ? CAROUSEL_IMAGE_SM : size === "lg" ? CAROUSEL_IMAGE_LG : CAROUSEL_IMAGE_MD

    const imageUrl = imageSrc || defaultImageSrc

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
        <img
          src={imageUrl}
          alt="Carousel"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[var(--radius-md)]"
        />

        {/* Dot Indicators */}
        <div
          className={cn(
            "absolute bottom-4 left-1/2 -translate-x-1/2 backdrop-blur-sm bg-[rgba(255,255,255,0.9)] flex items-center justify-center rounded-full",
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
