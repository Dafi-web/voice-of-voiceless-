import Database from 'better-sqlite3'
import fs from 'fs'
import * as mongo from './store-mongo.js'

/** Copy existing SQLite data into MongoDB when Atlas is newly connected. */
export async function migrateSqliteToMongoIfNeeded(sqlitePath) {
  if (!fs.existsSync(sqlitePath)) return

  const galleryCount = await mongo.countGallery()
  if (galleryCount > 0) return

  const sqlite = new Database(sqlitePath, { readonly: true })
  try {
    const gallery = sqlite.prepare('SELECT * FROM gallery').all()
    const comments = sqlite.prepare('SELECT * FROM comments').all()
    const messages = sqlite.prepare('SELECT * FROM messages').all()
    const settings = sqlite.prepare('SELECT * FROM settings').all()

    if (gallery.length === 0 && comments.length === 0 && messages.length === 0) return

    for (const row of gallery) {
      await mongo.insertGallery(row)
    }
    for (const row of comments) {
      await mongo.insertComment(row)
    }
    for (const row of messages) {
      await mongo.insertMessage(row)
    }
    for (const row of settings) {
      await mongo.setSetting(row.key, row.value)
    }

    console.log(
      `Migrated SQLite → MongoDB: ${gallery.length} gallery, ${comments.length} comments, ${messages.length} messages`,
    )
  } finally {
    sqlite.close()
  }
}
