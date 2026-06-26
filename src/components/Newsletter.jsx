import { useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import './Newsletter.css'

export default function Newsletter() {
  const reveal = useReveal({ start: 'top 82%' })
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const inputRef = useRef(null)

  const submit = (e) => {
    e.preventDefault()
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      inputRef.current?.focus()
      return
    }
    setSent(true)
    setEmail('')
  }

  return (
    <section className="news" id="journal" ref={reveal}>
      <div className="news__inner">
        <p className="eyebrow" data-reveal>The Journal</p>
        <h2 className="news__title display" data-reveal>
          News from the <em>frost</em>
        </h2>
        <p className="news__lead" data-reveal>
          Seasonal menu releases, rare cellar pours and the occasional open
          table — sent only when there is something worth saying.
        </p>

        <form className="news__form" onSubmit={submit} data-reveal>
          {sent ? (
            <p className="news__thanks">
              Thank you — watch your inbox for the next thaw.
            </p>
          ) : (
            <>
              <input
                ref={inputRef}
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit" data-cursor>
                Subscribe <span>→</span>
              </button>
            </>
          )}
        </form>
        <p className="news__fine" data-reveal>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
