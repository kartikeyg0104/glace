import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '../hooks/useReveal'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const root = useRef(null)
  const reveal = useReveal({ start: 'top 75%' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.about__img-inner', {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about__media',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="about" id="about" ref={root}>
      <div className="about__grid" ref={reveal}>
        <div className="about__copy">
          <p className="eyebrow" data-reveal>The Philosophy</p>
          <h2 className="about__title display">
            <span className="line"><span data-reveal>We cook the</span></span>
            <span className="line"><span data-reveal>landscape — frost,</span></span>
            <span className="line"><span data-reveal>fire and the</span></span>
            <span className="line"><span data-reveal><em>quiet between.</em></span></span>
          </h2>
          <p className="about__lead" data-reveal>
            Every plate at GLACÉ begins at first light in the northern
            valleys. We forage, we ferment, we wait. What arrives at your
            table is a single fleeting moment of a season, held still.
          </p>
          <div className="about__stats">
            <div data-reveal>
              <span className="about__num display">09</span>
              <span className="about__label">Courses, nightly</span>
            </div>
            <div data-reveal>
              <span className="about__num display">2★</span>
              <span className="about__label">Michelin, since 2021</span>
            </div>
            <div data-reveal>
              <span className="about__num display">12</span>
              <span className="about__label">Seats per service</span>
            </div>
          </div>
        </div>

        <div className="about__media">
          <div className="about__img">
            <div
              className="about__img-inner"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80')",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
