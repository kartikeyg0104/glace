import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Cursor.css'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(max-width: 900px)').matches) return

    const xTo = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' })
    const yTo = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })
    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })

    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      xDot(e.clientX)
      yDot(e.clientY)
    }

    const grow = () => ring.current?.classList.add('is-hover')
    const shrink = () => ring.current?.classList.remove('is-hover')

    window.addEventListener('mousemove', move)
    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach((t) => {
      t.addEventListener('mouseenter', grow)
      t.addEventListener('mouseleave', shrink)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      targets.forEach((t) => {
        t.removeEventListener('mouseenter', grow)
        t.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  )
}
