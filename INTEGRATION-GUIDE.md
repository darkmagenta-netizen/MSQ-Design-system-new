# MSQ Design System – Integration Guide

Step-by-step guide for developers to use the MSQ Design System in an existing codebase, including setup from GitHub.

---

## Prerequisites

- **Existing app** using **React 18+** and **TypeScript**
- **Tailwind CSS v3** (recommended; design tokens use CSS variables compatible with other setups)
- **Node.js 18+**

---

## Part 1: Get the design system from GitHub

### Option A: Clone the repo (reference / copy from it)

```bash
# Clone the design system repo (replace with your org/repo)
git clone https://github.com/YOUR_ORG/msq-design-system.git
cd msq-design-system
npm install
npm run dev
# Docs at http://localhost:3001/docs
```

Use this copy as a reference: browse components and copy only what you need into your app (see Part 2).

### Option B: Add as a Git submodule (keep in sync from one repo)

From your **existing app** root:

```bash
git submodule add https://github.com/YOUR_ORG/msq-design-system.git packages/design-system
# Or: design-system at repo root
git submodule add https://github.com/YOUR_ORG/msq-design-system.git design-system
```

Then copy files from `design-system/` (or `packages/design-system/`) into your app as in Part 2. Update the submodule when the design system changes:

```bash
git submodule update --remote design-system
```

### Option C: Fork and install dependencies via GitHub (no npm publish)

In your app’s `package.json` you can reference the repo for shared tooling (e.g. scripts). Components are still copied into your app; see Part 2.

---

## Part 2: Use the design system in your existing codebase

