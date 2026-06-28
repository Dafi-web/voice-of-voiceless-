import { useState, useEffect } from 'react'

export default function GalleryImage({ src, fallback, alt, onClick }) {
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <img
      src={imgSrc}
      alt={alt}
      className="gallery__img"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onClick={onClick}
      onError={() => {
        if (fallback && imgSrc !== fallback) setImgSrc(fallback)
      }}
    />
  )
}
