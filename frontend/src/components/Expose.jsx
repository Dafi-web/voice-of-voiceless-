import Section from './Section'
import { useLanguage } from '../i18n/LanguageContext'

export default function Expose() {
  const { t } = useLanguage()
  const facts = t('truth.facts')

  return (
    <Section
      id="truth"
      title={t('truth.title')}
      subtitle={t('truth.subtitle')}
      dark
    >
      <div className="truth-block">
        <p className="prose prose--on-dark">{t('truth.p1')}</p>
        <p className="prose prose--on-dark">{t('truth.p2')}</p>
      </div>

      <ul className="facts-grid">
        {Array.isArray(facts) &&
          facts.map(({ title, text }) => (
            <li key={title} className="fact-card">
              <h3 className="fact-card__title">{title}</h3>
              <p className="fact-card__text">{text}</p>
            </li>
          ))}
      </ul>

      <blockquote className="callout callout--dark">
        <p>{t('truth.callout')}</p>
      </blockquote>
    </Section>
  )
}
