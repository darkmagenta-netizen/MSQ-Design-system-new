# MSQ Design Tokens

This directory contains the design token system for the MSQ Design System, structured to match the Figma variable architecture.

## Structure

```
tokens/
├── mapped/          # Primitive tokens (raw values)
├── brand/           # Brand-specific tokens (extends mapped)
├── alias/           # Semantic tokens (references brand/mapped)
├── types.ts         # TypeScript type definitions
├── resolver.ts      # Token resolution utilities
└── index.ts         # Main export file
```

## Architecture

### 1. Mapped Collection (Primitives)
- **Location:** `tokens/mapped/`
- **Purpose:** Raw design values without semantic meaning
- **Usage:** Never used directly in components
- **Examples:** `red-500`, `spacing-16`, `font-size-14`

### 2. Brand Collection (Extended)
- **Location:** `tokens/brand/`
- **Purpose:** Brand-specific customizations that extend Mapped
- **Usage:** Inherits all Mapped tokens, can override specific values
- **Examples:** `primary-color`, `secondary-color` (may override Mapped values)

### 3. Alias Collection (Semantic)
- **Location:** `tokens/alias/`
- **Purpose:** Semantic tokens with meaningful names
- **Usage:** Used directly in components
- **Examples:** `color-primary`, `spacing-card-padding`, `font-heading`

## Usage in React Components

```typescript
import { tokens } from './tokens';

// Use semantic tokens (Alias collection)
const Button = styled.button`
  background-color: ${tokens.alias.color.primary};
  padding: ${tokens.alias.spacing.cardPadding};
  font-size: ${tokens.alias.typography.body};
`;
```

## Token Resolution

The resolver automatically resolves token references:
- Alias tokens → Brand tokens → Mapped tokens
- Ensures single source of truth
- Enables easy theme switching

## Adding New Tokens

1. **Primitive value?** → Add to `mapped/`
2. **Brand-specific?** → Add to `brand/` (can override mapped)
3. **Semantic usage?** → Add to `alias/` (references brand/mapped)

## Best Practices

- ✅ Always use Alias tokens in components
- ✅ Never reference Mapped tokens directly
- ✅ Use Brand tokens for theme-specific values
- ✅ Keep token names semantic and purpose-driven

