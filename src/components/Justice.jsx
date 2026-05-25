import Section from './Section'
import Logo from './Logo'

const STEPS = [
  'Truth on the record',
  'Evidence preserved',
  'Perpetrators identified',
  'Justice pursued',
]

export default function Justice() {
  return (
    <Section
      id="justice"
      title="Justice is the goal"
      subtitle="Hiding crimes protects no one. Exposing them is the beginning — prosecution is the end."
    >
      <div className="justice-block">
        <div className="justice-block__logo">
          <Logo size={56} showText={false} />
        </div>
        <div className="justice-block__content">
          <p className="prose">
            Justice means survivors heard, evidence secured, and leaders held accountable
            under Ethiopian and international law — including for conflict-related sexual
            violence.
          </p>
          <ol className="justice-steps">
            {STEPS.map((step, i) => (
              <li key={step}>
                <span className="justice-steps__num">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
