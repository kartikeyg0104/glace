import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Loader.css'

export default function Loader({ onComplete }) {
  const root = useRef(null)
  const countRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { v: 0 }
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.()
        },
      })

      // count up 0 -> 100
      tl.to(counter, {
        v: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => setCount(Math.round(counter.v)),
      })
        // reveal the wordmark lines
        .to('.loader__word span', {
          yPercent: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.08,
        }, '-=1.4')
        // lift the panel away
        .to('.loader__count', { autoAlpha: 0, duration: 0.4 }, '+=0.15')
        .to(root.current, {
          yPercent: -100,
          duration: 1.1,
          ease: 'expo.inOut',
        }, '-=0.1')
        .set(root.current, { display: 'none' })
    }, root)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div className="loader" ref={root}>
      <div className="loader__word display">
        <span>GLACÉ</span>
      </div>
      <div className="loader__count" ref={countRef}>
        <span>{String(count).padStart(3, '0')}</span>
        <span className="loader__pct">%</span>
      </div>
    </div>
  )
}
