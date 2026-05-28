import { useState } from 'react'
import Section from './Section'
import FormField from './FormField'

export default function PsychologistNetwork() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    e.target.reset()
  }

  return (
    <Section
      id="healing"
      title="Healing & counseling"
      subtitle="We invite licensed psychologists and trauma-informed counselors to support survivors on their path to healing."
    >
      <p className="section__body">
        Sexual violence during war leaves deep psychological wounds. Qualified
        professionals — especially those experienced with conflict-related trauma,
        culturally sensitive care, and Tigrinya-speaking survivors — are essential
        to recovery.
      </p>

      <div className="healing-grid">
        <div className="healing-card">
          <h3>For survivors</h3>
          <p>
            Counseling referrals will be listed here once the network is established.
            All services will prioritize confidentiality and survivor choice.
          </p>
        </div>
        <div className="healing-card">
          <h3>For counselors</h3>
          <p>
            If you are a licensed mental health professional willing to volunteer or
            offer pro bono sessions, please register below.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="message message--success" role="status">
          <p>Thank you for offering your expertise. We will contact you when the network launches.</p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <FormField id="counselor-name" label="Full name" required />

          <FormField
            id="counselor-email"
            label="Email"
            type="email"
            required
          />

          <FormField
            id="counselor-credentials"
            label="License and credentials"
            required
            hint="Jurisdiction, license number, and specializations."
          >
            <textarea
              id="counselor-credentials"
              name="counselor-credentials"
              className="form-field__input form-field__textarea"
              rows={4}
              required
            />
          </FormField>

          <FormField
            id="counselor-languages"
            label="Languages spoken"
            required
            hint="e.g. English, Tigrinya, Amharic"
          />

          <FormField id="counselor-availability" label="Availability">
            <textarea
              id="counselor-availability"
              name="counselor-availability"
              className="form-field__input form-field__textarea"
              rows={3}
              placeholder="Hours per week, time zones, remote or in-person"
            />
          </FormField>

          <FormField id="counselor-note" label="Additional information">
            <textarea
              id="counselor-note"
              name="counselor-note"
              className="form-field__input form-field__textarea"
              rows={4}
            />
          </FormField>

          <button type="submit" className="btn btn--primary">
            Join the counselor network
          </button>
        </form>
      )}
    </Section>
  )
}
