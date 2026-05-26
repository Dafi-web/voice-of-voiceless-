import { useState, useEffect } from 'react'
import Section from './Section'
import GalleryImage from './GalleryImage'
import ImageComments from './ImageComments'
import { GALLERY_ITEMS } from '../data/gallery'
import { getCommentCount } from '../hooks/useImageComments'

export default function Gallery() {
  const [active, setActive] = useState(null)
  const [, setTick] = useState(0)

  const refreshCounts = () => setTick((n) => n + 1)

  const close = () => setActive(null)
  const showPrev = () =>
    setActive((i) => (i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length))
  const showNext = () =>
    setActive((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length))

  useEffect(() => {
    if (active === null) return undefined

    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowLeft')
        setActive((i) => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % GALLERY_ITEMS.length)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  const item = active !== null ? GALLERY_ITEMS[active] : null

  return (
    <Section
      id="gallery"
      title="Evidence gallery"
      subtitle="Photographs from international reporting — proof the world cannot ignore. Leave a comment on any image."
      wide
    >
      <p className="gallery__warning">
        These images depict war injuries and trauma. Viewer discretion advised.
      </p>

      <ul className="gallery__grid">
        {GALLERY_ITEMS.map((entry, index) => {
          const count = getCommentCount(entry.id)
          return (
            <li key={entry.id} className="gallery__item">
              <button
                type="button"
                className="gallery__thumb"
                onClick={() => setActive(index)}
                aria-label={`View image: ${entry.caption}`}
              >
                <GalleryImage
                  src={entry.src}
                  fallback={entry.fallback}
                  alt={entry.caption}
                />
                {entry.isArticle && (
                  <span className="gallery__badge">Read report</span>
                )}
                {count > 0 && (
                  <span className="gallery__comment-count">{count} comments</span>
                )}
              </button>
              <figcaption className="gallery__caption">
                <p>{entry.caption}</p>
                <cite>
                  {entry.credit}
                  {entry.link && (
                    <>
                      {' · '}
                      <a href={entry.link} target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </>
                  )}
                </cite>
              </figcaption>
              <ImageComments imageId={entry.id} compact onPosted={refreshCounts} />
            </li>
          )
        })}
      </ul>

      {item && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
        >
          <div className="lightbox__inner lightbox__inner--with-comments" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="lightbox__close" onClick={close} aria-label="Close">
              ×
            </button>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={showPrev} aria-label="Previous">
              ‹
            </button>
            <div className="lightbox__media">
              <GalleryImage
                src={item.src}
                fallback={item.fallback}
                alt={item.caption}
                onClick={() => {}}
              />
              <div className="lightbox__meta">
                <p>{item.caption}</p>
                <cite>{item.credit}</cite>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lightbox__link"
                  >
                    {item.isArticle ? 'Read full New York Times report →' : 'View source →'}
                  </a>
                )}
              </div>
              <ImageComments imageId={item.id} onPosted={refreshCounts} />
            </div>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={showNext} aria-label="Next">
              ›
            </button>
          </div>
        </div>
      )}
    </Section>
  )
}
