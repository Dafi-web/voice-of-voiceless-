import { useState, useEffect } from 'react'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../i18n/LanguageContext'

export default function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const NAV = [
    { href: '#about', label: t('nav.about') },
    { href: '#truth', label: t('nav.truth') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#stories', label: t('nav.stories') },
    { href: '#evidence', label: t('nav.evidence') },
    { href: '#contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="header">
      <div className="header__inner">
        <a href="#" className="header__brand" onClick={close}>
          <Logo size={40} />
        </a>

        <button
          type="button"
          className="header__menu-btn"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? t('nav.closeMenu') : t('nav.openMenu')}</span>
          <span className={`header__burger ${open ? 'is-open' : ''}`} />
        </button>

        <nav className="header__nav header__nav--desktop" aria-label="Main desktop">
          <ul className="header__links">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
          <a href="#contact" className="btn btn--primary btn--sm">
            {t('nav.speakUp')}
          </a>
        </nav>
      </div>

      {open && (
        <button
          type="button"
          className="header__backdrop"
          aria-label={t('nav.closeMenu')}
          onClick={close}
        />
      )}

      <nav
        id="site-nav"
        className={`header__nav header__nav--mobile ${open ? 'is-open' : ''}`}
        aria-label="Main mobile"
        aria-hidden={!open}
      >
        <ul className="header__links">
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={close}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <LanguageSwitcher className="lang-switch--mobile" />
        <a href="#contact" className="btn btn--primary header__cta" onClick={close}>
          {t('nav.speakUp')}
        </a>
      </nav>
    </header>
  )
}
