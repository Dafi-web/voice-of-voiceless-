/** Resolve MongoDB URI from common env var names (Render often uses MONGO_URL). */
export function getMongoUri() {
  return (
    process.env.MONGODB_URI?.trim() ||
    process.env.MONGO_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    ''
  )
}

export function mongoEnvVarName() {
  if (process.env.MONGODB_URI?.trim()) return 'MONGODB_URI'
  if (process.env.MONGO_URL?.trim()) return 'MONGO_URL'
  if (process.env.DATABASE_URL?.trim()) return 'DATABASE_URL'
  return null
}
