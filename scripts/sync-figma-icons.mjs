#!/usr/bin/env node

/**
 * Sync Icons from a Figma Frame — exact names and IDs from Figma, in batches
 *
 * This script:
 * 1. Lists ALL icon nodes from a Figma frame (exact name + id from Figma API)
 * 2. Fetches SVG exports in configurable batches
 * 3. Extracts path data (or keeps full SVG) and writes JSON + optional TS
 *
 * Usage:
 *   export FIGMA_ACCESS_TOKEN=your_token
 *   node scripts/sync-figma-icons.mjs <frame-node-id> [options]
 *
 * Frame node ID: from your Figma frame URL ...?node-id=11099-47136 → use 11099:47136 or 11099-47136
 *
 * Options:
 *   --file-key=KEY     Figma file key (default: from env or MSQ design system)
 *   --depth=N          Tree depth when listing nodes (default: 4)
 *   --batch=N          Icons per batch for SVG fetch (default: 50)
 *   --delay=N          Ms delay between batches (default: 300)
 *   --out-dir=DIR      Output directory (default: scripts/figma-icons-output)
 *   --manifest-only    Only list icons (manifest JSON), do not fetch SVGs
 *   --generate-ts      After fetch, generate TypeScript icon entries
 *   --category-from-parent  Use parent frame name as category (default: true)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const DEFAULT_FILE_KEY = 'kPnax7i9sQ1P4jFUSgAQnV'
const DEFAULT_BATCH = 50
const DEFAULT_DELAY_MS = 300
const DEFAULT_DEPTH = 4
const OUT_DIR_NAME = 'figma-icons-output'

/** Normalize node ID for Figma API (ids param: use colon) */
function toFigmaId(id) {
  if (!id) return id
  return String(id).includes(':') ? id : String(id).replace(/-/g, ':')
}

/** Sanitize Figma name to a stable key (lowercase, spaces/slashes to hyphens) */
function nameToKey(name) {
  if (!name || typeof name !== 'string') return 'unknown'
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'unknown'
}

/**
 * Recursively collect icon nodes: COMPONENT and INSTANCE only (no FRAME).
 * FRAME nodes are containers; exporting them gives wrong SVGs (e.g. align icons show frame shape).
 * Returns array of { id, name, key, type, parentName }.
 */
function collectIconNodes(node, parentName = null, depth = 0, maxDepth = 10) {
  if (depth > maxDepth) return []
  const list = []
  const type = node.type || ''
  const name = node.name || ''

  if (['COMPONENT', 'INSTANCE'].includes(type)) {
    const key = nameToKey(name)
    list.push({
      id: node.id,
      name,
      key: key || `icon-${node.id.replace(/:/g, '-')}`,
      type,
      parentName,
    })
  }

  const children = node.children || []
  const nextParent = ['FRAME', 'GROUP', 'CANVAS'].includes(type) ? name : parentName
  for (const child of children) {
    list.push(...collectIconNodes(child, nextParent, depth + 1, maxDepth))
  }

  return list
}

/**
 * Get document node from Figma /v1/files/:key/nodes response.
 */
function getDocumentFromNodesResponse(data, requestedId) {
  const idForApi = toFigmaId(requestedId)
  const nodes = data.nodes || {}
  const nodeData = nodes[idForApi] || Object.values(nodes)[0]
  if (!nodeData || !nodeData.document) return null
  return nodeData.document
}

/**
 * List all icon nodes from a Figma frame.
 */
async function listIconsFromFrame(fileKey, frameNodeId, depth, accessToken) {
  const idForApi = toFigmaId(frameNodeId)
  const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(idForApi)}&depth=${depth}`

  const res = await fetch(url, {
    headers: { 'X-Figma-Token': accessToken, Accept: 'application/json' },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Figma nodes API ${res.status}: ${text}`)
  }

  const data = await res.json()
  const doc = getDocumentFromNodesResponse(data, frameNodeId)
  if (!doc) throw new Error('Could not get document from Figma response')

  const icons = collectIconNodes(doc, null, 0, 20)
  return icons
}

/**
 * Fetch SVG export URLs for a batch of node IDs (Figma Images API).
 */
