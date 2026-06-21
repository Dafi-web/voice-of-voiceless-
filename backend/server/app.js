import express from 'express'
import cors from 'cors'
import { createCorsOptions } from './cors.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { uploadsDir, isServerless, ensureDirs, frontendDist, dataDir } from './paths.js'
import { dbPath } from './db.js'
import { randomUUID } from './seed.js'
import { verifyPassword, signToken, authMiddleware, changePassword } from './auth.js'
import { store, storeBackend, mongoConfigured, mongoError } from './store/index.js'
import { mongoEnvVarName } from './store/mongo-env.js'
import {
  isCloudStorageEnabled,
  cloudStorageBackend,
  cloudStorageHint,
  saveUploadedFile,
  localUploadUrl,
} from './storage/media-cloud.js'

ensureDirs()

const app = express()

app.use(cors(createCorsOptions()))
app.use(express.json())
app.use('/uploads', express.static(uploadsDir))

const diskStorage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.bin'
    cb(null, `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`)
  },
})

const uploadStorage = isCloudStorageEnabled() ? multer.memoryStorage() : diskStorage

async function mediaSrcFromFile(file) {
  if (!file) return ''
  if (isCloudStorageEnabled()) {
    return saveUploadedFile(file)
  }
  return localUploadUrl(file.filename)
}

const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok =
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/') ||
      file.fieldname === 'file'
    cb(ok ? null : new Error('Only images and videos allowed'), ok)
  },
})

