import { useState } from 'react'
import Section from './Section'
import { useLanguage } from '../i18n/LanguageContext'
import { api } from '../api/client'

export default function EvidenceSubmission() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [evidenceType, setEvidenceType] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])

  const evidenceTypes = t('evidence.types')
  const steps = t('evidence.steps')
  const uploadList = t('evidence.uploadList')
  const typeRequiredMsg = t('evidence.typeRequired')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!evidenceType) {
      setError(typeRequiredMsg)
      return
    }

    const fd = new FormData(e.target)
    const description = (fd.get('evidence-description') || '').toString().trim()
    const contact = (fd.get('evidence-contact') || '').toString().trim()
    const fileNotes = (fd.get('evidence-files-note') || '').toString().trim()

    if (!description) {
      setError(t('evidence.descriptionRequired'))
      return
    }

    const payload = new FormData()
    payload.append('evidenceType', evidenceType)
    payload.append('description', description)
    if (contact) payload.append('contact', contact)
    if (fileNotes) payload.append('fileNotes', fileNotes)
    for (const file of selectedFiles) {
      payload.append('files', file)
    }

    setLoading(true)
    try {
      await api.postEvidence(payload)
      setSubmitted(true)
      setEvidenceType('')
      setSelectedFiles([])
      e.target.reset()
    } catch (err) {
      setError(err.message || t('evidence.submitError'))
    } finally {
      setLoading(false)
    }
  }

  const onFilesChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 5) {
      setError(t('evidence.maxFiles'))
      setSelectedFiles(files.slice(0, 5))
      return
    }
    setError('')
    setSelectedFiles(files)
  }

  return (
    <Section id="evidence" title={t('evidence.title')} subtitle={t('evidence.subtitle')} wide>
      <div className="evidence">
        {submitted ? (
          <div className="evidence-success" role="status">
            <div className="evidence-success__icon" aria-hidden="true">
              ✓
            </div>
            <h3 className="evidence-success__title">{t('evidence.successTitle')}</h3>
            <p className="evidence-success__text">{t('evidence.successText')}</p>
            <button type="button" className="btn btn--outline" onClick={() => setSubmitted(false)}>
              {t('evidence.submitAnother')}
            </button>
          </div>
        ) : (
          <div className="evidence-layout">
            <aside className="evidence-aside">
              <div className="evidence-aside__card">
                <h3 className="evidence-aside__heading">{t('evidence.howItWorks')}</h3>
                <ol className="evidence-steps">
                  {Array.isArray(steps) &&
                    steps.map((step, i) => (
                      <li key={step.title} className="evidence-steps__item">
                        <span className="evidence-steps__num">{i + 1}</span>
                        <div>
                          <strong>{step.title}</strong>
                          <p>{step.text}</p>
                        </div>
                      </li>
                    ))}
                </ol>
              </div>

              <div className="evidence-aside__card evidence-aside__card--muted">
                <h3 className="evidence-aside__heading">{t('evidence.whatYouCanUpload')}</h3>
                <ul className="evidence-checklist">
                  {Array.isArray(uploadList) &&
                    uploadList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                </ul>
              </div>

              <p className="evidence-privacy">{t('evidence.privacy')}</p>
            </aside>

            <form className="evidence-form" onSubmit={handleSubmit} encType="multipart/form-data">
              <fieldset className="evidence-form__block">
                <legend className="evidence-form__legend">
                  1. {t('evidence.typeLegend')} <span className="evidence-form__required">*</span>
                </legend>
                {!evidenceType && error === typeRequiredMsg && (
                  <p className="evidence-form__error">{error}</p>
                )}
                <div className="evidence-types" role="radiogroup" aria-label={t('evidence.typeLegend')}>
                  {Array.isArray(evidenceTypes) &&
                    evidenceTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`evidence-type ${evidenceType === type.id ? 'is-selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="evidence-type"
                          value={type.id}
                          checked={evidenceType === type.id}
                          onChange={() => setEvidenceType(type.id)}
                        />
                        <span className="evidence-type__label">{type.label}</span>
                        <span className="evidence-type__desc">{type.desc}</span>
                      </label>
                    ))}
                </div>
              </fieldset>

              <div className="evidence-form__block">
                <label className="evidence-form__legend" htmlFor="evidence-description">
                  2. {t('evidence.descriptionLegend')} <span className="evidence-form__required">*</span>
                </label>
                <p className="evidence-form__hint">{t('evidence.descriptionHint')}</p>
                <textarea
                  id="evidence-description"
                  name="evidence-description"
                  className="evidence-form__textarea"
                  rows={7}
                  required
                  placeholder={t('evidence.descriptionPlaceholder')}
                />
              </div>

              <div className="evidence-form__block">
                <label className="evidence-form__legend" htmlFor="evidence-files">
                  3. {t('evidence.filesLegend')} <span className="evidence-form__optional">{t('evidence.optional')}</span>
                </label>
                <p className="evidence-form__hint">{t('evidence.filesHint')}</p>
                <input
                  id="evidence-files"
                  name="evidence-files"
                  type="file"
                  className="evidence-form__file"
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,application/pdf"
                  multiple
                  onChange={onFilesChange}
                />
                {selectedFiles.length > 0 && (
                  <ul className="evidence-file-list">
                    {selectedFiles.map((f) => (
                      <li key={`${f.name}-${f.size}`}>
                        {f.name} ({Math.round(f.size / 1024)} KB)
                      </li>
                    ))}
                  </ul>
                )}
                <label className="evidence-form__legend evidence-form__legend--sub" htmlFor="evidence-files-note">
                  {t('evidence.filesNote')} <span className="evidence-form__optional">{t('evidence.optional')}</span>
                </label>
                <textarea
                  id="evidence-files-note"
                  name="evidence-files-note"
                  className="evidence-form__textarea evidence-form__textarea--sm"
                  rows={2}
                  placeholder={t('evidence.filesNotePlaceholder')}
                />
              </div>

              <div className="evidence-form__block">
                <label className="evidence-form__legend" htmlFor="evidence-contact">
                  4. {t('evidence.contactLegend')} <span className="evidence-form__optional">{t('evidence.optional')}</span>
                </label>
                <p className="evidence-form__hint">{t('evidence.contactHint')}</p>
                <input
                  id="evidence-contact"
                  name="evidence-contact"
                  type="email"
                  className="evidence-form__input"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              {error && error !== typeRequiredMsg && <p className="evidence-form__error">{error}</p>}

              <button type="submit" className="btn btn--primary evidence-form__submit" disabled={loading}>
                {loading ? t('evidence.uploading') : t('evidence.submit')}
              </button>
            </form>
          </div>
        )}
      </div>
    </Section>
  )
}
