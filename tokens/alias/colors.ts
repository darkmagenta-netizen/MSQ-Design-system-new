/**
 * Alias Collection - Semantic Color Tokens
 * 
 * Semantic color tokens that reference Brand or Mapped tokens.
 * These tokens provide meaningful names for design elements and should be used
 * directly in components instead of referencing Mapped or Brand tokens directly.
 */

import { AliasColors } from '../types';
import { brand } from '../brand';
import { mapped } from '../mapped';

export const aliasColors: AliasColors = {
  // Primary colors - reference Brand tokens
  'color-primary': brand.color['primary-color'] || mapped.color['blue-600'],
  'color-primary-hover': mapped.color['blue-700'],
  'color-primary-active': mapped.color['blue-800'],
  'color-primary-disabled': mapped.color['gray-300'],

  // Secondary colors - reference Brand tokens
  'color-secondary': brand.color['secondary-color'] || mapped.color['blue-500'],
  'color-secondary-hover': mapped.color['blue-600'],
  'color-secondary-active': mapped.color['blue-700'],

  // Background colors - reference Mapped tokens
  'color-background': mapped.color['white'],
  'color-background-subtle': mapped.color['gray-50'],
  'color-background-elevated': mapped.color['white'],

  // Text colors - reference Mapped tokens
  'color-text': mapped.color['gray-900'],
  'color-text-secondary': mapped.color['gray-600'],
  'color-text-tertiary': mapped.color['gray-500'],
  'color-text-inverse': mapped.color['white'],

  // Border colors - reference Mapped tokens
  'color-border': mapped.color['gray-200'],
  'color-border-subtle': mapped.color['gray-100'],
  'color-border-strong': mapped.color['gray-300'],

  // Status colors - reference Brand tokens
  'color-success': brand.color['success-color'] || mapped.color['blue-500'],
  'color-warning': brand.color['warning-color'] || mapped.color['red-500'],
  'color-error': brand.color['error-color'] || mapped.color['red-600'],
  'color-info': brand.color['info-color'] || mapped.color['blue-500'],
};

