import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Seasons.css'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  {
    season: 'Winter',
    no: 'I',
    line: 'Ice, ash & patience',
    body: 'The cellar opens. Roots buried in autumn are pulled from the frost, smoked over birch, and served beside curds frozen at the pass.',
    img: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    season: 'Spring',
    no: 'II',
    line: 'First green of the thaw',
    body: 'Wild garlic, birch sap and the season’s earliest shoots. The kitchen lightens; the menu turns bright, raw and alive.',
    img: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1400&q=80',
  },
  {
    season: 'Summer',
    no: 'III',
    line: 'Long light, open fire',
    body: 'Stone fruit, sea herbs and shellfish landed at dawn. We cook outdoors over coals while the northern sun refuses to set.',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
  },
  {
    season: 'Autumn',
    no: 'IV',
    line: 'The forest gives back',
    body: 'Mushrooms, game and the last of the orchard. Everything is preserved, fermented and stored against the coming cold.',
    img: 'https://images.unsplash.com/photo-1507783548227-544c3b8fc065?auto=format&fit=crop&w=1400&q=80',
  },
]

export default function Seasons() {
  const root = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.seasons__panel')
      const getDistance = () => track.current.scrollWidth - window.innerWidth

      const tween = gsap.to(track.current, {
        x: () => -getDistance(),
        ease: 'none',
      })

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: () => '+=' + getDistance(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        animation: tween,
      })

      // subtle parallax on each panel's image as it crosses the viewport
      panels.forEach((panel) => {
        const img = panel.querySelector('.seasons__img')
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="seasons" ref={root}>
      <div className="seasons__track" ref={track}>
        <div className="seasons__panel seasons__intro">
          <p className="eyebrow">The Calendar</p>
          <h2 className="seasons__heading display">
            One kitchen,<br />four <em>seasons</em>
          </h2>
          <p className="seasons__scrollhint">Scroll →</p>
        </div>

        {PANELS.map((p) => (
          <article className="seasons__panel" key={p.season}>
            <div className="seasons__imgwrap">
              <div
                className="seasons__img"
                style={{ backgroundImage: `url('${p.img}')` }}
              />
              <span className="seasons__roman display">{p.no}</span>
            </div>
            <div className="seasons__copy">
              <span className="seasons__season">{p.season}</span>
              <h3 className="seasons__line display">{p.line}</h3>
              <p className="seasons__body">{p.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
