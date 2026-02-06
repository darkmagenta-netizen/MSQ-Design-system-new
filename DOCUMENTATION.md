# MSQ Design System Documentation

This document describes the documentation system built for the MSQ Design System, following the patterns from [shadcn/ui](https://ui.shadcn.com/docs/components).

---

## Current progress & key documents

The design system is positioned as a **design-to-code bridge**: Figma is the design source of truth; this repo is the **code** source of truth (tokens, components, icons). Consuming apps copy from here.

| Document | Purpose |
|----------|---------|
| **[INTEGRATION-GUIDE.md](./INTEGRATION-GUIDE.md)** | Step-by-step guide for developers: clone/submodule, copy components and tokens, Tailwind/ThemeProvider setup, checklist. Includes **Part 5** (design-to-code goals) and **Part 6** (optional Figma MCP + Cursor). |
| **[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)** | Source-of-truth model: Figma → this repo → consuming apps. Update flow for tokens, components, and icons (including `figma-icons-sync` / `figma-icons-merge` / `figma-icons-data`). |
| **[ICONS-EXTRACTION-GUIDE.md](./ICONS-EXTRACTION-GUIDE.md)** | How to extract SVG paths from Figma, icon categories, and **predictable icon updates**: scripts and flow for keeping `lib/figma-icons-*.json` in sync with Figma. |
| **[tokens/FIGMA-TOKEN-MAP.md](./tokens/FIGMA-TOKEN-MAP.md)** | Token and variant audit trail: mapping from Figma token/style names to CSS variables and Tailwind. |
| **Docs site** (`npm run dev` → `/docs`) | Component and foundation docs (Button, Alert, Logos, Icons, etc.) with preview/code tabs and copy. |

**Summary of what’s in place**

- **Source of truth:** This repo holds tokens (`app/globals.css`, `tokens/`), components (`components/ui/`), and icon data (`lib/figma-icons-*.json`). DESIGN-SYSTEM.md states the Figma ↔ repo relationship.
- **Reduced interpretation:** Tokens and component variants are named and documented; FIGMA-TOKEN-MAP.md links Figma intent to CSS/Tailwind.
- **Predictable updates:** Icons use scripted sync (see ICONS-EXTRACTION-GUIDE); components/tokens use “change design system → copy or pull from repo.”
- **MCP + Cursor (optional):** INTEGRATION-GUIDE Part 6 describes using the design system with Figma MCP in Cursor so code suggestions align with both Figma and this implementation.

For “how do I use this in my app?”, start with **INTEGRATION-GUIDE.md**. For the docs site structure and patterns, see below.

---

## Documentation Structure

The documentation system is built with Next.js and follows the shadcn/ui documentation pattern. The sidebar is organized in three sections: **Get Started**, **Foundations**, and **Components**.

### App routes (`app/docs/`)

```
app/docs/
├── layout.tsx                  # Docs layout (sidebar + content)
├── page.tsx                    # Get Started / installation
├── components/                 # Component documentation
│   ├── alert/page.tsx
│   ├── badge/page.tsx
│   ├── banner/page.tsx
│   ├── bottom-nav/page.tsx
│   ├── button/page.tsx
│   ├── calendar/page.tsx
│   ├── checkbox/page.tsx
│   ├── dropdown/page.tsx
│   ├── input/page.tsx
│   ├── language-button/page.tsx
│   ├── nav-bar/page.tsx
│   ├── nav-menu/page.tsx
│   ├── pagination/page.tsx
│   ├── progress/page.tsx
│   ├── social-button/page.tsx
│   ├── tabs/page.tsx
│   ├── toggle/page.tsx
│   └── tooltip/page.tsx
└── foundations/                # Foundation documentation
    ├── colors/page.tsx
    ├── cryptocurrency/page.tsx
    ├── grid/page.tsx
    ├── icons/page.tsx
    ├── logos/page.tsx
    ├── radius/page.tsx
    ├── spacing/page.tsx
    └── typography/page.tsx
```

### Shared docs components (`components/docs/`)

Reusable pieces for every doc page:

```
components/docs/
├── sidebar.tsx             # Sidebar navigation (Get Started, Foundations, Components)
├── header.tsx              # Sticky header with nav and logo
├── search.tsx              # Search (e.g. ⌘K)
├── code-block.tsx          # Code block with copy button
├── component-preview.tsx   # Preview wrapper for examples
├── tabs.tsx                # Preview/Code tabs
└── table-of-contents.tsx  # Right-hand TOC on doc pages
```

Sidebar entries are driven by `components/docs/sidebar.tsx` (translations and hrefs). Not every file under `app/docs/components/` or `app/docs/foundations/` is necessarily linked in the sidebar; add or adjust entries there when adding new pages.

## Features

### 1. Code Copy Functionality

Every code block includes a copy button that appears on hover:

```tsx
<CodeBlock code="import { Button } from '@/components/ui/button'" />
```

- Copy button appears on hover
- Shows checkmark when copied
- Automatically resets after 2 seconds

### 2. Preview/Code Tabs

Each example section uses tabs to switch between preview and code:

```tsx
<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">
    <ComponentPreview>
      {/* Component example */}
    </ComponentPreview>
  </TabsContent>
  <TabsContent value="code">
    <CodeBlock code={exampleCode} />
  </TabsContent>
</Tabs>
```

### 3. Table of Contents

Each component page includes a table of contents that:
- Tracks scroll position
- Highlights active section
- Provides quick navigation
- Only visible on larger screens (xl breakpoint)

### 4. Component Preview

All examples are wrapped in `ComponentPreview` for consistent styling:

```tsx
<ComponentPreview title="Variants">
  <Button variant="primary">Primary</Button>
</ComponentPreview>
```

### 5. Sidebar Navigation

- Organized by sections: **Get Started**, **Foundations** (colors, cryptocurrency, grid, icons, logos, radius, spacing, typography), **Components** (alert, badge, button, calendar, etc.)
- Active route highlighting
- Smooth scrolling; scrollbar hidden via `.scrollbar-hide`
- Sticky positioning; mobile overlay with close button

### 6. Header

- Sticky header with backdrop blur
- Navigation links
- Search placeholder (⌘K shortcut indicator)
- Brand logo link

## Component Documentation Pattern

Each component page follows this structure:

1. **Title & Description**
   - Component name
   - Brief description

2. **Installation**
   - Import statement
   - Copyable code block

3. **Usage**
   - Basic example with Preview/Code tabs

4. **Examples**
   - Multiple examples organized by feature
   - Each with Preview/Code tabs
   - Real component demonstrations

5. **API Reference**
   - TypeScript interface
   - All props documented
   - Copyable code block

## Design Tokens Integration

All documentation uses design tokens:
- Colors from `var(--color-*)` CSS variables
- Consistent spacing and typography
- Matches component styling

## Responsive Design

- Sidebar: Fixed width on desktop, collapsible on mobile
- Table of Contents: Hidden on smaller screens
- Code blocks: Horizontal scroll on overflow
- Layout: Adapts to screen size

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Focus states on interactive elements
- ARIA labels where appropriate
- Screen reader friendly

## Usage

### Adding a new doc page

**Component page:** `app/docs/components/[component-name]/page.tsx`  
**Foundation page:** `app/docs/foundations/[foundation-name]/page.tsx`

1. Create the page file in the right folder (`components/` or `foundations/`).
2. Follow the existing pattern:
   ```tsx
   import { CodeBlock } from "@/components/docs/code-block"
   import { ComponentPreview } from "@/components/docs/component-preview"
   import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
   import { TableOfContents } from "@/components/docs/table-of-contents"
   
   const tocItems = [
     { title: "Installation", id: "installation" },
     { title: "Usage", id: "usage" },
     { title: "Examples", id: "examples" },
     { title: "API Reference", id: "api" },
   ]
   
   export default function ComponentPage() {
     return (
       <div className="flex gap-12">
         <div className="flex-1 max-w-5xl">
           {/* Content */}
         </div>
         <TableOfContents items={tocItems} />
       </div>
     )
   }
   ```
3. Add the page to the sidebar: edit `components/docs/sidebar.tsx` (add an item under the right section in the `navigation` array). Add translations in `lib/translations.ts` if the sidebar uses translated titles.

## Styling

All documentation uses:
- Design tokens via CSS variables
- Consistent spacing (mb-12 for sections, mb-4 for headings)
- Border and background colors from tokens
- Smooth transitions and hover states

## References

- [shadcn/ui Documentation](https://ui.shadcn.com/docs/components) - Pattern reference
- [Design Tokens](./tokens/README.md) - Token system documentation
- [INTEGRATION-GUIDE.md](./INTEGRATION-GUIDE.md) - How to integrate the design system into an app (Parts 1–6, including MCP + Cursor)
- [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) - Source-of-truth model and update flow
- [ICONS-EXTRACTION-GUIDE.md](./ICONS-EXTRACTION-GUIDE.md) - Icon extraction and predictable icon updates (Figma → design system)
- [tokens/FIGMA-TOKEN-MAP.md](./tokens/FIGMA-TOKEN-MAP.md) - Figma token/style → CSS variable mapping

