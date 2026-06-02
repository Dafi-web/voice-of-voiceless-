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
  { num: 3, title: 'Upload files', text: 'Photos, videos, PDFs, or documents (optional, up to 5 files).' },
  { num: 4, title: 'Send securely', text: 'Optional email for follow-up — or stay anonymous.' },
]

export default function EvidenceSubmission() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [evidenceType, setEvidenceType] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!evidenceType) {
      setError('Please choose a type of evidence.')
      return
    }

    const fd = new FormData(e.target)
    const description = (fd.get('evidence-description') || '').toString().trim()
    const contact = (fd.get('evidence-contact') || '').toString().trim()
    const fileNotes = (fd.get('evidence-files-note') || '').toString().trim()

    if (!description) {
      setError('Please add a description of the evidence.')
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
      const result = await api.postEvidence(payload)
      setSubmitted(true)
      setEvidenceType('')
      setSelectedFiles([])
      e.target.reset()
      if (result?.message) {
        /* success message shown in UI */
      }
    } catch (err) {
      setError(err.message || 'Could not send. Please try again or use the contact form below.')
    } finally {
      setLoading(false)
    }
  }

  const onFilesChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 5) {
      setError('You can upload up to 5 files at a time.')
      setSelectedFiles(files.slice(0, 5))
      return
    }
    setError('')
    setSelectedFiles(files)
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
              The admin team will review your evidence and any files you uploaded. We do not publish
              material without verification and consent.
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
                <h3 className="evidence-aside__heading">What you can upload</h3>
                <ul className="evidence-checklist">
                  <li>Photos and videos (JPG, PNG, MP4, etc.)</li>
                  <li>PDF documents and reports</li>
                  <li>Text files and official records</li>
                  <li>Up to 5 files, 50 MB each</li>
                </ul>
              </div>

              <p className="evidence-privacy">
                <strong>Your safety comes first.</strong> You may submit anonymously. We do not publish
                evidence without verification and consent.
              </p>
            </aside>

            <form className="evidence-form" onSubmit={handleSubmit} encType="multipart/form-data">
              <fieldset className="evidence-form__block">
                <legend className="evidence-form__legend">
                  1. Type of evidence <span className="evidence-form__required">*</span>
                </legend>
                {!evidenceType && error === 'Please choose a type of evidence.' && (
                  <p className="evidence-form__error">{error}</p>
                )}
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
                  3. Upload files <span className="evidence-form__optional">(optional)</span>
                </label>
                <p className="evidence-form__hint">
                  Photos, videos, PDFs, or documents. Maximum 5 files, 50 MB each.
                </p>
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
                  Notes about files <span className="evidence-form__optional">(optional)</span>
                </label>
                <textarea
                  id="evidence-files-note"
                  name="evidence-files-note"
                  className="evidence-form__textarea evidence-form__textarea--sm"
                  rows={2}
                  placeholder="e.g. date taken, location, or context for the files above"
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

              {error && error !== 'Please choose a type of evidence.' && (
                <p className="evidence-form__error">{error}</p>
              )}

              <button type="submit" className="btn btn--primary evidence-form__submit" disabled={loading}>
                {loading ? 'Uploading…' : 'Submit evidence securely'}
              </button>
            </form>
          </div>
        )}
      </div>
    </Section>
  )
}
