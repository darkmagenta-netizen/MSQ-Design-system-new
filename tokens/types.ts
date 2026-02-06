/**
 * TypeScript type definitions for MSQ Design Tokens
 */

// Base token value types
export type ColorValue = string;
export type SpacingValue = string | number;
export type TypographyValue = string | number;
export type BorderRadiusValue = string | number;
export type ShadowValue = string;
export type OpacityValue = number;

// Token reference type (for aliases that reference other tokens)
export type TokenReference = string;

// Mapped (Primitive) Token Types
export interface MappedColors {
  // Red scale
  'red-50': ColorValue;
  'red-100': ColorValue;
  'red-200': ColorValue;
  'red-300': ColorValue;
  'red-400': ColorValue;
  'red-500': ColorValue;
  'red-600': ColorValue;
  'red-700': ColorValue;
  'red-800': ColorValue;
  'red-900': ColorValue;
  'red-950': ColorValue;

  // Blue scale
  'blue-50': ColorValue;
  'blue-100': ColorValue;
  'blue-200': ColorValue;
  'blue-300': ColorValue;
  'blue-400': ColorValue;
  'blue-500': ColorValue;
  'blue-600': ColorValue;
  'blue-700': ColorValue;
  'blue-800': ColorValue;
  'blue-900': ColorValue;
  'blue-950': ColorValue;

  // Gray scale
  'gray-50': ColorValue;
  'gray-100': ColorValue;
  'gray-200': ColorValue;
  'gray-300': ColorValue;
  'gray-400': ColorValue;
  'gray-500': ColorValue;
  'gray-600': ColorValue;
  'gray-700': ColorValue;
  'gray-800': ColorValue;
  'gray-900': ColorValue;
  'gray-950': ColorValue;

  // Additional colors
  'white': ColorValue;
  'black': ColorValue;
}

export interface MappedSpacing {
  'spacing-0': SpacingValue;
  'spacing-1': SpacingValue;
  'spacing-2': SpacingValue;
  'spacing-4': SpacingValue;
  'spacing-6': SpacingValue;
  'spacing-8': SpacingValue;
  'spacing-12': SpacingValue;
  'spacing-16': SpacingValue;
  'spacing-20': SpacingValue;
  'spacing-24': SpacingValue;
  'spacing-32': SpacingValue;
  'spacing-40': SpacingValue;
  'spacing-48': SpacingValue;
  'spacing-64': SpacingValue;
}

export interface MappedTypography {
  'font-size-10': TypographyValue;
  'font-size-12': TypographyValue;
  'font-size-14': TypographyValue;
  'font-size-16': TypographyValue;
  'font-size-18': TypographyValue;
  'font-size-20': TypographyValue;
  'font-size-24': TypographyValue;
  'font-size-28': TypographyValue;
  'font-size-32': TypographyValue;
  'font-size-36': TypographyValue;
  'font-size-40': TypographyValue;
  'font-size-48': TypographyValue;
  'font-size-56': TypographyValue;
  'font-size-64': TypographyValue;

  'line-height-tight': TypographyValue;
  'line-height-normal': TypographyValue;
  'line-height-relaxed': TypographyValue;
  'line-height-loose': TypographyValue;

  'font-weight-light': TypographyValue;
  'font-weight-normal': TypographyValue;
  'font-weight-medium': TypographyValue;
  'font-weight-semibold': TypographyValue;
  'font-weight-bold': TypographyValue;
}

export interface MappedBorderRadius {
  'radius-none': BorderRadiusValue;
  'radius-sm': BorderRadiusValue;
  'radius-md': BorderRadiusValue;
  'radius-lg': BorderRadiusValue;
  'radius-xl': BorderRadiusValue;
  'radius-2xl': BorderRadiusValue;
  'radius-full': BorderRadiusValue;
}

export interface MappedShadows {
  'shadow-sm': ShadowValue;
  'shadow-md': ShadowValue;
  'shadow-lg': ShadowValue;
  'shadow-xl': ShadowValue;
  'shadow-2xl': ShadowValue;
}

export interface MappedTokens {
  color: MappedColors;
  spacing: MappedSpacing;
  typography: MappedTypography;
  borderRadius: MappedBorderRadius;
  shadow: MappedShadows;
}

// Brand Token Types (extends Mapped, can override)
export interface BrandColors {
  // Brand-specific color overrides
  'primary-color'?: ColorValue | TokenReference;
  'secondary-color'?: ColorValue | TokenReference;
  'accent-color'?: ColorValue | TokenReference;
  'success-color'?: ColorValue | TokenReference;
  'warning-color'?: ColorValue | TokenReference;
  'error-color'?: ColorValue | TokenReference;
  'info-color'?: ColorValue | TokenReference;
}

export interface BrandTokens {
  color: BrandColors;
  // Can extend with other brand-specific overrides
}

// Alias (Semantic) Token Types
export interface AliasColors {
  // Primary colors
  'color-primary': TokenReference;
  'color-primary-hover': TokenReference;
  'color-primary-active': TokenReference;
  'color-primary-disabled': TokenReference;

  // Secondary colors
  'color-secondary': TokenReference;
  'color-secondary-hover': TokenReference;
  'color-secondary-active': TokenReference;

  // Background colors
  'color-background': TokenReference;
  'color-background-subtle': TokenReference;
  'color-background-elevated': TokenReference;

  // Text colors
  'color-text': TokenReference;
  'color-text-secondary': TokenReference;
  'color-text-tertiary': TokenReference;
  'color-text-inverse': TokenReference;

  // Border colors
  'color-border': TokenReference;
  'color-border-subtle': TokenReference;
  'color-border-strong': TokenReference;

  // Status colors
  'color-success': TokenReference;
  'color-warning': TokenReference;
  'color-error': TokenReference;
  'color-info': TokenReference;
}

export interface AliasSpacing {
  'spacing-card-padding': TokenReference;
  'spacing-section-gap': TokenReference;
  'spacing-container-padding': TokenReference;
  'spacing-button-padding-x': TokenReference;
  'spacing-button-padding-y': TokenReference;
  'spacing-input-padding-x': TokenReference;
  'spacing-input-padding-y': TokenReference;
  'spacing-grid-gap': TokenReference;
}

export interface AliasTypography {
  'font-heading-1': TokenReference;
  'font-heading-2': TokenReference;
  'font-heading-3': TokenReference;
  'font-heading-4': TokenReference;
  'font-heading-5': TokenReference;
  'font-heading-6': TokenReference;
  'font-body': TokenReference;
  'font-body-small': TokenReference;
  'font-body-large': TokenReference;
  'font-caption': TokenReference;
  'font-label': TokenReference;
}

export interface AliasTokens {
  color: AliasColors;
  spacing: AliasSpacing;
  typography: AliasTypography;
}

// Complete Token System Type
export interface DesignTokens {
  mapped: MappedTokens;
  brand: BrandTokens;
  alias: AliasTokens;
}

// Helper type for accessing tokens with dot notation
export type TokenPath = 
  | `mapped.color.${keyof MappedColors}`
  | `mapped.spacing.${keyof MappedSpacing}`
  | `mapped.typography.${keyof MappedTypography}`
  | `mapped.borderRadius.${keyof MappedBorderRadius}`
  | `mapped.shadow.${keyof MappedShadows}`
  | `brand.color.${keyof BrandColors}`
  | `alias.color.${keyof AliasColors}`
  | `alias.spacing.${keyof AliasSpacing}`
  | `alias.typography.${keyof AliasTypography}`;

