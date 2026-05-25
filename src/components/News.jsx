import Section from './Section'

const ARTICLES = [
  {
    id: 1,
    date: 'March 2024',
    category: 'Investigation',
    title: 'Wartime sexual violence in Tigray: patterns of systematic abuse',
    excerpt:
      'Human rights monitors document widespread rape and gender-based violence against women and girls during the conflict — crimes that may constitute crimes against humanity under international law.',
    featured: true,
  },
  {
    id: 2,
    date: 'February 2024',
    category: 'Survivor voices',
    title: '“They must hear us”: survivors call for international accountability',
    excerpt:
      'Women who survived sexual violence in Tigray speak of the urgent need for documentation, protection, and prosecution of those responsible.',
  },
  {
    id: 3,
    date: 'January 2024',
    category: 'Evidence',
    title: 'Why preserving testimony matters for future tribunals',
    excerpt:
      'Legal experts explain how carefully collected survivor accounts and forensic evidence can support cases before international courts.',
  },
  {
    id: 4,
    date: 'December 2023',
    category: 'Crisis report',
    title: 'Humanitarian crisis in Tigray: civilians left without protection',
    excerpt:
      'Reports from the region describe displacement, destroyed health facilities, and limited access to care for survivors of sexual violence.',
  },
]

function NewsCard({ date, category, title, excerpt, featured }) {
  return (
    <article className={`news-card ${featured ? 'news-card--featured' : ''}`}>
      <div className="news-card__meta">
        <span className="news-card__category">{category}</span>
        <time className="news-card__date">{date}</time>
      </div>
      <h3 className="news-card__title">{title}</h3>
      <p className="news-card__excerpt">{excerpt}</p>
      <a href="#contact" className="news-card__link">
        Report or contribute →
      </a>
    </article>
  )
}

export default function News() {
  const [featured, ...rest] = ARTICLES

  return (
    <Section
      id="news"
      title="News & reports"
      subtitle="Independent coverage exposing what is happening to women, girls, and civilians in Tigray, Ethiopia."
    >
      <div className="news-grid">
        <NewsCard {...featured} featured />
        <div className="news-grid__list">
          {rest.map((article) => (
            <NewsCard key={article.id} {...article} />
          ))}
        </div>
      </div>

      <p className="section__note news__note">
        Articles are editorial summaries for awareness. Verified field reports and
        survivor-led stories will be published as they are confirmed.
      </p>
    </Section>
  )
}
