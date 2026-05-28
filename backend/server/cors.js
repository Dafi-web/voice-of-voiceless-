/**
 * CORS for split deploy (Vercel + Render).
 * ALLOWED_ORIGIN or ALLOWED_ORIGINS: comma-separated full origins, e.g.
 *   https://voice-of-voiceless-smoky.vercel.app,https://www.example.org
 * ALLOW_VERCEL_PREVIEWS=true — allow any https://*.vercel.app (preview deploys)
 */
export function createCorsOptions() {
  const raw = process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGIN || ''
  const allowList = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const allowVercelPreviews =
    process.env.ALLOW_VERCEL_PREVIEWS === 'true' ||
    (process.env.ALLOW_VERCEL_PREVIEWS !== 'false' && process.env.NODE_ENV === 'production')

  if (allowList.length === 0 && !allowVercelPreviews) {
    return { origin: true, credentials: true }
  }

  const vercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i

  return {
    credentials: true,
    origin(origin, callback) {
      if (!origin) return callback(null, true)
      if (allowList.includes(origin)) return callback(null, true)
      if (allowVercelPreviews && vercelPreview.test(origin)) return callback(null, true)
      callback(new Error(`CORS blocked: ${origin}`))
    },
  }
}
