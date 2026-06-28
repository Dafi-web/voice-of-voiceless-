import * as sqlite from './store-sqlite.js'
import * as mongo from './store-mongo.js'
import { dbPath } from '../db.js'
import { migrateSqliteToMongoIfNeeded } from './migrate-sqlite-to-mongo.js'

import { getMongoUri } from './mongo-env.js'

function useMongo() {
  return Boolean(getMongoUri())
}

let impl = sqlite
export let storeBackend = sqlite.name
export let mongoConfigured = false
export let mongoError = null

export async function initStore() {
  mongoConfigured = useMongo()
  mongoError = null

  if (mongoConfigured) {
    try {
      await mongo.init()
      await migrateSqliteToMongoIfNeeded(dbPath)
      impl = mongo
      storeBackend = mongo.name
      console.log(`Database: ${impl.name}`)
      return
    } catch (err) {
      mongoError = err.message
      console.error('MongoDB connection failed:', err.message)
      console.error(
        'Check: (1) password @ encoded as %40, (2) Atlas Network Access allows 0.0.0.0/0, (3) user/password correct.',
      )
      console.error('Starting with SQLite fallback so the site stays online.')
    }
  }

  impl = sqlite
  storeBackend = sqlite.name
  await sqlite.init()
  console.log(`Database: ${impl.name}${mongoConfigured ? ' (MongoDB fallback)' : ''}`)
}

async function call(fn, ...args) {
  return fn(...args)
}

export const store = {
  getSetting: (...a) => call(impl.getSetting, ...a),
  setSetting: (...a) => call(impl.setSetting, ...a),
  listGalleryPublished: (...a) => call(impl.listGalleryPublished, ...a),
  listGalleryAll: (...a) => call(impl.listGalleryAll, ...a),
  getGalleryById: (...a) => call(impl.getGalleryById, ...a),
  insertGallery: (...a) => call(impl.insertGallery, ...a),
  updateGallery: (...a) => call(impl.updateGallery, ...a),
  deleteGallery: (...a) => call(impl.deleteGallery, ...a),
  listCommentsApproved: (...a) => call(impl.listCommentsApproved, ...a),
  listCommentsApprovedAll: (...a) => call(impl.listCommentsApprovedAll, ...a),
  listCommentsAll: (...a) => call(impl.listCommentsAll, ...a),
  insertComment: (...a) => call(impl.insertComment, ...a),
  updateCommentStatus: (...a) => call(impl.updateCommentStatus, ...a),
  deleteComment: (...a) => call(impl.deleteComment, ...a),
  listMessagesAll: (...a) => call(impl.listMessagesAll, ...a),
  insertMessage: (...a) => call(impl.insertMessage, ...a),
  updateMessageStatus: (...a) => call(impl.updateMessageStatus, ...a),
  deleteMessage: (...a) => call(impl.deleteMessage, ...a),
  getStats: (...a) => call(impl.getStats, ...a),
  countGallery: (...a) => call(impl.countGallery, ...a),
}
