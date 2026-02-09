/**
 * Alias Collection - Semantic Spacing Tokens
 * 
 * Semantic spacing tokens that reference Mapped spacing tokens.
 * These tokens provide meaningful names for spacing in components.
 */

import { AliasSpacing } from '../types';
import { mapped } from '../mapped';

const s = (v: string | number): string => (typeof v === 'string' ? v : String(v));

export const aliasSpacing: AliasSpacing = {
  // Card and container spacing
  'spacing-card-padding': s(mapped.spacing['spacing-4']),
  'spacing-section-gap': s(mapped.spacing['spacing-8']),
  'spacing-container-padding': s(mapped.spacing['spacing-6']),

  // Button spacing
  'spacing-button-padding-x': s(mapped.spacing['spacing-4']),
  'spacing-button-padding-y': s(mapped.spacing['spacing-2']),

  // Input spacing
  'spacing-input-padding-x': s(mapped.spacing['spacing-4']),
  'spacing-input-padding-y': s(mapped.spacing['spacing-2']),

  // Grid spacing
  'spacing-grid-gap': s(mapped.spacing['spacing-4']),
};

