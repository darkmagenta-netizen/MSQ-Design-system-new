MSQ Design System – Integration Guide
Step-by-step guide for developers to use the MSQ Design System in an existing codebase, including setup from GitHub.

Prerequisites
Existing app using React 18+ and TypeScript
Tailwind CSS v3 (recommended; design tokens use CSS variables compatible with other setups)
Node.js 18+
Part 1: Get the design system from GitHub
Option A: Clone the repo (reference / copy from it)
# Clone the design system repo (replace with your org/repo)
git clone https://github.com/YOUR_ORG/msq-design-system-new.git
cd msq-design-system-new
npm install
npm run dev
# Docs at http://localhost:3001/docs
Use this copy as a reference: browse components and copy only what you need into your app (see Part 2).

Option B: Add as a Git submodule (keep in sync from one repo)
From your existing app root:

git submodule add https://github.com/YOUR_ORG/msq-design-system-new.git packages/design-system
# Or: design-system at repo root
git submodule add https://github.com/YOUR_ORG/msq-design-system-new.git design-system
Then copy files from design-system/ (or packages/design-system/) into your app as in Part 2. Update the submodule when the design system changes:

git submodule update --remote design-system
Option C: Fork and install dependencies via GitHub (no npm publish)
In your app’s package.json you can reference the repo for shared tooling (e.g. scripts). Components are still copied into your app; see Part 2.

Part 2: Use the design system in your existing codebase
The design system is copy-friendly (like shadcn/ui): you copy components and tokens into your app and own the code. No need to publish to npm.

Step 1: Install required dependencies
In your existing app:

npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot   # if you use Button, Tabs, or other Radix-based components
Optional, if you use icons from the design system:

npm install lucide-react
Step 2: Copy design system files into your app
From the design system repo (clone or submodule), copy the following into your app. Adjust paths if your app uses src/.

Copy from (design system)	Copy to (your app)
lib/utils.ts	lib/utils.ts (or src/lib/utils.ts)
components/ui/*.tsx	components/ui/ (or src/components/ui/)
components/ui/index.ts	components/ui/index.ts
components/icons/ (if you use icons)	components/icons/
app/globals.css (only the CSS variables and layers you need)	Merge into your global CSS (see Step 3)
lib/theme-provider.tsx (if you use dark mode)	lib/theme-provider.tsx
public/logos/ (if you use logos)	public/logos/
Minimal set for buttons and basics:

lib/utils.ts
components/ui/button.tsx
components/ui/index.ts (or add exports for the components you copy)
Global CSS variables (Step 3)
Add more components (e.g. alert, input, tabs, dropdown) as needed.

Step 3: Add design tokens (CSS variables) to your app
Open your app’s global CSS file (e.g. app/globals.css or src/index.css).

Copy the :root and .dark blocks from the design system’s app/globals.css (the CSS variable definitions for colors, radius, alert tokens, logo surface, etc.). Merge them into your existing :root / theme so you don’t overwrite your own variables.

Ensure Tailwind is configured to use those variables (see Step 4).

Design system variables you’ll need for components include:

--background, --foreground, --primary, --border, --muted, --accent, etc.
--color-primary, --color-text, --color-border, etc. (MSQ tokens)
Alert tokens if you use Alert: --color-alert-error-bg, etc.
Logo surface if you use logos in dark mode: --color-logo-surface, --color-icon-on-logo-surface
Step 4: Extend Tailwind config
In your app’s tailwind.config.js (or tailwind.config.ts):

Content: include the paths where you copied components:
content: [
  './app/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
],
Theme: add the design system’s theme extensions (colors and radius that use CSS variables). From the design system’s tailwind.config.js, copy the theme.extend (e.g. colors, borderRadius) and merge into your theme.extend so your existing theme is preserved.

Dark mode: the design system uses class-based dark mode:

darkMode: ["class"],
Add this if your app doesn’t already use it.

Step 5: TypeScript path alias (recommended)
So imports match the design system docs (e.g. @/components/ui/button), add a path alias in tsconfig.json:

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
If your app lives in src/, use "@/*": ["./src/*"] and place components and lib under src/.

Step 6: Wrap the app with ThemeProvider (if using dark mode)
If you use ThemeToggle or any component that depends on theme:

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
Ensure the class toggled by ThemeProvider (e.g. dark) is applied to <html> (or the node your CSS variables are scoped to).

Step 7: Use components in your app
Import and use components as in the design system docs:

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
Use the Docs site (run locally from the design system repo) to see props, variants, and code examples for each component.

Part 3: Optional – Icons and logos
Icons
If you only need a few icons, copy the specific icon components from components/icons/ and the Icon base.
For the full Figma-driven icon set (with copy/download), you’d need lib/figma-icons-data.json, lib/figma-icons-svg.json, and the icon page logic; this is optional and more involved.
Predictable icon updates: When Figma icons change, the design system uses figma-icons-sync, figma-icons-merge, and figma-icons-data to keep lib/figma-icons-*.json in sync. See ICONS-EXTRACTION-GUIDE.md → “Predictable icon updates (Figma → design system)” for the repeatable flow and scripts.
Logos
Copy public/logos/ (or the subset you need) into your app’s public/logos/.
Use MSQLogo, MobileLogo, WalletLogo, BankLogo, CryptoLogo from components/ui/ as in the docs.
Part 4: Checklist summary
 Design system repo cloned or added as submodule.
 Dependencies installed: class-variance-authority, clsx, tailwind-merge, and any Radix packages used by the components you copied.
 lib/utils.ts copied.
 Required components/ui/*.tsx and components/ui/index.ts copied.
 Global CSS variables merged into your app’s global CSS.
 Tailwind content and theme.extend (and darkMode: ["class"] if needed) updated.
 Path alias @/* configured in tsconfig.json.
 ThemeProvider added if using dark mode or theme-dependent components.
 (Optional) Logos copied to public/logos/ and icon components copied if needed.
 (Optional) If using Figma MCP in Cursor, read Part 6 for aligning Figma and this design system.
Troubleshooting
Issue	What to check
Components not found	Path alias @/* in tsconfig.json and that files are under the paths you listed in content in Tailwind.
Styles look wrong	Ensure design system CSS variables are in your global CSS and that Tailwind theme extends the same variable names (e.g. hsl(var(--primary))).
Dark mode not working	darkMode: ["class"] in Tailwind and ThemeProvider toggling the dark class on <html>.
Radix components error	Install the same @radix-ui/* packages and versions used by the design system for the components you copied.
For more detail on components and tokens, see DOCUMENTATION.md and COMPONENTS.md in the design system repo.
