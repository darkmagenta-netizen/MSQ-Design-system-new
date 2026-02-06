/**
 * Mapped Collection - Primitive Tokens
 * 
 * This collection contains all primitive design tokens - raw values without semantic meaning.
 * These tokens are the foundation that Brand and Alias collections reference.
 * 
 * IMPORTANT: Never use these tokens directly in components.
 * Always use Alias tokens for semantic meaning.
 */

import { MappedTokens } from '../types';
import { mappedColors } from './colors';
import { mappedSpacing } from './spacing';
import { mappedTypography } from './typography';
import { mappedBorderRadius } from './borderRadius';
import { mappedShadows } from './shadows';

export const mapped: MappedTokens = {
  color: mappedColors,
  spacing: mappedSpacing,
  typography: mappedTypography,
  borderRadius: mappedBorderRadius,
  shadow: mappedShadows,
};

// Export individual collections for direct access if needed
export { mappedColors, mappedSpacing, mappedTypography, mappedBorderRadius, mappedShadows };

