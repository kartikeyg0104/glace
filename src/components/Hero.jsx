import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ loaded }) {
  const root = useRef(null)

  // intro reveal — fires once the loader finishes
  useEffect(() => {
    if (!loaded) return
    const ctx = gsap.context(() => {
      gsap.to('.hero__title .line span', {
        yPercent: 0,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.1,
      })
      gsap.to('.hero__meta [data-fade]', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.5,
      })
      gsap.to('.hero__scroll', { opacity: 1, duration: 1, delay: 1.1 })
    }, root)
    return () => ctx.revert()
  }, [loaded])

  // parallax on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero__bg', {
        yPercent: 22,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('.hero__title', {
        yPercent: -18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top" ref={root}>
      <div
        className="hero__bg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="hero__veil" />

      <div className="hero__inner">
        <p className="eyebrow hero__eyebrow">Maison de Cuisine · Est. MMXIX</p>

        <h1 className="hero__title display">
          <span className="line"><span>Dining</span></span>
          <span className="line"><span>carved in</span></span>
          <span className="line"><span><em>ice &amp; light</em></span></span>
        </h1>

        <div className="hero__meta">
          <p data-fade>
            A nine-course tasting menu shaped by the season, served beneath a
            ceiling of frozen glass in the heart of the old city.
          </p>
          <a data-fade className="hero__btn" href="#reserve">
            Reserve a table
          </a>
        </div>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}
