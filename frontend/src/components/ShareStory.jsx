import { useState } from 'react'
import Section from './Section'
import ContentWarning from './ContentWarning'
import FormField from './FormField'
import { api } from '../api/client'

export default function ShareStory() {
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
      setError(err.message || 'Could not send. Please try again or use the contact form.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section
      id="stories"
      title="Share your story"
      subtitle="Survivors of sexual violence in Tigray deserve to be heard. You choose how much to share and whether your name appears."
      alt
    >
      <ContentWarning>
        This section discusses wartime sexual violence. Only proceed if you feel able. You may stop at
        any time.
      </ContentWarning>

      {submitted ? (
        <div className="message message--success" role="status">
          <p>
            Thank you. Your testimony was sent securely to the admin team for review. It will not be
            published without your consent.
          </p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <FormField id="story-anonymous" label="Publication preference">
            <select id="story-anonymous" name="story-anonymous" className="form-field__input" defaultValue="anonymous">
              <option value="anonymous">Anonymous — do not publish my name</option>
              <option value="pseudonym">Use a pseudonym only</option>
              <option value="named">I consent to using my real name</option>
            </select>
          </FormField>

          <FormField
            id="story-pseudonym"
            label="Pseudonym (if applicable)"
            hint="Only used if you selected pseudonym above."
          />

          <FormField
            id="story-location"
            label="Approximate location and time period"
            hint="e.g. town, year — only what you are comfortable sharing."
          />

          <FormField
            id="story-text"
            label="Your testimony"
            required
            hint="Write in your own words. There is no minimum length."
          >
            <textarea
              id="story-text"
              name="story-text"
              className="form-field__input form-field__textarea"
              rows={10}
              required
            />
          </FormField>

          <FormField id="story-consent" label="Consent">
            <label className="checkbox">
              <input type="checkbox" id="story-consent" name="story-consent" required />
              <span>
                I understand this testimony may be reviewed for documentation and potential legal use,
                and I consent to secure handling of my submission.
              </span>
            </label>
          </FormField>

          {error && <p className="contact-form__error">{error}</p>}
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Sending…' : 'Submit testimony'}
          </button>
        </form>
      )}
    </Section>
  )
}
