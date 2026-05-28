import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { store } from './store/index.js'

const SECRET = process.env.JWT_SECRET || 'beyond-silence-dev-secret-change-in-production'
const ENV_PASSWORD = process.env.ADMIN_PASSWORD || 'rahwa2026'
const HASH_KEY = 'admin_password_hash'

async function getStoredHash() {
  return store.getSetting(HASH_KEY)
}

export async function verifyPassword(password) {
  const hash = await getStoredHash()
  if (hash) {
    return bcrypt.compareSync(password, hash)
  }
  return password === ENV_PASSWORD
}

export async function changePassword(currentPassword, newPassword) {
  if (!(await verifyPassword(currentPassword))) {
    return { ok: false, error: 'Current password is wrong' }
  }
  if (!newPassword || newPassword.length < 6) {
    return { ok: false, error: 'New password must be at least 6 characters' }
  }
  const hash = bcrypt.hashSync(newPassword, 10)
  await store.setSetting(HASH_KEY, hash)
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
