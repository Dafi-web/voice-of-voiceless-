import { useState } from 'react'
import Section from './Section'
import { SITE_EMAIL } from '../constants/brand'
import { useLanguage } from '../i18n/LanguageContext'
import { api } from '../api/client'

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    body: '',
    type: 'contact',
  })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const result = await api.postMessage(form)
      setStatus({ ok: true, text: result.message })
      setForm({ name: '', email: '', subject: '', body: '', type: 'contact' })
    } catch (err) {
      setStatus({ ok: false, text: err.message || t('contact.error') })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section id="contact" title={t('contact.title')} subtitle={t('contact.subtitle')} dark>
      <div className="contact-layout">
        <div className="contact-card">
          <p className="contact-card__text">{t('contact.cardText')}</p>
          <a href={`mailto:${SITE_EMAIL}`} className="contact-card__email">
            {SITE_EMAIL}
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            {t('contact.name')}
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            {t('contact.email')}
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            {t('contact.type')}
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="contact">{t('contact.typeContact')}</option>
              <option value="request">{t('contact.typeRequest')}</option>
            </select>
          </label>
          <label>
            {t('contact.subject')}
            <input name="subject" value={form.subject} onChange={handleChange} required />
          </label>
          <label>
            {t('contact.message')}
            <textarea name="body" rows={5} value={form.body} onChange={handleChange} required />
          </label>
          {status && (
            <p className={status.ok ? 'contact-form__success' : 'contact-form__error'}>
              {status.text}
            </p>
          )}
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? t('contact.sending') : t('contact.send')}
          </button>
        </form>
      </div>
    </Section>
  )
}
