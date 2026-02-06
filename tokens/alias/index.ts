/**
 * Alias Collection - Semantic Tokens
 * 
 * This collection contains semantic tokens that reference Brand or Mapped tokens.
 * These tokens provide meaningful, purpose-driven names for design elements.
 * 
 * IMPORTANT: Components should ONLY use Alias tokens, never Mapped or Brand tokens directly.
 * This ensures semantic clarity and enables easy theming.
 */

import { AliasTokens } from '../types';
import { aliasColors } from './colors';
import { aliasSpacing } from './spacing';
import { aliasTypography } from './typography';

export const alias: AliasTokens = {
  color: aliasColors,
  spacing: aliasSpacing,
  typography: aliasTypography,
};

// Export individual collections for direct access if needed
export { aliasColors, aliasSpacing, aliasTypography };

