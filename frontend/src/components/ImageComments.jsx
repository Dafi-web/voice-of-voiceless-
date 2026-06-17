import { useState } from 'react'
import { useImageComments } from '../hooks/useImageComments'
import { useLanguage } from '../i18n/LanguageContext'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ImageComments({ imageId, compact = false, onPosted, refreshKey = 0 }) {
  const { t } = useLanguage()
  const { comments, addComment, loading, error, refresh } = useImageComments(imageId, refreshKey)
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
      const result = await addComment(name, text)
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

      {error && (
        <p className="comments__error">
          {error}{' '}
          <button type="button" className="comments__retry" onClick={refresh}>
            {t('comments.retry')}
          </button>
        </p>
      )}

      {loading ? (
        <p className="comments__empty">{t('comments.loading')}</p>
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
