import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer__big .line span', {
        yPercent: 110,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const top = () => {
    if (window.__lenis) window.__lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer" ref={root}>
      <div className="footer__big display">
        <span className="line"><span>GLACÉ</span></span>
      </div>

      <div className="footer__cols">
        <div>
          <p className="footer__label">Visit</p>
          <p>14 Frostgate Lane</p>
          <p>Old City, 01199</p>
        </div>
        <div>
          <p className="footer__label">Hours</p>
          <p>Wed — Sun</p>
          <p>18:30 – 23:00</p>
        </div>
        <div>
          <p className="footer__label">Contact</p>
          <p>hello@glace.dining</p>
          <p>+1 (555) 018‑2240</p>
        </div>
        <div>
          <p className="footer__label">Follow</p>
          <a href="#" data-cursor>Instagram</a>
          <a href="#" data-cursor>Journal</a>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {2026} GLACÉ — Maison de Cuisine</span>
        <button className="footer__top" onClick={top} data-cursor>
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
