"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import Link from "next/link"
import { CodeBlock } from "@/components/docs/code-block"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { getIconByName } from "@/components/icons"
import { FigmaIcon } from "@/components/icons/figma-icon"
import { Download, Search, Copy, Check, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

import figmaIconsData from "@/lib/figma-icons-data.json"
import figmaIconsSvg from "@/lib/figma-icons-svg.json"
import { Icon } from "@/components/icons"

/** Figma icon set (component library) – source of truth for designers. */
const FIGMA_ICON_SET_URL = "https://www.figma.com/design/kPnax7i9sQ1P4jFUSgAQnV/MSQ-Design-System--Working-?node-id=13897-2080"
const FIGMA_FILE_KEY = "kPnax7i9sQ1P4jFUSgAQnV"

type FigmaIconEntry = { id: string; name: string; key: string; category: string }

/** Humanize frame name for tab label */
function categoryLabel(categoryKey: string): string {
  const map: Record<string, string> = {
    "alerts-feedback": "Alerts & Feedback",
    "finance-ecommerce": "Finance & Ecommerce",
    "maps-travel": "Maps & Travel",
    "square-country-icons": "Country",
    "frame-837": "Social Icons",
    "frame-838": "General",
    "frame-839": "Arrows",
    "frame-840": "Media & Devices",
    annotations: "Notifications & SMS",
  }
  if (map[categoryKey]) return map[categoryKey]
  if (categoryKey.startsWith("frame-")) return `Frame ${categoryKey.replace("frame-", "")}`
  return categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1).replace(/-/g, " ")
}

/** Link to open this icon in Figma */
function figmaNodeUrl(nodeId: string): string {
  const id = nodeId.replace(":", "-")
  return `https://www.figma.com/design/${FIGMA_FILE_KEY}/MSQ-Design-System--Working-?node-id=${id}`
}

/** Base path for country icons (exact colours from local SVGs) */
const COUNTRY_ICONS_BASE = "/logos/country%20icons"

/** Map icon key/name to filename in public/logos/country icons. Uses exact names from folder. */
function getCountryIconFilename(icon: FigmaIconEntry): string | null {
  const k = icon.key.toLowerCase()
  const n = icon.name
  // 2-letter ISO codes → UPPERCASE.svg (e.g. ng → NG.svg)
  if (k.length === 2) return `${k.toUpperCase()}.svg`
  // Known folder names (exact casing; variants like GB-2 where no GB.svg)
  const map: Record<string, string> = {
    eng: "Eng.svg",
    kor: "Kor.svg",
    uk: "UK.svg",
    gb: "GB-2.svg",
    "gb-2": "GB-2.svg",
    viet: "Viet.svg",
    albania: "ALBANIA.svg",
    barbados: "BABADOS.svg", // folder has BABADOS
    belarus: "BELARUS.svg",
    croatia: "CROATIA.svg",
    germany: "GERMANY.svg",
    ghana: "GHANA.svg",
    hungary: "HUNGARY.svg",
    israel: "ISRAEL.svg",
    mali: "MALI.svg",
    sweden: "SWEDEN.svg",
    "cameroun-af": "Cameroun (AF).svg",
    earth: "earth.svg",
  }
  if (map[k]) return map[k]
  return null
}

function getCountryIconSrc(icon: FigmaIconEntry): string | null {
  const filename = getCountryIconFilename(icon)
  if (!filename) return null
  return `${COUNTRY_ICONS_BASE}/${encodeURIComponent(filename)}`
}

/** Base path for social icons (exact names and colours from local SVGs) */
const SOCIAL_ICONS_BASE = "/logos/social%20icons"

/** Platform slug → exact name in filename (Platform=Name) */
const SOCIAL_PLATFORM_NAMES: Record<string, string> = {
  apple: "Apple",
  discord: "Discord",
  facebook: "Facebook",
  github: "GitHub",
  google: "Google",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  reddit: "Reddit",
  telegram: "Telegram",
  tiktok: "TikTok",
  tumblr: "Tumblr",
  twitter: "Twitter",
  "x-twitter": "X (Twitter)",
  youtube: "YouTube",
}

/** Parse social icon key "platformfacebook-stylebrand-statedefault" → { platform, style, state } */
function parseSocialIconKey(key: string): { platform: string; style: string; state: string } | null {
  const m = key.match(/^platform(.+?)-style(.+?)-state(.+)$/)
  if (!m) return null
  return { platform: m[1], style: m[2], state: m[3] }
}

