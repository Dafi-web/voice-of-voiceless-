import { SITE_NAME, SITE_TAGLINE } from '../constants/brand'

export default function Logo({ size = 48, showText = true, className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <svg
        className="logo__mark"
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" opacity="0.2" />
        <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.08" />
        <path
          d="M32 14v36M20 22h24"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M20 22c0 8-6 12-6 16a6 6 0 0012 0c0-4-6-8-6-16zM44 22c0 8-6 12-6 16a6 6 0 0012 0c0-4-6-8-6-16z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M32 10c-2 4-6 5-6 9a6 6 0 0012 0c0-4-4-5-6-9z"
          fill="var(--color-gold)"
          stroke="var(--color-gold)"
          strokeWidth="0.5"
        />
        <path d="M32 16v2" stroke="var(--color-gold-light)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {showText && (
        <span className="logo__text">
          <span className="logo__name">{SITE_NAME}</span>
          <span className="logo__sub">Tigray · Justice</span>
        </span>
      )}
    </span>
  )
}
