import Logo from './Logo'
import { SITE_TAGLINE } from '../constants/brand'

const PILLARS = [
  { label: 'Expose the truth', href: '#truth' },
  { label: 'Document evidence', href: '#gallery' },
  { label: 'Demand justice', href: '#justice' },
]

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__container">
        <div className="hero__logo-wrap">
          <Logo size={72} showText={false} className="hero__logo" />
        </div>

        <p className="hero__eyebrow">{SITE_TAGLINE}</p>

        <h1 id="hero-heading" className="hero__title">
          The world must know what happened in{' '}
          <span className="hero__highlight">Tigray</span>
        </h1>

        <p className="hero__lead">
          A genocide was carried out in Tigray. Women and girls were raped and sexually
          tortured as weapons of war. The government hid the truth.{' '}
          <strong>Rahwa</strong> built this site so the world cannot look away — and
          justice can follow.
        </p>

        <div className="hero__actions">
          <a href="#about" className="btn btn--primary btn--lg">
            Our mission
          </a>
          <a href="#gallery" className="btn btn--outline btn--lg hero__btn-light">
            See the evidence
          </a>
        </div>

        <nav className="hero__pills" aria-label="Quick links">
          {PILLARS.map(({ label, href }) => (
            <a key={href} href={href} className="hero__pill">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
