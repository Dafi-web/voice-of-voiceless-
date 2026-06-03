import Logo from './Logo'
import { useLanguage } from '../i18n/LanguageContext'
import { SITE_NAME, SITE_OWNER_SHORT } from '../constants/brand'

export default function Hero() {
  const { t } = useLanguage()

  const PILLARS = [
    { label: t('hero.pillarMission'), href: '#about' },
    { label: t('hero.pillarTruth'), href: '#truth' },
    { label: t('hero.pillarGallery'), href: '#gallery' },
  ]

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__container">
        <div className="hero__logo-wrap">
          <Logo size={72} showText={false} className="hero__logo" />
        </div>

        <p className="hero__eyebrow">{t('brand.tagline')}</p>

        <h1 id="hero-heading" className="hero__title">
          <span className="hero__highlight">{SITE_NAME}</span>
        </h1>

        <p className="hero__lead">{t('brand.missionIntro')}</p>

        <p className="hero__lead hero__lead--secondary">
          {t('hero.leadSecondary', { owner: SITE_OWNER_SHORT })}
        </p>

        <div className="hero__actions">
          <a href="#about" className="btn btn--primary btn--lg">
            {t('hero.ourMission')}
          </a>
          <a href="#gallery" className="btn btn--outline btn--lg hero__btn-light">
            {t('hero.seeEvidence')}
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