/** Map social icon to filename in public/logos/social icons (exact name: Platform=X, Style=Y, State=Z.svg) */
function getSocialIconFilename(icon: FigmaIconEntry): string | null {
  const parsed = parseSocialIconKey(icon.key)
  if (!parsed) return null
  const platformName = SOCIAL_PLATFORM_NAMES[parsed.platform] ?? parsed.platform.charAt(0).toUpperCase() + parsed.platform.slice(1)
  const styleName = parsed.style.charAt(0).toUpperCase() + parsed.style.slice(1)
  const stateName = parsed.state.charAt(0).toUpperCase() + parsed.state.slice(1)
  return `Platform=${platformName}, Style=${styleName}, State=${stateName}.svg`
}

function getSocialIconSrc(icon: FigmaIconEntry): string | null {
  const filename = getSocialIconFilename(icon)
  if (!filename) return null
  return `${SOCIAL_ICONS_BASE}/${encodeURIComponent(filename)}`
}

/** Display name for social icon card: "Tumblr colored", "Tumblr Gray", "Tumblr Gray Hover", etc. */
function getSocialIconDisplayName(icon: FigmaIconEntry): string | null {
  const parsed = parseSocialIconKey(icon.key)
  if (!parsed) return null
  const platformLabel = SOCIAL_PLATFORM_NAMES[parsed.platform] ?? parsed.platform.charAt(0).toUpperCase() + parsed.platform.slice(1)
  const style = parsed.style.toLowerCase()
  const state = parsed.state.toLowerCase()
  if (style === "brand") return `${platformLabel} colored`
  if (style === "gray") return state === "hover" ? `${platformLabel} Gray Hover` : `${platformLabel} Gray`
  return `${platformLabel} ${parsed.style.charAt(0).toUpperCase() + parsed.style.slice(1)}`
}

