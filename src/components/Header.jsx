import { useState, useEffect } from 'react'
import Logo from './Logo'

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#truth', label: 'The truth' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#justice', label: 'Justice' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

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
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
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
          <a href="#contact" className="btn btn--primary btn--sm">
            Speak up
          </a>
        </nav>
      </div>

      {open && (
        <button
          type="button"
          className="header__backdrop"
          aria-label="Close menu"
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
        <a href="#contact" className="btn btn--primary header__cta" onClick={close}>
          Speak up
        </a>
      </nav>
    </header>
  )
}
