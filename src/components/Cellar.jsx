import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '../hooks/useReveal'
import './Cellar.css'

gsap.registerPlugin(ScrollTrigger)

const POURS = [
  { region: 'Jura, France', name: 'Savagnin “Sous Voile”', note: 'Oxidative, walnut, sea salt', year: '2017' },
  { region: 'Mosel, Germany', name: 'Riesling Kabinett', note: 'Slate, white peach, electric acid', year: '2019' },
  { region: 'Etna, Italy', name: 'Nerello Mascalese', note: 'Volcanic ash, wild cherry', year: '2018' },
  { region: 'Champagne', name: 'Blanc de Noirs, Zero', note: 'Brioche, chalk, fine bead', year: '2015' },
]

export default function Cellar() {
  const root = useRef(null)
  const reveal = useReveal({ start: 'top 78%' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.cellar__img-inner', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: '.cellar__media',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.from('.cellar__pour', {
        opacity: 0,
        x: -30,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.cellar__list', start: 'top 82%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="cellar" id="cellar" ref={root}>
      <div className="cellar__grid">
        <div className="cellar__media">
          <div className="cellar__img">
            <div
              className="cellar__img-inner"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
          </div>
          <div className="cellar__badge frost">
            <span className="display">1,400</span>
            <span>references in the ice cellar</span>
          </div>
        </div>

        <div className="cellar__copy" ref={reveal}>
          <p className="eyebrow" data-reveal>The Cellar</p>
          <h2 className="cellar__title display">
            <span className="line"><span data-reveal>Wines grown</span></span>
            <span className="line"><span data-reveal>by <em>hand</em>, poured</span></span>
            <span className="line"><span data-reveal>with intent</span></span>
          </h2>
          <p className="cellar__lead" data-reveal>
            Our sommelier works only with low-intervention growers — many
            farming a single hillside. A pairing changes nightly; these are
            pouring this week.
          </p>

          <ul className="cellar__list">
            {POURS.map((p) => (
              <li className="cellar__pour" key={p.name}>
                <div>
                  <span className="cellar__region">{p.region}</span>
                  <span className="cellar__name">{p.name}</span>
                  <span className="cellar__note">{p.note}</span>
                </div>
                <span className="cellar__year display">{p.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
