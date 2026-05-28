import { useState } from 'react'
import Section from './Section'
import ContentWarning from './ContentWarning'
import FormField from './FormField'

export default function ShareStory() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    e.target.reset()
  }

  return (
    <Section
      id="stories"
      title="Share your story"
      subtitle="Survivors of sexual violence in Tigray deserve to be heard. You choose how much to share and whether your name appears."
      alt
    >
      <ContentWarning>
        This section discusses wartime sexual violence. Only proceed if you feel
        able. You may stop at any time.
      </ContentWarning>

      {submitted ? (
        <div className="message message--success" role="status">
          <p>
            Thank you. Your submission has been received locally for review. A
            secure backend will be connected before any data is stored or
            published.
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
                I understand this testimony may be reviewed for documentation and
                potential legal use, and I consent to secure handling of my
                submission.
              </span>
            </label>
          </FormField>

          <button type="submit" className="btn btn--primary">
            Submit testimony
          </button>
        </form>
      )}
    </Section>
  )
}
