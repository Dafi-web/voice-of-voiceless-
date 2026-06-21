/**
 * Optional cloud upload for gallery / evidence files.
 * When configured, files get a permanent public HTTPS URL instead of /uploads/ on Render disk.
 *
 * Cloudinary (easiest): set CLOUDINARY_URL=cloudinary://key:secret@cloud_name
 * Google Cloud Storage: set GCS_BUCKET + GCS_CREDENTIALS (JSON service account)
 */
import fs from 'fs'
import path from 'path'
import { randomUUID } from '../seed.js'

function cloudinaryConfigured() {
  return Boolean(process.env.CLOUDINARY_URL?.trim())
}

function gcsConfigured() {
  return Boolean(process.env.GCS_BUCKET?.trim())
}

export function isCloudStorageEnabled() {
  return cloudinaryConfigured() || gcsConfigured()
}

export function cloudStorageBackend() {
  if (cloudinaryConfigured()) return 'cloudinary'
  if (gcsConfigured()) return 'gcs'
  return 'local'
}

let cloudinaryClient = null
let gcsStorage = null

async function getCloudinary() {
  if (!cloudinaryClient) {
    const { v2 } = await import('cloudinary')
    v2.config({ secure: true })
    cloudinaryClient = v2
  }
  return cloudinaryClient
}

async function getGcsBucket() {
  if (!gcsStorage) {
    const { Storage } = await import('@google-cloud/storage')
    const options = {}
    if (process.env.GCS_PROJECT_ID) options.projectId = process.env.GCS_PROJECT_ID
    const credsJson = process.env.GCS_CREDENTIALS?.trim()
    if (credsJson) {
      options.credentials = JSON.parse(credsJson)
    }
    gcsStorage = new Storage(options).bucket(process.env.GCS_BUCKET.trim())
  }
  return gcsStorage
}

function extFromFile(file) {
  const fromName = path.extname(file.originalname || '')
  if (fromName) return fromName
  const mime = file.mimetype || ''
  if (mime.startsWith('video/')) return '.mp4'
  if (mime.startsWith('image/')) return '.jpg'
  if (mime === 'application/pdf') return '.pdf'
  return '.bin'
}

function objectKey(file) {
  const ext = extFromFile(file)
  return `gallery/${Date.now()}-${randomUUID().slice(0, 8)}${ext}`
}

async function uploadToCloudinary(file) {
  const cloudinary = await getCloudinary()
  const resourceType = file.mimetype?.startsWith('video/') ? 'video' : 'auto'

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'beyond-silence', resource_type: resourceType },
      (err, result) => {
        if (err) return reject(err)
        resolve(result.secure_url)
      },
    )
    stream.end(file.buffer)
  })
}

async function uploadToGcs(file) {
  const bucket = await getGcsBucket()
  const key = objectKey(file)
  const blob = bucket.file(key)
  await blob.save(file.buffer, {
    contentType: file.mimetype || 'application/octet-stream',
    resumable: false,
    metadata: { cacheControl: 'public, max-age=31536000' },
  })
  return `https://storage.googleapis.com/${bucket.name}/${key}`
}

/**
 * Upload a multer file (memory storage) and return a public URL.
 */
export async function saveUploadedFile(file) {
  if (!file?.buffer) {
    throw new Error('Cloud storage requires in-memory upload buffer')
  }
  if (cloudinaryConfigured()) {
    return uploadToCloudinary(file)
  }
  if (gcsConfigured()) {
    return uploadToGcs(file)
  }
  throw new Error('Cloud storage is not configured')
}

/**
 * After local disk save, optionally mirror to cloud (not used — cloud uses memory only).
 */
export function localUploadUrl(filename) {
  return `/uploads/${filename}`
}

export function cloudStorageHint() {
  const backend = cloudStorageBackend()
  if (backend === 'cloudinary') {
    return 'Uploads are stored on Cloudinary with public HTTPS URLs.'
  }
  if (backend === 'gcs') {
    return `Uploads are stored in GCS bucket "${process.env.GCS_BUCKET}" with public HTTPS URLs.`
  }
  return 'Uploads are stored on server disk (/uploads). Set CLOUDINARY_URL or GCS_BUCKET for permanent public URLs.'
}
