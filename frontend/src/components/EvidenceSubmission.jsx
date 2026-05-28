import { useState } from 'react'
import Section from './Section'
import FormField from './FormField'

const EVIDENCE_TYPES = [
  'Witness testimony',
  'Medical or forensic record',
  'Photograph or video',
  'Official document',
  'Communication (messages, reports)',
  'Other',
]

export default function EvidenceSubmission() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    e.target.reset()
  }

  return (
    <Section
      id="evidence"
      title="Submit evidence"
      subtitle="Help build a record for future justice. All submissions are treated as confidential until verified and secured."
    >
      <div className="info-box">
        <h3 className="info-box__title">What we collect</h3>
        <ul>
          <li>First-hand accounts with dates and locations when known</li>
          <li>Identifying information about perpetrators, if safe to provide</li>
          <li>Supporting documents, images, or recordings you lawfully possess</li>
          <li>Chain-of-custody notes (how and when you obtained materials)</li>
        </ul>
      </div>

      {submitted ? (
        <div className="message message--success" role="status">
          <p>
            Evidence submission received. Connect a secure backend and encrypted
            storage before accepting real submissions in production.
          </p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <FormField id="evidence-type" label="Type of evidence" required>
            <select id="evidence-type" name="evidence-type" className="form-field__input" required defaultValue="">
              <option value="" disabled>
                Select type…
              </option>
              {EVIDENCE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="evidence-description"
            label="Description"
            required
            hint="Describe what the evidence shows, when and where it relates to, and who is involved if known."
          >
            <textarea
              id="evidence-description"
              name="evidence-description"
              className="form-field__input form-field__textarea"
              rows={8}
              required
            />
          </FormField>

          <FormField
            id="evidence-contact"
            label="Secure contact (optional)"
            type="email"
            hint="Encrypted email for follow-up. Leave blank to remain anonymous."
          />

          <FormField id="evidence-files" label="File references">
            <textarea
              id="evidence-files"
              name="evidence-files"
              className="form-field__input form-field__textarea"
              rows={3}
              placeholder="Describe files you can provide separately via secure channel (do not paste sensitive content here until encryption is enabled)."
            />
          </FormField>

          <button type="submit" className="btn btn--primary">
            Submit evidence
          </button>
        </form>
      )}
    </Section>
  )
}
