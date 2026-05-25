import Logo from './Logo'
import { SITE_TAGLINE, SITE_YEAR, SITE_OWNER_NAME } from '../constants/brand'

export default function Footer() {
  const ownerLine = SITE_OWNER_NAME
    ? `Owned by ${SITE_OWNER_NAME}`
    : 'Owned and led by the founder'

  return (
    <footer className="footer">
      <div className="footer__inner">
        <Logo size={36} className="footer__logo" />
        <p className="footer__tagline">{SITE_TAGLINE}</p>
        <nav className="footer__links" aria-label="Footer">
          <a href="#about">About</a>
          <a href="#truth">The truth</a>
          <a href="#gallery">Gallery</a>
          <a href="#justice">Justice</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="footer__copy">
          © {SITE_YEAR} {ownerLine} · Voice of the Voiceless
        </p>
        <p className="footer__year">Website established {SITE_YEAR}</p>
      </div>
    </footer>
  )
}
