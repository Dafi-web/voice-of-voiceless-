import Section from './Section'
import {
  SITE_NAME,
  SITE_OWNER_NAME,
  SITE_DATE,
  FOUNDER_GOALS,
  SITE_OWNER_NOTE,
  FOUNDER_PHOTO,
  MISSION_INTRO,
  MISSION_BELIEF,
  MISSION_WORK,
  MISSION_TIGRAY,
} from '../constants/brand'

const CARDS = [
  {
    icon: '◆',
    title: 'Stories unheard',
    text: 'We platform narratives that are ignored, hidden, or denied — starting with survivors in Tigray.',
  },
  {
    icon: '◇',
    title: 'Visuals & evidence',
    text: 'Through photographs, testimony, and documentation, silence becomes a visible record.',
  },
  {
    icon: '◎',
    title: 'Awareness & action',
    text: 'We turn empathy into demand for truth, accountability, and justice under international law.',
  },
]

export default function About() {
  return (
    <Section
      id="about"
      title="Our mission"
      subtitle={`${SITE_NAME} — founded ${SITE_DATE} by ${SITE_OWNER_NAME}.`}
    >
      <div className="mission-block">
        <p className="prose prose--lead">{MISSION_INTRO}</p>
        <p className="prose">{MISSION_BELIEF}</p>
        <p className="prose">{MISSION_WORK}</p>
        <p className="prose prose--emphasis">{MISSION_TIGRAY}</p>
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
            <p className="founder-card__label">Founder · {SITE_DATE}</p>
            <h3 className="founder-card__name">{SITE_OWNER_NAME}</h3>
            <p className="founder-card__role">Founder · {SITE_NAME}</p>
          </div>
        </div>

        <p className="founder-card__text">{SITE_OWNER_NOTE}</p>

        <ul className="founder-card__goals">
          {FOUNDER_GOALS.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      </aside>

      <ul className="cards">
        {CARDS.map(({ icon, title, text }) => (
          <li key={title} className="card">
            <span className="card__icon" aria-hidden="true">
              {icon}
            </span>
            <h3 className="card__title">{title}</h3>
            <p className="card__text">{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
