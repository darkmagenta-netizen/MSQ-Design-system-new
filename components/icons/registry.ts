/**
 * Icon Registry
 * 
 * Central registry for all icons with metadata
 */

import { IconData, IconCategory } from "./types"

// Lazy load iconComponents to avoid circular dependency
let iconComponents: Record<string, IconData> | null = null

function getIconComponents() {
  if (!iconComponents) {
    iconComponents = require("./icons").iconComponents
  }
  return iconComponents
}

/**
 * Icon registry - maps icon names to their data
 */
export const iconRegistry = new Map<string, IconData>()

// Initialize registry
function initializeRegistry() {
  if (iconRegistry.size === 0) {
    const components = getIconComponents()
    if (components) {
      Object.entries(components).forEach(([name, data]) => {
        iconRegistry.set(name, data)
      })
    }
  }
}

/**
 * Get icon by name
 */
export function getIconByName(name: string): IconData | undefined {
  initializeRegistry()
  return iconRegistry.get(name)
}

/**
 * Get all icons in a category
 */
export function getIconsByCategory(category: IconCategory): IconData[] {
  initializeRegistry()
  return Array.from(iconRegistry.values()).filter(
    (icon) => icon.category === category
  )
}

/**
 * Get all icons
 */
export function getAllIcons(): IconData[] {
  initializeRegistry()
  return Array.from(iconRegistry.values())
}

/**
 * Search icons by keyword
 */
export function searchIcons(query: string): IconData[] {
  initializeRegistry()
  const lowerQuery = query.toLowerCase()
  return Array.from(iconRegistry.values()).filter((icon) => {
    return (
      icon.name.toLowerCase().includes(lowerQuery) ||
      icon.displayName.toLowerCase().includes(lowerQuery) ||
      icon.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
    )
  })
}
