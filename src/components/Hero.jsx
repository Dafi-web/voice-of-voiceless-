import Logo from './Logo'
import {
  SITE_NAME,
  SITE_TAGLINE,
  MISSION_INTRO,
  SITE_OWNER_SHORT,
} from '../constants/brand'

const PILLARS = [
  { label: 'Our mission', href: '#about' },
  { label: 'The truth', href: '#truth' },
  { label: 'Gallery', href: '#gallery' },
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
          <span className="hero__highlight">{SITE_NAME}</span>
        </h1>

        <p className="hero__lead">{MISSION_INTRO}</p>

        <p className="hero__lead hero__lead--secondary">
          In Tigray, Ethiopia, genocide and sexual violence were hidden from the world.{' '}
          <strong>{SITE_OWNER_SHORT}</strong> built this platform so those stories are
          heard — and justice can follow.
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
