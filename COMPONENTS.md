# MSQ Design System Components

This document provides an overview of all components in the MSQ Design System.

## Getting Started

### Installation

The components are already set up in this project. To use them:

```tsx
import { Button } from "@/components/ui/button"
```

### Running the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the component showcase.

## Components

### Button

The Button component is the foundation of interactive elements in the design system.

**Features:**
- Multiple variants (Primary, Secondary, Outline, Error, etc.)
- Four sizes (xl, lg, md, sm)
- Icon support (with text or icon-only)
- Border radius options
- Full TypeScript support
- Accessible by default

**Based on Figma Design:**
- Matches all button variants from the Figma file
- Supports all states (Default, Hover, Disabled)
- Implements all size variations
- Includes icon button variants

**See it in action:** Visit the home page (`/`) to see all button variants and states.

## Component Structure

Components are organized following the [shadcn/ui](https://ui.shadcn.com/docs/components) pattern:

```
components/
└── ui/
    ├── button.tsx      # Button component
    ├── index.ts        # Component exports
    └── README.md       # Component documentation
```

## Design Tokens

All components use design tokens from the `tokens/` directory:

- **Mapped Collection** - Primitive values
- **Brand Collection** - Brand-specific overrides
- **Alias Collection** - Semantic tokens (used in components)

Tokens are synced to CSS variables in `app/globals.css` for use in Tailwind classes.

## Next Components to Build

Based on the Figma file, the following components are planned:

1. ✅ **Button** - Complete
2. ⏳ **Social Button** - Social login buttons (Google, Facebook, Apple, Twitter)
3. ⏳ **Language Button** - Language selector buttons
4. ⏳ **Admin Button** - Admin-specific button variants
5. ⏳ **Input** - Form input components
6. ⏳ **Textarea** - Text area components
7. ⏳ **Select** - Dropdown select components
8. ⏳ **List** - List components
9. ⏳ **Table** - Table components
10. ⏳ **Organisms** - Complex composite components

## Testing Components

Each component can be tested on the home page (`app/page.tsx`). The page showcases:

- All variants
- All sizes
- All states
- Icon variations
- Border radius options

## Contributing

When adding new components:

1. Create the component file in `components/ui/`
2. Follow the shadcn/ui pattern
3. Use design tokens from `@/tokens`
4. Add examples to `app/page.tsx`
5. Update this documentation
6. Export from `components/ui/index.ts`

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/docs/components)
- [Design Tokens Documentation](./tokens/README.md)
- [Figma Design File](https://www.figma.com/design/kPnax7i9sQ1P4jFUSgAQnV/MSQ-Design-System--Working-)

