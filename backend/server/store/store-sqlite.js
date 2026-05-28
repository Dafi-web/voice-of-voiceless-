import db from '../db.js'

export const name = 'sqlite'

export async function init() {}

export function getSetting(key) {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key)
  return row?.value ?? null
}

export function setSetting(key, value) {
  db.prepare(
    `INSERT INTO settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
  ).run(key, value)
}

export function listGalleryPublished() {
  return db.prepare('SELECT * FROM gallery WHERE published = 1 ORDER BY created_at DESC').all()
}

export function listGalleryAll() {
  return db.prepare('SELECT * FROM gallery ORDER BY created_at DESC').all()
}

export function getGalleryById(id) {
  return db.prepare('SELECT * FROM gallery WHERE id = ?').get(id)
}

export function insertGallery(row) {
  db.prepare(
    `INSERT INTO gallery (id, type, src, caption, credit, link, is_article, published, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    row.id,
    row.type,
    row.src,
    row.caption,
    row.credit,
    row.link,
    row.is_article,
    row.published,
    row.created_at,
  )
}

export function updateGallery(id, fields) {
  const row = getGalleryById(id)
  if (!row) return null
  db.prepare(
    `UPDATE gallery SET
      published = COALESCE(?, published),
      caption = COALESCE(?, caption),
      credit = COALESCE(?, credit),
      link = COALESCE(?, link)
     WHERE id = ?`,
  ).run(
    fields.published !== undefined ? (fields.published ? 1 : 0) : null,
    fields.caption ?? null,
    fields.credit ?? null,
    fields.link ?? null,
    id,
  )
  return getGalleryById(id)
}

export function deleteGallery(id) {
  return db.prepare('DELETE FROM gallery WHERE id = ?').run(id).changes > 0
}

export function listCommentsApproved(galleryId) {
  return db
    .prepare(
      `SELECT * FROM comments WHERE gallery_id = ? AND status = 'approved' ORDER BY created_at DESC`,
    )
    .all(galleryId)
}

export function listCommentsAll() {
  return db
    .prepare(
      `SELECT c.*, g.caption as gallery_caption FROM comments c
       LEFT JOIN gallery g ON g.id = c.gallery_id
       ORDER BY c.created_at DESC`,
    )
    .all()
}

export function insertComment(row) {
  db.prepare(
    `INSERT INTO comments (id, gallery_id, name, text, status, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(row.id, row.gallery_id, row.name, row.text, row.status, row.created_at)
}

export function updateCommentStatus(id, status) {
  return db.prepare('UPDATE comments SET status = ? WHERE id = ?').run(status, id).changes > 0
}

export function deleteComment(id) {
  return db.prepare('DELETE FROM comments WHERE id = ?').run(id).changes > 0
}

export function listMessagesAll() {
  return db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all()
}

export function insertMessage(row) {
  db.prepare(
    `INSERT INTO messages (id, name, email, subject, body, type, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    row.id,
    row.name,
    row.email,
    row.subject,
    row.body,
    row.type,
    row.status,
    row.created_at,
  )
}

export function updateMessageStatus(id, status) {
  return db.prepare('UPDATE messages SET status = ? WHERE id = ?').run(status, id).changes > 0
}

export function deleteMessage(id) {
  return db.prepare('DELETE FROM messages WHERE id = ?').run(id).changes > 0
}

export function getStats() {
  return {
    pendingComments: db
      .prepare(`SELECT COUNT(*) as c FROM comments WHERE status = 'pending'`)
      .get().c,
    pendingMessages: db
      .prepare(`SELECT COUNT(*) as c FROM messages WHERE status = 'pending'`)
      .get().c,
    galleryCount: db.prepare(`SELECT COUNT(*) as c FROM gallery`).get().c,
  }
}

export function countGallery() {
  return db.prepare('SELECT COUNT(*) as c FROM gallery').get().c
}
