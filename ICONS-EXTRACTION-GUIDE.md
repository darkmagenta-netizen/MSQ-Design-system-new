# Icon Extraction Guide

## Overview

The MSQ Design System includes **1000+ icons** from Figma. To enable download and copy functionality, SVG paths need to be extracted from Figma for each icon.

## Current Status

- ✅ Icon registry structure created with all 1000+ icons
- ✅ Icons organized by category (21 categories)
- ⚠️ SVG paths need to be extracted from Figma
- ✅ Download and copy functionality implemented (will work once SVG paths are added)

## How to Extract SVG Paths from Figma

### Method 1: Manual Extraction (Recommended for accuracy)

1. **Open Figma File**
   - Go to: https://www.figma.com/design/kPnax7i9sQ1P4jFUSgAQnV/MSQ-Design-System--Working-?node-id=13897-2080

2. **Select an Icon**
   - Navigate to the icon you want to extract
   - Click on the icon component

3. **Copy as SVG**
   - Right-click on the icon
   - Select: **Copy/Paste as** → **Copy as SVG**
   - Or use keyboard shortcut: `Cmd/Ctrl + Shift + C`

4. **Extract Path Data**
   - Paste the SVG code into a text editor
   - Look for `<path d="..."/>` elements
   - Copy the value of the `d` attribute (the path data)

5. **Update Icon Registry**
   - Open `components/icons/icons.tsx`
   - Find the icon entry
   - Replace `"PLACEHOLDER_SVG_PATH"` with the extracted path data

### Method 2: Batch Export (For multiple icons)

1. **Select Multiple Icons**
   - In Figma, select multiple icon components
   - Use `Shift + Click` or drag to select

2. **Export as SVG**
   - Right-click → **Export**
   - Choose SVG format
   - Export all selected icons

3. **Process SVG Files**
   - Open each SVG file in a text editor
   - Extract path data from `<path d="..."/>` elements
   - Update the icon registry

### Method 3: Using Figma Plugin (Automated)

1. **Install SVG Export Plugin**
   - Search for "SVG Export" or "Copy as SVG" plugins in Figma
   - Install and run the plugin

2. **Batch Process**
   - Select all icons
   - Run the plugin to export SVG code
   - Process the exported code programmatically

## Icon Categories

The icons are organized into 21 categories:

1. **Layout** (47 icons) - Alignment, grid, and layout tools
2. **Charts** (35 icons) - Data visualization icons
3. **Security** (28 icons) - Security and authentication icons
4. **Education** (25 icons) - Education and learning icons
5. **Development** (48 icons) - Code and development tools
6. **Arrows** (80+ icons) - Navigation and direction icons
7. **Finance & eCommerce** (60+ icons) - Payment and commerce icons
8. **General** (150+ icons) - General purpose icons
9. **Alerts & Feedback** (20 icons) - Alert and notification icons
10. **Shapes** (20 icons) - Basic shapes
11. **Users** (30+ icons) - User and people icons
12. **Media & Devices** (80+ icons) - Media player and device icons
13. **Images** (25 icons) - Image and camera icons
14. **Communication** (50+ icons) - Mail, message, phone icons
15. **Editor** (80+ icons) - Text editing icons
16. **Time** (25 icons) - Clock and calendar icons
17. **Files** (50+ icons) - File and folder icons
18. **Maps & Travel** (30+ icons) - Map and location icons
19. **Weather** (35 icons) - Weather icons
20. **Social** (20+ icons) - Social media icons
21. **Country** (200+ icons) - Country flag icons

## Icon Registry Structure

Each icon in `components/icons/icons.tsx` follows this structure:

```typescript
"icon-name": createIcon(
  "icon-name",                    // Internal name (kebab-case)
  "Icon Display Name",            // Display name
  "category",                     // Category
  ["keyword1", "keyword2"],      // Search keywords
  "M12 2L2 7v10c0...",          // SVG path data (replace PLACEHOLDER_SVG_PATH)
  "Icon description",            // Description
  "11099:12345"                  // Figma node ID
),
```

## Priority Icons

