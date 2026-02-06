# MSQ Design System – Source of truth and update flow

This document defines **where the truth lives** (design vs code) and **how updates flow** so designers and developers stay aligned.

---

## Source of truth

| Layer | Source of truth | Where it lives |
|-------|-----------------|----------------|
| **Design** | Figma | Figma file: components, styles, variables, icon set. Designers own this. |
| **Code** | This repo | Tokens (`tokens/`, `app/globals.css`), components (`components/ui/`), icons data (`lib/figma-icons-*.json`). Developers own this. |

**In practice:**

- **Figma** is the **design** source of truth: layouts, component variants, colors, spacing, and icon set are defined there.
- **This repo** is the **code** source of truth: CSS variables, React components, and icon SVGs/data are implemented here and consumed by apps.

Design changes should flow **from Figma into this repo**, then from this repo into consuming apps. This repo is the **design-to-code bridge**: it codifies Figma intent so devs don’t guess.

---

## Update flow

```
Figma (design)  →  This repo (design system)  →  Consuming apps
     ↑                        ↑                           ↑
  Designers              Maintainers                 App teams
  update styles,          sync tokens &               copy components
  components,             components,                  & tokens or
  icons                    run icon sync               pull from repo
```

### 1. When design changes in Figma

- **Colors / styles / variables:** Update `app/globals.css` (`:root` and `.dark`) and, if used, `tokens/` to match. Optionally keep a mapping table (see **Token and variant mapping** in `INTEGRATION-GUIDE.md` or `tokens/README.md`).
- **Component variants (e.g. new button style):** Update the corresponding component in `components/ui/` and docs under `app/docs/`.
- **Icons:** Run the icon sync so code stays in sync with the Figma icon set:
  1. `npm run figma-icons-sync` – fetches icon metadata and SVGs from Figma into `scripts/figma-icons-output/`
  2. `npm run figma-icons-merge` – merges batches into `lib/figma-icons-svg.json`
  3. `npm run figma-icons-data` – builds `lib/figma-icons-data.json` for the docs icon browser

After updating this repo, consuming apps get changes by **copying updated files** or **updating a submodule** (see `INTEGRATION-GUIDE.md`).

### 2. Release / update process (recommended)

1. **Design system maintainers** align this repo with Figma (tokens, components, icons as above).
2. **Commit and tag** (e.g. `v1.2.0`) or document the change in a changelog.
3. **Notify consuming apps** (Slack, ADR, or README) and point to:
   - Updated `app/globals.css` (or token files)
   - Updated `components/ui/*` and any new dependencies
   - `INTEGRATION-GUIDE.md` for copy/submodule steps
4. **Consuming apps** update by re-copying the files they use or running `git submodule update --remote design-system` and re-copying as needed.

This keeps **predictable updates**: one place (this repo) changes, then apps update in a controlled way.

---

## What lives where

| Asset | Figma | This repo |
|-------|--------|-----------|
| Color palette, semantic colors | Styles / variables | `app/globals.css` (`--color-*`), `tokens/` |
| Component variants (Button, Alert, etc.) | Components & variants | `components/ui/*.tsx` |
| Icons | Icon set / frames | `lib/figma-icons-data.json`, `lib/figma-icons-svg.json`, icon browser in docs |
| Logos | — | `public/logos/`, `components/ui/*-logo.tsx` |
| Typography, spacing, radius | Styles / variables | `app/globals.css`, `tokens/` |

---

## Summary

- **Figma** = design source of truth (designers).
- **This repo** = code source of truth (design system maintainers).
- **Flow:** Figma → this repo (sync tokens, components, icons) → consuming apps (copy or submodule).
- **Predictable updates:** Change the design system here, then have apps update from here; use tags/changelog and the integration guide so updates are explicit and repeatable.

For how to **use** this design system in an app (copy, dependencies, Tailwind, ThemeProvider), see **INTEGRATION-GUIDE.md**.
