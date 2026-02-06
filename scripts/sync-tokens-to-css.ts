/**
 * Script to sync design tokens to CSS variables
 * Run this script to update app/globals.css with current token values
 */

import { tokens } from '../tokens';
import * as fs from 'fs';
import * as path from 'path';

function generateCSSVariables(): string {
  let css = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {\n`;

  // Color tokens from alias collection
  Object.entries(tokens.alias.color).forEach(([key, value]) => {
    const cssVarName = `--${key.replace('color-', '')}`;
    css += `    ${cssVarName}: ${value};\n`;
  });

  // Spacing tokens from alias collection
  Object.entries(tokens.alias.spacing).forEach(([key, value]) => {
    const cssVarName = `--${key.replace('spacing-', '')}`;
    css += `    ${cssVarName}: ${value};\n`;
  });

  // Typography tokens from alias collection
  Object.entries(tokens.alias.typography).forEach(([key, value]) => {
    const cssVarName = `--${key.replace('font-', '')}`;
    css += `    ${cssVarName}: ${value};\n`;
  });

  css += `  }\n}\n`;
  return css;
}

// Generate and write CSS
const cssContent = generateCSSVariables();
const cssPath = path.join(__dirname, '../app/globals.css');

fs.writeFileSync(cssPath, cssContent, 'utf-8');
console.log('✅ Design tokens synced to CSS variables!');

