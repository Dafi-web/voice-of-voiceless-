import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, languages } = useLanguage()

  return (
    <label className={`lang-switch ${className}`.trim()}>
      <span className="sr-only">Language</span>
      <select
        className="lang-switch__select"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        aria-label="Language"
      >
        {languages.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </label>
  )
}
