/**
 * Generate Comprehensive Icon Registry
 * 
 * This script generates a comprehensive icon registry file with all icons
 * from the Figma design system. Since Figma's API doesn't provide SVG paths
 * directly, this creates a structure with placeholder paths that can be
 * replaced with actual SVG paths extracted from Figma.
 * 
 * To extract SVG paths from Figma:
 * 1. Select icon in Figma
 * 2. Right-click → Copy/Paste as → Copy as SVG
 * 3. Extract path data from the SVG code
 * 4. Replace placeholder paths in icons.tsx
 */

// Icon metadata extracted from Figma frame metadata
// Organized by category based on the frame structure

interface IconMetadata {
  name: string
  displayName: string
  category: string
  nodeId: string
  keywords: string[]
}

// Helper function to generate icon entry
function generateIconEntry(icon: IconMetadata): string {
  const keywordsStr = JSON.stringify(icon.keywords)
  return `  "${icon.name}": createIcon(
    "${icon.name}",
    "${icon.displayName}",
    "${icon.category}" as IconCategory,
    ${keywordsStr},
    "PLACEHOLDER_SVG_PATH", // TODO: Extract SVG path from Figma node ${icon.nodeId}
    "${icon.displayName} icon",
    "${icon.nodeId}"
  ),`
}

