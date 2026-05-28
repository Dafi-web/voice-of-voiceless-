import Section from './Section'

const PLACEHOLDER_ENTRIES = [
  {
    id: 1,
    category: 'Testimony',
    title: 'Account from survivors in rural Tigray',
    date: 'Pending verification',
    excerpt:
      'Placeholder entry — published stories will appear here after survivor consent and fact-checking.',
  },
  {
    id: 2,
    category: 'Incident report',
    title: 'Documented attack on civilian infrastructure',
    date: 'Pending verification',
    excerpt:
      'The archive will catalog verified atrocity reports from the war for historians and legal teams.',
  },
  {
    id: 3,
    category: 'Legal reference',
    title: 'Framework for international accountability',
    date: 'Resource',
    excerpt:
      'Guides on crimes against humanity, command responsibility, and evidence standards for tribunals.',
  },
]

export default function DocumentArchive() {
  return (
    <Section
      id="archive"
      title="Atrocity documentation"
      subtitle="A permanent record of what occurred during the war — verified, dated, and preserved."
      alt
    >
      <p className="section__note">
        Entries below are placeholders. Real documentation will be added only after
        verification and, where applicable, survivor consent.
      </p>

      <ul className="archive">
        {PLACEHOLDER_ENTRIES.map(({ id, category, title, date, excerpt }) => (
          <li key={id} className="archive__item">
            <span className="archive__category">{category}</span>
            <h3 className="archive__title">{title}</h3>
            <time className="archive__date">{date}</time>
            <p className="archive__excerpt">{excerpt}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
