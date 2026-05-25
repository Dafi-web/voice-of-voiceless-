import { useState } from 'react'
import Section from './Section'

const GOAL = 150000
const RAISED = 12400

export default function Fundraising() {
  const [amount, setAmount] = useState('')
  const progress = Math.min(100, (RAISED / GOAL) * 100)

  const handleDonate = (e) => {
    e.preventDefault()
    alert(
      'Payment processing is not yet connected. Integrate Stripe, PayPal, or a trusted donation platform before accepting funds.',
    )
  }

  return (
    <Section
      id="fundraise"
      title="Legal defense fund"
      subtitle="Raise resources to retain an international lawyer who can pursue accountability for perpetrators."
    >
      <div className="fundraise">
        <div className="fundraise__stats">
          <div className="fundraise__stat">
            <span className="fundraise__label">Raised</span>
            <span className="fundraise__value">${RAISED.toLocaleString()}</span>
          </div>
          <div className="fundraise__stat">
            <span className="fundraise__label">Goal</span>
            <span className="fundraise__value">${GOAL.toLocaleString()}</span>
          </div>
        </div>

        <div
          className="fundraise__bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Fundraising progress"
        >
          <div className="fundraise__fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="fundraise__percent">{progress.toFixed(1)}% of goal</p>

        <div className="info-box">
          <h3 className="info-box__title">How funds are used</h3>
          <ul>
            <li>Retaining international counsel experienced in conflict-related sexual violence</li>
            <li>Legal research, filings, and coordination with human rights bodies</li>
            <li>Secure evidence preservation and expert witness costs</li>
            <li>Transparent reporting to donors (to be published when fund is active)</li>
          </ul>
        </div>

        <form className="form form--inline" onSubmit={handleDonate}>
          <label htmlFor="donate-amount" className="form-field__label">
            Donation amount (USD)
          </label>
          <div className="fundraise__donate-row">
            <input
              id="donate-amount"
              type="number"
              min="1"
              step="1"
              className="form-field__input"
              placeholder="50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button type="submit" className="btn btn--primary">
              Donate
            </button>
          </div>
        </form>
      </div>
    </Section>
  )
}
