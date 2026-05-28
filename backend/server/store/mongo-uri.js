/** Warn if password contains unencoded @ (common Atlas setup mistake). */
export function checkMongoUri(uri) {
  if (!uri?.trim()) return

  const rest = uri.replace(/^mongodb(\+srv)?:\/\//, '')
  const atParts = rest.split('@')
  if (atParts.length > 2) {
    throw new Error(
      'MONGODB_URI is invalid: your password likely contains "@". ' +
        'Encode it as %40 (example: yesno@1212 → yesno%401212).',
    )
  }

  if (!rest.includes('/') || rest.endsWith('.net/') || rest.endsWith('.net?')) {
    console.warn(
      'MONGODB_URI has no database name — using database "beyond-silence" from connection options.',
    )
  }
}

/** Ensure URI includes a database name for predictable collection storage. */
export function withDatabase(uri, dbName = 'beyond-silence') {
  if (/mongodb(\+srv)?:\/\/[^/]+\/[^/?]+/.test(uri)) return uri
  if (uri.includes('?')) {
    return uri.replace('?', `/${dbName}?`)
  }
  return `${uri.replace(/\/$/, '')}/${dbName}`
}
