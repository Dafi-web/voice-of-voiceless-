import Section from './Section'
import { SITE_OWNER_NOTE, SITE_OWNER_NAME, SITE_YEAR } from '../constants/brand'

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
        families who suffered wartime sexual violence and atrocities — and we refuse to
        let their stories disappear.
      </p>

      <aside className="founder-card">
        <p className="founder-card__label">Site owner · {SITE_YEAR}</p>
        <p className="founder-card__text">
          {SITE_OWNER_NAME ? (
            <>
              <strong>{SITE_OWNER_NAME}</strong> owns and leads Voice of the Voiceless — established
              in {SITE_YEAR} to expose the truth about Tigray and demand justice for survivors.
            </>
          ) : (
            SITE_OWNER_NOTE
          )}
        </p>
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
