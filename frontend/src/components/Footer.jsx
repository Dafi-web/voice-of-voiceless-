import Logo from './Logo'
import { SITE_TAGLINE, SITE_DATE, SITE_OWNER_NAME, SITE_NAME } from '../constants/brand'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <Logo size={36} className="footer__logo" />
        <p className="footer__tagline">{SITE_TAGLINE}</p>
        <nav className="footer__links" aria-label="Footer">
          <a href="#about">About</a>
          <a href="#truth">The truth</a>
          <a href="#gallery">Gallery</a>
          <a href="#stories">Share story</a>
          <a href="#evidence">Evidence</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="footer__copy">
          © {SITE_DATE} · {SITE_OWNER_NAME} · {SITE_NAME}
        </p>
        <p className="footer__year">
          Transforming silence into awareness, empathy, and action
        </p>
      </div>
    </footer>
  )
}
