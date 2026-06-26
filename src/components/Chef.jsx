import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Chef.css'

gsap.registerPlugin(ScrollTrigger)

export default function Chef() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // pin the section and scrub a word-by-word reveal of the quote
      const words = gsap.utils.toArray('.chef__quote .word')
      gsap.set(words, { opacity: 0.12 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=130%',
          scrub: 0.6,
          pin: true,
          anchor: 'center',
        },
      })
      tl.to(words, { opacity: 1, stagger: 0.5, ease: 'none' })
        .to('.chef__portrait', { yPercent: -8, scale: 1.05, ease: 'none' }, 0)

      gsap.from('.chef__portrait', {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const quote =
    'I am not cooking food. I am freezing a single hour of the forest so that you might taste it before it is gone.'

  return (
    <section className="chef" id="chef" ref={root}>
      <div className="chef__inner">
        <div className="chef__portrait-wrap">
          <div
            className="chef__portrait"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80')",
            }}
          />
          <p className="chef__name">
            <span className="display">Elias Vørn</span>
            <span className="chef__role">Chef &amp; Founder</span>
          </p>
        </div>

        <blockquote className="chef__quote display">
          {quote.split(' ').map((w, i) => (
            <span className="word" key={i}>
              {w}{' '}
            </span>
          ))}
        </blockquote>
      </div>
    </section>
  )
}
