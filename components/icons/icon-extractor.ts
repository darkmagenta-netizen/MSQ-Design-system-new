/**
 * Icon Extractor Helper
 * 
 * This file provides utilities to help extract SVG paths from Figma icons.
 * 
 * Since Figma's API returns image URLs rather than SVG paths, you'll need to:
 * 1. Export icons from Figma manually as SVG
 * 2. Extract path data from the SVG files
 * 3. Update the icons.tsx file with the extracted paths
 */

/**
 * Icon metadata from Figma
 * Use this to track which icons need SVG paths extracted
 */
export interface FigmaIconInfo {
  name: string
  displayName: string
  category: string
  nodeId: string
  figmaUrl: string
  keywords: string[]
}

/**
 * Generate Figma URL for an icon
 */
export function getFigmaIconUrl(nodeId: string, fileKey: string = "kPnax7i9sQ1P4jFUSgAQnV"): string {
  return `https://www.figma.com/design/${fileKey}/MSQ-Design-System--Working-?node-id=${nodeId}`
}

/**
 * List of icons that need SVG paths extracted from Figma
 */
export const iconsToExtract: FigmaIconInfo[] = [
  // General icons
  {
    name: "activity",
    displayName: "Activity",
    category: "general",
    nodeId: "11099:44362",
    figmaUrl: getFigmaIconUrl("11099:44362"),
    keywords: ["activity", "heartbeat", "heart rate", "exercise", "pulse"],
  },
  {
    name: "check",
    displayName: "Check",
    category: "general",
    nodeId: "11099:44352",
    figmaUrl: getFigmaIconUrl("11099:44352"),
    keywords: ["check", "tick", "confirm"],
  },
  // Add more icons here as needed
]

/**
 * Instructions for extracting SVG paths:
 * 
 * 1. Open Figma file: https://www.figma.com/design/kPnax7i9sQ1P4jFUSgAQnV/MSQ-Design-System--Working-?node-id=13897-2080
 * 2. Select an icon component
 * 3. Right-click → Copy/Paste as → Copy as SVG
 * 4. Paste into a text editor
 * 5. Extract the `d` attribute from `<path>` elements
 * 6. Update the corresponding icon in components/icons/icons.tsx
 * 
 * For batch extraction:
 * - Select multiple icons
 * - Export as SVG files
 * - Process programmatically or manually
 */

