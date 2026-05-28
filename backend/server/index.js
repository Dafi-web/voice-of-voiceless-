import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import app from './app.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`API server http://localhost:${PORT}`)
})
