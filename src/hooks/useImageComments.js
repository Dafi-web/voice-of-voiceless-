import { useState, useEffect, useCallback } from 'react'
import { api } from '../api/client'

export function useImageComments(imageId) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(() => {
    if (!imageId) return
    setLoading(true)
    api
      .getComments(imageId)
      .then(setComments)
      .catch(() => setComments([]))
      .finally(() => setLoading(false))
  }, [imageId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addComment = useCallback(
    async (name, text) => {
      const result = await api.postComment({
        galleryId: imageId,
        name: name.trim() || 'Anonymous',
        text: text.trim(),
      })
      refresh()
      return result
    },
    [imageId, refresh],
  )

  return { comments, addComment, loading, refresh }
}

export function getCommentCount() {
  return 0
}
