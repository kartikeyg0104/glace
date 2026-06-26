import { useState } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Experiences from './components/Experiences'
import Seasons from './components/Seasons'
import Menu from './components/Menu'
import Chef from './components/Chef'
import Cellar from './components/Cellar'
import Gallery from './components/Gallery'
import Press from './components/Press'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Visit from './components/Visit'
import Reservation from './components/Reservation'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useSmoothScroll()

  return (
    <>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Loader onComplete={() => setLoaded(true)} />
      <Navbar />
      <main>
        <Hero loaded={loaded} />
        <Marquee />
        <About />
        <Experiences />
        <Seasons />
        <Menu />
        <Chef />
        <Cellar />
        <Gallery />
        <Press />
        <Testimonials />
        <Faq />
        <Visit />
        <Reservation />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
