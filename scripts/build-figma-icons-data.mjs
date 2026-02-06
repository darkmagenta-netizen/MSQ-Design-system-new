#!/usr/bin/env node

/**
 * Build lib/figma-icons-data.json from scripts/figma-icons-output/figma-icons-manifest.json.
 * Run after sync-figma-icons.mjs --manifest-only so the icons page has the latest frame list.
 *
 * Usage: node scripts/build-figma-icons-data.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const manifestPath = path.join(__dirname, 'figma-icons-output', 'figma-icons-manifest.json')
const outPath = path.join(__dirname, '..', 'lib', 'figma-icons-data.json')

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
const icons = manifest.icons.filter((i) => i.type === 'COMPONENT' || i.type === 'INSTANCE')
const categorySet = new Set(icons.map((i) => i.category).filter((c) => c && c !== 'msq-icons'))
const categories = Array.from(categorySet).sort()

const data = {
  source: manifest.source,
  exportedAt: manifest.exportedAt,
  total: icons.length,
  categories,
  icons: icons.map((i) => ({ id: i.id, name: i.name, key: i.key, category: i.category })),
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8')
console.log('Wrote', outPath, '– categories:', categories.length, '– icons:', icons.length)
