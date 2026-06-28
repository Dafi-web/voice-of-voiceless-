import { MongoClient } from 'mongodb'
import { checkMongoUri, withDatabase } from './mongo-uri.js'
import { getMongoUri } from './mongo-env.js'

export const name = 'mongodb'

let client
let db

function col(name) {
  if (!db) throw new Error('MongoDB not connected')
  return db.collection(name)
}

export async function init() {
  const raw = getMongoUri()
  if (!raw) throw new Error('MONGODB_URI or MONGO_URL is required for MongoDB store')

  checkMongoUri(raw)
  const uri = withDatabase(raw)

  client = new MongoClient(uri, {
    family: 4,
    serverSelectionTimeoutMS: 20000,
    connectTimeoutMS: 20000,
  })
  await client.connect()
  db = client.db()

  await Promise.all([
    col('gallery').createIndex({ id: 1 }, { unique: true }),
    col('comments').createIndex({ id: 1 }, { unique: true }),
    col('comments').createIndex({ gallery_id: 1 }),
    col('messages').createIndex({ id: 1 }, { unique: true }),
    col('settings').createIndex({ key: 1 }, { unique: true }),
  ])

  console.log(`MongoDB connected (database: ${db.databaseName})`)
}

export async function getSetting(key) {
  const doc = await col('settings').findOne({ key })
  return doc?.value ?? null
}

export async function setSetting(key, value) {
  await col('settings').updateOne({ key }, { $set: { key, value } }, { upsert: true })
}

export async function listGalleryPublished() {
  return col('gallery')
    .find({ $or: [{ published: 1 }, { published: true }] })
    .sort({ created_at: -1 })
    .toArray()
}

export async function listGalleryAll() {
  return col('gallery').find().sort({ created_at: -1 }).toArray()
}

export async function getGalleryById(id) {
  return col('gallery').findOne({ id })
}

export async function insertGallery(row) {
  await col('gallery').insertOne(row)
}

export async function updateGallery(id, fields) {
  const $set = {}
  if (fields.published !== undefined) $set.published = fields.published ? 1 : 0
  if (fields.caption !== undefined) $set.caption = fields.caption
  if (fields.credit !== undefined) $set.credit = fields.credit
  if (fields.link !== undefined) $set.link = fields.link
  if (Object.keys($set).length === 0) return getGalleryById(id)
  await col('gallery').updateOne({ id }, { $set })
  return getGalleryById(id)
}

export async function deleteGallery(id) {
  const result = await col('gallery').deleteOne({ id })
  return result.deletedCount > 0
}

export async function listCommentsApproved(galleryId) {
  return col('comments')
    .find({ gallery_id: galleryId, status: 'approved' })
    .sort({ created_at: -1 })
    .toArray()
}

export async function listCommentsApprovedAll() {
  return col('comments').find({ status: 'approved' }).sort({ created_at: -1 }).toArray()
}

export async function listCommentsAll() {
  const comments = await col('comments').find().sort({ created_at: -1 }).toArray()
  const galleryIds = [...new Set(comments.map((c) => c.gallery_id))]
  const galleries = await col('gallery')
    .find({ id: { $in: galleryIds } })
    .project({ id: 1, caption: 1 })
    .toArray()
  const captions = Object.fromEntries(galleries.map((g) => [g.id, g.caption]))
  return comments.map((c) => ({ ...c, gallery_caption: captions[c.gallery_id] || null }))
}

export async function insertComment(row) {
  await col('comments').insertOne(row)
}

export async function updateCommentStatus(id, status) {
  const result = await col('comments').updateOne({ id }, { $set: { status } })
  return result.matchedCount > 0
}

export async function deleteComment(id) {
  const result = await col('comments').deleteOne({ id })
  return result.deletedCount > 0
}

export async function listMessagesAll() {
  return col('messages').find().sort({ created_at: -1 }).toArray()
}

export async function insertMessage(row) {
  await col('messages').insertOne(row)
}

export async function updateMessageStatus(id, status) {
  const result = await col('messages').updateOne({ id }, { $set: { status } })
  return result.matchedCount > 0
}

export async function deleteMessage(id) {
  const result = await col('messages').deleteOne({ id })
  return result.deletedCount > 0
}

export async function getStats() {
  const [pendingComments, pendingMessages, galleryCount] = await Promise.all([
    col('comments').countDocuments({ status: 'pending' }),
    col('messages').countDocuments({ status: 'pending' }),
    col('gallery').countDocuments(),
  ])
  return { pendingComments, pendingMessages, galleryCount }
}

export async function countGallery() {
  return col('gallery').countDocuments()
}
