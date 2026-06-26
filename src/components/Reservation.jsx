import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import './Reservation.css'

export default function Reservation() {
  const reveal = useReveal({ start: 'top 78%' })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', date: '', guests: '2', time: '19:00' })

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="reserve" id="reserve" ref={reveal}>
      <div className="reserve__inner">
        <div className="reserve__intro">
          <p className="eyebrow" data-reveal>Reservations</p>
          <h2 className="reserve__title display">
            <span className="line"><span data-reveal>Join us by</span></span>
            <span className="line"><span data-reveal><em>candlelight</em></span></span>
          </h2>
          <p className="reserve__note" data-reveal>
            Service begins at seven. The room seats twelve. We recommend booking
            two to three weeks ahead — the kitchen confirms every table by hand.
          </p>
          <div className="reserve__detail" data-reveal>
            <span>Wed — Sun · 18:30 – 23:00</span>
            <span>14 Frostgate Lane, Old City</span>
            <span>hello@glace.dining · +1 (555) 018‑2240</span>
          </div>
        </div>

        <div className="reserve__card frost" data-reveal>
          {sent ? (
            <div className="reserve__done">
              <h3 className="display">Merci, {form.name || 'guest'}.</h3>
              <p>
                Your request for {form.guests} at {form.time} is received. We’ll
                confirm by email within the hour.
              </p>
              <button className="reserve__again" onClick={() => setSent(false)}>
                Make another request
              </button>
            </div>
          ) : (
            <form className="reserve__form" onSubmit={submit}>
              <label>
                <span>Full name</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Your name"
                />
              </label>
              <div className="reserve__row">
                <label>
                  <span>Date</span>
                  <input type="date" required value={form.date} onChange={update('date')} />
                </label>
                <label>
                  <span>Time</span>
                  <select value={form.time} onChange={update('time')}>
                    {['18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span>Guests</span>
                <select value={form.guests} onChange={update('guests')}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="reserve__submit">
                Request a table
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
