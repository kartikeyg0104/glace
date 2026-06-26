import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Menu.css'

gsap.registerPlugin(ScrollTrigger)

const COURSES = [
  {
    no: '01',
    name: 'Frozen Oyster',
    desc: 'Glacier ice, dill oil, finger lime, a whisper of horseradish snow.',
    tag: 'Sea',
    img: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    no: '02',
    name: 'Smoked Beetroot',
    desc: 'Aged in birch ash, charred over pine, blackcurrant, goat curd.',
    tag: 'Earth',
    img: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1200&q=80',
  },
  {
    no: '03',
    name: 'Cured Arctic Char',
    desc: 'Forty-day cure, fermented gooseberry, frozen buttermilk, sorrel.',
    tag: 'River',
    img: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=1200&q=80',
  },
  {
    no: '04',
    name: 'Venison & Juniper',
    desc: 'Slow fire, bone marrow, lingonberry, a glaze of dark spruce.',
    tag: 'Forest',
    img: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1200&q=80',
  },
  {
    no: '05',
    name: 'Frost Pear',
    desc: 'Liquid nitrogen sorbet, brown butter, toasted hay, white chocolate.',
    tag: 'Sweet',
    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function Menu() {
  const root = useRef(null)
  const [active, setActive] = useState(COURSES[0].img)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray('.menu__row')
      rows.forEach((rowEl) => {
        gsap.from(rowEl.querySelectorAll('[data-reveal]'), {
          yPercent: 120,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.05,
          scrollTrigger: { trigger: rowEl, start: 'top 88%' },
        })
        // swap the floating preview image as each row passes center
        ScrollTrigger.create({
          trigger: rowEl,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActive(rowEl.dataset.img)
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="menu" id="menu" ref={root}>
      <div className="menu__head">
        <p className="eyebrow">The Tasting</p>
        <h2 className="menu__title display">
          A menu that <em>melts</em> with the season
        </h2>
      </div>

      <div className="menu__body">
        <ul className="menu__list">
          {COURSES.map((c) => (
            <li className="menu__row" key={c.no} data-img={c.img} data-cursor>
              <span className="menu__no" data-reveal>{c.no}</span>
              <div className="menu__main">
                <h3 className="menu__name display" data-reveal>{c.name}</h3>
                <p className="menu__desc" data-reveal>{c.desc}</p>
              </div>
              <span className="menu__tag" data-reveal>{c.tag}</span>
            </li>
          ))}
        </ul>

        <div className="menu__preview" aria-hidden="true">
          <div className="menu__preview-frame">
            {COURSES.map((c) => (
              <div
                key={c.no}
                className={`menu__preview-img ${active === c.img ? 'is-active' : ''}`}
                style={{ backgroundImage: `url('${c.img}')` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
