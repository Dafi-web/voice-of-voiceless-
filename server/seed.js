import db from './db.js'
import { randomUUID } from 'crypto'

const SEED_ITEMS = [
  {
    id: 'guardian',
    type: 'image',
    src: '/gallery/guardian-tigray.jpg',
    caption: 'A survivor receives medical care for severe injuries during the war in Tigray.',
    credit: 'The Guardian',
    link: 'https://www.theguardian.com/world/ethiopia',
  },
  {
    id: 'nyt-portrait',
    type: 'image',
    src: '/gallery/nyt-gebremedhin.jpg',
    caption: 'Reporting on survivors and the aftermath of the Tigray conflict.',
    credit: 'The New York Times',
    link: 'https://www.nytimes.com/2021/04/01/world/africa/ethiopia-tigray-sexual-assault.html',
  },
  {
    id: 'natgeo',
    type: 'image',
    src: '/gallery/natgeo-tigray.jpg',
    caption: 'The human cost of war — civilians and devastation in Tigray.',
    credit: 'National Geographic',
    link: 'https://www.nationalgeographic.com/history/history-magazine/article/tigray-ethiopia-war',
  },
  {
    id: 'nyt-report',
    type: 'image',
    src: '/gallery/nyt-gebremedhin.jpg',
    caption:
      '"They told us they were going in to kill. And they raped us." — investigation into sexual violence in Tigray.',
    credit: 'The New York Times, April 2021',
    link: 'https://www.nytimes.com/2021/04/01/world/africa/ethiopia-tigray-sexual-assault.html',
    is_article: 1,
  },
]

export function seedGalleryIfEmpty() {
  const count = db.prepare('SELECT COUNT(*) as c FROM gallery').get().c
  if (count > 0) return

  const insert = db.prepare(`
    INSERT INTO gallery (id, type, src, caption, credit, link, is_article, published, created_at)
    VALUES (@id, @type, @src, @caption, @credit, @link, @is_article, 1, @created_at)
  `)

  const now = new Date().toISOString()
  for (const item of SEED_ITEMS) {
    insert.run({
      ...item,
      is_article: item.is_article ?? 0,
      created_at: now,
    })
  }
  console.log('Seeded gallery with default items')
}

export { randomUUID }
