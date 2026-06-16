import { useState, useEffect, useRef, useCallback } from 'react'
import Section from './Section'
import GalleryImage from './GalleryImage'
import ImageComments from './ImageComments'
import { useLanguage } from '../i18n/LanguageContext'
import { api, mediaUrl } from '../api/client'
import { GALLERY_ITEMS as FALLBACK } from '../data/gallery'

export default function Gallery() {
  const { t } = useLanguage()
  const [items, setItems] = useState(FALLBACK)
  const [active, setActive] = useState(null)
  const [commentsRefreshKey, setCommentsRefreshKey] = useState(0)
  const galleryLoaded = useRef(false)

  const loadGallery = useCallback(() => {
    const fallbackById = Object.fromEntries(FALLBACK.map((item) => [item.id, item.fallback]))

    return api
      .getGallery()
      .then((data) => {
        if (data?.length) {
          galleryLoaded.current = true
          setItems(
            data.map((item) => ({
              ...item,
              fallback: item.fallback || fallbackById[item.id],
            })),
          )
        }
      })
      .catch(() => {
        if (!galleryLoaded.current) {
          setItems(FALLBACK)
        }
      })
  }, [])

  useEffect(() => {
    loadGallery()
  }, [loadGallery])

  const refreshComments = () => {
    setCommentsRefreshKey((k) => k + 1)
  }

  const close = () => setActive(null)
  const showPrev = () =>
    setActive((i) => (i === null ? null : (i - 1 + items.length) % items.length))
  const showNext = () => setActive((i) => (i === null ? null : (i + 1) % items.length))

  useEffect(() => {
    if (active === null) return undefined

    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, items.length])

  const item = active !== null ? items[active] : null

  return (
    <Section
      id="gallery"
      title={t('gallery.title')}
      subtitle={t('gallery.subtitle')}
      wide
    >
      <p className="gallery__warning">{t('gallery.warning')}</p>

      <ul className="gallery__grid">
        {items.map((entry, index) => (
          <li key={entry.id} className="gallery__item">
            <button
              type="button"
              className="gallery__thumb"
              onClick={() => setActive(index)}
              aria-label={`View: ${entry.caption}`}
            >
              {entry.type === 'video' ? (
                <video src={mediaUrl(entry.src)} className="gallery__img" muted playsInline />
              ) : (
                <GalleryImage
                  src={mediaUrl(entry.src)}
                  fallback={entry.fallback}
                  alt={entry.caption}
                />
              )}
              {entry.type === 'video' && <span className="gallery__badge">{t('gallery.video')}</span>}
              {entry.isArticle && <span className="gallery__badge">{t('gallery.readReport')}</span>}
            </button>
            <figcaption className="gallery__caption">
              <p>{entry.caption}</p>
              <cite>
                {entry.credit}
                {entry.link && (
                  <>
                    {' · '}
                    <a href={entry.link} target="_blank" rel="noopener noreferrer">
                      {t('gallery.source')}
                    </a>
                  </>
                )}
              </cite>
            </figcaption>
            <ImageComments
              imageId={entry.id}
              compact
              refreshKey={commentsRefreshKey}
              onPosted={refreshComments}
            />
          </li>
        ))}
      </ul>

      {item && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t('gallery.mediaViewer')}
          onClick={close}
        >
          <div className="lightbox__inner lightbox__inner--with-comments" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="lightbox__close" onClick={close} aria-label={t('gallery.close')}>
              ×
            </button>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={showPrev} aria-label={t('gallery.previous')}>
              ‹
            </button>
            <div className="lightbox__media">
              {item.type === 'video' ? (
                <video src={mediaUrl(item.src)} className="gallery__img" controls autoPlay />
              ) : (
                <GalleryImage
                  src={mediaUrl(item.src)}
                  fallback={item.fallback}
                  alt={item.caption}
                  onClick={() => {}}
                />
              )}
              <div className="lightbox__meta">
                <p>{item.caption}</p>
                <cite>{item.credit}</cite>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="lightbox__link">
                    {t('gallery.viewSource')}
                  </a>
                )}
              </div>
              <ImageComments
                imageId={item.id}
                refreshKey={commentsRefreshKey}
                onPosted={refreshComments}
              />
            </div>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={showNext} aria-label={t('gallery.next')}>
              ›
            </button>
          </div>
        </div>
      )}
    </Section>
  )
}
