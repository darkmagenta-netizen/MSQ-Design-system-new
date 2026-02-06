# Design Tokens Usage Guide

This guide shows how to use the MSQ Design Tokens in your React components.

## Basic Usage

### Import Tokens

```typescript
import { tokens } from './tokens';
// or
import tokens from './tokens';
```

### Using Tokens in Styled Components

```typescript
import styled from 'styled-components';
import { tokens } from './tokens';

const Button = styled.button`
  background-color: ${tokens.alias.color['color-primary']};
  color: ${tokens.alias.color['color-text-inverse']};
  padding: ${tokens.alias.spacing['spacing-button-padding-y']} ${tokens.alias.spacing['spacing-button-padding-x']};
  border-radius: ${tokens.mapped.borderRadius['radius-md']};
  font-size: ${tokens.alias.typography['font-body']};
  border: 1px solid ${tokens.alias.color['color-border']};
  
  &:hover {
    background-color: ${tokens.alias.color['color-primary-hover']};
  }
  
  &:disabled {
    background-color: ${tokens.alias.color['color-primary-disabled']};
    cursor: not-allowed;
  }
`;
```

### Using Tokens in CSS Modules

```css
/* Button.module.css */
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-button-padding-y) var(--spacing-button-padding-x);
}

/* You'll need to inject tokens as CSS variables */
```

### Using Tokens with CSS-in-JS (Emotion)

```typescript
import { css } from '@emotion/react';
import { tokens } from './tokens';

const buttonStyles = css`
  background-color: ${tokens.alias.color['color-primary']};
  padding: ${tokens.alias.spacing['spacing-button-padding-y']} ${tokens.alias.spacing['spacing-button-padding-x']};
  font-size: ${tokens.alias.typography['font-body']};
`;
```

### Using Helper Functions

```typescript
import { colors, spacing, typography } from './tokens';

const Card = styled.div`
  background-color: ${colors.background()};
  padding: ${spacing.cardPadding()};
  font-size: ${typography.body()};
  border: 1px solid ${colors.border()};
`;
```

## Token Structure

### Always Use Alias Tokens in Components

✅ **Correct:**
```typescript
tokens.alias.color['color-primary']
tokens.alias.spacing['spacing-card-padding']
tokens.alias.typography['font-heading-1']
```

❌ **Incorrect (Never do this):**
```typescript
tokens.mapped.color['blue-600']  // Don't use mapped directly
tokens.brand.color['primary-color']  // Don't use brand directly
```

### Accessing Mapped Tokens (For Reference Only)

Mapped tokens should only be used when creating new Alias tokens or for reference:

```typescript
// Only use when extending the token system
import { mapped } from './tokens';

const newAliasToken = mapped.color['blue-500'];
```

## Creating CSS Variables

If you need to inject tokens as CSS variables (useful for CSS Modules or plain CSS):

```typescript
import { tokens } from './tokens';

// Function to convert tokens to CSS variables
function tokensToCSSVariables() {
  const root = document.documentElement;
  
  // Color tokens
  Object.entries(tokens.alias.color).forEach(([key, value]) => {
    root.style.setProperty(`--${key.replace('color-', '')}`, value);
  });
  
  // Spacing tokens
  Object.entries(tokens.alias.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--${key.replace('spacing-', '')}`, value);
  });
  
  // Typography tokens
  Object.entries(tokens.alias.typography).forEach(([key, value]) => {
    root.style.setProperty(`--${key.replace('font-', '')}`, value);
  });
}

// Call in your app initialization
tokensToCSSVariables();
```

Then use in CSS:
```css
.button {
  background-color: var(--primary);
  padding: var(--button-padding-y) var(--button-padding-x);
}
```

## TypeScript Support

All tokens are fully typed. TypeScript will autocomplete token paths:

```typescript
import { tokens } from './tokens';

// TypeScript will autocomplete these:
tokens.alias.color['color-primary']  // ✅
tokens.alias.color['color-invalid']   // ❌ TypeScript error
```

## Theme Switching

The token structure supports theme switching through the Brand collection:

```typescript
// In the future, you can switch brands like this:
import { tokens, brand } from './tokens';

// Switch to a different brand theme
// (This would require implementing a theme provider)
```

## Best Practices

1. **Always use Alias tokens** in components for semantic clarity
2. **Never reference Mapped tokens directly** in components
3. **Use TypeScript** for type safety and autocomplete
4. **Keep token names semantic** - they should describe purpose, not appearance
5. **Document custom tokens** if you extend the system

## Examples

### Button Component

```typescript
import styled from 'styled-components';
import { tokens } from './tokens';

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${tokens.alias.spacing['spacing-button-padding-y']} ${tokens.alias.spacing['spacing-button-padding-x']};
  border-radius: ${tokens.mapped.borderRadius['radius-md']};
  font-size: ${tokens.alias.typography['font-body']};
  font-weight: ${tokens.mapped.typography['font-weight-medium']};
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  
  ${({ variant = 'primary' }) => variant === 'primary' ? `
    background-color: ${tokens.alias.color['color-primary']};
    color: ${tokens.alias.color['color-text-inverse']};
    
    &:hover {
      background-color: ${tokens.alias.color['color-primary-hover']};
    }
  ` : `
    background-color: ${tokens.alias.color['color-secondary']};
    color: ${tokens.alias.color['color-text-inverse']};
    
    &:hover {
      background-color: ${tokens.alias.color['color-secondary-hover']};
    }
  `}
  
  &:disabled {
    background-color: ${tokens.alias.color['color-primary-disabled']};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
```

### Card Component

```typescript
import styled from 'styled-components';
import { tokens } from './tokens';

export const Card = styled.div`
  background-color: ${tokens.alias.color['color-background-elevated']};
  padding: ${tokens.alias.spacing['spacing-card-padding']};
  border-radius: ${tokens.mapped.borderRadius['radius-lg']};
  border: 1px solid ${tokens.alias.color['color-border']};
  box-shadow: ${tokens.mapped.shadow['shadow-md']};
`;

export const CardTitle = styled.h3`
  font-size: ${tokens.alias.typography['font-heading-4']};
  color: ${tokens.alias.color['color-text']};
  margin-bottom: ${tokens.alias.spacing['spacing-4']};
`;

export const CardBody = styled.p`
  font-size: ${tokens.alias.typography['font-body']};
  color: ${tokens.alias.color['color-text-secondary']};
  line-height: ${tokens.mapped.typography['line-height-relaxed']};
`;
```

