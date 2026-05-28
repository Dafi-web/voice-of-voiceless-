import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function hasAdminToken() {
  return !!localStorage.getItem('admin_token')
}

export default function FooterAdminLinks() {
  const [authed, setAuthed] = useState(hasAdminToken)

  useEffect(() => {
    const sync = () => setAuthed(hasAdminToken())
    window.addEventListener('admin-token-changed', sync)
    window.addEventListener('focus', sync)
    return () => {
      window.removeEventListener('admin-token-changed', sync)
      window.removeEventListener('focus', sync)
    }
  }, [])

  return (
    <nav className="footer__admin" aria-label="Admin">
      {authed ? (
        <>
          <Link to="/admin">Admin dashboard</Link>
          <span className="footer__admin-sep" aria-hidden="true">
            ·
          </span>
          <Link to="/admin#password">Change password</Link>
        </>
      ) : (
        <>
          <Link to="/admin">Admin login</Link>
          <span className="footer__admin-sep" aria-hidden="true">
            ·
          </span>
          <Link to="/admin#password">Change password</Link>
        </>
      )}
    </nav>
  )
}
