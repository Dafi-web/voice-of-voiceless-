import Section from './Section'
import { SITE_OWNER_NAME, SITE_YEAR, FOUNDER_GOALS, SITE_OWNER_NOTE } from '../constants/brand'

const CARDS = [
  {
    icon: '◆',
    title: 'Expose',
    text: 'Report what the government and media blackout tried to bury — so the world cannot look away.',
  },
  {
    icon: '◇',
    title: 'Document',
    text: 'Preserve photos, testimony, and records from Tigray as evidence for history and law.',
  },
  {
    icon: '◎',
    title: 'Justice',
    text: 'Push for accountability — in courts, tribunals, and before the international community.',
  },
]

export default function About() {
  return (
    <Section
      id="about"
      title="Who we are"
      subtitle="Voice of the Voiceless speaks for survivors of the Tigray war when power tries to silence them."
    >
      <p className="prose prose--lead">
        This is not propaganda. It is documentation. We stand with women, girls, and
        families who suffered genocide, mass killing, and wartime sexual violence — and we
        refuse to let their stories disappear.
      </p>

      <aside className="founder-card">
        <p className="founder-card__label">Founder · {SITE_OWNER_NAME} · {SITE_YEAR}</p>
        <p className="founder-card__text">{SITE_OWNER_NOTE}</p>
        <ul className="founder-card__goals">
          {FOUNDER_GOALS.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      </aside>

      <ul className="cards">
        {CARDS.map(({ icon, title, text }) => (
          <li key={title} className="card">
            <span className="card__icon" aria-hidden="true">
              {icon}
            </span>
            <h3 className="card__title">{title}</h3>
            <p className="card__text">{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
