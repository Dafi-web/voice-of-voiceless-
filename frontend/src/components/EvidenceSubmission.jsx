import { useState } from 'react'
import Section from './Section'
import { api } from '../api/client'

const EVIDENCE_TYPES = [
  {
    id: 'Witness testimony',
    label: 'Witness testimony',
    desc: 'First-hand account of what you saw or experienced',
  },
  {
    id: 'Medical or forensic record',
    label: 'Medical / forensic',
    desc: 'Clinical or expert documentation',
  },
  {
    id: 'Photograph or video',
    label: 'Photo or video',
    desc: 'Images or footage you lawfully possess',
  },
  {
    id: 'Official document',
    label: 'Official document',
    desc: 'Reports, orders, or government records',
  },
  {
    id: 'Communication (messages, reports)',
    label: 'Messages & reports',
    desc: 'Written or digital communications',
  },
  { id: 'Other', label: 'Other', desc: 'Another type of material' },
]

const STEPS = [
  { num: 1, title: 'Choose type', text: 'Select what kind of material you are submitting.' },
  { num: 2, title: 'Describe it', text: 'Include dates, places, and context when you can.' },
  { num: 3, title: 'Send securely', text: 'Optional email for follow-up — or stay anonymous.' },
]

export default function EvidenceSubmission() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [evidenceType, setEvidenceType] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.target)
    const type = evidenceType || (fd.get('evidence-type') || 'Other').toString()
    const description = (fd.get('evidence-description') || '').toString().trim()
    const contact = (fd.get('evidence-contact') || '').toString().trim()
    const files = (fd.get('evidence-files') || '').toString().trim()

    const body = [description, files && `\nFiles / secure transfer notes:\n${files}`]
      .filter(Boolean)
      .join('\n')

    try {
      await api.postMessage({
        name: contact ? 'Evidence submitter' : 'Anonymous',
        email: contact || 'anonymous@beyond-silence.local',
        subject: `Evidence submission: ${type}`,
        body,
        type: 'evidence',
      })
      setSubmitted(true)
      setEvidenceType('')
      e.target.reset()
    } catch (err) {
      setError(err.message || 'Could not send. Please try the contact form below.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section
      id="evidence"
      title="Submit evidence"
      subtitle="Help document the truth for future accountability. Every submission is reviewed confidentially."
      wide
    >
      <div className="evidence">
        {submitted ? (
          <div className="evidence-success" role="status">
            <div className="evidence-success__icon" aria-hidden="true">
              ✓
            </div>
            <h3 className="evidence-success__title">Thank you — we received your submission</h3>
            <p className="evidence-success__text">
              The team will review it carefully. Large files should be shared only through a secure
              channel we agree with you — do not send classified material through this form.
            </p>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => setSubmitted(false)}
            >
              Submit another item
            </button>
          </div>
        ) : (
          <div className="evidence-layout">
            <aside className="evidence-aside">
              <div className="evidence-aside__card">
                <h3 className="evidence-aside__heading">How it works</h3>
                <ol className="evidence-steps">
                  {STEPS.map((step) => (
                    <li key={step.num} className="evidence-steps__item">
                      <span className="evidence-steps__num">{step.num}</span>
                      <div>
                        <strong>{step.title}</strong>
                        <p>{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="evidence-aside__card evidence-aside__card--muted">
                <h3 className="evidence-aside__heading">What to include</h3>
                <ul className="evidence-checklist">
                  <li>What happened, and when / where (if known)</li>
                  <li>Who was involved, if safe to name</li>
                  <li>How you obtained the material</li>
                  <li>Any files you can share through a secure channel</li>
                </ul>
              </div>

              <p className="evidence-privacy">
                <strong>Your safety comes first.</strong> You may submit anonymously. We do not publish
                evidence without verification and consent.
              </p>
            </aside>

            <form className="evidence-form" onSubmit={handleSubmit}>
              <fieldset className="evidence-form__block">
                <legend className="evidence-form__legend">
                  1. Type of evidence <span className="evidence-form__required">*</span>
                </legend>
                <div className="evidence-types" role="radiogroup" aria-label="Type of evidence">
                  {EVIDENCE_TYPES.map((type) => (
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
                        required
                      />
                      <span className="evidence-type__label">{type.label}</span>
                      <span className="evidence-type__desc">{type.desc}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="evidence-form__block">
                <label className="evidence-form__legend" htmlFor="evidence-description">
                  2. Description <span className="evidence-form__required">*</span>
                </label>
                <p className="evidence-form__hint">
                  Describe what the evidence shows, when and where it relates to, and who is involved
                  if known.
                </p>
                <textarea
                  id="evidence-description"
                  name="evidence-description"
                  className="evidence-form__textarea"
                  rows={7}
                  required
                  placeholder="Write as much detail as you are comfortable sharing…"
                />
              </div>

              <div className="evidence-form__block">
                <label className="evidence-form__legend" htmlFor="evidence-files">
                  3. Files &amp; secure transfer
                </label>
                <p className="evidence-form__hint">
                  List file names or describe material you can send separately (encrypted email, secure
                  drive, etc.). Do not paste sensitive content here if you need stronger protection.
                </p>
                <textarea
                  id="evidence-files"
                  name="evidence-files"
                  className="evidence-form__textarea evidence-form__textarea--sm"
                  rows={3}
                  placeholder="e.g. “I have 3 photos and a PDF — can share via Signal.”"
                />
              </div>

              <div className="evidence-form__block">
                <label className="evidence-form__legend" htmlFor="evidence-contact">
                  4. Contact email <span className="evidence-form__optional">(optional)</span>
                </label>
                <p className="evidence-form__hint">Leave blank to remain completely anonymous.</p>
                <input
                  id="evidence-contact"
                  name="evidence-contact"
                  type="email"
                  className="evidence-form__input"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              {error && <p className="evidence-form__error">{error}</p>}

              <button type="submit" className="btn btn--primary evidence-form__submit" disabled={loading}>
                {loading ? 'Sending…' : 'Submit evidence securely'}
              </button>
            </form>
          </div>
        )}
      </div>
    </Section>
  )
}