/** Full country name for card subtitle, keyed by title abbreviation (icon.name) so name matches the flag. One entry per abbreviation, no duplicates. */
const COUNTRY_ABBR_TO_FULL_NAME: Record<string, string> = {
  ad: "Andorra", ae: "United Arab Emirates", af: "Afghanistan", ag: "Antigua and Barbuda", ai: "Anguilla", al: "Albania",
  am: "Armenia", ao: "Angola", ar: "Argentina", as: "American Samoa", at: "Austria", au: "Australia", aw: "Aruba",
  ax: "Åland Islands", az: "Azerbaijan", ba: "Bosnia and Herzegovina", bb: "Barbados", bd: "Bangladesh", be: "Belgium",
  bf: "Burkina Faso", bg: "Bulgaria", bh: "Bahrain", bi: "Burundi", bj: "Benin", bl: "Saint Barthélemy", bm: "Bermuda",
  bn: "Brunei", bo: "Bolivia", bq: "Caribbean Netherlands", br: "Brazil", bs: "Bahamas", bt: "Bhutan", bw: "Botswana",
  by: "Belarus", bz: "Belize", ca: "Canada", cc: "Cocos (Keeling) Islands", cd: "Democratic Republic of the Congo",
  cf: "Central African Republic", cg: "Republic of the Congo", ch: "Switzerland", ck: "Cook Islands", cl: "Chile",
  cm: "Cameroon", cn: "China", co: "Colombia", cr: "Costa Rica", cu: "Cuba", cv: "Cape Verde", cx: "Christmas Island",
  cy: "Cyprus", cz: "Czech Republic", de: "Germany", dj: "Djibouti", dk: "Denmark", dm: "Dominica", do: "Dominican Republic",
  dz: "Algeria", ec: "Ecuador", ee: "Estonia", eg: "Egypt", eh: "Western Sahara", er: "Eritrea", es: "Spain",
  et: "Ethiopia", fi: "Finland", fj: "Fiji", fk: "Falkland Islands", fm: "Micronesia", fo: "Faroe Islands", fr: "France",
  ga: "Gabon", gb: "United Kingdom", gd: "Grenada", ge: "Georgia", gg: "Guernsey", gh: "Ghana", gi: "Gibraltar",
  gl: "Greenland", gm: "Gambia", gn: "Guinea", gq: "Equatorial Guinea", gr: "Greece", gt: "Guatemala", gu: "Guam",
  gw: "Guinea-Bissau", gy: "Guyana", hk: "Hong Kong", hn: "Honduras", hr: "Croatia", ht: "Haiti", hu: "Hungary",
  id: "Indonesia", ie: "Ireland", il: "Israel", im: "Isle of Man", in: "India", io: "British Indian Ocean Territory",
  iq: "Iraq", ir: "Iran", is: "Iceland", it: "Italy", je: "Jersey", jm: "Jamaica", jo: "Jordan", jp: "Japan",
  ke: "Kenya", kg: "Kyrgyzstan", kh: "Cambodia", ki: "Kiribati", kn: "Saint Kitts and Nevis", kp: "North Korea",
  kr: "South Korea", kw: "Kuwait", ky: "Cayman Islands", kz: "Kazakhstan", la: "Laos", lb: "Lebanon", lc: "Saint Lucia",
  li: "Liechtenstein", lk: "Sri Lanka", lr: "Liberia", ls: "Lesotho", lt: "Lithuania", lu: "Luxembourg", lv: "Latvia",
  ly: "Libya", ma: "Morocco", mc: "Monaco", md: "Moldova", me: "Montenegro", mg: "Madagascar", mh: "Marshall Islands",
  mk: "North Macedonia", ml: "Mali", mm: "Myanmar", mn: "Mongolia", mo: "Macau", mp: "Northern Mariana Islands",
  mq: "Martinique", mr: "Mauritania", ms: "Montserrat", mt: "Malta", mu: "Mauritius", mv: "Maldives", mw: "Malawi",
  mx: "Mexico", my: "Malaysia", mz: "Mozambique", na: "Namibia", ne: "Niger", ng: "Nigeria", ni: "Nicaragua",
  nl: "Netherlands", no: "Norway", np: "Nepal", nr: "Nauru", nu: "Niue", nz: "New Zealand", om: "Oman", pa: "Panama",
  pe: "Peru", pf: "French Polynesia", pg: "Papua New Guinea", ph: "Philippines", pk: "Pakistan", pl: "Poland",
  pn: "Pitcairn Islands", pr: "Puerto Rico", ps: "Palestine", pt: "Portugal", pw: "Palau", py: "Paraguay", qa: "Qatar",
  ro: "Romania", rs: "Serbia", ru: "Russia", rw: "Rwanda", sa: "Saudi Arabia", sb: "Solomon Islands", sc: "Seychelles",
  sd: "Sudan", se: "Sweden", sg: "Singapore", sh: "Saint Helena", si: "Slovenia", sk: "Slovakia", sl: "Sierra Leone",
  sm: "San Marino", sn: "Senegal", so: "Somalia", sr: "Suriname", ss: "South Sudan", st: "São Tomé and Príncipe",
  sv: "El Salvador", sx: "Sint Maarten", sy: "Syria", sz: "Eswatini", tc: "Turks and Caicos Islands", td: "Chad",
  tg: "Togo", th: "Thailand", tj: "Tajikistan", tk: "Tokelau", tl: "Timor-Leste", tm: "Turkmenistan", tn: "Tunisia",
  to: "Tonga", tr: "Turkey", tt: "Trinidad and Tobago", tv: "Tuvalu", tw: "Taiwan", tz: "Tanzania", ua: "Ukraine",
  ug: "Uganda", uk: "United Kingdom", us: "United States", uy: "Uruguay", uz: "Uzbekistan", vc: "Saint Vincent and the Grenadines",
  ve: "Venezuela", vg: "British Virgin Islands", vi: "United States Virgin Islands", vu: "Vanuatu", ws: "Samoa",
  ye: "Yemen", za: "South Africa", zm: "Zambia", zw: "Zimbabwe",
  eng: "England", kor: "South Korea", viet: "Vietnam",
  albania: "Albania", barbados: "Barbados", belarus: "Belarus", croatia: "Croatia", germany: "Germany", ghana: "Ghana",
  hungary: "Hungary", israel: "Israel", mali: "Mali", sweden: "Sweden",
  "cameroun-af": "Cameroon", "gb-2": "United Kingdom", earth: "Earth", ds: "East Germany (GDR)",
}