For immediate use, prioritize extracting SVG paths for these commonly used icons:

### General Icons
- activity, check, check-circle, archive, bookmark, copy, download, upload, search, settings

### Navigation Icons
- arrow-down, arrow-up, arrow-left, arrow-right, chevron-down, chevron-up, chevron-left, chevron-right

### UI Icons
- user-01, users-01, alert-circle, alert-triangle, bell, mail-01, calendar, clock

### Action Icons
- edit-01, delete, save-01, file-01, folder, lock, shield

## Predictable icon updates (Figma → design system)

When the Figma icon set changes (new icons, renames, or frame changes), use this **repeatable flow** so the docs icon browser and `lib/figma-icons-*.json` stay in sync with Figma.

### 1. Sync icons from Figma

```bash
# Fetches icon metadata and SVG paths from Figma into scripts/figma-icons-output/
npm run figma-icons-sync
```

- **What it does:** Calls the Figma API for the icon frame (node `13897:2080`), writes batch JSON files into `scripts/figma-icons-output/` (e.g. `figma-icons-batch-1.json` … `figma-icons-batch-N.json`) and `figma-icons-manifest.json`.
- **When to run:** After adding/removing icons or changing the icon set structure in Figma.
- **Requires:** Figma API token (see `.env.example` or script docs). The script is `scripts/sync-figma-icons.mjs`; you can pass different node IDs if your icon set lives elsewhere.

### 2. Merge batches and build SVG JSON

```bash
# Merges all batch files into lib/figma-icons-svg.json (used for copy/download in docs)
npm run figma-icons-merge
```

- **What it does:** Reads all `figma-icons-batch-*.json` in `scripts/figma-icons-output/`, merges them, and writes `lib/figma-icons-svg.json` (icon key → SVG code). The docs icon page uses this for copy and download.
- **When to run:** After `figma-icons-sync`.

### 3. Build icon list for the docs browser

```bash
# Builds lib/figma-icons-data.json from scripts/figma-icons-output/figma-icons-manifest.json
npm run figma-icons-data
```

- **What it does:** Reads `scripts/figma-icons-output/figma-icons-manifest.json`, filters to component/instance nodes, and writes `lib/figma-icons-data.json` (categories, icon list). The docs icon browser uses this for tabs and search.
- **When to run:** After `figma-icons-sync` (and optionally after changing how categories are derived). Can be run with `--manifest-only` if you only updated metadata.

### End-to-end after Figma icon changes

1. `npm run figma-icons-sync`
2. `npm run figma-icons-merge`
3. `npm run figma-icons-data`

Then commit `lib/figma-icons-data.json`, `lib/figma-icons-svg.json`, and any updated batch/manifest files. Consuming apps that copy these files (see **INTEGRATION-GUIDE.md**) get predictable icon updates by re-copying from this repo.

---

## Automated Extraction Script

A script is available to help with batch extraction:

```bash
# Run the icon extraction helper
node scripts/generate-icon-registry.ts
```

This script will:
1. List all icons that need SVG paths
2. Generate Figma URLs for each icon
3. Provide instructions for batch extraction

## Testing

After adding SVG paths:

1. **Test Icon Display**
   - Visit `/docs/foundations/icons`
   - Verify icons render correctly

2. **Test Copy Functionality**
   - Click the copy button on an icon
   - Verify SVG code is copied to clipboard

3. **Test Download Functionality**
   - Click the download button on an icon
   - Verify SVG file downloads correctly
   - Open downloaded file to verify it's valid SVG

## Notes

- SVG paths should use `currentColor` for fill to allow styling
- Complex icons may have multiple `<path>` elements
- Some icons may use `<circle>`, `<rect>`, or other SVG elements
- Ensure viewBox is `0 0 24 24` for consistency

## Support

For questions or issues with icon extraction:
1. Check the Figma file: https://www.figma.com/design/kPnax7i9sQ1P4jFUSgAQnV/MSQ-Design-System--Working-?node-id=13897-2080
2. Refer to `components/icons/README.md` for detailed instructions
3. Check `scripts/generate-icon-registry.ts` for automation tools

