import { useState } from 'react'
import { useImageComments } from '../hooks/useImageComments'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ImageComments({ imageId, compact = false, onPosted }) {
  const { comments, addComment, loading } = useImageComments(imageId)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [expanded, setExpanded] = useState(!compact)
  const [pendingMsg, setPendingMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    try {
      const result = await addComment(name, text)
      setText('')
      setPendingMsg(result.message || 'Comment submitted for review.')
      onPosted?.()
    } catch (err) {
      setPendingMsg(err.message || 'Could not submit. Try again later.')
    }
  }

  if (compact && !expanded) {
    return (
      <button type="button" className="comments__toggle" onClick={() => setExpanded(true)}>
        {comments.length === 0 ? 'Add a comment' : `${comments.length} comment${comments.length === 1 ? '' : 's'}`}
      </button>
    )
  }

  return (
    <div className={`comments ${compact ? 'comments--compact' : ''}`}>
      {compact && (
        <button type="button" className="comments__collapse" onClick={() => setExpanded(false)}>
          Hide comments
        </button>
      )}

      <h4 className="comments__heading">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h4>

      {pendingMsg && <p className="comments__pending">{pendingMsg}</p>}

      {loading ? (
        <p className="comments__empty">Loading…</p>
      ) : comments.length > 0 ? (
        <ul className="comments__list">
          {comments.map(({ id, name: author, text: body, date }) => (
            <li key={id} className="comments__item">
              <div className="comments__meta">
                <strong>{author}</strong>
                <time dateTime={date}>{formatDate(date)}</time>
              </div>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="comments__empty">No approved comments yet. Be the first.</p>
      )}

      <form className="comments__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="comments__input"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
        />
        <textarea
          className="comments__textarea"
          placeholder="Share your thoughts… (reviewed before publishing)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={compact ? 2 : 3}
          required
          maxLength={500}
        />
        <button type="submit" className="btn btn--primary btn--sm">
          Post comment
        </button>
      </form>
    </div>
  )
}
