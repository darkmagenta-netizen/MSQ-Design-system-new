# Crypto logos (exact from Figma)

The `CryptoLogo` component (used on the **cryptocurrency** docs page) loads SVGs from this folder using the naming convention below. No API calls — files in `public/logos/` are served directly.

---

## Cursor prompt (use this so Cursor picks up these SVGs on the cryptocurrency page)

Copy-paste this when you want Cursor to use the SVG files in `public/logos` for crypto logos:

```
Use the SVG files in public/logos for the cryptocurrency page. The CryptoLogo component already maps them by name:
- Colored + Circle → /logos/{prefix}-circle.svg (e.g. matic-circle.svg)
- Colored + Square → /logos/{prefix}-square.svg
- Light + Circle → /logos/{prefix}-white-circle.svg
- Light + Square → /logos/{prefix}-white-square.svg
Prefixes: btc, matic, shib, usdt, won (for KRW), usdc, msq. Ensure components/ui/crypto-logo.tsx uses these /logos/ paths and the docs page at app/docs/foundations/cryptocurrency uses CryptoLogo; no Figma API or external image URLs.
```

---

## Naming convention

| Theme   | Shape  | Filename pattern        | Example          |
|---------|--------|--------------------------|------------------|
| Colored | Circle | `{crypto}-circle.svg`    | `btc-circle.svg`  |
| Colored | Square | `{crypto}-square.svg`    | `matic-square.svg` |
| Light   | Circle | `{crypto}-white-circle.svg` | `usdt-white-circle.svg` |
| Light   | Square | `{crypto}-white-square.svg` | `msq-white-square.svg` |

- **Crypto prefix**: `btc`, `matic`, `shib`, `usdt`, `won` (for KRW), `usdc`, `msq` — all lowercase.
- Base files like `btc.svg`, `matic.svg` are used as fallback if variant files are missing.

## How to get the exact same logos from Figma

Source: [MSQ Design System – Working](https://www.figma.com/design/kPnax7i9sQ1P4jFUSgAQnV/MSQ-Design-System--Working-?node-id=14331-1601) — frame **node-id=14331-1601**.

### Step 1: Figma personal access token

1. In Figma: **Settings** (avatar) → **Account** → **Personal access tokens** (or open [Figma API tokens](https://www.figma.com/developers/api#access-tokens)).
2. Click **Create a new personal access token**, name it (e.g. “MSQ Design export”), copy the token.

### Step 2: Frame and layer names in Figma

1. Open the file above and go to the frame at **node-id=14331-1601** (the crypto logos frame).
2. That frame must have **direct child** layers (one per logo).  
   Rename them **exactly** to one of these (case-insensitive):  
   **BTC**, **MATIC**, **SHIB**, **USDT**, **KRW**, **USDC**, **MSQ**.  
   Aliases also work: Bitcoin→BTC, Polygon→MATIC, Shiba→SHIB, Tether→USDT, Won→KRW.

### Step 3: Run the export script

From the project root:

```bash
FIGMA_ACCESS_TOKEN=your_token_here node scripts/export-figma-crypto-logos.mjs
```

The script will:

- Read the frame’s children from the Figma API
- Match names to BTC, MATIC, SHIB, USDT, KRW, USDC, MSQ
- Export each as SVG and write to `public/logos/btc.svg`, `matic.svg`, etc.

If you see errors:

- **Missing FIGMA_ACCESS_TOKEN** — set the env var as in the command above.
- **No children found at node 14331-1601** — open the link above and confirm the frame exists and has layers inside it.
- **Could not match Figma layer names** — rename the child layers in Figma to BTC, MATIC, SHIB, USDT, KRW, USDC, MSQ (or the aliases above).

### Step 4: Run the app

After the script finishes, restart or refresh the app. `CryptoLogo` will load the SVGs from `public/logos/` and the exact Figma logos will show.

---

**If you don’t use the script:** export each logo from Figma manually (right‑click layer → Export → SVG), then save into `public/logos/` with the same filenames: `btc.svg`, `matic.svg`, `shib.svg`, `usdt.svg`, `krw.svg`, `usdc.svg`, `msq.svg`.
