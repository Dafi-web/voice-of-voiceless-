import { useState, useEffect, useCallback } from 'react'
import { api } from '../api/client'

export function useImageComments(imageId, refreshKey = 0) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(() => {
    if (!imageId) {
      setComments([])
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    api
      .getComments(imageId)
      .then((rows) => {
        setComments(Array.isArray(rows) ? rows : [])
      })
      .catch((err) => {
        setComments([])
        setError(err.message || 'Could not load comments')
      })
      .finally(() => setLoading(false))
  }, [imageId])

  useEffect(() => {
    refresh()
  }, [refresh, refreshKey])

  useEffect(() => {
    const reload = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    document.addEventListener('visibilitychange', reload)
    window.addEventListener('focus', reload)
    return () => {
      document.removeEventListener('visibilitychange', reload)
      window.removeEventListener('focus', reload)
    }
  }, [refresh])

  const addComment = useCallback(
    async (name, text) => {
      const result = await api.postComment({
        galleryId: imageId,
        name: name.trim() || 'Anonymous',
        text: text.trim(),
      })
      await refresh()
      return result
    },
    [imageId, refresh],
  )

  return { comments, addComment, loading, error, refresh }
}
