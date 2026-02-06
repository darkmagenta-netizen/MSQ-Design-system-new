/**
 * Brand Collection - Brand-Specific Colors
 * 
 * This collection extends the Mapped collection and provides brand-specific color overrides.
 * All Mapped colors are inherited and available, but specific values can be overridden here.
 * 
 * These tokens can be referenced by Alias tokens for brand-specific theming.
 */

import { BrandColors } from '../types';
import { mapped } from '../mapped';

// Brand-specific color overrides
// These reference Mapped colors but can be customized per brand
export const brandColors: BrandColors = {
  // Primary brand color - references blue-600 from Mapped
  // Can be overridden for different brand themes
  'primary-color': mapped.color['blue-600'],

  // Secondary brand color - references blue-500 from Mapped
  'secondary-color': mapped.color['blue-500'],

  // Accent color - references blue-400 from Mapped
  'accent-color': mapped.color['blue-400'],

  // Success color - typically green, using blue as placeholder
  // Replace with actual green scale when available
  'success-color': mapped.color['blue-500'],

  // Warning color - typically yellow/orange, using red as placeholder
  // Replace with actual yellow/orange scale when available
  'warning-color': mapped.color['red-500'],

  // Error color - references red-600 from Mapped
  'error-color': mapped.color['red-600'],

  // Info color - references blue-500 from Mapped
  'info-color': mapped.color['blue-500'],
};

