import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'beyond-silence-dev-secret-change-in-production'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'rahwa2026'

export function verifyPassword(password) {
  return password === ADMIN_PASSWORD
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
