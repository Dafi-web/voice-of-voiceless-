export default function Section({
  id,
  title,
  subtitle,
  children,
  dark = false,
  centered = true,
  wide = false,
}) {
  return (
    <section
      id={id}
      className={`section ${dark ? 'section--dark' : ''} ${wide ? 'section--wide' : ''}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="section__container">
        {(title || subtitle) && (
          <header className={`section__head ${centered ? 'section__head--center' : ''}`}>
            {title && (
              <h2 id={`${id}-heading`} className="section__title">
                {title}
              </h2>
            )}
            {subtitle && <p className="section__subtitle">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
