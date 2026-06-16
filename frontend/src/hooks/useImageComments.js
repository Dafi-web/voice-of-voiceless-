import { useState, useEffect, useCallback, useRef } from 'react'
import { api } from '../api/client'

export function useImageComments(imageId, refreshKey = 0) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const loadedOnce = useRef(false)

  const refresh = useCallback(() => {
    if (!imageId) {
      setComments([])
      setLoading(false)
      return Promise.resolve([])
    }
    setLoading(true)
    setError('')
    return api
      .getComments(imageId)
      .then((rows) => {
        const list = Array.isArray(rows) ? rows : []
        setComments(list)
        loadedOnce.current = true
        return list
      })
      .catch((err) => {
        setError(err.message || 'Could not load comments')
        return null
      })
      .finally(() => setLoading(false))
  }, [imageId])

  useEffect(() => {
    refresh()
  }, [refresh, refreshKey])

  useEffect(() => {
    let timer
    const reload = () => {
      if (document.visibilityState !== 'visible') return
      clearTimeout(timer)
      timer = setTimeout(() => refresh(), 400)
    }
    document.addEventListener('visibilitychange', reload)
    window.addEventListener('focus', reload)
    return () => {
      clearTimeout(timer)
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
      if (result?.comment) {
        setComments((prev) => {
          const exists = prev.some((c) => c.id === result.comment.id)
          if (exists) return prev
          return [result.comment, ...prev]
        })
        loadedOnce.current = true
        setError('')
      }
      refresh().catch(() => {})
      return result
    },
    [imageId, refresh],
  )

  return { comments, addComment, loading, error, refresh }
}
