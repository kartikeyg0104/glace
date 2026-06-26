import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Marquee.css'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = ['Seasonal', 'Tasting Menu', 'Sommelier Pairings', 'Chef’s Table', 'Nordic Roots']

export default function Marquee() {
  const track = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // base loop
      const loop = gsap.to(track.current, {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: 'none',
      })
      // scroll velocity skews the speed/direction for that reactive feel
      let dir = 1
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity()
          if (v < 0 && dir !== -1) { dir = -1; gsap.to(loop, { timeScale: -1, duration: 0.4 }) }
          else if (v > 0 && dir !== 1) { dir = 1; gsap.to(loop, { timeScale: 1, duration: 0.4 }) }
          const boost = gsap.utils.clamp(1, 4, 1 + Math.abs(v) / 1200)
          gsap.to(loop, { timeScale: dir * boost, duration: 0.3, overwrite: true })
        },
      })
    }, track)
    return () => ctx.revert()
  }, [])

  const row = (key) => (
    <div className="marquee__group" key={key}>
      {ITEMS.map((it, i) => (
        <span className="marquee__item" key={i}>
          {it}
          <i className="marquee__dot">✦</i>
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={track}>
        {row('a')}
        {row('b')}
      </div>
    </div>
  )
}
