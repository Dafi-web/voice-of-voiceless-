import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const root = path.join(__dirname, '..')

export const isServerless = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)

/** On Render: set DATA_DIR to mounted disk path, e.g. /opt/render/project/src/data */
export const dataDir = process.env.DATA_DIR || path.join(root, 'data')
export const uploadsDir =
  process.env.UPLOADS_DIR || (isServerless ? '/tmp/uploads' : path.join(dataDir, 'uploads'))
export const dbPath = isServerless ? '/tmp/site.db' : path.join(dataDir, 'site.db')

export function ensureDirs() {
  if (!isServerless) {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
}
