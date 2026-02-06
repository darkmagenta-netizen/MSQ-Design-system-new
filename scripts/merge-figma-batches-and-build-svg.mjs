#!/usr/bin/env node

/**
 * Merge figma-icons-batch-*.json into one export and build lib/figma-icons-svg.json.
 * Run after sync-figma-icons.mjs (full or partial) so the app can display/copy/download.
 *
 * Usage: node scripts/merge-figma-batches-and-build-svg.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, 'figma-icons-output')
const libDir = path.join(__dirname, '..', 'lib')

const SVG_HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  '
const SVG_TAIL = '\n</svg>'

function pathToSvgCode(pathDataOrPaths) {
  if (Array.isArray(pathDataOrPaths) && pathDataOrPaths.length > 0) {
    const pathEls = pathDataOrPaths.map((d) => `<path d="${d.replace(/"/g, '&quot;')}" fill="currentColor"/>`)
    return SVG_HEAD + pathEls.join('\n  ') + SVG_TAIL
  }
  if (typeof pathDataOrPaths === 'string' && pathDataOrPaths) {
    return SVG_HEAD + `<path d="${pathDataOrPaths.replace(/"/g, '&quot;')}" fill="currentColor"/>` + SVG_TAIL
  }
  return null
}

// Read all batch files
const batchFiles = fs.readdirSync(outDir)
  .filter((f) => f.startsWith('figma-icons-batch-') && f.endsWith('.json'))
  .sort((a, b) => {
    const na = parseInt(a.replace('figma-icons-batch-', '').replace('.json', ''), 10)
    const nb = parseInt(b.replace('figma-icons-batch-', '').replace('.json', ''), 10)
    return na - nb
  })

const allIcons = []
for (const file of batchFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(outDir, file), 'utf-8'))
  const icons = data.icons || []
  allIcons.push(...icons)
}

// Only COMPONENT/INSTANCE with svgPath (actual icons; FRAME excluded by sync)
const iconEntries = allIcons.filter(
  (i) => (i.type === 'COMPONENT' || i.type === 'INSTANCE') && i.svgPath && i.key
)

const svgByKey = {}
for (const icon of iconEntries) {
  const key = icon.key
  if (!key) continue
  const paths = icon.pathDataAll && icon.pathDataAll.length > 0 ? icon.pathDataAll : [icon.svgPath]
  const svgCode = pathToSvgCode(paths)
  if (!svgCode) continue
  svgByKey[key] = {
    pathData: icon.svgPath,
    pathDataAll: icon.pathDataAll && icon.pathDataAll.length > 0 ? icon.pathDataAll : [icon.svgPath],
    svgCode,
  }
}

const svgPath = path.join(libDir, 'figma-icons-svg.json')
fs.mkdirSync(libDir, { recursive: true })
fs.writeFileSync(svgPath, JSON.stringify(svgByKey, null, 0), 'utf-8')

console.log('Merged', batchFiles.length, 'batch files →', iconEntries.length, 'icons with SVG')
console.log('Wrote', svgPath)
console.log('Keys (sample):', Object.keys(svgByKey).slice(0, 5).join(', '), '...')