async function fetchImageUrls(fileKey, nodeIds, accessToken, format = 'svg') {
  const ids = nodeIds.map(toFigmaId).join(',')
  const url = `https://api.figma.com/v1/images/${fileKey}?ids=${encodeURIComponent(ids)}&format=${format}`

  const res = await fetch(url, {
    headers: { 'X-Figma-Token': accessToken, Accept: 'application/json' },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Figma images API ${res.status}: ${text}`)
  }

  const data = await res.json()
  const images = data.images || {}
  return images
}

/**
 * Extract all path d attributes from SVG string (so multi-path icons render correctly).
 * Returns { pathData: first path (for backward compat), pathDataAll: string[] }.
 */
function extractPathData(svgText) {
  if (!svgText || typeof svgText !== 'string') return { pathData: null, pathDataAll: [] }
  const cleaned = svgText
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
  const pathMatches = cleaned.match(/<path[^>]*\sd="([^"]+)"[^>]*>/gi)
  if (!pathMatches || pathMatches.length === 0) return { pathData: null, pathDataAll: [] }
  const pathDataAll = pathMatches.map((m) => {
    const d = m.match(/d="([^"]+)"/i)
    return d ? d[1] : ''
  }).filter(Boolean)
  return { pathData: pathDataAll[0] || null, pathDataAll }
}

/**
 * Fetch SVG content from URL and return path data (single + all).
 */
async function fetchSvgContent(url) {
  const res = await fetch(url, { headers: { Accept: 'image/svg+xml' } })
  if (!res.ok) return null
  const text = await res.text()
  return extractPathData(text)
}

function parseArgs() {
  const args = process.argv.slice(2)
  const frameNodeId = args.find((a) => !a.startsWith('--'))
  const opts = {
    fileKey: process.env.FIGMA_FILE_KEY || DEFAULT_FILE_KEY,
    depth: DEFAULT_DEPTH,
    batch: DEFAULT_BATCH,
    delay: DEFAULT_DELAY_MS,
    outDir: path.join(__dirname, OUT_DIR_NAME),
    manifestOnly: false,
    generateTs: false,
    categoryFromParent: true,
    fromBatch: null,
    toBatch: null,
  }
  for (const a of args) {
    if (a.startsWith('--file-key=')) opts.fileKey = a.slice('--file-key='.length)
    else if (a.startsWith('--depth=')) opts.depth = parseInt(a.slice('--depth='.length), 10)
    else if (a.startsWith('--batch=')) opts.batch = parseInt(a.slice('--batch='.length), 10)
    else if (a.startsWith('--delay=')) opts.delay = parseInt(a.slice('--delay='.length), 10)
    else if (a.startsWith('--out-dir=')) opts.outDir = a.slice('--out-dir='.length)
    else if (a.startsWith('--from-batch=')) opts.fromBatch = parseInt(a.slice('--from-batch='.length), 10)
    else if (a.startsWith('--to-batch=')) opts.toBatch = parseInt(a.slice('--to-batch='.length), 10)
    else if (a === '--manifest-only') opts.manifestOnly = true
    else if (a === '--generate-ts') opts.generateTs = true
    else if (a === '--no-category-from-parent') opts.categoryFromParent = false
  }
  return { frameNodeId, opts }
}

async function main() {
  const { frameNodeId, opts } = parseArgs()

  if (!frameNodeId) {
    console.error(`
Usage: node scripts/sync-figma-icons.mjs <frame-node-id> [options]

Get the frame node ID from your Figma URL:
  https://www.figma.com/design/FILE_KEY/...?node-id=11099-47136
  → use 11099:47136 or 11099-47136

Options:
  --file-key=KEY     Figma file key
  --depth=N          Tree depth (default: 4)
  --batch=N          Icons per batch (default: 50)
  --delay=N          Ms between batches (default: 300)
  --out-dir=DIR      Output directory
  --manifest-only    Only list icons to manifest JSON (no SVG fetch)
  --generate-ts      Generate TypeScript icon entries after fetch
  --no-category-from-parent  Do not use parent frame name as category

Example:
  export FIGMA_ACCESS_TOKEN=your_token
  node scripts/sync-figma-icons.mjs 11099:47136 --batch=50
`)
    process.exit(1)
  }

  const token = process.env.FIGMA_ACCESS_TOKEN
  if (!token) {
    console.error('ERROR: Set FIGMA_ACCESS_TOKEN (e.g. export FIGMA_ACCESS_TOKEN=your_token)')
    process.exit(1)
  }

  if (!fs.existsSync(opts.outDir)) {
    fs.mkdirSync(opts.outDir, { recursive: true })
  }

  const fileKey = opts.fileKey
  console.log('Listing icon nodes from Figma frame...')
  console.log(`  File key: ${fileKey}`)
  console.log(`  Frame ID: ${frameNodeId}`)
  console.log(`  Depth: ${opts.depth}`)

  let icons
  try {
    icons = await listIconsFromFrame(fileKey, frameNodeId, opts.depth, token)
  } catch (e) {
    console.error('Failed to list nodes:', e.message)
    process.exit(1)
  }

  console.log(`\nFound ${icons.length} icon nodes (exact names and IDs from Figma).\n`)

  const manifest = {
    source: { fileKey, frameNodeId, depth: opts.depth },
    exportedAt: new Date().toISOString(),
    total: icons.length,
    icons: icons.map(({ id, name, key, type, parentName }) => ({
      id,
      name,
      key: key || nameToKey(name) || `icon-${id.replace(/:/g, '-')}`,
      type,
      category: opts.categoryFromParent && parentName ? nameToKey(parentName) : 'general',
    })),
  }

  const manifestPath = path.join(opts.outDir, 'figma-icons-manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8')
  console.log(`Wrote manifest: ${manifestPath}`)

  if (opts.manifestOnly) {
    console.log('\nDone (--manifest-only). Run without --manifest-only to fetch SVGs.')
    return
  }

  let startIndex = 0
  if (opts.fromBatch != null && opts.fromBatch >= 1) {
    startIndex = (opts.fromBatch - 1) * opts.batch
    if (startIndex >= icons.length) {
      console.error(`--from-batch=${opts.fromBatch} is beyond icon count (${icons.length})`)
      process.exit(1)
    }
    console.log(`\nResuming from batch ${opts.fromBatch} (icons ${startIndex + 1}–${Math.min(startIndex + opts.batch, icons.length)} onwards).\n`)
  }

  const results = []
  const totalBatches = Math.ceil(icons.length / opts.batch)
  let endIndex = icons.length
  if (opts.toBatch != null && opts.toBatch >= 1) {
    endIndex = Math.min(opts.toBatch * opts.batch, icons.length)
    if (startIndex >= endIndex) {
      console.error('--from-batch and --to-batch leave no icons to process')
      process.exit(1)
    }
    console.log(`Processing only through batch ${opts.toBatch} (icons 1–${endIndex}).\n`)
  }
  const iconsToProcess = icons.slice(startIndex, endIndex)

  for (let i = 0; i < iconsToProcess.length; i += opts.batch) {
    const batch = iconsToProcess.slice(i, i + opts.batch)
    const batchIndex = opts.fromBatch != null && opts.fromBatch >= 1
      ? opts.fromBatch + Math.floor(i / opts.batch)
      : Math.floor((startIndex + i) / opts.batch) + 1
    console.log(`\nBatch ${batchIndex}/${totalBatches} (${batch.length} icons)...`)

    const nodeIds = batch.map((icon) => icon.id)
    let imageUrls
    try {
      imageUrls = await fetchImageUrls(fileKey, nodeIds, token)
    } catch (e) {
      console.error(`  Batch ${batchIndex} images API error:`, e.message)
      batch.forEach((icon) => results.push({ ...icon, svgPath: null, pathDataAll: [], error: e.message }))
      if (i + opts.batch < iconsToProcess.length) await new Promise((r) => setTimeout(r, opts.delay))
      continue
    }

    const idForApi = (id) => toFigmaId(id)
    for (const icon of batch) {
      const url = imageUrls[idForApi(icon.id)]
      if (!url) {
        results.push({ ...icon, svgPath: null, pathDataAll: [], error: 'No image URL' })
        continue
      }
      const extracted = await fetchSvgContent(url)
      const pathData = extracted && extracted.pathData
      const pathDataAll = (extracted && extracted.pathDataAll) || []
      results.push({
        ...icon,
        svgPath: pathData || null,
        pathDataAll: pathDataAll.length ? pathDataAll : undefined,
        error: pathData ? null : 'No path extracted',
      })
    }

    const batchPath = path.join(opts.outDir, `figma-icons-batch-${batchIndex}.json`)
    const batchResults = results.slice(-batch.length)
    fs.writeFileSync(
      batchPath,
      JSON.stringify({ batch: batchIndex, totalBatches, icons: batchResults }, null, 2),
      'utf-8'
    )
    console.log(`  Wrote ${batchPath}`)

    if (i + opts.batch < iconsToProcess.length) {
      await new Promise((r) => setTimeout(r, opts.delay))
    }
  }

  const exportPath = path.join(opts.outDir, 'figma-icons-export.json')
  const exportData = {
    source: manifest.source,
    exportedAt: new Date().toISOString(),
    total: results.length,
    icons: results,
  }
  fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2), 'utf-8')
  console.log(`\nWrote full export: ${exportPath}`)

  const withPath = results.filter((r) => r.svgPath)
  const withoutPath = results.filter((r) => !r.svgPath && !r.error)
  const withError = results.filter((r) => r.error)
  console.log('\nSummary:')
  console.log(`  With SVG path: ${withPath.length}`)
  console.log(`  No path (complex SVG): ${withoutPath.length}`)
  console.log(`  Errors: ${withError.length}`)

  if (opts.generateTs && results.length > 0) {
    const tsPath = path.join(opts.outDir, 'figma-icons-generated.tsx')
    generateTsFile(tsPath, results, opts)
    console.log(`\nGenerated: ${tsPath}`)
  }
}

/**
 * Generate a TypeScript file that exports icon entries (createIcon pattern).
 */
function generateTsFile(outPath, results, opts) {
  const lines = [
    '// Auto-generated from Figma frame — run scripts/sync-figma-icons.mjs with --generate-ts',
    `// Generated: ${new Date().toISOString()}`,
    '// Replace or merge into your icon registry.',
    '',
    '"use client"',
    '',
    'import React from "react"',
    'import { Icon, IconProps } from "../../components/icons/icon"',
    'import { FigmaIcon } from "../../components/icons/figma-icon"',
    'import { IconData, IconCategory } from "../../components/icons/types"',
    '',
    'function createIcon(',
    '  name: string,',
    '  displayName: string,',
    '  category: IconCategory,',
    '  keywords: string[],',
    '  svgPath: string | React.ReactNode,',
    '  description?: string,',
    '  nodeId?: string',
    '): IconData {',
    '  const IconComponent = React.forwardRef<SVGSVGElement, IconProps>(function IconComponent(props, ref) {',
    '    if (typeof svgPath === "string" && svgPath === "PLACEHOLDER_SVG_PATH" && nodeId) {',
    '      return React.createElement(FigmaIcon, { ...props, ref, nodeId, displayName } as any)',
    '    }',
    '    if (typeof svgPath !== "string") return React.createElement(React.Fragment, null, svgPath)',
    '    return React.createElement(Icon, { ...props, ref }, React.createElement("path", { d: svgPath, fill: "currentColor" }))',
    '  })',
    '  IconComponent.displayName = displayName',
    '  return {',
    '    name, displayName, category, keywords, description, nodeId,',
    '    component: IconComponent,',
    '    svgCode: typeof svgPath === "string" ? svgPath : "",',
    '  }',
    '}',
    '',
    'export const figmaIconsGenerated: Record<string, IconData> = {',
  ]

  for (const icon of results) {
    const key = icon.key || nameToKey(icon.name) || icon.id.replace(/:/g, '-')
    const category = (opts.categoryFromParent && icon.parentName ? nameToKey(icon.parentName) : 'general')
    const safeCategory = /^[a-z]+$/.test(category) ? category : 'general'
    const displayName = icon.name.replace(/"/g, '\\"')
    const pathOrPlaceholder = icon.svgPath ? `"${icon.svgPath.replace(/"/g, '\\"')}"` : 'PLACEHOLDER_SVG_PATH'
    const keywords = [key, ...(icon.name || '').toLowerCase().split(/\s+/).filter(Boolean)]
    lines.push(`  "${key}": createIcon(`)
    lines.push(`    "${key}",`)
    lines.push(`    "${displayName}",`)
    lines.push(`    "${safeCategory}" as IconCategory,`)
    lines.push(`    ${JSON.stringify(keywords)},`)
    lines.push(`    ${pathOrPlaceholder},`)
    lines.push(`    "${displayName} icon",`)
    lines.push(`    "${icon.id}"`)
    lines.push('  ),')
  }

  lines.push('}')
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
