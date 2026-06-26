import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '../hooks/useReveal'
import './Experiences.css'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    no: '01',
    name: 'Le Grand Tasting',
    price: '€245',
    meta: 'Nine courses · 2.5 hours',
    desc: 'Our signature journey through the season — nine plates, paired bread service, and a closing course at the cellar door.',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    no: '02',
    name: "The Chef's Table",
    price: '€395',
    meta: 'Six seats · at the pass',
    desc: 'Dine at the heart of the kitchen. Elias and the brigade cook before you, narrating each course as it leaves the fire.',
    img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    no: '03',
    name: 'The Frost Salon',
    price: 'On request',
    meta: 'Private · up to 14',
    desc: 'A private room beneath the glass ceiling for celebrations, tastings and quiet dinners, with a bespoke menu written for the night.',
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
  },
  {
    no: '04',
    name: 'Sommelier Journey',
    price: '+€140',
    meta: 'Pairing · nine pours',
    desc: 'A glass for every course — low-intervention growers, rare verticals, and a final pour drawn straight from the ice cellar.',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function Experiences() {
  const root = useRef(null)
  const reveal = useReveal({ start: 'top 80%' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp__card', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.exp__grid', start: 'top 82%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="exp" id="experiences" ref={root}>
      <div className="exp__head" ref={reveal}>
        <p className="eyebrow" data-reveal>Experiences</p>
        <h2 className="exp__title display">
          <span className="line"><span data-reveal>Four ways to</span></span>
          <span className="line"><span data-reveal>spend an <em>evening</em></span></span>
        </h2>
        <p className="exp__lead" data-reveal>
          Every experience is built around the same nightly harvest — choose how
          close to the fire you would like to sit.
        </p>
      </div>

      <div className="exp__grid">
        {ITEMS.map((it) => (
          <article className="exp__card" key={it.no} data-cursor>
            <div className="exp__media">
              <div
                className="exp__img"
                style={{ backgroundImage: `url('${it.img}')` }}
              />
            </div>
            <div className="exp__info">
              <div className="exp__top">
                <span className="exp__no">{it.no}</span>
                <span className="exp__price">{it.price}</span>
              </div>
              <h3 className="exp__name display">{it.name}</h3>
              <p className="exp__meta">{it.meta}</p>
              <p className="exp__desc">{it.desc}</p>
              <a className="exp__link" href="#reserve">
                Reserve <span>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
