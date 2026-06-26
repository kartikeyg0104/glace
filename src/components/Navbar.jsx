import { useEffect, useState } from 'react'
import './Navbar.css'

const LINKS = [
  { label: 'Story', id: 'about' },
  { label: 'Experiences', id: 'experiences' },
  { label: 'Menu', id: 'menu' },
  { label: 'Cellar', id: 'cellar' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Visit', id: 'visit' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    const target = document.getElementById(id)
    if (!target) return
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -20 })
    else target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="nav__brand display" href="#top" onClick={go('top')}>
        GLACÉ
      </a>

      <nav className={`nav__links ${open ? 'is-open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={go(l.id)}>
            {l.label}
          </a>
        ))}
      </nav>

      <a className="nav__cta" href="#reserve" onClick={go('reserve')}>
        Reserve
      </a>

      <button
        className={`nav__burger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span />
        <span />
      </button>
    </header>
  )
}
