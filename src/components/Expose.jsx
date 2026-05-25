import Section from './Section'

const FACTS = [
  {
    title: 'Sexual violence as a weapon',
    text: 'Rape and abuse targeted women and girls across Tigray during the conflict.',
  },
  {
    title: 'Civilians under attack',
    text: 'Killings, looting, and mass displacement destroyed communities.',
  },
  {
    title: 'Information blocked',
    text: 'Journalists barred, internet cut, and the true scale of crimes downplayed.',
  },
  {
    title: 'No accountability',
    text: 'Survivors left without protection while perpetrators walk free.',
  },
]

export default function Expose() {
  return (
    <Section
      id="truth"
      title="The truth they tried to hide"
      subtitle="What international investigators and survivors have reported from Tigray, Ethiopia."
      dark
    >
      <p className="prose prose--on-dark">
        For years, the full story was kept from the public. We publish it here — clearly,
        honestly, and without apology.
      </p>

      <ul className="facts-grid">
        {FACTS.map(({ title, text }) => (
          <li key={title} className="fact-card">
            <h3 className="fact-card__title">{title}</h3>
            <p className="fact-card__text">{text}</p>
          </li>
        ))}
      </ul>

      <blockquote className="callout callout--dark">
        <p>These are crimes against humanity. They must be recorded. Those responsible must answer in court.</p>
      </blockquote>
    </Section>
  )
}
