import { useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import './Faq.css'

const QA = [
  {
    q: 'Is there a dress code?',
    a: 'Smart casual and above. We have no jacket requirement, but most guests dress for the occasion. We simply ask that you arrive comfortable.',
  },
  {
    q: 'Can you accommodate dietary needs?',
    a: 'Yes. With at least 72 hours’ notice we tailor the full tasting for vegetarian, pescatarian and most allergies. Vegan menus are available on request. The kitchen cannot guarantee an allergen-free environment.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Reservations are held with a card. Cancellations made more than 48 hours ahead are refunded in full; inside 48 hours we charge a per-seat fee, as every course is prepared to order.',
  },
  {
    q: 'How long is a typical evening?',
    a: 'Le Grand Tasting runs about two and a half hours. The Chef’s Table and Sommelier Journey run closer to three. We seat once per evening so the table is yours for the night.',
  },
  {
    q: 'Are children welcome?',
    a: 'Guests of all ages are welcome at the early seating. For the late seating we ask that guests be twelve or older, in keeping with the pace of the room.',
  },
  {
    q: 'Do you offer gift experiences?',
    a: 'Yes — digital gift cards for any experience are available and never expire. They can be redeemed online or by telephone with our reservations team.',
  },
]

function Item({ q, a, open, onToggle }) {
  const body = useRef(null)
  return (
    <div className={`faq__item ${open ? 'is-open' : ''}`} data-reveal>
      <button className="faq__q" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <i className="faq__icon" aria-hidden="true" />
      </button>
      <div
        className="faq__a"
        style={{ height: open ? body.current?.scrollHeight : 0 }}
      >
        <p ref={body}>{a}</p>
      </div>
    </div>
  )
}

export default function Faq() {
  const reveal = useReveal({ start: 'top 80%', stagger: 0.06 })
  const [open, setOpen] = useState(0)

  return (
    <section className="faq" id="faq" ref={reveal}>
      <div className="faq__grid">
        <div className="faq__intro">
          <p className="eyebrow" data-reveal>Good to know</p>
          <h2 className="faq__title display" data-reveal>
            Questions,<br /><em>answered</em>
          </h2>
          <p className="faq__note" data-reveal>
            Anything else? Our reservations team is happy to help —
            <a href="#visit"> reach us here</a>.
          </p>
        </div>

        <div className="faq__list">
          {QA.map((item, i) => (
            <Item
              key={i}
              {...item}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
