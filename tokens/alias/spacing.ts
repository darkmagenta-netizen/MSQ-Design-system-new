/**
 * Alias Collection - Semantic Spacing Tokens
 * 
 * Semantic spacing tokens that reference Mapped spacing tokens.
 * These tokens provide meaningful names for spacing in components.
 */

import { AliasSpacing } from '../types';
import { mapped } from '../mapped';

export const aliasSpacing: AliasSpacing = {
  // Card and container spacing
  'spacing-card-padding': mapped.spacing['spacing-4'],
  'spacing-section-gap': mapped.spacing['spacing-8'],
  'spacing-container-padding': mapped.spacing['spacing-6'],

  // Button spacing
  'spacing-button-padding-x': mapped.spacing['spacing-4'],
  'spacing-button-padding-y': mapped.spacing['spacing-2'],

  // Input spacing
  'spacing-input-padding-x': mapped.spacing['spacing-4'],
  'spacing-input-padding-y': mapped.spacing['spacing-2'],

  // Grid spacing
  'spacing-grid-gap': mapped.spacing['spacing-4'],
};

