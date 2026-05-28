import * as sqlite from './store-sqlite.js'
import * as mongo from './store-mongo.js'

function useMongo() {
  return Boolean(process.env.MONGODB_URI?.trim())
}

let impl = sqlite
export let storeBackend = sqlite.name

export async function initStore() {
  impl = useMongo() ? mongo : sqlite
  storeBackend = impl.name
  if (useMongo()) await mongo.init()
  else await sqlite.init()
  console.log(`Database: ${impl.name}`)
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