const evidenceUpload = multer({
  storage: uploadStorage,
  limits: { fileSize: 50 * 1024 * 1024, files: 5 },
  fileFilter: (_req, file, cb) => {
    const ok =
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/') ||
      file.mimetype.startsWith('audio/') ||
      file.mimetype === 'application/pdf' ||
      file.mimetype.startsWith('text/') ||
      file.mimetype.includes('document') ||
      file.mimetype.includes('officedocument') ||
      file.mimetype === 'application/octet-stream'
    cb(ok ? null : new Error('File type not allowed for evidence upload'), ok)
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
    isArticle: !!(row.is_article ?? row.isArticle),
    published: !!(row.published),
    createdAt: row.created_at,
  }
}

app.get('/api/health', (_req, res) => {
  const usingMongo = storeBackend === 'mongodb'
  res.json({
    ok: true,
    service: 'beyond-silence-api',
    database: storeBackend,
    mongoConfigured,
    mongoConnected: usingMongo,
    mongoError: mongoError || undefined,
    dataDir,
    dbPath: storeBackend === 'sqlite' ? dbPath : undefined,
    persistentStorage: usingMongo || Boolean(process.env.DATA_DIR),
    mediaStorage: cloudStorageBackend(),
    mediaStorageHint: cloudStorageHint(),
    storageHint: usingMongo
      ? 'Data is stored in MongoDB Atlas (database: beyond-silence).'
      : mongoConfigured
        ? `MongoDB connection failed — using SQLite at ${dbPath}. Check your connection string on Render.`
        : `Set MONGODB_URI or MONGO_URL on Render — data is saved to SQLite only (${dbPath}), not MongoDB Atlas.`,
    mongoEnvVar: mongoEnvVarName(),
  })
})

app.post('/api/auth/login', async (req, res) => {
  const { password } = req.body
  if (!(await verifyPassword(password))) {
    return res.status(401).json({ error: 'Wrong password' })
  }
  res.json({ token: signToken() })
})

app.get('/api/auth/check', authMiddleware, (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/auth/change-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body
  const result = await changePassword(currentPassword, newPassword)
  if (!result.ok) {
    return res.status(400).json({ error: result.error })
  }
  res.json({ message: 'Password updated successfully' })
})

app.get('/api/gallery', async (_req, res) => {
  const rows = await store.listGalleryPublished()
  res.json(rows.map(rowToGallery))
})

app.get('/api/gallery/all', authMiddleware, async (_req, res) => {
  const rows = await store.listGalleryAll()
  res.json(rows.map(rowToGallery))
})

app.post('/api/gallery', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { caption, credit, link, type, published } = req.body
    const id = randomUUID()
    let src = req.body.src || ''

    if (req.file) {
      const isVideo = req.file.mimetype.startsWith('video/')
      src = await mediaSrcFromFile(req.file)
      if (!type && isVideo) req.body.type = 'video'
    }

    if (!src || !caption) {
      return res.status(400).json({ error: 'File or URL and caption are required' })
    }

    const mediaType = type || (src.match(/\.(mp4|webm|mov|ogg)$/i) ? 'video' : 'image')

    await store.insertGallery({
      id,
      type: mediaType,
      src,
      caption,
      credit: credit || '',
      link: link || '',
      is_article: 0,
      published: published === 'false' || published === false ? 0 : 1,
      created_at: new Date().toISOString(),
    })

    const row = await store.getGalleryById(id)
    res.status(201).json(rowToGallery(row))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.patch('/api/gallery/:id', authMiddleware, async (req, res) => {
  const { published, caption, credit, link } = req.body
  const row = await store.updateGallery(req.params.id, { published, caption, credit, link })
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(rowToGallery(row))
})

app.delete('/api/gallery/:id', authMiddleware, async (req, res) => {
  const ok = await store.deleteGallery(req.params.id)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

app.post('/api/admin/gallery/publish', authMiddleware, async (req, res) => {
  try {
    const { src, caption, credit, link, published } = req.body
    const isLocalUpload = src?.startsWith('/uploads/')
    const isCloudUrl = /^https?:\/\//i.test(src || '')
    if (!isLocalUpload && !isCloudUrl) {
      return res.status(400).json({ error: 'File path must be an uploaded file or public URL' })
    }
    if (!caption?.trim()) {
      return res.status(400).json({ error: 'Caption is required' })
    }

    const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(src) || req.body.type === 'video'
    const id = randomUUID()
    const isPublic = published !== false && published !== 'false'

    await store.insertGallery({
      id,
      type: isVideo ? 'video' : 'image',
      src,
      caption: caption.trim(),
      credit: (credit || '').trim(),
      link: (link || '').trim(),
      is_article: 0,
      published: isPublic ? 1 : 0,
      created_at: new Date().toISOString(),
    })

    const row = await store.getGalleryById(id)
    res.status(201).json(rowToGallery(row))
  } catch (e) {
    res.status(500).json({ error: e.message || 'Could not publish to gallery' })
  }
})

app.get('/api/comments/:galleryId', async (req, res) => {
  const rows = await store.listCommentsApproved(req.params.galleryId)
  res.json(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      text: r.text,
      date: r.created_at,
    })),
  )
})

app.post('/api/comments', async (req, res) => {
  try {
    const { galleryId, name, text } = req.body
    if (!galleryId || !text?.trim()) {
      return res.status(400).json({ error: 'galleryId and text required' })
    }
    const gallery = await store.getGalleryById(galleryId)
    if (!gallery) return res.status(404).json({ error: 'Gallery item not found' })

    const id = randomUUID()
    const created_at = new Date().toISOString()
    await store.insertComment({
      id,
      gallery_id: galleryId,
      name: (name || 'Anonymous').trim(),
      text: text.trim(),
      status: 'approved',
      created_at,
    })

    res.status(201).json({
      id,
      message: 'Comment posted.',
      pending: false,
      comment: {
        id,
        name: (name || 'Anonymous').trim(),
        text: text.trim(),
        date: created_at,
      },
    })
  } catch (e) {
    res.status(500).json({ error: e.message || 'Could not save comment' })
  }
})

app.post('/api/admin/comments', authMiddleware, async (req, res) => {
  try {
    const { galleryId, name, text, status } = req.body
    if (!galleryId || !text?.trim()) {
      return res.status(400).json({ error: 'Gallery item and comment text are required' })
    }
    const gallery = await store.getGalleryById(galleryId)
    if (!gallery) return res.status(404).json({ error: 'Gallery item not found' })

    const commentStatus = status === 'pending' ? 'pending' : 'approved'
    const id = randomUUID()
    const created_at = new Date().toISOString()
    await store.insertComment({
      id,
      gallery_id: galleryId,
      name: (name || 'Beyond Silence').trim(),
      text: text.trim(),
      status: commentStatus,
      created_at,
    })

    res.status(201).json({
      id,
      status: commentStatus,
      message: commentStatus === 'approved' ? 'Comment published on gallery.' : 'Comment saved as pending.',
      comment: {
        id,
        name: (name || 'Beyond Silence').trim(),
        text: text.trim(),
        date: created_at,
      },
    })
  } catch (e) {
    res.status(500).json({ error: e.message || 'Could not save comment' })
  }
})

async function listAllComments(_req, res) {
  const rows = await store.listCommentsAll()
  res.json(rows)
}

app.get('/api/admin/comments', authMiddleware, listAllComments)
app.get('/api/comments', authMiddleware, listAllComments)

app.patch('/api/comments/:id', authMiddleware, async (req, res) => {
  const { status } = req.body
  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  const ok = await store.updateCommentStatus(req.params.id, status)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

app.delete('/api/comments/:id', authMiddleware, async (req, res) => {
  const ok = await store.deleteComment(req.params.id)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

app.post('/api/evidence', (req, res, next) => {
  evidenceUpload.array('files', 5)(req, res, (err) => {
    if (err) {
      const msg =
        err.code === 'LIMIT_FILE_SIZE'
          ? 'Each file must be 50 MB or smaller'
          : err.message || 'Upload failed'
      return res.status(400).json({ error: msg })
    }
    next()
  })
}, async (req, res) => {
  try {
    const evidenceType = (req.body.evidenceType || 'Other').toString().trim()
    const description = (req.body.description || '').toString().trim()
    const contact = (req.body.contact || '').toString().trim()
    const fileNotes = (req.body.fileNotes || '').toString().trim()

    if (!description) {
      return res.status(400).json({ error: 'Description is required' })
    }

    const uploaded = await Promise.all((req.files || []).map((f) => mediaSrcFromFile(f)))
    const bodyParts = [
      description,
      fileNotes && `Notes about files:\n${fileNotes}`,
      uploaded.length > 0 && `Uploaded files:\n${uploaded.join('\n')}`,
    ].filter(Boolean)

    const id = randomUUID()
    await store.insertMessage({
      id,
      name: contact ? 'Evidence submitter' : 'Anonymous',
      email: contact || 'anonymous@beyond-silence.local',
      subject: `Evidence submission: ${evidenceType}`,
      body: bodyParts.join('\n\n'),
      type: 'evidence',
      status: 'pending',
      created_at: new Date().toISOString(),
    })

    res.status(201).json({
      id,
      message: uploaded.length
        ? `Evidence received with ${uploaded.length} file(s). Thank you.`
        : 'Evidence received. Thank you.',
      files: uploaded,
    })
  } catch (e) {
    res.status(500).json({ error: e.message || 'Could not save evidence' })
  }
})

app.post('/api/messages', async (req, res) => {
  const { name, email, subject, body, type } = req.body
  if (!name?.trim() || !subject?.trim() || !body?.trim()) {
    return res.status(400).json({ error: 'Name, subject, and message are required' })
  }
  const allowedTypes = ['contact', 'request', 'story', 'evidence']
  const msgType = allowedTypes.includes(type) ? type : 'contact'
  const id = randomUUID()
  await store.insertMessage({
    id,
    name: name.trim(),
    email: (email || 'not-provided@anonymous.local').trim(),
    subject: subject.trim(),
    body: body.trim(),
    type: msgType,
    status: 'pending',
    created_at: new Date().toISOString(),
  })
  res.status(201).json({ id, message: 'Your message was sent. We will respond soon.' })
})

async function listAllMessages(_req, res) {
  const rows = await store.listMessagesAll()
  res.json(rows)
}

app.get('/api/admin/messages', authMiddleware, listAllMessages)
app.get('/api/messages', authMiddleware, listAllMessages)

app.patch('/api/messages/:id', authMiddleware, async (req, res) => {
  const { status } = req.body
  if (!['pending', 'accepted', 'rejected', 'read'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  const ok = await store.updateMessageStatus(req.params.id, status)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

app.delete('/api/messages/:id', authMiddleware, async (req, res) => {
  const ok = await store.deleteMessage(req.params.id)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

app.get('/api/admin/stats', authMiddleware, async (_req, res) => {
  res.json(await store.getStats())
})

if (fs.existsSync(frontendDist) && !isServerless) {
  app.use(express.static(frontendDist))
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'))
  })
}

export default app
