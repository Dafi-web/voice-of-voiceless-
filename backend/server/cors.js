/**
 * CORS for split deploy (Vercel + Render).
 *
 * ALLOWED_ORIGINS / ALLOWED_ORIGIN — comma-separated origins
 * SITE_URL — comma-separated public site URLs (also allowed), e.g.
 *   https://www.beyondsilence.community,https://beyondsilence.community
 * ALLOW_VERCEL_PREVIEWS — allow https://*.vercel.app (default true in production)
 */
export function createCorsOptions() {
  const raw = process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGIN || ''
  const allowList = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const siteUrls = (process.env.SITE_URL || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const allowed = new Set([...allowList, ...siteUrls])

  const allowVercelPreviews =
    process.env.ALLOW_VERCEL_PREVIEWS === 'true' ||
    (process.env.ALLOW_VERCEL_PREVIEWS !== 'false' && process.env.NODE_ENV === 'production')

  if (allowed.size === 0 && !allowVercelPreviews) {
    return { origin: true, credentials: true }
  }

  const vercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i

  return {
    credentials: true,
    origin(origin, callback) {
      if (!origin) return callback(null, true)
      if (allowed.has(origin)) return callback(null, true)
      if (allowVercelPreviews && vercelPreview.test(origin)) return callback(null, true)
      // Deny without throwing — Error() breaks OPTIONS preflight with HTTP 500
      callback(null, false)
    },
  }
}
