/**
 * Brand Collection - Brand-Specific Tokens
 * 
 * This collection extends the Mapped collection, inheriting all primitive tokens.
 * Brand-specific overrides are defined here to customize the design system for specific brands.
 * 
 * The Brand collection acts as a bridge between Mapped primitives and Alias semantic tokens,
 * allowing for brand-specific theming while maintaining a connection to the base design system.
 */

import { BrandTokens } from '../types';
import { brandColors } from './colors';

export const brand: BrandTokens = {
  color: brandColors,
  // Additional brand-specific tokens can be added here
  // (e.g., brand-specific spacing, typography overrides, etc.)
};

// Export individual collections for direct access if needed
export { brandColors };

