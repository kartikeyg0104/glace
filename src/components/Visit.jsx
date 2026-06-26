import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import './Visit.css'

const HOURS = [
  { day: 'Tuesday — Thursday', time: '18:00 — late' },
  { day: 'Friday — Saturday', time: '17:30 — late' },
  { day: 'Sunday', time: '13:00 — 21:00' },
  { day: 'Monday', time: 'Closed' },
]

export default function Visit() {
  const reveal = useReveal({ start: 'top 78%', stagger: 0.08 })

  return (
    <section className="visit" id="visit" ref={reveal}>
      <div className="visit__head">
        <p className="eyebrow" data-reveal>Find us</p>
        <h2 className="visit__title display" data-reveal>
          A glass house<br />on the <em>fjord</em>
        </h2>
      </div>

      <div className="visit__grid">
        <div className="visit__card" data-reveal>
          <h3 className="visit__label">Hours</h3>
          <ul className="visit__hours">
            {HOURS.map((h) => (
              <li key={h.day}>
                <span>{h.day}</span>
                <span className={h.time === 'Closed' ? 'is-closed' : ''}>
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="visit__card" data-reveal>
          <h3 className="visit__label">Address</h3>
          <address className="visit__address">
            GLACÉ — Maison de Cuisine<br />
            14 Isbjørn Kai, Pier Nine<br />
            5003 Bergen, Norway
          </address>
          <a
            className="visit__map-link"
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
          >
            Open in maps →
          </a>
        </div>

        <div className="visit__card" data-reveal>
          <h3 className="visit__label">Contact</h3>
          <ul className="visit__contact">
            <li>
              <span>Reservations</span>
              <a href="tel:+4755000000">+47 55 00 00 00</a>
            </li>
            <li>
              <span>General</span>
              <a href="mailto:hello@glace.dining">hello@glace.dining</a>
            </li>
            <li>
              <span>Press</span>
              <a href="mailto:press@glace.dining">press@glace.dining</a>
            </li>
          </ul>
        </div>

        <div className="visit__map" data-reveal aria-hidden="true">
          <div className="visit__map-grid" />
          <div className="visit__pin">
            <span />
          </div>
          <span className="visit__coords">60.39°N · 5.32°E</span>
        </div>
      </div>
    </section>
  )
}
