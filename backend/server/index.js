import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const { initStore } = await import('./store/index.js')
const { seedGalleryIfEmpty } = await import('./seed.js')
const { default: app } = await import('./app.js')

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
