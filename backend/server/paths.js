import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Backend project root (folder that contains package.json) */
export const root = path.join(__dirname, '..')

/** Built React app — run `npm run build` in frontend/ first */
export const frontendDist = path.join(root, '..', 'frontend', 'dist')

export const isServerless = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)

export const dataDir = process.env.DATA_DIR || path.join(root, 'data')
export const uploadsDir =
  process.env.UPLOADS_DIR || (isServerless ? '/tmp/uploads' : path.join(dataDir, 'uploads'))
export const dbPath = isServerless ? '/tmp/site.db' : path.join(dataDir, 'site.db')

export function ensureDirs() {
  if (!isServerless && !fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
}
