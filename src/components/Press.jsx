import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '../hooks/useReveal'
import './Press.css'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { num: '2', sym: '★', label: 'Michelin Stars' },
  { num: '01', sym: '', label: 'Green Star, Sustainability' },
  { num: '#7', sym: '', label: "World's 50 Best (2025)" },
  { num: '6', sym: 'yrs', label: 'On the season, nightly' },
]

const QUOTES = [
  {
    text: 'A restaurant that does not cook ingredients so much as translate a landscape onto the plate.',
    source: 'The Continental Review',
  },
  {
    text: 'The most quietly radical dining room in the north. You leave changed.',
    source: 'Atlas Gastronomy',
  },
  {
    text: 'The frozen courses at Glacé are feats of engineering disguised as poetry.',
    source: 'Fjord & Fire',
  },
]

export default function Press() {
  const root = useRef(null)
  const reveal = useReveal({ start: 'top 80%' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.press__stat', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.press__stats', start: 'top 85%' },
      })
      gsap.from('.press__quote', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.press__quotes', start: 'top 85%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="press" id="press" ref={root}>
      <div className="press__head" ref={reveal}>
        <p className="eyebrow" data-reveal>Recognition</p>
        <h2 className="press__title display">
          <span className="line"><span data-reveal>Held in <em>high</em> regard</span></span>
        </h2>
      </div>

      <div className="press__stats">
        {STATS.map((s) => (
          <div className="press__stat" key={s.label}>
            <span className="press__num display">
              {s.num}
              <i>{s.sym}</i>
            </span>
            <span className="press__label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="press__quotes">
        {QUOTES.map((q) => (
          <figure className="press__quote" key={q.source}>
            <blockquote className="display">“{q.text}”</blockquote>
            <figcaption>— {q.source}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
