import Section from './Section'
import { useLanguage } from '../i18n/LanguageContext'
import { SITE_NAME, SITE_OWNER_NAME, SITE_DATE, FOUNDER_PHOTO } from '../constants/brand'

export default function About() {
  const { t } = useLanguage()
  const cards = t('about.cards')
  const goals = t('brand.founderGoals')

  return (
    <Section
      id="about"
      title={t('about.title')}
      subtitle={t('about.subtitle', { siteName: SITE_NAME, date: SITE_DATE, owner: SITE_OWNER_NAME })}
    >
      <div className="mission-block">
        <p className="prose prose--lead">{t('brand.missionIntro')}</p>
        <p className="prose">{t('brand.missionBelief')}</p>
        <p className="prose">{t('brand.missionWork')}</p>
        <p className="prose prose--emphasis">{t('brand.missionTigray')}</p>
      </div>

      <aside className="founder-card">
        <div className="founder-card__profile">
          <img
            src={FOUNDER_PHOTO}
            alt={`${SITE_OWNER_NAME}, founder of ${SITE_NAME}`}
            className="founder-card__photo"
            width={200}
            height={250}
            loading="lazy"
          />
          <div className="founder-card__info">
            <p className="founder-card__label">{t('about.founderLabel', { date: SITE_DATE })}</p>
            <h3 className="founder-card__name">{SITE_OWNER_NAME}</h3>
            <p className="founder-card__role">{t('about.founderRole', { siteName: SITE_NAME })}</p>
          </div>
        </div>

        <p className="founder-card__text">{t('brand.founderNote', { date: SITE_DATE })}</p>

        <ul className="founder-card__goals">
          {Array.isArray(goals) &&
            goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
        </ul>
      </aside>

      <ul className="cards">
        {Array.isArray(cards) &&
          cards.map(({ title, text }) => (
            <li key={title} className="card">
              <span className="card__icon" aria-hidden="true">
                ◆
              </span>
              <h3 className="card__title">{title}</h3>
              <p className="card__text">{text}</p>
            </li>
          ))}
      </ul>
    </Section>
  )
}
