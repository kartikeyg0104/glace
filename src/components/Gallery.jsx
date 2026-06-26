import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Gallery.css'

gsap.registerPlugin(ScrollTrigger)

const SHOTS = [
  { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1100&q=80', speed: 0.9, span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=80', speed: 1.15, span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1100&q=80', speed: 0.8, span: '' },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1100&q=80', speed: 1.2, span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1100&q=80', speed: 0.95, span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1100&q=80', speed: 1.1, span: '' },
]

export default function Gallery() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gallery__item').forEach((item) => {
        const speed = parseFloat(item.dataset.speed)
        const inner = item.querySelector('.gallery__img')
        gsap.fromTo(
          inner,
          { yPercent: -(speed - 1) * 40 - 12 },
          {
            yPercent: (speed - 1) * 40 + 12,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
        gsap.from(item, {
          opacity: 0,
          y: 60,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: item, start: 'top 90%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="gallery" id="gallery" ref={root}>
      <div className="gallery__head">
        <p className="eyebrow">The Room</p>
        <h2 className="gallery__title display">
          Light, glass &amp; <em>silence</em>
        </h2>
      </div>

      <div className="gallery__grid">
        {SHOTS.map((s, i) => (
          <figure
            className={`gallery__item ${s.span}`}
            data-speed={s.speed}
            key={i}
            data-cursor
          >
            <div
              className="gallery__img"
              style={{ backgroundImage: `url('${s.src}')` }}
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
