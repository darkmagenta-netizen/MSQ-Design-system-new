# Icons

Comprehensive icon library for the MSQ Design System. Icons are organized by category and can be used as React components or downloaded as SVG files.

## Structure

```
components/icons/
├── icon.tsx          # Base Icon component
├── icons.tsx         # Icon definitions (add new icons here)
├── registry.ts       # Icon registry and search functions
├── types.ts          # TypeScript types
├── index.ts          # Public exports
└── README.md         # This file
```

## Adding New Icons

To add a new icon from Figma:

### 1. Extract SVG Path from Figma

There are several ways to get SVG paths from Figma:

**Option A: Using Figma's Export**
1. Select the icon in Figma
2. Right-click → Copy/Paste as → Copy as SVG
3. Paste into a text editor
4. Extract the `d` attribute from `<path>` elements

**Option B: Using Figma's Code Panel**
1. Select the icon in Figma
2. Open the Code panel (right sidebar)
3. Copy the SVG code
4. Extract path data

**Option C: Using Browser DevTools**
1. Export icon as SVG from Figma
2. Open SVG file in browser
3. Inspect element to get path data

### 2. Add Icon to `icons.tsx`

Add a new entry to the `iconComponents` object:

```typescript
export const iconComponents: Record<string, IconData> = {
  // ... existing icons ...
  
  "your-icon-name": createIcon(
    "your-icon-name",           // Internal name (kebab-case)
    "Your Icon Name",            // Display name
    "general",                   // Category
    ["keyword1", "keyword2"],   // Search keywords
    "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z", // SVG path
    "Icon description",          // Optional description
    "11099:12345"               // Optional Figma node ID
  ),
}
```

### 3. Icon Categories

Available categories:
- `general` - General purpose icons
- `arrows` - Arrow and navigation icons
- `charts` - Chart and graph icons
- `communication` - Mail, message, phone icons
- `development` - Code, git, terminal icons
- `editor` - Text editing icons (bold, italic, etc.)
- `education` - Education-related icons
- `files` - File and folder icons
- `finance` - Money and finance icons
- `images` - Image and camera icons
- `layout` - Layout and alignment icons
- `maps` - Map and location icons
- `media` - Media player icons
- `security` - Security and lock icons
- `shapes` - Basic shapes
- `social` - Social media icons
- `time` - Clock and calendar icons
- `users` - User and people icons
- `weather` - Weather icons
- `alerts` - Alert and notification icons

### 4. Complex Icons

For icons with multiple paths or complex structures, you can pass React nodes:

```typescript
"complex-icon": createIcon(
  "complex-icon",
  "Complex Icon",
  "general",
  ["complex"],
  (
    <>
      <path d="M12 2..." fill="currentColor" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </>
  )
),
```

## Usage

### As React Component

```tsx
import { getAllIcons, getIconByName } from "@/components/icons"

// Get icon by name
const icon = getIconByName("activity")
if (icon) {
  const IconComponent = icon.component
  return <IconComponent className="h-6 w-6" />
}

// Or import directly
import { iconComponents } from "@/components/icons/icons"
const ActivityIcon = iconComponents.activity.component
```

### As SVG File

Icons can be downloaded as SVG files from the documentation page at `/docs/foundations/icons`.

### Styling

Icons use `currentColor` for fill, so they inherit the text color:

```tsx
// Blue icon
<div className="text-blue-500">
  <IconComponent className="h-6 w-6" />
</div>

// Using design tokens
<div className="text-[var(--color-primary)]">
  <IconComponent className="h-6 w-6" />
</div>
```

## Icon Metadata

Each icon includes:
- **name**: Internal identifier (kebab-case)
- **displayName**: Human-readable name
- **category**: Icon category for filtering
- **keywords**: Search keywords
- **description**: Optional description
- **nodeId**: Optional Figma node ID
- **component**: React component
- **svgCode**: SVG code string for download

## Search and Filter

Icons can be searched and filtered in the documentation page:
- Search by name, display name, or keywords
- Filter by category
- Copy SVG code to clipboard
- Download as SVG file

## Best Practices

1. **Naming**: Use kebab-case for icon names (e.g., `check-circle`, not `checkCircle`)
2. **Keywords**: Include common synonyms and related terms
3. **Categories**: Choose the most appropriate category
4. **SVG Paths**: Use simple paths when possible for better performance
5. **Consistency**: Follow existing icon patterns and naming conventions

## Resources

- [Figma Design File](https://www.figma.com/design/kPnax7i9sQ1P4jFUSgAQnV/MSQ-Design-System--Working-?node-id=13897-2080)
- [Icon Documentation](/docs/foundations/icons)
- [Design Tokens Documentation](/docs/foundations/colors)

