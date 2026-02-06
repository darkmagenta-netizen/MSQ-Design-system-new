# UI Components

This directory contains the UI components for the MSQ Design System, built following the [shadcn/ui](https://ui.shadcn.com/docs/components) structure.

## Components

### Button

A versatile button component with multiple variants, sizes, and states.

**Variants:**
- `primary` - Primary brand color button
- `secondary` - Secondary brand color button
- `outline` - Outlined button with border
- `error` - Error state button
- `error-secondary` - Secondary error button
- `error-outline` - Outlined error button
- `grey-text` - Grey background with text
- `grey-disabled` - Grey disabled state
- `color-text` - Colored text on white background
- `disabled` - Primary disabled state
- `disabled-outline` - Disabled outline state
- `ghost` - Transparent button

**Sizes:**
- `xl` - Extra large (52px height)
- `lg` - Large (44px height)
- `md` - Medium (40px height)
- `sm` - Small (36px height)
- `icon-xl`, `icon-lg`, `icon-md`, `icon-sm` - Icon-only buttons

**Border Radius:**
- `default` - Default border radius
- `full` - Fully rounded
- `none` - No border radius

**Usage:**

```tsx
import { Button } from "@/components/ui/button"

// Basic usage
<Button>Click me</Button>

// With variant and size
<Button variant="primary" size="lg">Primary Large</Button>

// With icon
<Button variant="outline">
  <Icon className="mr-2" />
  With Icon
</Button>

// Icon-only button
<Button size="icon-md" variant="primary">
  <Icon />
</Button>
```

## Design Tokens

All components use design tokens from `@/tokens`. The tokens are automatically synced to CSS variables in `app/globals.css`.

## Structure

Components follow the shadcn/ui pattern:
- Each component is in its own file
- Uses `class-variance-authority` for variant management
- Uses `cn()` utility for className merging
- Fully typed with TypeScript
- Accessible by default

