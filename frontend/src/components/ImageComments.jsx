import { useState } from 'react'
import { useImageComments } from '../hooks/useImageComments'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ImageComments({ imageId, compact = false, onPosted, refreshKey = 0 }) {
  const { comments, addComment, loading, error, refresh } = useImageComments(imageId, refreshKey)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [expanded, setExpanded] = useState(!compact)
  const [pendingMsg, setPendingMsg] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim() || !imageId) return
    setSubmitError('')
    setPendingMsg('')
    setSubmitting(true)
    try {
      const result = await addComment(name, text)
      setText('')
      setPendingMsg(
        result.message ||
          'Comment submitted for review. It will appear here after admin approval.',
      )
      onPosted?.()
    } catch (err) {
      setSubmitError(err.message || 'Could not submit. Try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  if (compact && !expanded) {
    const label =
      comments.length === 0
        ? 'Add a comment'
        : `${comments.length} comment${comments.length === 1 ? '' : 's'}`
    return (
      <button type="button" className="comments__toggle" onClick={() => setExpanded(true)}>
        {label}
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

      {pendingMsg && (
        <p className="comments__pending" role="status">
          {pendingMsg}
        </p>
      )}

      {submitError && <p className="comments__error">{submitError}</p>}

      {error && (
        <p className="comments__error">
          {error}{' '}
          <button type="button" className="comments__retry" onClick={refresh}>
            Retry
          </button>
        </p>
      )}

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
        !pendingMsg && (
          <p className="comments__empty">
            No published comments yet. Be the first — your comment is reviewed before it appears.
          </p>
        )
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
        <button type="submit" className="btn btn--primary btn--sm" disabled={submitting || !imageId}>
          {submitting ? 'Sending…' : 'Post comment'}
        </button>
      </form>
    </div>
  )
}
