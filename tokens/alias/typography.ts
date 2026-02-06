/**
 * Alias Collection - Semantic Typography Tokens
 * 
 * Semantic typography tokens that reference Mapped typography tokens.
 * These tokens provide meaningful names for typography in components.
 */

import { AliasTypography } from '../types';
import { mapped } from '../mapped';

export const aliasTypography: AliasTypography = {
  // Heading styles - reference Mapped font sizes
  'font-heading-1': mapped.typography['font-size-48'],
  'font-heading-2': mapped.typography['font-size-40'],
  'font-heading-3': mapped.typography['font-size-32'],
  'font-heading-4': mapped.typography['font-size-24'],
  'font-heading-5': mapped.typography['font-size-20'],
  'font-heading-6': mapped.typography['font-size-18'],

  // Body text styles
  'font-body': mapped.typography['font-size-16'],
  'font-body-small': mapped.typography['font-size-14'],
  'font-body-large': mapped.typography['font-size-18'],

  // Supporting text styles
  'font-caption': mapped.typography['font-size-12'],
  'font-label': mapped.typography['font-size-14'],
};

