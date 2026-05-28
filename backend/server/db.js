import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { dbPath, isServerless, root, ensureDirs } from './paths.js'

const localDbPath = path.join(root, 'data', 'site.db')

ensureDirs()

if (isServerless && !fs.existsSync(dbPath)) {
  if (fs.existsSync(localDbPath)) {
    fs.copyFileSync(localDbPath, dbPath)
  }
}

const db = new Database(dbPath)
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS gallery (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL DEFAULT 'image',
    src TEXT NOT NULL,
    caption TEXT NOT NULL,
    credit TEXT DEFAULT '',
    link TEXT DEFAULT '',
    is_article INTEGER DEFAULT 0,
    published INTEGER DEFAULT 1,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    gallery_id TEXT NOT NULL,
    name TEXT NOT NULL,
    text TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL,
    FOREIGN KEY (gallery_id) REFERENCES gallery(id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'contact',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`)

export default db
