import { useState } from 'react'
import Section from './Section'
import ContentWarning from './ContentWarning'
import FormField from './FormField'
import { useLanguage } from '../i18n/LanguageContext'
import { api } from '../api/client'

export default function ShareStory() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.target)
    const preference = fd.get('story-anonymous') || 'anonymous'
    const pseudonym = (fd.get('story-pseudonym') || '').toString().trim()
    const location = (fd.get('story-location') || '').toString().trim()
    const testimony = (fd.get('story-text') || '').toString().trim()

    const name =
      preference === 'named'
        ? pseudonym || 'Named survivor'
        : preference === 'pseudonym' && pseudonym
          ? pseudonym
          : 'Anonymous'

    const body = [
      `Publication: ${preference}`,
      location && `Location / period: ${location}`,
      '',
      testimony,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      await api.postMessage({
        name,
        email: 'story@beyond-silence.local',
        subject: `Survivor testimony (${preference})`,
        body,
        type: 'story',
      })
      setSubmitted(true)
      e.target.reset()
    } catch (err) {
      setError(err.message || t('shareStory.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section id="stories" title={t('shareStory.title')} subtitle={t('shareStory.subtitle')} alt>
      <ContentWarning>{t('shareStory.warning')}</ContentWarning>

      {submitted ? (
        <div className="message message--success" role="status">
          <p>{t('shareStory.success')}</p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <FormField id="story-anonymous" label={t('shareStory.publication')}>
            <select id="story-anonymous" name="story-anonymous" className="form-field__input" defaultValue="anonymous">
              <option value="anonymous">{t('shareStory.optAnonymous')}</option>
              <option value="pseudonym">{t('shareStory.optPseudonym')}</option>
              <option value="named">{t('shareStory.optNamed')}</option>
            </select>
          </FormField>

          <FormField
            id="story-pseudonym"
            label={t('shareStory.pseudonym')}
            hint={t('shareStory.pseudonymHint')}
          />

          <FormField
            id="story-location"
            label={t('shareStory.location')}
            hint={t('shareStory.locationHint')}
          />

          <FormField
            id="story-text"
            label={t('shareStory.testimony')}
            required
            hint={t('shareStory.testimonyHint')}
          >
            <textarea
              id="story-text"
              name="story-text"
              className="form-field__input form-field__textarea"
              rows={10}
              required
            />
          </FormField>

          <FormField id="story-consent" label={t('shareStory.consent')}>
            <label className="checkbox">
              <input type="checkbox" id="story-consent" name="story-consent" required />
              <span>{t('shareStory.consentText')}</span>
            </label>
          </FormField>

          {error && <p className="contact-form__error">{error}</p>}
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? t('shareStory.sending') : t('shareStory.submit')}
          </button>
        </form>
      )}
    </Section>
  )
}
