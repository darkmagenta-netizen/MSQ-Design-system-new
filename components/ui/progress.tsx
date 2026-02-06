"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type LabelPlacement = "none" | "right" | "top" | "floating-top" | "floating-bottom"
type Variant = "solid" | "inset"

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function formatPercent(value: number, max: number) {
  if (max <= 0) return "0%"
  const pct = (value / max) * 100
  const rounded = Math.round(pct)
  return `${clamp(rounded, 0, 100)}%`
}

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current value (0..max).
   */
  value: number
  /**
   * Maximum value. Defaults to 100.
   */
  max?: number
  /**
   * Optional label text (e.g. "Label").
   */
  label?: string
  /**
   * Where to render the label / percentage.
   */
  labelPlacement?: LabelPlacement
  /**
   * Visual style. "solid" is an 8px bar. "inset" is a 12px track with an 8px inner fill.
   */
  variant?: Variant
  /**
   * Show a minimum dot even at 0%. Matches Figma examples.
   */
  showMinDot?: boolean
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      label = "Label",
      labelPlacement = "none",
      variant = "solid",
      showMinDot = true,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const safeMax = max > 0 ? max : 100
    const safeValue = Number.isFinite(value) ? clamp(value, 0, safeMax) : 0
    const percent = (safeValue / safeMax) * 100
    const percentText = formatPercent(safeValue, safeMax)

    // Floating label positioning (centered on progress end, clamped within bar)
    const trackRef = React.useRef<HTMLDivElement | null>(null)
    const bubbleRef = React.useRef<HTMLDivElement | null>(null)
    const [bubbleLeft, setBubbleLeft] = React.useState<number | null>(null)

    const updateBubble = React.useCallback(() => {
      const track = trackRef.current
      const bubble = bubbleRef.current
      if (!track || !bubble) return

      const trackRect = track.getBoundingClientRect()
      const bubbleRect = bubble.getBoundingClientRect()

      const innerWidth =
        variant === "inset" ? Math.max(0, trackRect.width - 4) : Math.max(0, trackRect.width)
      const leftInset = variant === "inset" ? 2 : 0

      const x = leftInset + (innerWidth * percent) / 100
      const half = bubbleRect.width / 2
      const margin = 4 // matches the ~4px clamp seen at 0% in Figma

      const clamped = clamp(x, margin + half, trackRect.width - margin - half)
      setBubbleLeft(clamped)
    }, [percent, variant])

    React.useEffect(() => {
      if (labelPlacement !== "floating-top" && labelPlacement !== "floating-bottom") return
      updateBubble()

      const track = trackRef.current
      const bubble = bubbleRef.current
      if (!track || !bubble) return

      const ro = new ResizeObserver(() => updateBubble())
      ro.observe(track)
      ro.observe(bubble)
      return () => ro.disconnect()
    }, [labelPlacement, updateBubble])

    const labelId = React.useId()
    const showLabelRow = labelPlacement === "top"
    const showRightLabel = labelPlacement === "right"
    const showFloating = labelPlacement === "floating-top" || labelPlacement === "floating-bottom"

    const trackClasses =
      variant === "solid"
        ? "h-[8px] rounded-[9999px] bg-[var(--progress-track)]"
        : "h-[12px] rounded-[9999px] bg-[var(--progress-track)] p-[2px]"

    const fillHeight = variant === "solid" ? "h-full" : "h-full"
    const fillRounding = variant === "solid" ? "rounded-[9999px]" : "rounded-[9999px]"
    const minDot = showMinDot ? (variant === "solid" ? 9 : 5) : 0

    return (
      <div
        ref={ref}
        className={cn(
          // Layout wrappers match the Figma compositions
          showRightLabel ? "flex items-center gap-3" : "flex flex-col gap-2",
          className
        )}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={Math.round(safeValue)}
        aria-labelledby={showLabelRow ? labelId : undefined}
        aria-label={!showLabelRow ? (ariaLabel ?? label ?? "Progress") : undefined}
        {...props}
      >
        {showLabelRow ? (
          <div
            id={labelId}
            className={cn(
              "flex w-full items-start justify-between whitespace-nowrap",
              "text-[12px] leading-[18px] tracking-[0.192px] font-semibold",
              "text-[var(--color-foreground-secondary-hover)]"
            )}
          >
            <span className="leading-[18px]">{label}</span>
            <span className="leading-[18px]">{percentText}</span>
          </div>
        ) : null}

        <div className={cn("relative w-full", showFloating && "pb-0")}>
          <div ref={trackRef} className={cn("relative w-full", trackClasses)} data-name="Progress bar">
            <div
              className={cn(
                "bg-[var(--progress-fill)]",
                fillHeight,
                fillRounding,
                // Transition is not specified in Figma, but helps UX; keep very subtle.
                "transition-[width] duration-150 ease-out"
              )}
              style={{
                width: `${percent}%`,
                minWidth: `${minDot}px`,
              }}
              data-name="Progress"
            />
          </div>

          {showFloating ? (
            <div
              ref={bubbleRef}
              className={cn(
                "absolute flex flex-col items-center",
                "shadow-[0_4px_6px_-2px_rgba(16,24,40,0.03),0_12px_16px_-4px_rgba(16,24,40,0.08)]"
              )}
              style={{
                left: bubbleLeft ?? undefined,
                transform: "translateX(-50%)",
                top: labelPlacement === "floating-top" ? "-42px" : "16px",
              }}
              aria-hidden="true"
            >
              <div
                className={cn(
                  "bg-[var(--color-background)] border border-[var(--color-border-tertiary)]",
                  "rounded-[8px] px-3 py-2"
                )}
              >
                <p
                  className={cn(
                    "text-[12px] leading-[18px] tracking-[0.192px] text-center",
                    // Top floating uses semibold in Figma, bottom floating uses medium in some states
                    labelPlacement === "floating-bottom" ? "font-medium" : "font-semibold",
                    "text-[var(--color-foreground-secondary-hover)]"
                  )}
                >
                  {percentText}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {showRightLabel ? (
          <div
            id={labelId}
            className={cn(
              "flex flex-col justify-center whitespace-nowrap",
              "text-[14px] leading-[20px] tracking-[-0.56px] font-semibold",
              "text-[var(--color-foreground-secondary-hover)]"
            )}
          >
            {percentText}
          </div>
        ) : null}
      </div>
    )
  }
)

Progress.displayName = "Progress"

