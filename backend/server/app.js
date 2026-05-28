import express from 'express'
import cors from 'cors'
import { createCorsOptions } from './cors.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import db from './db.js'
import { uploadsDir, isServerless, ensureDirs, frontendDist } from './paths.js'
import { seedGalleryIfEmpty, randomUUID } from './seed.js'
import { verifyPassword, signToken, authMiddleware, changePassword } from './auth.js'

ensureDirs()

seedGalleryIfEmpty()

const app = express()

app.use(cors(createCorsOptions()))
app.use(express.json())
app.use('/uploads', express.static(uploadsDir))

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.bin'
    cb(null, `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok =
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/') ||
      file.fieldname === 'file'
    cb(ok ? null : new Error('Only images and videos allowed'), ok)
  },
})

function rowToGallery(row) {
  if (!row) return null
  return {
    id: row.id,
    type: row.type,
    src: row.src,
    caption: row.caption,
    credit: row.credit,
    link: row.link,
    isArticle: !!row.is_article,
    published: !!row.published,
    createdAt: row.created_at,
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'beyond-silence-api' })
})

app.post('/api/auth/login', (req, res) => {
  const { password } = req.body
  if (!verifyPassword(password)) {
    return res.status(401).json({ error: 'Wrong password' })
  }
  res.json({ token: signToken() })
})

app.get('/api/auth/check', authMiddleware, (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/auth/change-password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body
  const result = changePassword(currentPassword, newPassword)
  if (!result.ok) {
    return res.status(400).json({ error: result.error })
  }
  res.json({ message: 'Password updated successfully' })
})

app.get('/api/gallery', (_req, res) => {
  const rows = db
    .prepare('SELECT * FROM gallery WHERE published = 1 ORDER BY created_at DESC')
    .all()
  res.json(rows.map(rowToGallery))
})

app.get('/api/gallery/all', authMiddleware, (_req, res) => {
  const rows = db.prepare('SELECT * FROM gallery ORDER BY created_at DESC').all()
  res.json(rows.map(rowToGallery))
})

app.post('/api/gallery', authMiddleware, upload.single('file'), (req, res) => {
  try {
    const { caption, credit, link, type, published } = req.body
    const id = randomUUID()
    let src = req.body.src || ''

    if (req.file) {
      const isVideo = req.file.mimetype.startsWith('video/')
      src = `/uploads/${req.file.filename}`
      if (!type && isVideo) req.body.type = 'video'
    }

    if (!src || !caption) {
      return res.status(400).json({ error: 'File or URL and caption are required' })
    }

    const mediaType = type || (src.match(/\.(mp4|webm|mov|ogg)$/i) ? 'video' : 'image')

    db.prepare(
      `INSERT INTO gallery (id, type, src, caption, credit, link, is_article, published, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)`,
    ).run(
      id,
      mediaType,
      src,
      caption,
      credit || '',
      link || '',
      published === 'false' || published === false ? 0 : 1,
      new Date().toISOString(),
    )

    const row = db.prepare('SELECT * FROM gallery WHERE id = ?').get(id)
    res.status(201).json(rowToGallery(row))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.patch('/api/gallery/:id', authMiddleware, (req, res) => {
  const { published, caption, credit, link } = req.body
  const row = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Not found' })

  db.prepare(
    `UPDATE gallery SET
      published = COALESCE(?, published),
      caption = COALESCE(?, caption),
      credit = COALESCE(?, credit),
      link = COALESCE(?, link)
     WHERE id = ?`,
  ).run(
    published !== undefined ? (published ? 1 : 0) : null,
    caption ?? null,
    credit ?? null,
    link ?? null,
    req.params.id,
  )

  res.json(rowToGallery(db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id)))
})

app.delete('/api/gallery/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

app.get('/api/comments/:galleryId', (req, res) => {
  const rows = db
    .prepare(
      `SELECT * FROM comments WHERE gallery_id = ? AND status = 'approved' ORDER BY created_at DESC`,
    )
    .all(req.params.galleryId)
  res.json(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      text: r.text,
      date: r.created_at,
    })),
  )
})

app.post('/api/comments', (req, res) => {
  const { galleryId, name, text } = req.body
  if (!galleryId || !text?.trim()) {
    return res.status(400).json({ error: 'galleryId and text required' })
  }
  const gallery = db.prepare('SELECT id FROM gallery WHERE id = ?').get(galleryId)
  if (!gallery) return res.status(404).json({ error: 'Gallery item not found' })

  const id = randomUUID()
  const created_at = new Date().toISOString()
  db.prepare(
    `INSERT INTO comments (id, gallery_id, name, text, status, created_at) VALUES (?, ?, ?, ?, 'pending', ?)`,
  ).run(id, galleryId, (name || 'Anonymous').trim(), text.trim(), created_at)

  res.status(201).json({
    id,
    message: 'Comment submitted for review. Thank you.',
    pending: true,
  })
})

function listAllComments(_req, res) {
  const rows = db
    .prepare(
      `SELECT c.*, g.caption as gallery_caption FROM comments c
       LEFT JOIN gallery g ON g.id = c.gallery_id
       ORDER BY c.created_at DESC`,
    )
    .all()
  res.json(rows)
}

app.get('/api/admin/comments', authMiddleware, listAllComments)
app.get('/api/comments', authMiddleware, listAllComments)

app.patch('/api/comments/:id', authMiddleware, (req, res) => {
  const { status } = req.body
  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  db.prepare('UPDATE comments SET status = ? WHERE id = ?').run(status, req.params.id)
  res.json({ ok: true })
})

app.delete('/api/comments/:id', authMiddleware, (req, res) => {
  const result = db.prepare('DELETE FROM comments WHERE id = ?').run(req.params.id)
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

app.post('/api/messages', (req, res) => {
  const { name, email, subject, body, type } = req.body
  if (!name?.trim() || !subject?.trim() || !body?.trim()) {
    return res.status(400).json({ error: 'Name, subject, and message are required' })
  }
  const allowedTypes = ['contact', 'request', 'story', 'evidence']
  const msgType = allowedTypes.includes(type) ? type : 'contact'
  const id = randomUUID()
  db.prepare(
    `INSERT INTO messages (id, name, email, subject, body, type, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)`,
  ).run(
    id,
    name.trim(),
    (email || 'not-provided@anonymous.local').trim(),
    subject.trim(),
    body.trim(),
    msgType,
    new Date().toISOString(),
  )
  res.status(201).json({ id, message: 'Your message was sent. We will respond soon.' })
})

function listAllMessages(_req, res) {
  const rows = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all()
  res.json(rows)
}

app.get('/api/admin/messages', authMiddleware, listAllMessages)
app.get('/api/messages', authMiddleware, listAllMessages)

app.patch('/api/messages/:id', authMiddleware, (req, res) => {
  const { status } = req.body
  if (!['pending', 'accepted', 'rejected', 'read'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  db.prepare('UPDATE messages SET status = ? WHERE id = ?').run(status, req.params.id)
  res.json({ ok: true })
})

app.delete('/api/messages/:id', authMiddleware, (req, res) => {
  const result = db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id)
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

app.get('/api/admin/stats', authMiddleware, (_req, res) => {
  const pendingComments = db
    .prepare(`SELECT COUNT(*) as c FROM comments WHERE status = 'pending'`)
    .get().c
  const pendingMessages = db
    .prepare(`SELECT COUNT(*) as c FROM messages WHERE status = 'pending'`)
    .get().c
  const galleryCount = db.prepare(`SELECT COUNT(*) as c FROM gallery`).get().c
  res.json({ pendingComments, pendingMessages, galleryCount })
})

if (fs.existsSync(frontendDist) && !isServerless) {
  app.use(express.static(frontendDist))
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'))
  })
}

export default app
