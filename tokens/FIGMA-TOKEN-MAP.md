# Figma → CSS token mapping

This table links **Figma style/variable names** (or design intent) to **CSS variables** in this repo. Use it when design changes in Figma so you know which tokens to update in `app/globals.css` (and optionally `tokens/`).

> **Tip:** If your Figma file uses different names, add a column or note (e.g. "Figma: Primary/Blue") so the mapping stays explicit.

---

## Colors (MSQ Design Tokens)

| Figma intent / style name | CSS variable (light) | CSS variable (dark) | Used in |
|---------------------------|----------------------|----------------------|---------|
| Primary blue | `--color-primary` | `--color-primary` | Buttons, links, focus ring |
| Primary hover | `--color-primary-hover` | `--color-primary-hover` | Button hover |
| Primary active | `--color-primary-active` | `--color-primary-active` | Button active |
| Primary disabled | `--color-primary-disabled` | `--color-primary-disabled` | Disabled controls |
| Secondary blue | `--color-secondary` | `--color-secondary` | Secondary buttons, accents |
| Background | `--color-background` | `--color-background` | Page, cards |
| Background subtle | `--color-background-subtle` | `--color-background-subtle` | Muted areas |
| Background elevated | `--color-background-elevated` | `--color-background-elevated` | Elevated surfaces |
| Background hover | `--color-background-hover` | `--color-background-hover` | Hover states |
| Text primary | `--color-text` / `--color-text-primary` | same | Body text |
| Text secondary | `--color-text-secondary` | same | Secondary text |
| Text tertiary | `--color-text-tertiary` | same | Muted, captions |
| Text on primary | `--color-text-on-primary` | same | Text on primary buttons (e.g. Colors/Text/text_on_primary-blue) |
| Text inverse | `--color-text-inverse` | same | Text on dark backgrounds |
| Border | `--color-border` | same | Default borders |
| Border subtle | `--color-border-subtle` | same | Light borders |
| Success | `--color-success` | same | Success states |
| Warning | `--color-warning` | same | Warning states |
| Error | `--color-error` | same | Error states |

---

## Alert tokens (accessibility)

| Figma intent | CSS variable | Notes |
|--------------|--------------|--------|
| Info alert background | `--color-alert-info-bg` | Uses `--color-background-hover` |
| Error alert background | `--color-alert-error-bg`, `--color-alert-error-bg-subtle` | Light/dark in globals.css |
| Error alert border/text | `--color-alert-error-border`, `--color-alert-error-text` | |
| Success alert | `--color-alert-success-bg`, `--color-alert-success-border`, `--color-alert-success-text` | |
| Warning alert | `--color-alert-warning-bg`, `--color-alert-warning-border`, `--color-alert-warning-text` | |

---

## Radius (MSQ Radius Tokens)

| Figma intent | CSS variable | Value (example) |
|--------------|--------------|------------------|
| None | `--radius-none` | 0px |
| XS / SM | `--radius-xs`, `--radius-sm` | 4px |
| MD | `--radius-md` | 8px |
| LG | `--radius-lg` | 12px |
| XL | `--radius-xl` | 16px |
| 2XL | `--radius-2xl` | 24px |
| Full (pill/circle) | `--radius-full` | 9999px |

Tailwind also uses `--radius` (e.g. `borderRadius: { lg: "var(--radius)" }` in `tailwind.config.js`).

---

## Logo / icon surface (dark mode)

| Purpose | CSS variable | Notes |
|---------|--------------|--------|
| Logo/icon display background (dark mode) | `--color-logo-surface` | Light surface so logos stay visible |
| Icon color on that surface | `--color-icon-on-logo-surface` | Dark in dark mode for contrast |

---

## How to use this when Figma changes

1. **Designer updates a color/style in Figma** → Find the row above (or add one); update the corresponding CSS variable in `app/globals.css` (`:root` for light, `.dark` for dark).
2. **New semantic color in Figma** → Add a new `--color-*` in globals.css and add a row to this table.
3. **Radius or spacing change** → Update the matching `--radius-*` or spacing variable and this table.

Keeping this table up to date makes **predictable updates** and **reduced interpretation** explicit: everyone knows which Figma change maps to which token.
