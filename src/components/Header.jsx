import { useState } from 'react'
import { SITE_NAME } from '../constants/brand'

const NAV_LINKS = [
  { href: '#truth', label: 'The truth' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#justice', label: 'Justice' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="header__inner">
        <a href="#" className="header__brand" onClick={closeMenu}>
          <span className="header__logo-name">{SITE_NAME}</span>
        </a>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <span className="header__toggle-bar" />
          <span className="header__toggle-bar" />
          <span className="header__toggle-bar" />
        </button>

        <nav
          id="main-nav"
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          aria-label="Main"
        >
          <ul className="header__list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="header__link" onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
