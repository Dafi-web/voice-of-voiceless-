import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { initStore } from './store/index.js'
import { seedGalleryIfEmpty } from './seed.js'
import app from './app.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const PORT = process.env.PORT || 3001

try {
  await initStore()
  await seedGalleryIfEmpty()
  app.listen(PORT, () => {
    console.log(`API server http://localhost:${PORT}`)
  })
} catch (err) {
  console.error('Failed to start server:', err.message)
  process.exit(1)
}
