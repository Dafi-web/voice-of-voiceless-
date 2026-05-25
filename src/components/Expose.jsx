import Section from './Section'

const FACTS = [
  'Widespread rape and sexual violence against women and girls',
  'Killings, displacement, and attacks on civilians',
  'Destruction of homes, hospitals, and communities',
  'Survivors left without protection or accountability',
]

export default function Expose() {
  return (
    <Section id="truth" title="The truth they tried to hide">
      <p className="expose__intro">
        The government and its allies blocked journalists, shut down the internet, and
        downplayed the scale of the war. Survivors were silenced. The world was not
        told the full story.
      </p>

      <ul className="expose__list">
        {FACTS.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>

      <p className="expose__close">
        These are crimes. They cannot be forgotten. The perpetrators must face justice.
      </p>
    </Section>
  )
}
