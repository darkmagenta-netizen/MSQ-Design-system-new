/**
 * Token Resolver
 * 
 * Utility functions for resolving token references and accessing tokens.
 * This ensures proper resolution of Alias → Brand → Mapped token chain.
 */

import { DesignTokens, TokenPath } from './types';
import { mapped } from './mapped';
import { brand } from './brand';
import { alias } from './alias';

// Create tokens object locally to avoid circular dependency
const tokens: DesignTokens = {
  mapped,
  brand,
  alias,
};

/**
 * Resolves a token path to its final value
 * Handles the chain: Alias → Brand → Mapped
 * 
 * @param path - Token path (e.g., 'alias.color.primary')
 * @returns The resolved token value
 */
export function resolveToken(path: TokenPath): string {
  const parts = path.split('.');
  
  if (parts.length < 3) {
    throw new Error(`Invalid token path: ${path}. Expected format: collection.category.token`);
  }

  const [collection, category, token] = parts;
  
  // Access the token value
  const collectionObj = tokens[collection as keyof DesignTokens];
  if (!collectionObj) {
    throw new Error(`Collection "${collection}" not found`);
  }

  const categoryObj = (collectionObj as any)[category];
  if (!categoryObj) {
    throw new Error(`Category "${category}" not found in collection "${collection}"`);
  }

  const value = categoryObj[token];
  if (value === undefined) {
    throw new Error(`Token "${token}" not found in ${collection}.${category}`);
  }

  // If the value is a reference (starts with a path), resolve it recursively
  if (typeof value === 'string' && (value.startsWith('mapped.') || value.startsWith('brand.'))) {
    // This is a reference - resolve it
    // Note: In our implementation, references are already resolved to values
    // But this allows for future support of string references
    return value;
  }

  return String(value);
}

/**
 * Gets a token value by path with type safety
 * 
 * @param path - Token path
 * @returns The token value
 */
export function getToken(path: TokenPath): string {
  return resolveToken(path);
}

/**
 * Helper to get color tokens
 */
export const colors = {
  primary: () => tokens.alias.color['color-primary'],
  secondary: () => tokens.alias.color['color-secondary'],
  background: () => tokens.alias.color['color-background'],
  text: () => tokens.alias.color['color-text'],
  border: () => tokens.alias.color['color-border'],
  success: () => tokens.alias.color['color-success'],
  warning: () => tokens.alias.color['color-warning'],
  error: () => tokens.alias.color['color-error'],
  info: () => tokens.alias.color['color-info'],
};

/**
 * Helper to get spacing tokens
 */
export const spacing = {
  cardPadding: () => tokens.alias.spacing['spacing-card-padding'],
  sectionGap: () => tokens.alias.spacing['spacing-section-gap'],
  containerPadding: () => tokens.alias.spacing['spacing-container-padding'],
  buttonPaddingX: () => tokens.alias.spacing['spacing-button-padding-x'],
  buttonPaddingY: () => tokens.alias.spacing['spacing-button-padding-y'],
  inputPaddingX: () => tokens.alias.spacing['spacing-input-padding-x'],
  inputPaddingY: () => tokens.alias.spacing['spacing-input-padding-y'],
  gridGap: () => tokens.alias.spacing['spacing-grid-gap'],
};

/**
 * Helper to get typography tokens
 */
export const typography = {
  heading1: () => tokens.alias.typography['font-heading-1'],
  heading2: () => tokens.alias.typography['font-heading-2'],
  heading3: () => tokens.alias.typography['font-heading-3'],
  heading4: () => tokens.alias.typography['font-heading-4'],
  heading5: () => tokens.alias.typography['font-heading-5'],
  heading6: () => tokens.alias.typography['font-heading-6'],
  body: () => tokens.alias.typography['font-body'],
  bodySmall: () => tokens.alias.typography['font-body-small'],
  bodyLarge: () => tokens.alias.typography['font-body-large'],
  caption: () => tokens.alias.typography['font-caption'],
  label: () => tokens.alias.typography['font-label'],
};