The design system is **copy-friendly** (like [shadcn/ui](https://ui.shadcn.com)): you copy components and tokens into your app and own the code. No need to publish to npm.

### Step 1: Install required dependencies

In your **existing app**:

```bash
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot   # if you use Button, Tabs, or other Radix-based components
```

Optional, if you use icons from the design system:

```bash
npm install lucide-react
```

### Step 2: Copy design system files into your app

From the design system repo (clone or submodule), copy the following into your app. Adjust paths if your app uses `src/`.

| Copy from (design system) | Copy to (your app) |
|---------------------------|--------------------|
| `lib/utils.ts` | `lib/utils.ts` (or `src/lib/utils.ts`) |
| `components/ui/*.tsx` | `components/ui/` (or `src/components/ui/`) |
| `components/ui/index.ts` | `components/ui/index.ts` |
| `components/icons/` (if you use icons) | `components/icons/` |
| `app/globals.css` (only the CSS variables and layers you need) | Merge into your global CSS (see Step 3) |
| `lib/theme-provider.tsx` (if you use dark mode) | `lib/theme-provider.tsx` |
| `public/logos/` (if you use logos) | `public/logos/` |

**Minimal set for buttons and basics:**

- `lib/utils.ts`
- `components/ui/button.tsx`
- `components/ui/index.ts` (or add exports for the components you copy)
- Global CSS variables (Step 3)

Add more components (e.g. `alert`, `input`, `tabs`, `dropdown`) as needed.

### Step 3: Add design tokens (CSS variables) to your app

1. Open your app’s global CSS file (e.g. `app/globals.css` or `src/index.css`).

2. Copy the **`:root`** and **`.dark`** blocks from the design system’s `app/globals.css` (the CSS variable definitions for colors, radius, alert tokens, logo surface, etc.). Merge them into your existing `:root` / theme so you don’t overwrite your own variables.

3. Ensure Tailwind is configured to use those variables (see Step 4).

Design system variables you’ll need for components include:

- `--background`, `--foreground`, `--primary`, `--border`, `--muted`, `--accent`, etc.
- `--color-primary`, `--color-text`, `--color-border`, etc. (MSQ tokens)
- Alert tokens if you use Alert: `--color-alert-error-bg`, etc.
- Logo surface if you use logos in dark mode: `--color-logo-surface`, `--color-icon-on-logo-surface`

### Step 4: Extend Tailwind config

In your app’s `tailwind.config.js` (or `tailwind.config.ts`):

1. **Content:** include the paths where you copied components:

```js
content: [
  './app/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
],
```

2. **Theme:** add the design system’s theme extensions (colors and radius that use CSS variables). From the design system’s `tailwind.config.js`, copy the `theme.extend` (e.g. `colors`, `borderRadius`) and merge into your `theme.extend` so your existing theme is preserved.

3. **Dark mode:** the design system uses class-based dark mode:

```js
darkMode: ["class"],
```

Add this if your app doesn’t already use it.

### Step 5: TypeScript path alias (recommended)

So imports match the design system docs (e.g. `@/components/ui/button`), add a path alias in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

If your app lives in `src/`, use `"@/*": ["./src/*"]` and place `components` and `lib` under `src/`.

### Step 6: Wrap the app with ThemeProvider (if using dark mode)

If you use `ThemeToggle` or any component that depends on theme:

```tsx
// app/layout.tsx or src/App.tsx
import { ThemeProvider } from "@/lib/theme-provider"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="your-app-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

Ensure the class toggled by `ThemeProvider` (e.g. `dark`) is applied to `<html>` (or the node your CSS variables are scoped to).

### Step 7: Use components in your app

Import and use components as in the design system docs:

```tsx
import { Button } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"
import { MSQLogo } from "@/components/ui/msq-logo"

export default function MyPage() {
  return (
    <div>
      <MSQLogo variant="horizontal" size={120} />
      <Button variant="primary" size="md">Submit</Button>
      <Alert state="success">Saved successfully.</Alert>
    </div>
  )
}
```

Use the **Docs** site (run locally from the design system repo) to see props, variants, and code examples for each component.

---

## Part 3: Optional – Icons and logos

### Icons

- If you only need a few icons, copy the specific icon components from `components/icons/` and the `Icon` base.
- For the full Figma-driven icon set (with copy/download), you’d need `lib/figma-icons-data.json`, `lib/figma-icons-svg.json`, and the icon page logic; this is optional and more involved.
- **Predictable icon updates:** When Figma icons change, the design system uses `figma-icons-sync`, `figma-icons-merge`, and `figma-icons-data` to keep `lib/figma-icons-*.json` in sync. See **ICONS-EXTRACTION-GUIDE.md** → “Predictable icon updates (Figma → design system)” for the repeatable flow and scripts.

### Logos

- Copy `public/logos/` (or the subset you need) into your app’s `public/logos/`.
- Use `MSQLogo`, `MobileLogo`, `WalletLogo`, `BankLogo`, `CryptoLogo` from `components/ui/` as in the docs.

---

## Part 4: Checklist summary

- [ ] Design system repo cloned or added as submodule.
- [ ] Dependencies installed: `class-variance-authority`, `clsx`, `tailwind-merge`, and any Radix packages used by the components you copied.
- [ ] `lib/utils.ts` copied.
- [ ] Required `components/ui/*.tsx` and `components/ui/index.ts` copied.
- [ ] Global CSS variables merged into your app’s global CSS.
- [ ] Tailwind `content` and `theme.extend` (and `darkMode: ["class"]` if needed) updated.
- [ ] Path alias `@/*` configured in `tsconfig.json`.
- [ ] ThemeProvider added if using dark mode or theme-dependent components.
- [ ] (Optional) Logos copied to `public/logos/` and icon components copied if needed.
- [ ] (Optional) If using Figma MCP in Cursor, read **Part 6** for aligning Figma and this design system.

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| Components not found | Path alias `@/*` in `tsconfig.json` and that files are under the paths you listed in `content` in Tailwind. |
| Styles look wrong | Ensure design system CSS variables are in your global CSS and that Tailwind theme extends the same variable names (e.g. `hsl(var(--primary))`). |
| Dark mode not working | `darkMode: ["class"]` in Tailwind and ThemeProvider toggling the `dark` class on `<html>`. |
| Radix components error | Install the same `@radix-ui/*` packages and versions used by the design system for the components you copied. |

For more detail on components and tokens, see **DOCUMENTATION.md** and **COMPONENTS.md** in the design system repo.

---

## Part 5: Design-to-code bridge – how this fits (and what to add)

The design system is positioned as a **design-to-code bridge**, not a design tool. Here’s how it lines up with the four goals and what to add so it fully delivers the “with MCP + Cursor” story.

### The four goals

| Goal | How the current product delivers it | Gap (if any) |
|------|-------------------------------------|--------------|
| **Source of truth** | This repo is the **code source of truth**: tokens (`tokens/`, `app/globals.css`), components (`components/ui/`), and icons (`lib/figma-icons-*.json`) live here. Consuming apps copy from here, so there is one place to look for “what’s the correct token/variant?” | Figma remains the **design** source of truth; sync is script-based (icons) or manual (tokens/components). Design and code are two sources unless you add a defined “Figma → this repo” process or automation. |
| **Reduced interpretation** | **Tokens are named and documented** (`--color-primary`, `--color-alert-error-text`, etc.). **Components expose clear variants** (e.g. `Button` primary/secondary/outline). Devs use tokens and components instead of guessing spacing or hex values. | Interpretation is reduced **at consumption time**. The initial “Figma → tokens/variants” mapping was done when building the design system; it’s not yet automated (e.g. via MCP or token export from Figma). |
| **Lower rework** | **Single component set and token set** across apps: copy once, use everywhere. No rebuilding the same button or alert in each app. **Docs + Integration guide** reduce “how do I use this?” rework. | Rework is lower **when teams actually use** this repo. Predictable **update flow** (e.g. “Figma changes → update design system → then apps”) needs to be written down or automated. |
| **Predictable updates** | **Icons**: `figma-icons-sync` and `figma-icons-merge` give a repeatable path from Figma to `lib/figma-icons-*.json`. **Components/tokens**: updates are “change the design system, then copy or pull from it.” | Icon updates are script-driven; component and token updates are manual. “Predictable” is true if you define a process (e.g. “design system release → changelog → update consuming apps”); it’s not yet “Figma change auto-reflects in code” without extra tooling. |

**Summary:** The product **does fit** the list when the design system repo is treated as the **code source of truth** and teams use it consistently. It delivers “reduced interpretation” and “lower rework” for devs who use the tokens and components. “Source of truth” and “predictable updates” are strongest for **code**; to align **design** (Figma) and **code** (this repo) more tightly, you add the items below.

---

### Why devs care (practical terms)

**Without a design-to-code bridge (e.g. no design system, no MCP):**

- Devs manually inspect Figma.
- They guess spacing, tokens, and variants.
- They rebuild components per app and drift from design.
- Design debt grows (inconsistent buttons, colors, spacing).

**With this design system (current setup):**

- **Design intent is partly codified:** tokens and component variants reflect the intended design; devs use `Button variant="primary"` and `--color-primary` instead of guessing.
- **Components and tokens are the reference:** docs and code show “what design meant” for buttons, alerts, logos, etc.
- **Fewer “what did design mean?” conversations:** the answer is “use this component/variant or this token.”
- **Faster iteration:** change the design system once, then update consuming apps (copy or submodule); no rebuilding from Figma in every app.

**With MCP + Cursor (optional next step):**

- Figma can become a **direct** source for Cursor (e.g. via Figma MCP): file structure, tokens, components.
- Cursor can suggest or align code with Figma using the same tokens and variants this repo defines.
- The design system then acts as the **bridge**: Figma (design) ↔ this repo (codified tokens/components) ↔ Cursor (code generation aligned to both).

So: the **current product already gives** “codified intent,” “real tokens and variants,” and “fewer guesswork conversations.” Adding **MCP + Cursor** (and optionally Figma MCP) strengthens “design intent codified” by linking Figma and this repo in the editor.

---

### What to include so the product fully fits the list

1. **Document the source-of-truth model**
   - Add a short **README or DESIGN-SYSTEM.md** that states: “Figma is the design source of truth; this repo is the **code** source of truth. Design changes should flow: Figma → design system (tokens/components) → consuming apps.”
   - Optionally: a one-page “release/update process” (e.g. when Figma tokens change, update `app/globals.css` and `tokens/`, then cut a release or update the integration guide).

2. **Token and variant audit trail (optional)**
   - In `tokens/` or in docs, add a short note or table linking **Figma token names** (or style names) to **CSS variables / Tailwind** (e.g. “Primary Blue → `--color-primary`”). That makes “reduced interpretation” and “predictable updates” explicit when design changes.

3. **Figma → design system sync (where it doesn’t exist)**
   - **Icons:** You already have `figma-icons-sync` and `figma-icons-merge`; document them in the integration or ICONS-EXTRACTION-GUIDE so “predictable icon updates” is clear.
   - **Tokens:** If Figma has design tokens (e.g. Styles or variables), add a script or doc that maps “Figma token X → `app/globals.css` / `tokens/`” so token updates are repeatable.

4. **MCP + Cursor (optional)**
   - If you use **Figma MCP** in Cursor, add a short section to the integration guide: “Using the design system with Figma MCP in Cursor.” Explain that Cursor can read Figma for context and that this repo defines the **code** implementation (tokens, components); that way, Cursor can suggest code that matches both Figma and this design system.
   - No code change is required in this repo for “devs use Cursor + Figma MCP”; the design system remains the place to copy components and tokens from.

5. **Integration guide and checklist**
   - You already have “Part 4: Checklist summary” and “Part 5” (this section). Keep them so that “how to use this in our codebase” and “how this delivers the four goals” are in one place for both product and devs.

---

### One-line summary

**Does the product fit the list?** Yes: it delivers **source of truth** (this repo for code), **reduced interpretation** (tokens + component variants), **lower rework** (single component/token set), and **predictable updates** (scripted for icons; process-based for tokens/components). To fully align with the “with MCP + Cursor” story and make design↔code updates even more predictable, add: (1) a short doc that states the Figma ↔ design system relationship, (2) optional token/variant mapping from Figma, (3) optional Figma MCP + Cursor section in the integration guide.

---

## Part 6: Using the design system with Figma MCP in Cursor (optional)

If you use **Figma MCP** in Cursor, you can combine Figma (design context) with this design system (code implementation) for better alignment between design and code.

### How it fits together

- **Figma** is the design source of truth: layouts, components, and styles live in Figma.
- **This repo** is the code source of truth: tokens (`app/globals.css`, `tokens/`), components (`components/ui/`), and icon data (`lib/figma-icons-*.json`) are implemented here.
- **Cursor + Figma MCP** can read Figma files for context (e.g. component structure, names, variants). When you ask Cursor to implement or change UI, it can use both:
  - Figma (what the design looks like and how it’s structured), and
  - This design system (which tokens and components to use and how they’re named).

### What to do

1. **Enable Figma MCP** in Cursor (if not already) and connect it to your Figma file or team.
2. **Use this repo as the reference for code.** When Cursor suggests components or tokens, point it to the design system: e.g. “Use the Button and Alert components and tokens from our design system” or “Follow the token names in `app/globals.css` and `tokens/FIGMA-TOKEN-MAP.md`.”
3. **Copy from the design system into your app** as in Part 2. The design system does not change for MCP; it remains the place you copy components and tokens from. Cursor can then suggest code that matches both Figma and this implementation.

### Result

- Cursor can suggest or generate code that aligns with **Figma** (design) and with **this repo** (tokens and components), reducing guesswork and rework.
- No code changes are required in this design system repo for “devs use Cursor + Figma MCP”; the repo stays the single code source of truth that teams copy from.
