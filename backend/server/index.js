import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const { initStore, storeBackend } = await import('./store/index.js')
const { seedGalleryIfEmpty } = await import('./seed.js')
const { default: app } = await import('./app.js')
const { dataDir } = await import('./paths.js')
const { dbPath } = await import('./db.js')

const PORT = process.env.PORT || 3001

try {
  await initStore()
  if (process.env.NODE_ENV === 'production' && storeBackend === 'sqlite') {
    console.log(`SQLite data: ${dbPath}`)
    if (!process.env.MONGODB_URI?.trim()) {
      console.warn(
        'WARNING: MONGODB_URI is not set. Set it on Render for permanent storage, or attach a persistent disk to DATA_DIR.',
      )
    }
    try {
      fs.accessSync(dataDir, fs.constants.W_OK)
    } catch {
      console.error(`ERROR: DATA_DIR is not writable: ${dataDir}`)
    }
  }
  await seedGalleryIfEmpty()
  app.listen(PORT, () => {
    console.log(`API server http://localhost:${PORT}`)
  })
} catch (err) {
  console.error('Failed to start server:', err.message)
  process.exit(1)
}
