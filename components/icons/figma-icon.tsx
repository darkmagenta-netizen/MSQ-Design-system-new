"use client"

import React, { useState, useEffect } from "react"
import { Icon, IconProps } from "./icon"

interface FigmaIconProps extends IconProps {
  nodeId: string
  displayName: string
}

/**
 * Component to display icons from Figma when SVG paths are not available
 * Uses our API route to fetch SVG from Figma
 */
export const FigmaIcon = React.forwardRef<SVGSVGElement, FigmaIconProps>(
  ({ nodeId, displayName, ...props }, ref) => {
    const [svgContent, setSvgContent] = useState<string | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
      // Fetch SVG from our API route
      fetch(`/api/figma-icon?nodeId=${encodeURIComponent(nodeId)}`)
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch')
          return response.text()
        })
        .then((svg) => {
          setSvgContent(svg)
        })
        .catch(() => {
          setError(true)
        })
    }, [nodeId])

    // If we have SVG content, render it with fill normalized to currentColor so icons inherit text color (Figma exports often use fill="#000" / black)
    if (svgContent && !error) {
      let inner = svgContent.replace(/<svg[^>]*>|<\/svg>/gi, '')
      // Normalize fill attributes so icon uses currentColor instead of black
      inner = inner.replace(/\bfill="(?!none)[^"]*"/gi, 'fill="currentColor"')
      inner = inner.replace(/\bfill='(?!none)[^']*'/gi, "fill='currentColor'")
      // Normalize style="fill: #000" or style="fill:black" etc. (leave fill:none)
      inner = inner.replace(/\bstyle="([^"]*)"/gi, (_, style) =>
        style.replace(/\bfill\s*:\s*(?!none\b)[^;]+/gi, 'fill: currentColor')
      )
      return (
        <Icon ref={ref} {...props}>
          <g dangerouslySetInnerHTML={{ __html: inner }} />
        </Icon>
      )
    }

    // Fallback: show a visible placeholder
    return (
      <Icon ref={ref} {...props}>
        <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
        <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.5">
          {displayName.charAt(0).toUpperCase()}
        </text>
      </Icon>
    )
  }
)

FigmaIcon.displayName = "FigmaIcon"

