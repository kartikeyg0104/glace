import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Masked line/element reveal driven by ScrollTrigger.
 * Animates every `[data-reveal]` inside the returned ref from y:110% -> 0
 * the moment its section scrolls into view. Used everywhere for the
 * "lines rise out of a clipped mask" effect.
 */
export function useReveal({ y = 110, stagger = 0.08, start = 'top 80%' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: y, opacity: 0 })
      ScrollTrigger.create({
        trigger: el,
        start,
        onEnter: () =>
          gsap.to(targets, {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            stagger,
          }),
      })
    }, el)

    return () => ctx.revert()
  }, [y, stagger, start])

  return ref
}
