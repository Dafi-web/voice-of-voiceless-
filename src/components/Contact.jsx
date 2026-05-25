import Section from './Section'
import { SITE_EMAIL } from '../constants/brand'

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="contact__text">
        Share information, reports, or media inquiries. Help us expose what was hidden.
      </p>
      <a href={`mailto:${SITE_EMAIL}`} className="contact__email">
        {SITE_EMAIL}
      </a>
    </Section>
  )
}