// All icons organized by category
const allIcons: IconMetadata[] = [
  // Layout icons (47 icons)
  { name: "align-bottom-01", displayName: "Align Bottom 01", category: "layout", nodeId: "11099:47136", keywords: ["align", "bottom", "vertical", "layout"] },
  { name: "align-bottom-02", displayName: "Align Bottom 02", category: "layout", nodeId: "11099:47139", keywords: ["align", "bottom", "vertical", "layout"] },
  { name: "align-horizontal-centre-01", displayName: "Align Horizontal Centre 01", category: "layout", nodeId: "11099:47138", keywords: ["align", "horizontal", "center", "layout"] },
  { name: "align-horizontal-centre-02", displayName: "Align Horizontal Centre 02", category: "layout", nodeId: "11099:47133", keywords: ["align", "horizontal", "center", "layout"] },
  { name: "align-left-01", displayName: "Align Left 01", category: "layout", nodeId: "11099:47137", keywords: ["align", "left", "layout"] },
  { name: "align-left-02", displayName: "Align Left 02", category: "layout", nodeId: "11099:47135", keywords: ["align", "left", "layout"] },
  { name: "align-right-01", displayName: "Align Right 01", category: "layout", nodeId: "11099:47134", keywords: ["align", "right", "layout"] },
  { name: "align-right-02", displayName: "Align Right 02", category: "layout", nodeId: "11099:47132", keywords: ["align", "right", "layout"] },
  { name: "align-top-01", displayName: "Align Top 01", category: "layout", nodeId: "11099:47141", keywords: ["align", "top", "vertical", "layout"] },
  { name: "align-top-02", displayName: "Align Top 02", category: "layout", nodeId: "11099:47120", keywords: ["align", "top", "vertical", "layout"] },
  { name: "align-vertical-center-01", displayName: "Align Vertical Center 01", category: "layout", nodeId: "11099:47128", keywords: ["align", "vertical", "center", "layout"] },
  { name: "align-vertical-center-02", displayName: "Align Vertical Center 02", category: "layout", nodeId: "11099:47127", keywords: ["align", "vertical", "center", "layout"] },
  { name: "columns-01", displayName: "Columns 01", category: "layout", nodeId: "11099:47125", keywords: ["columns", "grid", "layout"] },
  { name: "columns-02", displayName: "Columns 02", category: "layout", nodeId: "11099:47124", keywords: ["columns", "grid", "layout"] },
  { name: "columns-03", displayName: "Columns 03", category: "layout", nodeId: "11099:47123", keywords: ["columns", "grid", "layout"] },
  { name: "distribute-spacing-horizontal", displayName: "Distribute Spacing Horizontal", category: "layout", nodeId: "11099:47122", keywords: ["distribute", "spacing", "horizontal", "layout"] },
  { name: "distribute-spacing-vertical", displayName: "Distribute Spacing Vertical", category: "layout", nodeId: "11099:47121", keywords: ["distribute", "spacing", "vertical", "layout"] },
  { name: "divider", displayName: "Divider", category: "layout", nodeId: "11099:47119", keywords: ["divider", "separator", "layout"] },
  { name: "flex-align-bottom", displayName: "Flex Align Bottom", category: "layout", nodeId: "11099:47129", keywords: ["flex", "align", "bottom", "layout"] },
  { name: "flex-align-left", displayName: "Flex Align Left", category: "layout", nodeId: "11099:47130", keywords: ["flex", "align", "left", "layout"] },
  { name: "flex-align-right", displayName: "Flex Align Right", category: "layout", nodeId: "11099:47140", keywords: ["flex", "align", "right", "layout"] },
  { name: "flex-align-top", displayName: "Flex Align Top", category: "layout", nodeId: "11099:47118", keywords: ["flex", "align", "top", "layout"] },
  { name: "grid-01", displayName: "Grid 01", category: "layout", nodeId: "11099:47126", keywords: ["grid", "layout"] },
  { name: "grid-02", displayName: "Grid 02", category: "layout", nodeId: "11099:47117", keywords: ["grid", "layout"] },
  { name: "grid-03", displayName: "Grid 03", category: "layout", nodeId: "11099:47116", keywords: ["grid", "layout"] },
  { name: "grid-dots-blank", displayName: "Grid Dots Blank", category: "layout", nodeId: "11099:47115", keywords: ["grid", "dots", "layout"] },
  { name: "grid-dots-bottom", displayName: "Grid Dots Bottom", category: "layout", nodeId: "11099:47114", keywords: ["grid", "dots", "bottom", "layout"] },
  { name: "grid-dots-horizontal-center", displayName: "Grid Dots Horizontal Center", category: "layout", nodeId: "11099:47113", keywords: ["grid", "dots", "horizontal", "center", "layout"] },
  { name: "grid-dots-left", displayName: "Grid Dots Left", category: "layout", nodeId: "11099:47112", keywords: ["grid", "dots", "left", "layout"] },
  { name: "grid-dots-outer", displayName: "Grid Dots Outer", category: "layout", nodeId: "11099:47111", keywords: ["grid", "dots", "outer", "layout"] },
  { name: "grid-dots-right", displayName: "Grid Dots Right", category: "layout", nodeId: "11099:47110", keywords: ["grid", "dots", "right", "layout"] },
  { name: "grid-dots-top", displayName: "Grid Dots Top", category: "layout", nodeId: "11099:47109", keywords: ["grid", "dots", "top", "layout"] },
  { name: "grid-dots-vertical-center", displayName: "Grid Dots Vertical Center", category: "layout", nodeId: "11099:47108", keywords: ["grid", "dots", "vertical", "center", "layout"] },
  { name: "intersect-circle", displayName: "Intersect Circle", category: "layout", nodeId: "11099:47107", keywords: ["intersect", "circle", "layout"] },
  { name: "intersect-square", displayName: "Intersect Square", category: "layout", nodeId: "11099:47131", keywords: ["intersect", "square", "layout"] },
  { name: "layer-single", displayName: "Layer Single", category: "layout", nodeId: "11099:47106", keywords: ["layer", "single", "layout"] },
  { name: "layers-three-01", displayName: "Layers Three 01", category: "layout", nodeId: "11099:47105", keywords: ["layers", "three", "layout"] },
  { name: "layers-three-02", displayName: "Layers Three 02", category: "layout", nodeId: "11099:47104", keywords: ["layers", "three", "layout"] },
  { name: "layers-two-01", displayName: "Layers Two 01", category: "layout", nodeId: "11099:47103", keywords: ["layers", "two", "layout"] },
  { name: "layers-two-02", displayName: "Layers Two 02", category: "layout", nodeId: "11099:47102", keywords: ["layers", "two", "layout"] },
  { name: "layout-alt-01", displayName: "Layout Alt 01", category: "layout", nodeId: "11099:47100", keywords: ["layout", "alt", "alternative"] },
  { name: "layout-alt-02", displayName: "Layout Alt 02", category: "layout", nodeId: "11099:47099", keywords: ["layout", "alt", "alternative"] },
  { name: "layout-alt-03", displayName: "Layout Alt 03", category: "layout", nodeId: "11099:47098", keywords: ["layout", "alt", "alternative"] },
  { name: "layout-alt-04", displayName: "Layout Alt 04", category: "layout", nodeId: "11099:47097", keywords: ["layout", "alt", "alternative"] },
  { name: "layout-bottom", displayName: "Layout Bottom", category: "layout", nodeId: "11099:47101", keywords: ["layout", "bottom"] },
  { name: "layout-grid-01", displayName: "Layout Grid 01", category: "layout", nodeId: "11099:47096", keywords: ["layout", "grid"] },
  { name: "layout-grid-02", displayName: "Layout Grid 02", category: "layout", nodeId: "11099:47095", keywords: ["layout", "grid"] },
  { name: "layout-left", displayName: "Layout Left", category: "layout", nodeId: "11099:47094", keywords: ["layout", "left"] },
  { name: "layout-right", displayName: "Layout Right", category: "layout", nodeId: "11099:47093", keywords: ["layout", "right"] },
  { name: "layout-top", displayName: "Layout Top", category: "layout", nodeId: "11099:47092", keywords: ["layout", "top"] },
  { name: "list", displayName: "List", category: "layout", nodeId: "11099:47091", keywords: ["list", "layout"] },
  { name: "maximize-01", displayName: "Maximize 01", category: "layout", nodeId: "11099:47090", keywords: ["maximize", "expand", "fullscreen"] },
  { name: "maximize-02", displayName: "Maximize 02", category: "layout", nodeId: "11099:47089", keywords: ["maximize", "expand", "fullscreen"] },
  { name: "minimize-01", displayName: "Minimize 01", category: "layout", nodeId: "11099:47088", keywords: ["minimize", "collapse"] },
  { name: "minimize-02", displayName: "Minimize 02", category: "layout", nodeId: "11099:47087", keywords: ["minimize", "collapse"] },
  { name: "rows-01", displayName: "Rows 01", category: "layout", nodeId: "11099:47086", keywords: ["rows", "grid", "layout"] },
  { name: "rows-02", displayName: "Rows 02", category: "layout", nodeId: "11099:47085", keywords: ["rows", "grid", "layout"] },
  { name: "rows-03", displayName: "Rows 03", category: "layout", nodeId: "11099:47084", keywords: ["rows", "grid", "layout"] },
  { name: "spacing-height-01", displayName: "Spacing Height 01", category: "layout", nodeId: "11099:47083", keywords: ["spacing", "height", "vertical"] },
  { name: "spacing-height-02", displayName: "Spacing Height 02", category: "layout", nodeId: "11099:47082", keywords: ["spacing", "height", "vertical"] },
  { name: "spacing-width-01", displayName: "Spacing Width 01", category: "layout", nodeId: "11099:47081", keywords: ["spacing", "width", "horizontal"] },
  { name: "spacing-width-02", displayName: "Spacing Width 02", category: "layout", nodeId: "11099:47080", keywords: ["spacing", "width", "horizontal"] },
  { name: "table", displayName: "Table", category: "layout", nodeId: "11099:47079", keywords: ["table", "grid", "layout"] },
]

// Note: This is a partial list. The full registry would include all 1000+ icons
// For now, this demonstrates the structure. The complete list would be generated
// from the Figma metadata programmatically.

console.log("Icon registry generation script")
console.log(`Total icons to process: ${allIcons.length}`)
console.log("\nTo generate the full registry:")
console.log("1. Extract all icon metadata from Figma")
console.log("2. Run this script to generate icon entries")
console.log("3. Extract SVG paths from Figma for each icon")
console.log("4. Replace PLACEHOLDER_SVG_PATH with actual paths")

