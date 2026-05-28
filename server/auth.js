import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from './db.js'

const SECRET = process.env.JWT_SECRET || 'beyond-silence-dev-secret-change-in-production'
const ENV_PASSWORD = process.env.ADMIN_PASSWORD || 'rahwa2026'
const HASH_KEY = 'admin_password_hash'

function getStoredHash() {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(HASH_KEY)
  return row?.value || null
}

export function verifyPassword(password) {
  const hash = getStoredHash()
  if (hash) {
    return bcrypt.compareSync(password, hash)
  }
  return password === ENV_PASSWORD
}

export async function changePassword(currentPassword, newPassword) {
  if (!verifyPassword(currentPassword)) {
    return { ok: false, error: 'Current password is wrong' }
  }
  if (!newPassword || newPassword.length < 6) {
    return { ok: false, error: 'New password must be at least 6 characters' }
  }
  const hash = bcrypt.hashSync(newPassword, 10)
  db.prepare(
    `INSERT INTO settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
  ).run(HASH_KEY, hash)
  return { ok: true }
}

export function signToken() {
  return jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '7d' })
}

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const token = header.slice(7)
    jwt.verify(token, SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
