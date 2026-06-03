import Section from './Section'
import Logo from './Logo'
import { useLanguage } from '../i18n/LanguageContext'

export default function Justice() {
  const { t } = useLanguage()
  const steps = t('justice.steps')

  return (
    <Section
      id="justice"
      title={t('justice.title')}
      subtitle={t('justice.subtitle')}
    >
      <div className="justice-block">
        <div className="justice-block__logo">
          <Logo size={56} showText={false} />
        </div>
        <div className="justice-block__content">
          <p className="prose">{t('justice.text')}</p>
          <ol className="justice-steps">
            {Array.isArray(steps) &&
              steps.map((step, i) => (
                <li key={step}>
                  <span className="justice-steps__num">{i + 1}</span>
                  {step}
                </li>
              ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
