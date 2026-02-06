/**
 * Icons Export
 * 
 * Central export point for all icon components
 */

export { Icon } from "./icon"
export type { IconProps } from "./icon"
export type { IconMetadata, IconCategory, IconData } from "./types"

// Export icon registry
export { iconRegistry, getIconByName, getIconsByCategory, getAllIcons, searchIcons } from "./registry"

