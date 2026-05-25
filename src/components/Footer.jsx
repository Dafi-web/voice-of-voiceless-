import { SITE_NAME, SITE_TAGLINE } from '../constants/brand'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__tagline">{SITE_TAGLINE}</p>
      <p className="footer__copy">© {new Date().getFullYear()} {SITE_NAME}</p>
    </footer>
  )
}
