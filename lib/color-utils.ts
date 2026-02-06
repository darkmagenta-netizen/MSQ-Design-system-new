/**
 * Color utility functions for converting between color formats
 */

/**
 * Convert HEX color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert HEX color to HSL
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  let { r, g, b } = rgb;
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360 * 10) / 10,
    s: Math.round(s * 100 * 10) / 10,
    l: Math.round(l * 100 * 10) / 10,
  };
}

/**
 * Format RGB as string
 */
export function formatRgb(rgb: { r: number; g: number; b: number } | null): string {
  if (!rgb) return '';
  return `${rgb.r} ${rgb.g} ${rgb.b}`;
}

/**
 * Format HSL as string
 */
export function formatHsl(hsl: { h: number; s: number; l: number } | null): string {
  if (!hsl) return '';
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
}

/**
 * Get CSS variable name for a color token
 */
export function getCssVariableName(colorName: string): string {
  // Convert kebab-case to CSS variable format
  return `--${colorName.replace(/-/g, '-')}`;
}

