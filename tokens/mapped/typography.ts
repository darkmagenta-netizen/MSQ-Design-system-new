/**
 * Mapped Collection - Typography Primitives
 * 
 * Raw typography values (font sizes, line heights, font weights).
 * These are the foundational typography tokens that other collections reference.
 * Never use these directly in components - use Alias tokens instead.
 */

import { MappedTypography } from '../types';

export const mappedTypography: MappedTypography = {
  // Font sizes (in pixels)
  'font-size-10': '10px',
  'font-size-12': '12px',
  'font-size-14': '14px',
  'font-size-16': '16px',
  'font-size-18': '18px',
  'font-size-20': '20px',
  'font-size-24': '24px',
  'font-size-28': '28px',
  'font-size-32': '32px',
  'font-size-36': '36px',
  'font-size-40': '40px',
  'font-size-48': '48px',
  'font-size-56': '56px',
  'font-size-64': '64px',

  // Line heights
  'line-height-tight': '1.25',
  'line-height-normal': '1.5',
  'line-height-relaxed': '1.75',
  'line-height-loose': '2',

  // Font weights
  'font-weight-light': '300',
  'font-weight-normal': '400',
  'font-weight-medium': '500',
  'font-weight-semibold': '600',
  'font-weight-bold': '700',
};

