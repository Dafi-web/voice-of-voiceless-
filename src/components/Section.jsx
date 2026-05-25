export default function Section({ id, title, subtitle, children, alt = false }) {
  return (
    <section
      id={id}
      className={`section ${alt ? 'section--alt' : ''}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="section__inner">
        <header className="section__header">
          <h2 id={`${id}-heading`} className="section__title">
            {title}
          </h2>
          {subtitle && <p className="section__subtitle">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
