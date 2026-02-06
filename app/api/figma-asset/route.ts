import { NextRequest, NextResponse } from 'next/server'

const FILE_KEY = 'kPnax7i9sQ1P4jFUSgAQnV'
/** Crypto logos frame from MSQ Design System – Working (node-id=14331-1601) */
const FIGMA_CRYPTO_CONTAINER_NODE_ID = '14331-1601'

type CryptoType = 'BTC' | 'MATIC' | 'SHIB' | 'USDT' | 'KRW' | 'USDC' | 'MSQ'

// In-memory cache: container node id -> { cryptoType -> nodeId }
const cryptoNodeCache = new Map<string, Record<CryptoType, string>>()

/** Normalize node ID for Figma API (ids param uses colon) */
function toFigmaId(id: string): string {
  return id.includes(':') ? id : id.replace(/-/g, ':')
}

/** Match Figma node name to CryptoType */
function nameToCrypto(name: string): CryptoType | null {
  const n = name.toUpperCase().replace(/\s+/g, '')
  const map: Record<string, CryptoType> = {
    BTC: 'BTC',
    BITCOIN: 'BTC',
    MATIC: 'MATIC',
    POLYGON: 'MATIC',
    SHIB: 'SHIB',
    SHIBA: 'SHIB',
    USDT: 'USDT',
    TETHER: 'USDT',
    KRW: 'KRW',
    WON: 'KRW',
    USDC: 'USDC',
    MSQ: 'MSQ',
  }
  return map[n] ?? null
}

/** Fetch container's children from Figma and map names to node IDs */
async function getCryptoNodeIds(containerNodeId: string): Promise<Record<CryptoType, string> | null> {
  const token = process.env.FIGMA_ACCESS_TOKEN
  if (!token) return null

  const cached = cryptoNodeCache.get(containerNodeId)
  if (cached) return cached

  const idForApi = toFigmaId(containerNodeId)
  const url = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(idForApi)}&depth=1`
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token },
  })
  if (!res.ok) return null

  const data = await res.json() as { nodes?: Record<string, { document?: { children?: Array<{ id: string; name: string }> } }> }
  const nodeData = data.nodes?.[idForApi]
  const children = nodeData?.document?.children
  if (!children?.length) return null

  const map: Partial<Record<CryptoType, string>> = {}
  for (const child of children) {
    const crypto = nameToCrypto(child.name)
    if (crypto && !map[crypto]) map[crypto] = child.id.replace(/:/g, '-')
  }
  const full = map as Record<CryptoType, string>
  cryptoNodeCache.set(containerNodeId, full)
  return full
}

/** Export image from Figma using official API (requires FIGMA_ACCESS_TOKEN for private files) */
async function fetchFigmaImage(nodeId: string, format: 'svg' | 'png'): Promise<ArrayBuffer | null> {
  const token = process.env.FIGMA_ACCESS_TOKEN
  const idForApi = toFigmaId(nodeId)
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(idForApi)}&format=${format}`
  const res = await fetch(url, {
    headers: token ? { 'X-Figma-Token': token } : {},
  })
  if (!res.ok) return null

  const data = await res.json() as { images?: Record<string, string | null> }
  const imageUrl = data.images?.[idForApi]
  if (!imageUrl) return null

  const imgRes = await fetch(imageUrl)
  if (!imgRes.ok) return null
  return imgRes.arrayBuffer()
}

/**
 * API route to fetch asset images from Figma.
 * - nodeId: export that node (uses Figma REST API when FIGMA_ACCESS_TOKEN is set).
 * - crypto + containerNodeId: resolve crypto logo from design node 14331-1601 (requires token).
 * - assetId: legacy MCP-style URL (often 404 for private files).
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const assetId = searchParams.get('assetId')
  let nodeId = searchParams.get('nodeId')
  const crypto = searchParams.get('crypto') as CryptoType | null
  const containerNodeId = searchParams.get('containerNodeId') ?? FIGMA_CRYPTO_CONTAINER_NODE_ID

  if (crypto && ['BTC', 'MATIC', 'SHIB', 'USDT', 'KRW', 'USDC', 'MSQ'].includes(crypto)) {
    const nodeMap = await getCryptoNodeIds(containerNodeId)
    const resolvedId = nodeMap?.[crypto]
    if (resolvedId) nodeId = resolvedId
  }

  if (!assetId && !nodeId) {
    return NextResponse.json({ error: 'assetId, nodeId, or crypto is required' }, { status: 400 })
  }

  if (nodeId) {
    for (const format of ['svg', 'png'] as const) {
      const buf = await fetchFigmaImage(nodeId, format)
      if (buf) {
        const contentType = format === 'svg' ? 'image/svg+xml' : 'image/png'
        return new NextResponse(buf, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          },
        })
      }
    }
  }

  if (assetId) {
    const figmaAssetUrl = `https://www.figma.com/api/mcp/asset/${assetId}`
    try {
      const response = await fetch(figmaAssetUrl, {
        headers: { 'Accept': 'image/*', 'User-Agent': 'Mozilla/5.0 (compatible)' },
        redirect: 'follow',
      })
      if (response.ok) {
        const imageBuffer = await response.arrayBuffer()
        const contentType = response.headers.get('content-type') || 'image/png'
        return new NextResponse(imageBuffer, {
          headers: { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
        })
      }
    } catch {
      // ignore
    }
  }

  return NextResponse.json(
    { error: 'Failed to fetch image from Figma', assetId, nodeId, crypto },
    { status: 404 }
  )
}
