/**
 * Icon metadata and types
 */

import React from "react"
import { IconProps } from "./icon"

export interface IconMetadata {
  name: string
  displayName: string
  category: IconCategory
  keywords: string[]
  description?: string
  nodeId?: string
}

export type IconCategory =
  | "general"
  | "arrows"
  | "charts"
  | "communication"
  | "development"
  | "editor"
  | "education"
  | "files"
  | "finance"
  | "images"
  | "layout"
  | "maps"
  | "media"
  | "security"
  | "shapes"
  | "social"
  | "time"
  | "users"
  | "weather"
  | "alerts"
  | "country"

export interface IconData extends IconMetadata {
  component: React.ComponentType<IconProps>
  svgCode: string
}