/** Resolve full country name from card title (abbreviation) so subtitle matches the flag. */
function getCountryFullName(icon: FigmaIconEntry): string {
  const byTitle = icon.name && COUNTRY_ABBR_TO_FULL_NAME[icon.name.toLowerCase()]
  const byKey = COUNTRY_ABBR_TO_FULL_NAME[icon.key.toLowerCase()]
  return byTitle ?? byKey ?? icon.name
}

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)

  const { categories, icons: allIconsFromFigma } = figmaIconsData as {
    categories: string[]
    icons: FigmaIconEntry[]
  }

  /** Extracted SVG data by icon key – pathData/pathDataAll for render, svgCode for copy/download */
  const svgByKey = figmaIconsSvg as Record<string, { pathData: string; pathDataAll?: string[]; svgCode: string }>

  const filteredIcons = useMemo(() => {
    let list = allIconsFromFigma
    if (selectedCategory !== "all") {
      list = list.filter((i) => i.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.key.toLowerCase().includes(q)
      )
    }
    return list.sort((a, b) => a.name.localeCompare(b.name))
  }, [searchQuery, selectedCategory, allIconsFromFigma])

  const copyToClipboard = async (text: string, iconName: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedIcon(iconName)
    setTimeout(() => setCopiedIcon(null), 2000)
  }

  const downloadSVG = (iconName: string, svgCode: string) => {
    const blob = new Blob([svgCode], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${iconName}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const tocItems = [
    { title: "Overview", id: "overview" },
    { title: "Browse Icons", id: "browse" },
    { title: "Usage", id: "usage" },
  ]

  return (
    <div className="flex gap-12">
      <div className="flex-1 max-w-5xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Icons</h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Comprehensive icon library for the MSQ Design System. {figmaIconsData.total} icons organised by Figma frame. Browse, search, and download SVG where available.
          </p>
        </div>

        <section id="overview" className="mb-12 scroll-mt-24">
          <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-[var(--color-text)] mb-2">Icon set in Figma</p>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Icons are maintained as a component set in Figma. Designers use Figma as the source of truth; this page shows the same set for development.
            </p>
            <Link
              href={FIGMA_ICON_SET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              Open icon set in Figma
              <ExternalLink className="h-4 w-4 shrink-0" />
            </Link>
          </div>
          <div className="bg-[var(--color-background-subtle)] border border-[var(--color-border)] rounded-lg p-4 mb-4">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text)]">Note:</strong> Icons use <code className="text-[var(--color-primary)]">currentColor</code> for fill, 
              allowing them to inherit the text color from their parent element.
            </p>
          </div>
        </section>

        <section id="browse" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-6">Browse Icons</h2>
          <div className="sticky top-0 z-10 py-4 -mt-4 mb-6 bg-background border-b border-border/50">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-tertiary)]" />
                <input
                  type="text"
                  placeholder="Search icons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    selectedCategory === "all"
                      ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                      : "bg-[var(--color-background-subtle)] text-[var(--color-text)] hover:bg-[var(--color-background-hover)]"
                  )}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      selectedCategory === category
                        ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                        : "bg-[var(--color-background-subtle)] text-[var(--color-text)] hover:bg-[var(--color-background-hover)]"
                    )}
                  >
                    {categoryLabel(category)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredIcons.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              <p>No icons found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredIcons.map((icon) => {
                // Use local country/logo file whenever we have a mapping (incl. msq-icons: Cameroun, earth, GB-2, DS, Croatia, Germany, etc.)
                const countryIconSrc = getCountryIconSrc(icon)
                const useCountryFile = Boolean(countryIconSrc)
                const isCountry = icon.category === "square-country-icons"
                const isSocial = icon.category === "frame-837"
                const socialIconSrc = isSocial ? getSocialIconSrc(icon) : null
                const useSocialFile = Boolean(socialIconSrc)

                const registryIcon = getIconByName(icon.key) ?? getIconByName(icon.name)
                const extractedSvg = svgByKey[icon.key]
                const hasExtractedSvg = extractedSvg?.pathData && extractedSvg?.svgCode
                const hasRegistrySvg = registryIcon?.svgCode && !registryIcon.svgCode.includes("PLACEHOLDER")
                const svgCode = hasExtractedSvg ? extractedSvg.svgCode : hasRegistrySvg ? registryIcon!.svgCode : null
                // Prefer FigmaIcon over registry when registry has PLACEHOLDER (avoids black placeholder box)
                const IconComponent = hasRegistrySvg ? registryIcon?.component : null

                const cardTitle = isSocial ? (getSocialIconDisplayName(icon) ?? icon.name) : icon.name
                const cardSubtitle = useCountryFile ? getCountryFullName(icon) : icon.key

                const handleCopy = async () => {
                  if (useSocialFile && socialIconSrc) {
                    try {
                      const res = await fetch(socialIconSrc)
                      const text = await res.text()
                      await copyToClipboard(text, icon.name)
                    } catch {
                      if (svgCode) copyToClipboard(svgCode, icon.name)
                    }
                  } else if (useCountryFile && countryIconSrc) {
                    try {
                      const res = await fetch(countryIconSrc)
                      const text = await res.text()
                      await copyToClipboard(text, icon.name)
                    } catch {
                      if (svgCode) copyToClipboard(svgCode, icon.name)
                    }
                  } else if (svgCode) {
                    copyToClipboard(svgCode, icon.name)
                  }
                }

                const handleDownload = () => {
                  if (useSocialFile && socialIconSrc) {
                    const a = document.createElement("a")
                    a.href = socialIconSrc
                    a.download = getSocialIconFilename(icon) ?? `${icon.key}.svg`
                    a.click()
                  } else if (useCountryFile && countryIconSrc) {
                    const a = document.createElement("a")
                    a.href = countryIconSrc
                    a.download = getCountryIconFilename(icon) ?? `${icon.key}.svg`
                    a.click()
                  } else if (svgCode) {
                    downloadSVG(icon.name, svgCode)
                  }
                }

                const canCopyOrDownload = useCountryFile || useSocialFile || svgCode

                return (
                  <div
                    key={`${icon.id}-${icon.key}`}
                    className="group relative p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] hover:border-[var(--color-primary)] transition-colors"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 bg-[var(--color-background-subtle)] rounded-lg w-full flex items-center justify-center min-h-[80px]">
                        {useCountryFile && (
                          <img
                            src={countryIconSrc!}
                            alt={icon.name}
                            className="h-8 w-8 object-contain"
                          />
                        )}
                        {useSocialFile && !useCountryFile && (
                          <img
                            src={socialIconSrc!}
                            alt={icon.name}
                            className={cn(
                              "h-8 w-8 object-contain",
                              isSocial && icon.key === "platformapple-stylebrand-statedefault" && "dark:brightness-0 dark:invert"
                            )}
                          />
                        )}
                        {!useCountryFile && !useSocialFile && (
                          <>
                            {hasExtractedSvg ? (
                              <Icon className="h-8 w-8 text-[var(--color-text)]">
                                {(extractedSvg.pathDataAll && extractedSvg.pathDataAll.length > 0
                                  ? extractedSvg.pathDataAll
                                  : [extractedSvg.pathData]
                                ).map((d, idx) => (
                                  <path key={idx} d={d} fill="currentColor" />
                                ))}
                              </Icon>
                            ) : IconComponent ? (
                              <IconComponent className="h-8 w-8 text-[var(--color-text)]" />
                            ) : (
                              <FigmaIcon
                                nodeId={icon.id}
                                displayName={icon.name}
                                className="h-8 w-8 text-[var(--color-text)]"
                              />
                            )}
                          </>
                        )}
                      </div>
                      <div className="text-center w-full">
                        <p className="text-sm font-medium text-[var(--color-text)] mb-1 truncate">
                          {cardTitle}
                        </p>
                        <p className="text-xs text-[var(--color-text-tertiary)] truncate">
                          {cardSubtitle}
                        </p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                        {canCopyOrDownload ? (
                          <>
                            <button
                              onClick={handleCopy}
                              className="p-1.5 rounded hover:bg-[var(--color-background-subtle)] transition-colors"
                              title="Copy SVG code"
                            >
                              {copiedIcon === icon.name ? (
                                <Check className="h-4 w-4 text-[var(--color-primary)]" />
                              ) : (
                                <Copy className="h-4 w-4 text-[var(--color-text-tertiary)]" />
                              )}
                            </button>
                            <button
                              onClick={handleDownload}
                              className="p-1.5 rounded hover:bg-[var(--color-background-subtle)] transition-colors"
                              title="Download SVG"
                            >
                              <Download className="h-4 w-4 text-[var(--color-text-tertiary)]" />
                            </button>
                          </>
                        ) : null}
                        <a
                          href={figmaNodeUrl(icon.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded hover:bg-[var(--color-background-subtle)] transition-colors"
                          title="Open in Figma"
                        >
                          <ExternalLink className="h-4 w-4 text-[var(--color-text-tertiary)]" />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        <section id="usage" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Usage</h2>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Icons can be used as React components (when in the registry) or viewed in Figma.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">As React Components</h3>
          <CodeBlock
            code={`import { getIconByName } from "@/components/icons"

const iconData = getIconByName("activity")
if (iconData) {
  const Icon = iconData.component
  return <Icon className="h-6 w-6 text-[var(--color-primary)]" />
}`}
          />

          <h3 className="text-xl font-semibold mb-3 mt-6">Figma-only icons</h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Icons not yet in the registry can be shown via FigmaIcon (fetches from Figma) or opened in Figma using the link on each card.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">Styling</h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Icons use <code className="text-[var(--color-primary)]">currentColor</code> for fill so they inherit the text color from their parent.
          </p>
          <CodeBlock
            code={`<div className="text-[var(--color-primary)]">
  <Icon className="h-6 w-6" />
</div>`}
          />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
