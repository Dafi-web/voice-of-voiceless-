import { useState, useEffect } from 'react'
import { api } from '../api/client'

export function useGalleryCommentsBatch(refreshKey = 0) {
  const [byGallery, setByGallery] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    api
      .getCommentsBatch()
      .then((data) => {
        if (cancelled) return
        setByGallery(data && typeof data === 'object' ? data : {})
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || 'Could not load comments')
        setByGallery({})
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [refreshKey])

  const addComment = (galleryId, comment) => {
    if (!galleryId || !comment) return
    setByGallery((prev) => {
      const list = prev[galleryId] || []
      if (list.some((c) => c.id === comment.id)) return prev
      return { ...prev, [galleryId]: [comment, ...list] }
    })
  }

  const refresh = () => {
    setLoading(true)
    return api
      .getCommentsBatch()
      .then((data) => {
        setByGallery(data && typeof data === 'object' ? data : {})
        setError('')
      })
      .catch((err) => {
        setError(err.message || 'Could not load comments')
      })
      .finally(() => setLoading(false))
  }

  return { byGallery, loading, error, addComment, refresh }
}
