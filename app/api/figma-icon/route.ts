import { NextRequest, NextResponse } from 'next/server'

const FILE_KEY = 'kPnax7i9sQ1P4jFUSgAQnV'

/** Normalize node ID for Figma API (ids param uses colon) */
function toFigmaId(id: string): string {
  return id.includes(':') ? id : id.replace(/-/g, ':')
}

/**
 * API route to fetch icon SVGs from Figma.
 * Uses FIGMA_ACCESS_TOKEN for private files; falls back to public URL when no token.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const nodeId = searchParams.get('nodeId')

  if (!nodeId) {
    return NextResponse.json({ error: 'nodeId is required' }, { status: 400 })
  }

  const token = process.env.FIGMA_ACCESS_TOKEN
  const idForApi = toFigmaId(nodeId)

  try {
    if (token) {
      // Official Figma API (works for private files)
      const imagesUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(idForApi)}&format=svg`
      const imagesRes = await fetch(imagesUrl, {
        headers: { 'X-Figma-Token': token, Accept: 'application/json' },
      })
      if (!imagesRes.ok) {
        throw new Error(`Figma API ${imagesRes.status}`)
      }
      const data = (await imagesRes.json()) as { images?: Record<string, string | null> }
      const imageUrl = data.images?.[idForApi]
      if (!imageUrl) {
        throw new Error('No image URL')
      }
      const svgRes = await fetch(imageUrl, { headers: { Accept: 'image/svg+xml' } })
      if (!svgRes.ok) {
        throw new Error('SVG fetch failed')
      }
      const svgContent = await svgRes.text()
      return new NextResponse(svgContent, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=3600',
        },
      })
    }

    // Fallback: public Figma file URL (no token)
    const nodeIdForUrl = nodeId.replace(':', '-')
    const figmaImageUrl = `https://www.figma.com/api/figma/file/${FILE_KEY}/images?ids=${nodeIdForUrl}&format=svg`
    const response = await fetch(figmaImageUrl, {
      headers: { Accept: 'image/svg+xml' },
    })
    if (!response.ok) {
      throw new Error(`Figma returned ${response.status}`)
    }
    const svgContent = await response.text()
    return new NextResponse(svgContent, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Error fetching Figma icon:', error)
    const placeholderSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/>
    </svg>`
    return new NextResponse(placeholderSvg, {
      headers: { 'Content-Type': 'image/svg+xml' },
      status: 200,
    })
  }
}
