import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const frontendRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = path.join(frontendRoot, '..')
const apiBase = (process.env.VITE_API_URL || '').replace(/\/$/, '')

const rewrites = []
if (apiBase) {
  rewrites.push(
    { source: '/api/:path*', destination: `${apiBase}/api/:path*` },
    { source: '/uploads/:path*', destination: `${apiBase}/uploads/:path*` },
  )
  console.log(`vercel.json: proxy /api and /uploads → ${apiBase}`)
} else if (process.env.VERCEL) {
  console.warn(
    'WARNING: VITE_API_URL is not set. /api on Vercel will return 405. Add VITE_API_URL=https://your-app.onrender.com in Vercel env vars and redeploy.',
  )
}

rewrites.push({ source: '/(.*)', destination: '/index.html' })

// Deploy with Root Directory = frontend (recommended)
fs.writeFileSync(
  path.join(frontendRoot, 'vercel.json'),
  `${JSON.stringify(
    {
      buildCommand: 'npm run build',
      outputDirectory: 'dist',
      framework: 'vite',
      rewrites,
    },
    null,
    2,
  )}\n`,
)

// Deploy from repo root (Output Directory must be frontend/dist)
fs.writeFileSync(
  path.join(repoRoot, 'vercel.json'),
  `${JSON.stringify(
    {
      installCommand: 'npm install --prefix frontend',
      buildCommand: 'npm run build --prefix frontend',
      outputDirectory: 'frontend/dist',
      framework: 'vite',
      rewrites,
    },
    null,
    2,
  )}\n`,
)
