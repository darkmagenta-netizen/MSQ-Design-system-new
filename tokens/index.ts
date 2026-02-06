/**
 * MSQ Design Tokens - Main Export
 * 
 * This is the main entry point for accessing design tokens.
 * 
 * Structure:
 * - mapped: Primitive tokens (raw values)
 * - brand: Brand-specific tokens (extends mapped)
 * - alias: Semantic tokens (references brand/mapped) - USE THESE IN COMPONENTS
 * 
 * Usage in React components:
 * ```tsx
 * import { tokens } from './tokens';
 * 
 * const Button = styled.button`
 *   background-color: ${tokens.alias.color['color-primary']};
 *   padding: ${tokens.alias.spacing['spacing-button-padding-y']} ${tokens.alias.spacing['spacing-button-padding-x']};
 * `;
 * ```
 */

import { DesignTokens } from './types';
import { mapped } from './mapped';
import { brand } from './brand';
import { alias } from './alias';

/**
 * Complete design token system
 * 
 * Follows the Figma variable structure:
 * - Mapped → Brand → Alias → Components
 */
export const tokens: DesignTokens = {
  mapped,
  brand,
  alias,
};

// Export collections individually for convenience
export { mapped } from './mapped';
export { brand } from './brand';
export { alias } from './alias';

// Export types
export type { DesignTokens, TokenPath } from './types';

// Export resolver utilities
export { resolveToken, getToken, colors, spacing, typography } from './resolver';

// Default export for convenience
export default tokens;

