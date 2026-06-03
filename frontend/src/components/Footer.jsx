import Logo from './Logo'
import { useLanguage } from '../i18n/LanguageContext'
import { SITE_DATE, SITE_OWNER_NAME, SITE_NAME } from '../constants/brand'

export default function Footer() {
  const { t } = useLanguage()

  const links = [
    { href: '#about', label: t('nav.about') },
    { href: '#truth', label: t('nav.truth') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#stories', label: t('nav.stories') },
    { href: '#evidence', label: t('nav.evidence') },
    { href: '#contact', label: t('nav.contact') },
  ]

  return (
    <footer className="footer">
      <div className="footer__inner">
        <Logo size={36} className="footer__logo" />
        <p className="footer__tagline">{t('brand.tagline')}</p>
        <nav className="footer__links" aria-label="Footer">
          {links.map(({ href, label }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <p className="footer__copy">
          © {SITE_DATE} · {SITE_OWNER_NAME} · {SITE_NAME}
        </p>
        <p className="footer__year">{t('footer.tagline')}</p>
      </div>
    </footer>
  )
}
