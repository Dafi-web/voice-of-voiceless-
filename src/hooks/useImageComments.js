import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'vov-gallery-comments'

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useImageComments(imageId) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const all = loadAll()
    setComments(all[imageId] || [])
  }, [imageId])

  const addComment = useCallback(
    (name, text) => {
      const entry = {
        id: crypto.randomUUID(),
        name: name.trim() || 'Anonymous',
        text: text.trim(),
        date: new Date().toISOString(),
      }

      const all = loadAll()
      const updated = [...(all[imageId] || []), entry]
      all[imageId] = updated
      saveAll(all)
      setComments(updated)
      return entry
    },
    [imageId],
  )

  return { comments, addComment }
}

export function getCommentCount(imageId) {
  const all = loadAll()
  return (all[imageId] || []).length
}
