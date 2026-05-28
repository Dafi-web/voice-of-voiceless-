import { useState } from 'react'
import Section from './Section'
import { SITE_EMAIL } from '../constants/brand'
import { api } from '../api/client'

export default function Contact() {
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
      setStatus({ ok: false, text: err.message || 'Failed to send. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section
      id="contact"
      title="Get in touch"
      subtitle="Send a message, tip, or request. Rahwa reviews every submission."
      dark
    >
      <div className="contact-layout">
        <div className="contact-card">
          <p className="contact-card__text">
            Every message helps build the record. We treat sensitive information with care.
          </p>
          <a href={`mailto:${SITE_EMAIL}`} className="contact-card__email">
            {SITE_EMAIL}
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name *
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email *
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Type
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="contact">General message</option>
              <option value="request">Request / report</option>
            </select>
          </label>
          <label>
            Subject *
            <input name="subject" value={form.subject} onChange={handleChange} required />
          </label>
          <label>
            Message *
            <textarea name="body" rows={5} value={form.body} onChange={handleChange} required />
          </label>
          {status && (
            <p className={status.ok ? 'contact-form__success' : 'contact-form__error'}>
              {status.text}
            </p>
          )}
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </Section>
  )
}
