import { useState } from 'react'
import { api } from '../api/client'
import { useLanguage } from '../i18n/LanguageContext'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ImageComments({
  imageId,
  compact = false,
  onPosted,
  comments = [],
  commentsLoading = false,
  onCommentAdded,
}) {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim() || !imageId) return
    setSubmitError('')
    setSuccessMsg('')
    setSubmitting(true)
    try {
      const result = await api.postComment({
        galleryId: imageId,
        name: name.trim() || 'Anonymous',
        text: text.trim(),
      })
      if (result?.comment) {
        onCommentAdded?.(imageId, result.comment)
      }
      setText('')
      setSuccessMsg(result.message || t('comments.posted'))
      onPosted?.()
    } catch (err) {
      setSubmitError(err.message || t('comments.submitError'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={`comments ${compact ? 'comments--compact' : ''}`}>
      <h4 className="comments__heading">
        {t('comments.heading')} {comments.length > 0 && `(${comments.length})`}
      </h4>

      {successMsg && (
        <p className="comments__pending" role="status">
          {successMsg}
        </p>
      )}

      {submitError && <p className="comments__error">{submitError}</p>}

      {commentsLoading ? (
        <p className="comments__empty comments__empty--loading">{t('comments.loading')}</p>
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
        !successMsg && <p className="comments__empty">{t('comments.empty')}</p>
      )}

      <form className="comments__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="comments__input"
          placeholder={t('comments.namePlaceholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
        />
        <textarea
          className="comments__textarea"
          placeholder={t('comments.textPlaceholder')}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={compact ? 2 : 3}
          required
          maxLength={500}
        />
        <button type="submit" className="btn btn--primary btn--sm" disabled={submitting || !imageId}>
          {submitting ? t('comments.sending') : t('comments.post')}
        </button>
      </form>
    </div>
  )
}
