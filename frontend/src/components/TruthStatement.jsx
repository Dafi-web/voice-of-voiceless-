import Section from './Section'

const FACTS = [
  {
    stat: 'Documented',
    label: 'Survivor testimonies preserved for accountability',
  },
  {
    stat: 'Ongoing',
    label: 'Investigation into wartime sexual violence in Tigray',
  },
  {
    stat: 'Global',
    label: 'Advocacy for international legal action',
  },
]

export default function TruthStatement() {
  return (
    <Section id="truth" title="What is happening in Tigray" alt>
      <div className="truth">
        <div className="truth__prose">
          <p className="truth__lead">
            During the war in Tigray, Ethiopia, countless women and girls have endured
            sexual violence used as a weapon of war. Rape, abduction, and systematic
            abuse have been reported across the region — often targeting the most
            vulnerable civilians.
          </p>
          <p>
            The Tigray Truth Chronicle exists to expose these realities to the world:
            through verified news, survivor testimony, preserved evidence, and
            relentless documentation. Silence protects perpetrators. Truth is the
            first step toward justice.
          </p>
        </div>

        <ul className="truth__facts">
          {FACTS.map(({ stat, label }) => (
            <li key={label} className="truth__fact">
              <span className="truth__stat">{stat}</span>
              <span className="truth__label">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
