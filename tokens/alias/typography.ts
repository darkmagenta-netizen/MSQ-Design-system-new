/**
 * Alias Collection - Semantic Typography Tokens
 * 
 * Semantic typography tokens that reference Mapped typography tokens.
 * These tokens provide meaningful names for typography in components.
 */

import { AliasTypography } from '../types';
import { mapped } from '../mapped';

const s = (v: string | number): string => (typeof v === 'string' ? v : String(v));

export const aliasTypography: AliasTypography = {
  // Heading styles - reference Mapped font sizes
  'font-heading-1': s(mapped.typography['font-size-48']),
  'font-heading-2': s(mapped.typography['font-size-40']),
  'font-heading-3': s(mapped.typography['font-size-32']),
  'font-heading-4': s(mapped.typography['font-size-24']),
  'font-heading-5': s(mapped.typography['font-size-20']),
  'font-heading-6': s(mapped.typography['font-size-18']),

  // Body text styles
  'font-body': s(mapped.typography['font-size-16']),
  'font-body-small': s(mapped.typography['font-size-14']),
  'font-body-large': s(mapped.typography['font-size-18']),

  // Supporting text styles
  'font-caption': s(mapped.typography['font-size-12']),
  'font-label': s(mapped.typography['font-size-14']),
};

