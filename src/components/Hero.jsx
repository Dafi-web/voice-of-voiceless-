import { SITE_NAME } from '../constants/brand'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__inner">
        <h1 id="hero-heading" className="hero__title">
          What happened in Tigray must be known
        </h1>
        <p className="hero__lead">
          During the war in Tigray, Ethiopia, women and girls were raped and civilians
          suffered atrocities. Much of this was hidden from the world.{' '}
          <strong>{SITE_NAME}</strong> exists to expose the truth and demand justice.
        </p>
        <a href="#truth" className="btn btn--primary">
          Read the truth
        </a>
      </div>
    </section>
  )
}
