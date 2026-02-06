# Design Tokens Structure

This document outlines the complete structure of the MSQ Design Tokens system.

## Directory Structure

```
tokens/
├── README.md                 # Overview and architecture
├── USAGE.md                  # Usage guide for React components
├── STRUCTURE.md              # This file - structure documentation
├── types.ts                  # TypeScript type definitions
├── resolver.ts               # Token resolution utilities
├── index.ts                  # Main export file
│
├── mapped/                   # Primitive tokens (raw values)
│   ├── index.ts
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   ├── borderRadius.ts
│   └── shadows.ts
│
├── brand/                    # Brand-specific tokens (extends mapped)
│   ├── index.ts
│   └── colors.ts
│
└── alias/                    # Semantic tokens (references brand/mapped)
    ├── index.ts
    ├── colors.ts
    ├── spacing.ts
    └── typography.ts
```

## Token Collections

### 1. Mapped Collection (`tokens/mapped/`)

**Purpose:** Primitive design tokens - raw values without semantic meaning.

**Contents:**
- **Colors:** Color scales (red, blue, gray) + base colors (white, black)
- **Spacing:** Spacing scale from 0 to 64 (in pixels)
- **Typography:** Font sizes, line heights, font weights
- **Border Radius:** Radius scale from none to full
- **Shadows:** Shadow scale from sm to 2xl

**Usage:** Never used directly in components. Only referenced by Brand and Alias collections.

**Example:**
```typescript
mapped.color['blue-600']  // #2563EB
mapped.spacing['spacing-16']  // 64px
mapped.typography['font-size-16']  // 16px
```

### 2. Brand Collection (`tokens/brand/`)

**Purpose:** Brand-specific customizations that extend the Mapped collection.

**Contents:**
- **Colors:** Brand-specific color overrides (primary, secondary, accent, status colors)

**Relationship:** 
- Inherits all Mapped tokens
- Can override specific values for brand customization
- Changes to Mapped propagate unless overridden

**Example:**
```typescript
brand.color['primary-color']  // References mapped.color['blue-600'] or overrides it
brand.color['error-color']    // References mapped.color['red-600']
```

### 3. Alias Collection (`tokens/alias/`)

**Purpose:** Semantic tokens with meaningful names for component usage.

**Contents:**
- **Colors:** Semantic color tokens (primary, secondary, background, text, border, status)
- **Spacing:** Semantic spacing tokens (card padding, section gap, button padding, etc.)
- **Typography:** Semantic typography tokens (headings, body, caption, label)

**Relationship:**
- References Brand or Mapped tokens
- Provides semantic meaning
- Used directly in components

**Example:**
```typescript
alias.color['color-primary']           // Used in components
alias.spacing['spacing-card-padding']  // Used in components
alias.typography['font-heading-1']     // Used in components
```

## Token Flow

```
Mapped (Primitives)
    ↓ extends
Brand (Brand-specific overrides)
    ↓ references
Alias (Semantic tokens)
    ↓ used in
Components
```

## Token Categories

### Colors

**Mapped:**
- Color scales: red, blue, gray (50-950)
- Base: white, black

**Brand:**
- primary-color
- secondary-color
- accent-color
- success-color
- warning-color
- error-color
- info-color

**Alias:**
- Primary: color-primary, color-primary-hover, color-primary-active, color-primary-disabled
- Secondary: color-secondary, color-secondary-hover, color-secondary-active
- Background: color-background, color-background-subtle, color-background-elevated
- Text: color-text, color-text-secondary, color-text-tertiary, color-text-inverse
- Border: color-border, color-border-subtle, color-border-strong
- Status: color-success, color-warning, color-error, color-info

### Spacing

**Mapped:**
- spacing-0 through spacing-64 (0px to 256px)

**Alias:**
- spacing-card-padding
- spacing-section-gap
- spacing-container-padding
- spacing-button-padding-x/y
- spacing-input-padding-x/y
- spacing-grid-gap

### Typography

**Mapped:**
- Font sizes: font-size-10 through font-size-64
- Line heights: line-height-tight, normal, relaxed, loose
- Font weights: light, normal, medium, semibold, bold

**Alias:**
- Headings: font-heading-1 through font-heading-6
- Body: font-body, font-body-small, font-body-large
- Supporting: font-caption, font-label

### Border Radius

**Mapped:**
- radius-none, radius-sm, radius-md, radius-lg, radius-xl, radius-2xl, radius-full

### Shadows

**Mapped:**
- shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-2xl

## Type Safety

All tokens are fully typed with TypeScript:

```typescript
import { tokens, TokenPath } from './tokens';

// TypeScript will autocomplete and type-check
tokens.alias.color['color-primary']  // ✅ Valid
tokens.alias.color['invalid']        // ❌ TypeScript error
```

## Extending the System

### Adding New Mapped Tokens

1. Add the token to the appropriate file in `mapped/`
2. Update the type definition in `types.ts`
3. Export from `mapped/index.ts`

### Adding New Brand Tokens

1. Add the token to `brand/colors.ts` (or create new category)
2. Update `types.ts` with Brand token types
3. Export from `brand/index.ts`

### Adding New Alias Tokens

1. Add the token to the appropriate file in `alias/`
2. Reference Brand or Mapped tokens
3. Update `types.ts` with Alias token types
4. Export from `alias/index.ts`

## Importing from Figma

When importing tokens from Figma:

1. **Map Figma variables to token structure:**
   - Figma "Mapped" collection → `tokens/mapped/`
   - Figma "Brand" collection → `tokens/brand/`
   - Figma "Alias" collection → `tokens/alias/`

2. **Preserve relationships:**
   - Maintain Brand extends Mapped relationship
   - Maintain Alias references to Brand/Mapped

3. **Update values:**
   - Replace placeholder values with actual Figma values
   - Ensure all references are correctly mapped

## Best Practices

1. ✅ Always use Alias tokens in components
2. ✅ Never reference Mapped tokens directly in components
3. ✅ Use TypeScript for type safety
4. ✅ Keep token names semantic and purpose-driven
5. ✅ Document any custom extensions
6. ✅ Maintain the three-tier structure (Mapped → Brand → Alias)

