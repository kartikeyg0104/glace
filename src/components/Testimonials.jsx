import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

const GUESTS = [
  {
    text: 'We came for a birthday and stayed three hours without noticing time pass. Every course felt like a small confession from the kitchen.',
    name: 'Mar a & Tomas',
    detail: 'Anniversary, Chef’s Table',
  },
  {
    text: 'The frozen oyster alone is worth the journey. I have eaten widely and never tasted cold used with such precision.',
    name: 'J. Okonkwo',
    detail: 'Visiting from Lagos',
  },
  {
    text: 'A room of twelve strangers who all left as one table. Warm in a way you would never expect from a place built around ice.',
    name: 'The Lindqvist family',
    detail: 'Le Grand Tasting',
  },
  {
    text: 'Service so quiet and exact it felt choreographed. The pairing took me to four countries without leaving my chair.',
    name: 'R. Beaumont',
    detail: 'Sommelier Journey',
  },
]

export default function Testimonials() {
  const root = useRef(null)
  const [i, setI] = useState(0)

  // scroll-pinned: advance the quote as the user scrolls through the section
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: '+=300%',
        pin: '.test__inner',
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(
            GUESTS.length - 1,
            Math.floor(self.progress * GUESTS.length)
          )
          setI(idx)
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="test" id="testimonials" ref={root}>
      <div className="test__inner">
        <p className="eyebrow test__eyebrow">Guests</p>
        <div className="test__stage">
          {GUESTS.map((g, idx) => (
            <figure
              key={idx}
              className={`test__item ${idx === i ? 'is-active' : ''}`}
            >
              <blockquote className="display">“{g.text}”</blockquote>
              <figcaption>
                <span className="test__name">{g.name}</span>
                <span className="test__detail">{g.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="test__dots">
          {GUESTS.map((_, idx) => (
            <span key={idx} className={idx === i ? 'is-active' : ''} />
          ))}
        </div>
      </div>
    </section>
  )
}
