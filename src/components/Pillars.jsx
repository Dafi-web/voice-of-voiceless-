import Section from './Section'

const PILLARS = [
  {
    title: 'Survivor stories',
    description:
      'A safe space to share testimony — publicly or anonymously — so the world hears what happened in Tigray.',
    href: '#stories',
  },
  {
    title: 'Evidence collection',
    description:
      'Structured intake for documents, testimony, and materials that may support future prosecutions.',
    href: '#evidence',
  },
  {
    title: 'Atrocity documentation',
    description:
      'A growing archive of verified accounts and records from the war, preserved for history and justice.',
    href: '#archive',
  },
  {
    title: 'Legal fund',
    description:
      'Community fundraising to retain an international lawyer and pursue accountability.',
    href: '#fundraise',
  },
  {
    title: 'Path to justice',
    description:
      'How collected evidence feeds investigations, tribunals, and demands for perpetrator accountability.',
    href: '#justice',
  },
  {
    title: 'Healing support',
    description:
      'Psychologists and counselors invited to offer trauma-informed care to survivors.',
    href: '#healing',
  },
]

export default function Pillars() {
  return (
    <Section
      id="mission"
      title="Our mission"
      subtitle="How Tigray Truth Chronicle documents atrocities and fights for justice."
    >
      <ul className="pillars">
        {PILLARS.map(({ title, description, href }) => (
          <li key={href} className="pillars__card">
            <h3 className="pillars__title">{title}</h3>
            <p className="pillars__text">{description}</p>
            <a href={href} className="pillars__link">
              Learn more →
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
