import Section from './Section'

const FACTS = [
  {
    title: 'Genocide against Tigrayans',
    text: 'Mass killings, starvation, and deliberate destruction of Tigrayan people and culture — crimes the Ethiopian government and allies denied or minimized.',
  },
  {
    title: 'Rape and sexual violence as weapons',
    text: 'Women and girls were raped, gang-raped, and sexually tortured by soldiers and militias. Sexual violence was used to humiliate, terrorize, and break communities — not isolated acts, but a pattern of war.',
  },
  {
    title: 'Information deliberately hidden',
    text: 'Journalists expelled, phone lines cut, aid blocked, and official narratives pushed while survivors could not speak. The world was kept from knowing the full scale of genocide and abuse.',
  },
  {
    title: 'Survivors abandoned',
    text: 'Women left with trauma, injury, and stigma — without medical care, justice, or protection. Perpetrators have not been held accountable.',
  },
]

export default function Expose() {
  return (
    <Section
      id="truth"
      title="Genocide and sexual violence in Tigray"
      subtitle="What governments tried to hide — documented by survivors, investigators, and international media."
      dark
    >
      <div className="truth-block">
        <p className="prose prose--on-dark">
          The war in Tigray was not only a military conflict. It was an attack on an entire
          people — with <strong>genocide</strong>, mass atrocities, and{' '}
          <strong>systematic sexual violence</strong> against women and girls used as tools
          of war. Officials downplayed it. Media was blocked. We publish the truth here.
        </p>

        <p className="prose prose--on-dark">
          Rape was not a side effect — it was a strategy. Survivors report being targeted
          because of their ethnicity, because they were women, because destroying them
          destroyed their families and communities. That is a crime against humanity.
        </p>
      </div>

      <ul className="facts-grid">
        {FACTS.map(({ title, text }) => (
          <li key={title} className="fact-card">
            <h3 className="fact-card__title">{title}</h3>
            <p className="fact-card__text">{text}</p>
          </li>
        ))}
      </ul>

      <blockquote className="callout callout--dark">
        <p>
          Genocide and sexual violence cannot be erased by silence. They must be named,
          recorded, and prosecuted — for every survivor in Tigray who was denied justice.
        </p>
      </blockquote>
    </Section>
  )
}
