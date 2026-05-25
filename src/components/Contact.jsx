import Section from './Section'
import { SITE_EMAIL } from '../constants/brand'

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Get in touch"
      subtitle="Share a tip, a report, or a media inquiry. Help us expose what was hidden."
      dark
    >
      <div className="contact-card">
        <p className="contact-card__text">
          Every message helps build the record. We treat sensitive information with care.
        </p>
        <a href={`mailto:${SITE_EMAIL}`} className="contact-card__email">
          {SITE_EMAIL}
        </a>
        <a href="#gallery" className="btn btn--outline-light">
          View photo gallery
        </a>
      </div>
    </Section>
  )
}
