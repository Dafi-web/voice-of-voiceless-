import { store } from './store/index.js'
import { randomUUID } from 'crypto'

const SEED_ITEMS = [
  {
    id: 'guardian',
    type: 'image',
    src: '/gallery/guardian-tigray.jpg',
    caption: 'A survivor receives medical care for severe injuries during the war in Tigray.',
    credit: 'The Guardian',
    link: 'https://www.theguardian.com/world/ethiopia',
    is_article: 0,
  },
  {
    id: 'nyt-portrait',
    type: 'image',
    src: '/gallery/nyt-gebremedhin.jpg',
    caption: 'Reporting on survivors and the aftermath of the Tigray conflict.',
    credit: 'The New York Times',
    link: 'https://www.nytimes.com/2021/04/01/world/africa/ethiopia-tigray-sexual-assault.html',
    is_article: 0,
  },
  {
    id: 'natgeo',
    type: 'image',
    src: '/gallery/natgeo-tigray.jpg',
    caption: 'The human cost of war — civilians and devastation in Tigray.',
    credit: 'National Geographic',
    link: 'https://www.nationalgeographic.com/history/history-magazine/article/tigray-ethiopia-war',
    is_article: 0,
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

export async function seedGalleryIfEmpty() {
  const count = await store.countGallery()
  if (count > 0) return

  const now = new Date().toISOString()
  for (const item of SEED_ITEMS) {
    await store.insertGallery({
      ...item,
      published: 1,
      created_at: now,
    })
  }
  console.log('Seeded gallery with default items')
}

export { randomUUID }
