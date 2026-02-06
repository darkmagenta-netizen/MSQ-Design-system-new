"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type Side = "top" | "bottom" | "left" | "right"
type Align = "start" | "center" | "end"

function clampDelay(ms: number | undefined, fallback: number) {
  if (typeof ms !== "number" || Number.isNaN(ms)) return fallback
  return Math.max(0, Math.min(10_000, ms))
}

function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value: T | undefined
  defaultValue: T
  onChange?: (next: T) => void
}) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState<T>(defaultValue)
  const state = isControlled ? (value as T) : internal

  const setState = React.useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  return [state, setState] as const
}

function positionClasses(side: Side, align: Align) {
  switch (side) {
    case "top": {
      const x =
        align === "start"
          ? "left-0"
          : align === "end"
            ? "right-0"
            : "left-1/2 -translate-x-1/2"
      return cn("bottom-full mb-2", x)
    }
    case "bottom": {
      const x =
        align === "start"
          ? "left-0"
          : align === "end"
            ? "right-0"
            : "left-1/2 -translate-x-1/2"
      return cn("top-full mt-2", x)
    }
    case "left": {
      const y =
        align === "start"
          ? "top-0"
          : align === "end"
            ? "bottom-0"
            : "top-1/2 -translate-y-1/2"
      return cn("right-full mr-2", y)
    }
    case "right": {
      const y =
        align === "start"
          ? "top-0"
          : align === "end"
            ? "bottom-0"
            : "top-1/2 -translate-y-1/2"
      return cn("left-full ml-2", y)
    }
  }
}

function arrowAlignmentClasses(side: Side, align: Align) {
  // Arrow aligns along the cross-axis of the tooltip content.
  if (side === "top" || side === "bottom") {
    return align === "start" ? "self-start ml-3" : align === "end" ? "self-end mr-3" : "self-center"
  }
  // left/right: vertical alignment; design only shows centered arrows for sides
  return "self-center"
}

function TooltipArrow({ side, align }: { side: Side; align: Align }) {
  // Use a shadowed, clipped element so the arrow shares the exact shadow spec
  // (Figma: 0 4px 6px -2px #10182808, 0 12px 16px -4px #10182814).

  const base = cn(
    "flex-none bg-[var(--tooltip-bg)]",
    "shadow-[0_4px_6px_-2px_rgba(16,24,40,0.03),0_12px_16px_-4px_rgba(16,24,40,0.08)]"
  )

  if (side === "top") {
    // Arrow at bottom, pointing down
    return (
      <span
        aria-hidden="true"
        className={cn(
          base,
          "w-[16px] h-[6px] -mt-px",
          arrowAlignmentClasses(side, align)
        )}
        style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
      />
    )
  }

  if (side === "bottom") {
    // Arrow at top, pointing up
    return (
      <span
        aria-hidden="true"
        className={cn(
          base,
          "w-[16px] h-[6px] -mb-px",
          arrowAlignmentClasses(side, align)
        )}
        style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
      />
    )
  }

  if (side === "left") {
    // Arrow at right, pointing right
    return (
      <span
        aria-hidden="true"
        className={cn(base, "w-[6px] h-[16px] -ml-px", arrowAlignmentClasses(side, align))}
        style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
      />
    )
  }

  // side === "right": arrow at left, pointing left
  return (
    <span
      aria-hidden="true"
      className={cn(base, "w-[6px] h-[16px] -mr-px", arrowAlignmentClasses(side, align))}
      style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}
    />
  )
}

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The tooltip title line (required).
   */
  content: React.ReactNode
  /**
   * Optional supporting text under the title.
   */
  supportingText?: React.ReactNode
  /**
   * Tooltip placement relative to the trigger.
   */
  side?: Side
  /**
   * Alignment along the trigger (top/bottom) or cross-axis (left/right).
   */
  align?: Align
  /**
   * Whether to render an arrow.
   */
  arrow?: boolean
  /**
   * Delay (ms) before opening on hover.
   */
  delayDuration?: number
  /**
   * Controlled open state.
   */
  open?: boolean
  /**
   * Uncontrolled initial open state.
   */
  defaultOpen?: boolean
  /**
   * Called whenever open changes.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Renders the trigger by passing props to the child element (recommended).
   */
  asChild?: boolean
  /**
   * Trigger element.
   */
  children: React.ReactElement
}

export function Tooltip({
  className,
  content,
  supportingText,
  side = "top",
  align = "center",
  arrow = true,
  delayDuration,
  open,
  defaultOpen = false,
  onOpenChange,
  asChild = true,
  children,
  ...props
}: TooltipProps) {
  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const id = React.useId()
  const delay = clampDelay(delayDuration, 200)
  const openTimerRef = React.useRef<number | null>(null)

  const clearTimer = React.useCallback(() => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
  }, [])

  React.useEffect(() => clearTimer, [clearTimer])

  const requestOpen = React.useCallback(() => {
    clearTimer()
    openTimerRef.current = window.setTimeout(() => setIsOpen(true), delay)
  }, [clearTimer, delay, setIsOpen])

  const close = React.useCallback(() => {
    clearTimer()
    setIsOpen(false)
  }, [clearTimer, setIsOpen])

  const Trigger = asChild ? Slot : "button"
  const stackClass =
    side === "top" ? "flex-col" : side === "bottom" ? "flex-col-reverse" : side === "left" ? "flex-row" : "flex-row-reverse"

  return (
    <span className={cn("relative inline-flex", className)} {...props}>
      <Trigger
        aria-describedby={isOpen ? id : undefined}
        onMouseEnter={requestOpen}
        onMouseLeave={close}
        onFocus={() => {
          // Open immediately on focus for keyboard users
          clearTimer()
          setIsOpen(true)
        }}
        onBlur={close}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Escape") {
            e.stopPropagation()
            close()
          }
        }}
      >
        {children}
      </Trigger>

      <span
        id={id}
        role="tooltip"
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "pointer-events-none absolute z-50",
          positionClasses(side, align),
          "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
          "data-[state=closed]:scale-95 data-[state=open]:scale-100",
          "origin-center transition duration-150 ease-out"
        )}
      >
        <span
          className={cn(
            // Layout & spacing based on Figma (spacing-lg=12, spacing-md=8, spacing-xs=4)
            "flex",
            stackClass
          )}
        >
          <span
            className={cn(
              "bg-[var(--tooltip-bg)] rounded-[8px]",
              // Shadows/Shadows lg from Figma
              "shadow-[0_4px_6px_-2px_rgba(16,24,40,0.03),0_12px_16px_-4px_rgba(16,24,40,0.08)]",
              supportingText ? "p-3" : "px-3 py-2",
              supportingText ? "w-[320px]" : "w-max",
              "max-w-[320px]"
            )}
          >
            <span className={cn("text-[12px] leading-[18px] tracking-[0.192px]")}>
              <span
                className={cn(
                  "font-semibold text-[var(--tooltip-text)]",
                  !supportingText && "text-center block"
                )}
              >
                {content}
              </span>
              {supportingText ? (
                <span
                  className="mt-1 block font-normal text-[var(--tooltip-supporting-text)]"
                  style={{ fontFeatureSettings: '"salt" 1' }}
                >
                  {supportingText}
                </span>
              ) : null}
            </span>
          </span>

          {arrow ? <TooltipArrow side={side} align={align} /> : null}
        </span>
      </span>
    </span>
  )
}

