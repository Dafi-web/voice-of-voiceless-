import { useState } from 'react'

export default function GalleryImage({ src, fallback, alt, onClick }) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img
      src={imgSrc}
      alt={alt}
      className="gallery__img"
      loading="lazy"
      referrerPolicy="no-referrer"
      onClick={onClick}
      onError={() => {
        if (fallback && imgSrc !== fallback) setImgSrc(fallback)
      }}
    />
  )
}
