import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import './jairam.css'

gsap.registerPlugin(ScrollTrigger)
const MAPS = 'https://www.google.com/maps?cid=5025495575334379972'
const PHONE = 'tel:+918708355090'
const SWEETS = [
  { id: 'kaju', name: 'Kaju Katli', hindi: 'काजू कतली', tag: 'The silver lining', ingredients: 'Cashews · sugar · silver leaf', texture: 'Silky & delicate', note: 'A little indulgence', description: 'Delicate diamonds. A little silver. The cashew classic that makes every occasion feel a little more special.', color: '#e8d4a4' },
  { id: 'ladoo', name: 'Motichoor Ladoo', hindi: 'मोतीचूर लड्डू', tag: 'Little pearls of happiness', ingredients: 'Gram flour · ghee · cardamom', texture: 'Soft & golden', note: 'Happiness, rounded', description: 'A thousand tiny golden pearls, coming together in one perfect bite. Some things just taste like a celebration.', color: '#eebc57' },
  { id: 'jalebi', name: 'Jalebi', hindi: 'जलेबी', tag: 'A golden spiral', ingredients: 'Flour · ghee · saffron syrup', texture: 'Crisp outside, syrup within', note: 'Sweetness, in a spiral', description: 'Ghee-fried, saffron-soaked golden spirals. Crisp edges, a syrupy centre, and the unmistakable taste of celebration.', color: '#e9ad50' },
  { id: 'gulab-jamun', name: 'Gulab Jamun', hindi: 'गुलाब जामुन', tag: 'A golden kind of love', ingredients: 'Milk solids · sugar syrup · rose', texture: 'Soft & syrupy', note: 'Made to melt your heart', description: 'Golden, syrup-soaked, and impossible to stop at one. A familiar favourite for your sweetest moments.', color: '#e68eb7' },
  { id: 'rasmalai', name: 'Rasmalai', hindi: 'रसमलाई', tag: 'Clouds in a bowl', ingredients: 'Milk · saffron · pistachio', texture: 'Pillowy & creamy', note: 'Something to savour', description: 'Soft little clouds in saffron-kissed milk. Take your time. A moment this sweet deserves to last.', color: '#e6d6a1' },
  { id: 'soan-papdi', name: 'Soan Papdi', hindi: 'सोन पापड़ी', tag: 'Layers of little joys', ingredients: 'Gram flour · ghee · almonds', texture: 'Flaky & delicate', note: 'A thousand sweet layers', description: 'Delicate golden threads that fall apart at the first bite. Light, flaky, and full of little surprises.', color: '#d9c48e' },
]
function SweetImage({ sweet, className = '', ...props }) { return <img className={`sweet-image ${className}`} src={`/images/mithai/${sweet.id}.webp`} alt={sweet.name} {...props} /> }
function Arrow() { return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.4" /></svg> }
function Brand() { return <span className="brand"><span className="brand-flower" aria-hidden="true">✳</span><span><b>Jairam <i>Sweets</i></b><small>A LITTLE MITHAI. A LOT OF LOVE.</small></span></span> }
function Particles() { return <div className="particles" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <i key={i} style={{ '--x': `${(i * 37 + 13) % 100}%`, '--y': `${(i * 23 + 7) % 100}%`, '--delay': `${-i * .73}s`, '--size': `${i % 3 + 1}px` }} />)}</div> }

function Navbar() {
  const [open, setOpen] = useState(false)
  useEffect(() => { const close = e => { if (e.key === 'Escape') setOpen(false) }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [])
  return <header className="navigation"><a href="#home" aria-label="Jairam Sweets home"><Brand /></a><nav className={open ? 'nav-links is-open' : 'nav-links'} id="site-navigation" aria-label="Main navigation">{[['Mithai', 'sweets'], ['Halwai', 'halwai'], ['Build a box', 'gifting'], ['Gifting', 'gifts'], ['Visit', 'visit']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}</nav><a className="button button-small nav-call" href={PHONE}>Order for Diwali ↗</a><button className="nav-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-navigation">{open ? 'Close −' : 'Menu +'}</button></header>
}
function Present() {
  return <div className="photographic-present" aria-hidden="true"><img className="hero-box hero-box-open" src="/images/mithai/hero-open.webp" alt="" /><img className="hero-box hero-box-closed present-lid" src="/images/mithai/hero-closed.webp" alt="" /><div className="unwrapped-sweets">{SWEETS.map((sweet, i) => <div className={`unwrapped-sweet unwrapped-sweet-${i}`} key={sweet.id}><SweetImage sweet={sweet} /></div>)}</div></div>
}
function Hero() {
  const root = useRef(null)
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('.hero-copy > *', { y: 25, opacity: 0, stagger: .12, duration: 1.1, ease: 'power3.out', clearProps: 'all' })
        gsap.from('.photographic-present', { y: 45, opacity: 0, duration: 1.5, ease: 'power3.out' })
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1 } })
          .to('.hero-box-closed', { y: -150, rotation: -12, scale: .85, opacity: 0, duration: .7, ease: 'power2.inOut' }, 0)
          .to('.hero-box-open', { opacity: 1, duration: .4 }, .25)
          .fromTo('.unwrapped-sweet', { y: 70, opacity: 0, scale: .25 }, { y: 0, opacity: 1, scale: 1, stagger: .06, duration: .7, ease: 'back.out(1.3)' }, .3)
          .to('.scroll-cue', { opacity: 0, duration: .3 }, 0)
      }, root)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])
  return <section className="hero-scroll-section" id="home" ref={root}><div className="hero"><Particles /><span className="hero-backdrop" lang="hi" aria-hidden="true">मिठास</span><div className="hero-topline"><span>✦ &nbsp; ROOTED IN REWARI. SHARED WITH LOVE.</span><span>DIWALI. SWEETENED.</span></div><div className="hero-copy"><p className="eyebrow">For the moments worth celebrating</p><h1><span>Open something</span><br /><em>sweet</em> this Diwali.</h1><p className="hero-description">Six hand-made sweets, pure desi ghee, real silver<br />varq — packed in a box worth unwrapping.</p><div className="hero-actions"><a className="button" href="#sweets">Enter the mithai counter <Arrow /></a><a className="text-link" href="#gifting">Make it yours ↗</a></div></div><div className="hero-visual"><Present /><div className="hero-side-note"><em>Hand. Heart. Heritage.</em><span>✦ &nbsp; Feel the mithai.</span><small>01 / Unbox<br />02 / Discover<br />03 / Make it yours</small></div></div><a className="scroll-cue" href="#sweets"><span className="scroll-line" /> SCROLL TO UNWRAP <span>↓</span></a><span className="hero-edition" lang="hi">खुशियों का एक छोटा सा डिब्बा।</span></div></section>
}
function Collection() {
  const root = useRef(null)
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: reduce)', () => { setReduced(true) })
    media.add('(prefers-reduced-motion: no-preference)', () => {
      setReduced(false)
      const context = gsap.context(() => {
        const panels = gsap.utils.toArray('.sweet-panel')
        gsap.set(panels.slice(1), { autoAlpha: 0 })
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: .65, onUpdate: self => setActive(Math.min(5, Math.floor(self.progress * 6))) } })
        panels.forEach((panel, i) => {
          const art = panel.querySelector('.collection-product')
          if (i > 0) {
            timeline.to(panel, { autoAlpha: 1, duration: .16 }, i)
            timeline.fromTo(art, { y: 120, rotation: 12, scale: .78 }, { y: 0, rotation: 0, scale: 1, duration: .7, ease: 'power2.out' }, i)
            timeline.fromTo(panel.querySelector('.collection-copy'), { y: 30 }, { y: 0, duration: .5 }, i)
          }
          timeline.to(art, { y: -18, rotation: -3, duration: .75, ease: 'none' }, i + .2)
          timeline.fromTo(panel.querySelectorAll('.mithai-morsel'), { x: 0, y: 0, opacity: 0, scale: .3 }, { x: (n) => Math.cos(n * 2.4) * (100 + n * 7), y: (n) => Math.sin(n * 2.4) * (90 + n * 8), opacity: .85, scale: 1, rotation: (n) => n * 43, duration: .55, stagger: .008 }, i + .22)
          timeline.to(panel.querySelectorAll('.mithai-morsel'), { opacity: 0, scale: .3, duration: .25 }, i + .8)
          if (i < 5) {
            timeline.to(panel, { autoAlpha: 0, duration: .18 }, i + .96)
            timeline.to(art, { y: -120, rotation: -12, scale: 1.1, duration: .45 }, i + .85)
          }
        })
        timeline.to({}, { duration: .15 }, 5.85)
      }, root)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])
  const select = index => {
    setActive(index)
    if (reduced) return
    const section = root.current
    const top = section.getBoundingClientRect().top + window.scrollY + (section.offsetHeight - window.innerHeight) * ((index + .4) / 6)
    if (window.__lenis) window.__lenis.scrollTo(top, { duration: .9 }); else window.scrollTo({ top, behavior: 'smooth' })
  }
  return <section className="collection" id="sweets" ref={root} aria-label="Our mithai collection"><div className="collection-stage"><Particles /><div className="collection-top"><p className="eyebrow">✦ &nbsp; The mithai counter</p><span>SCROLL SLOWLY. SAVOUR EVERY DETAIL.</span></div><div className="collection-halo" /><div className="collection-orbit" /><div className="sweet-panels">{SWEETS.map((sweet, i) => <article key={sweet.id} className={`sweet-panel ${reduced && active === i ? 'is-selected' : ''}`} aria-hidden={active !== i} style={{ '--sweet-color': sweet.color }}><span className="collection-number" aria-hidden="true">0{i + 1}</span><div className="collection-product"><SweetImage sweet={sweet} loading={i > 1 ? 'lazy' : 'eager'} /><div className={`mithai-burst mithai-burst-${sweet.id}`} aria-hidden="true">{Array.from({ length: 16 }, (_, n) => <i className={`mithai-morsel morsel-${n % 4}`} key={n} />)}</div><span className="product-floor" /></div><div className="collection-copy"><p className="eyebrow">{sweet.note}</p><h2 lang="hi">{sweet.hindi}</h2><h3><em>{sweet.name}</em></h3><p>{sweet.description}</p></div><div className="collection-details"><span>THE LITTLE DETAILS</span><div><small>Made of</small><p>{sweet.ingredients}</p></div><div><small>A little like</small><p>{sweet.texture}</p></div><div><small>Serving</small><p>{i === 4 ? '2 pieces' : '250 grams'}</p></div><strong className="collection-price">₹{[1100,640,180,640,230,610][i]}<small> / {i === 4 ? 'serve' : 'kg'}</small></strong><a className="button button-small" href="#gifting" tabIndex={active === i ? 0 : -1}>Build your box <Arrow /></a><small className="availability">Reference price. Confirm with the shop.</small></div></article>)}</div><div className="collection-bottom"><span>A TASTE OF TRADITION</span><div className="sweet-tabs" role="group" aria-label="Choose a sweet">{SWEETS.map((s, i) => <button key={s.id} aria-label={`Show ${s.name}`} aria-pressed={active === i} onClick={() => select(i)}><span className={active === i ? 'sweet-tab is-active' : 'sweet-tab'}><SweetImage sweet={s} /></span><small>{s.name}</small></button>)}</div><span className="collection-counter">0{active + 1} <i>/</i> 06</span></div><div className="collection-progress" style={{ '--progress': `${(active + 1) / 6 * 100}%` }} /></div></section>
}
function CraftJourney() {
  const root = useRef(null)
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1 } })
        timeline.fromTo('.jalebi-making-art', { scale: .4, rotation: -95 }, { scale: 1.45, rotation: 30, duration: 2, ease: 'power1.inOut' }, 0)
          .to('.making-ring', { scale: 2.4, opacity: 0, rotation: 120, duration: 1.3 }, .1)
          .fromTo('.making-droplet', { opacity: 0, scale: 0 }, { opacity: .7, scale: 1, stagger: .025, duration: .5 }, .7)
          .to('.jalebi-making-art', { scale: 2.8, opacity: 0, duration: .9 }, 2)
          .fromTo('.craft-statement', { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1 }, 2.1)
          .fromTo('.craft-floating', { opacity: 0, y: 70, rotation: -10 }, { opacity: .7, y: -30, rotation: 5, duration: 1.1, stagger: .1 }, 2.1)
          .fromTo('.silver-leaf', { opacity: 0, y: -120, rotation: -35 }, { opacity: .8, y: 40, rotation: 10, duration: 1.4 }, 2)
      }, root)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])
  return <section className="craft-journey" id="halwai" ref={root} aria-label="The halwai's craft"><div className="craft-stage"><Particles /><div className="making-ring"><svg viewBox="0 0 400 400"><defs><path id="craft-circle" d="M200,200 m-162,0 a162,162 0 1,1 324,0 a162,162 0 1,1 -324,0" /></defs><text><textPath href="#craft-circle">HAND-ROLLED · GHEE-FRIED · SAFFRON-SOAKED · MADE WITH LOVE · </textPath></text></svg></div><img className="jalebi-making-art" src="/images/mithai/jalebi-pan.webp" alt="A golden jalebi spiral frying in a traditional pan" />{Array.from({ length: 16 }, (_, i) => <i key={i} className="making-droplet" style={{ left: `${10 + (i * 17) % 80}%`, top: `${10 + (i * 31) % 80}%`, '--delay': `${-i * .6}s` }} aria-hidden="true" />)}<div className="craft-statement"><p className="eyebrow">THE HALWAI’S WAY</p><h2>Real silver. Real ghee.<br />Every piece<br /><em>finished by hand.</em><br /><span>The way our<br />grandfathers did it.</span></h2></div><div className="craft-floating craft-floating-one"><SweetImage sweet={SWEETS[1]} /></div><div className="craft-floating craft-floating-two"><SweetImage sweet={SWEETS[0]} /></div><div className="silver-leaf" aria-hidden="true" /></div></section>
}
function GiftBox() {
  const [box, setBox] = useState([])
  const [message, setMessage] = useState('')
  const [sealed, setSealed] = useState(false)
  const piecePrices = [45, 30, 25, 35, 50, 25]
  const subtotal = box.reduce((total, i) => total + piecePrices[i], 0)
  const add = index => { setBox(previous => previous.length < 9 ? [...previous, index] : previous); setSealed(false); setMessage('') }
  const remove = index => { setBox(previous => previous.filter((_, i) => i !== index)); setSealed(false); setMessage('') }
  const clear = () => { setBox([]); setSealed(false); setMessage('') }
  const surprise = () => { setBox(Array.from({ length: 9 }, () => Math.floor(Math.random() * 6))); setSealed(false); setMessage('Nine little surprises, chosen for you.') }
  const copy = async () => {
    const items = SWEETS.map((s, i) => ({ name: s.name, count: box.filter(x => x === i).length })).filter(s => s.count)
    try { await navigator.clipboard.writeText(`My Jairam Sweets mithai wishlist:\n${items.map(s => `${s.name} × ${s.count}`).join('\n')}\nPlease confirm availability, packing and prices.`); setMessage('Selection copied. Call the shop to confirm your box.') }
    catch { setMessage('Your selection is listed below. Call the shop to discuss your mix.') }
  }
  return <section className="gift section" id="gifting"><div className="section-heading"><p className="eyebrow">✦ YOUR BOX, YOUR WAY</p><h2>Nine pieces.<br /><em>Your</em> mix.</h2><p>Tap a sweet to drop it into the box. Tap a piece in the box to<br />take it out. Seal it, and make someone’s Diwali.</p></div><div className="gift-layout"><div className={`gift-box-wrap ${sealed ? 'is-sealed' : ''}`}><div className="gift-box-label"><span>JAIRAM SWEETS</span><span>WITH LOVE, FROM REWARI</span></div><div className="gift-box" role="group" aria-label="Your nine-piece sweet wishlist">{Array.from({ length: 9 }, (_, i) => <button key={i} className={box[i] === undefined ? 'gift-slot' : 'gift-slot is-filled'} disabled={sealed || box[i] === undefined} onClick={() => remove(i)} aria-label={box[i] === undefined ? `Empty slot ${i + 1}` : `Remove ${SWEETS[box[i]].name} from slot ${i + 1}`}>{box[i] === undefined ? <span className="slot-ornament">✧</span> : <><SweetImage sweet={SWEETS[box[i]]} /><span className="remove-piece" aria-hidden="true">×</span></>}</button>)}</div><div className="gift-box-label gift-box-bottom"><span>A LITTLE BOX OF HAPPINESS</span><span>✳</span></div><div className="gift-lid-clip"><button className="gift-seal-lid" aria-label="Unseal your gift box" tabIndex={sealed ? 0 : -1} onClick={() => setSealed(false)}><span className="seal-ribbon seal-ribbon-one" /><span className="seal-ribbon seal-ribbon-two" /><span className="seal-bow">✦</span><small>JAIRAM SWEETS</small></button></div><p className="box-caption">{sealed ? 'A little love, all wrapped up. Click to reopen.' : 'Made by us. Chosen by you.'}</p></div><div className="gift-choices"><div className="gift-choices-head"><span>MAKE YOUR MIX</span><span>{box.length} / 9 chosen</span></div><div className="gift-products">{SWEETS.map((sweet, i) => { const count = box.filter(x => x === i).length; return <div className="gift-product" key={sweet.id}><SweetImage sweet={sweet} /><span>{sweet.name}<small>₹{piecePrices[i]} a piece</small></span><div className="quantity-control"><button onClick={() => { const position = box.lastIndexOf(i); if (position !== -1) remove(position) }} disabled={!count} aria-label={`Remove one ${sweet.name}`}>−</button><span>{count}</span><button onClick={() => add(i)} disabled={box.length === 9} aria-label={`Add ${sweet.name} to gift box`}>+</button></div></div> })}</div><div className="gift-totals"><p><span>Pieces <small>{box.length} / 9</small></span><span>₹{subtotal}</span></p><p><span>Gold foil box</span><span>₹199</span></p><p className="gift-total"><span>Total</span><strong>₹{subtotal + 199}</strong></p></div><p className="gift-summary" aria-live="polite">{box.length === 9 ? 'Your nine-piece mix is ready to wrap.' : `${9 - box.length} sweet little spaces left.`}</p><div className="gift-secondary"><button onClick={surprise}>SURPRISE ME</button><button onClick={clear}>EMPTY BOX</button></div><button className={`button seal-button ${sealed ? 'sealed-button' : ''}`} disabled={!box.length} onClick={() => setSealed(!sealed)}>{sealed ? 'UNWRAP YOUR BOX' : 'SEAL MY BOX'} <Arrow /></button><div className="gift-buttons"><button className="text-link" aria-label="Copy my selection" onClick={copy} disabled={!box.length}>Copy my selection ↗</button><a className="text-link" href={PHONE}>Call to order ↗</a></div><div className="gift-selected" aria-label="Selected sweets">{SWEETS.map((sweet, i) => { const count = box.filter(x => x === i).length; return count ? <span key={sweet.id}>{sweet.name} × {count}</span> : null })}</div><p className="gift-message" role="status">{message}</p><p className="gift-note">Reference pricing from the design. Confirm current prices and availability with the shop.</p></div></div></section>
}
function GiftCollections() {
  return <section className="gift-collections section" id="gifts"><div className="section-heading"><p className="eyebrow">FOR EVERY KIND OF GIVING</p><h2>Boxes that do<br />the <em>talking.</em></h2></div><div className="package-grid">{[{id:'shagun',name:'Shagun Box',tag:'MOST GIFTED',description:'Nine assorted pieces in our gold foil box, red silk ribbon.',price:'999'},{id:'hamper',name:'Lakshmi Hamper',tag:'FOR FAMILY',description:'A kilo of mithai, dry fruits, two clay diyas and marigolds.',price:'2,199'},{id:'royal-ghee',name:'Royal Thaal',tag:'CORPORATE · MADE TO ORDER',description:'A brass thaal of festive favourites. A generous celebration.',price:'5,999'}].map(item=><a className={`package-card package-${item.id}`} key={item.id} href={item.id==='shagun'?'#gifting':PHONE}><div className="package-photo">{item.id==='shagun'?<><img src="/images/mithai/hero-open.webp" alt="An open gold mithai gift box with a diya and marigolds" />{[0,1,2].map((i)=><SweetImage key={i} sweet={SWEETS[i]} className={`package-flying package-flying-${i}`} />)}</>:<img src={`/images/mithai/${item.id}.webp`} alt={item.name==='Lakshmi Hamper'?'Festive mithai, pistachios, marigolds and rose petals':'A flowing ribbon of golden ghee'} loading="lazy" />}</div><div className="package-copy"><span>{item.tag}</span><h3>{item.name}</h3><p>{item.description}</p><strong>₹{item.price}</strong><span className="package-arrow">↗</span></div></a>)}</div><p className="reference-note">Gift concepts and reference prices. Call the shop for current options.</p></section>
}
const PRICE_LIST=[
 {name:'Kaju Katli',hindi:'काजू कतली',note:'Cashew, silver varq',price:1100,category:'Signature'},
 {name:'Kaju Pista Roll',hindi:'काजू पिस्ता रोल',note:'Cashew rolled around pistachio',price:1400,category:'Signature'},
 {name:'Motichoor Laddoo',hindi:'मोतीचूर लड्डू',note:'Desi ghee pearls, saffron',price:640,category:'Signature'},
 {name:'Besan Laddoo',hindi:'बेसन लड्डू',note:'Roasted gram flour, cardamom',price:520,category:'Traditional'},
 {name:'Kesar Peda',hindi:'केसर पेड़ा',note:'Khoya, saffron, stamped by hand',price:880,category:'Traditional'},
 {name:'Pista Barfi',hindi:'पिस्ता बर्फ़ी',note:'Green pistachio, silver varq',price:1200,category:'Signature'},
 {name:'Soan Papdi',hindi:'सोन पापड़ी',note:'Flaky threads, cardamom',price:610,category:'Traditional'},
 {name:'Milk Cake',hindi:'मिल्क केक',note:'Slow-cooked milk, caramel',price:700,category:'Traditional'},
 {name:'Gulab Jamun',hindi:'गुलाब जामुन',note:'Milk solids, rose sugar syrup',price:640,category:'Syrupy'},
 {name:'Jalebi',hindi:'जलेबी',note:'Golden spirals, saffron syrup',price:180,category:'Syrupy'},
 {name:'Rasmalai',hindi:'रसमलाई',note:'Soft chhena, saffron milk',price:230,category:'Syrupy'},
]
function PriceList(){
 const [category,setCategory]=useState('All')
 return <section className="price-list section" id="prices"><Particles/><div className="price-list-heading"><div><p className="eyebrow">✦ THE FULL COUNTER</p><h2>Price list</h2></div><div className="price-filters" role="group" aria-label="Filter price list">{['All','Signature','Traditional','Syrupy'].map(item=><button key={item} aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}</button>)}</div></div><div className="price-rows">{PRICE_LIST.filter(item=>category==='All'||category===item.category).map(item=><div className="price-row" key={item.name}><h3>{item.name} <span lang="hi">{item.hindi}</span></h3><p>{item.note}</p><strong>₹{item.price.toLocaleString('en-IN')}<small> / {item.name==='Rasmalai'?'serve':'kg'}</small></strong></div>)}</div><p className="reference-note">Prices shown recreate the reference design. Please call +91 87083 55090 for Jairam’s current price list.</p></section>
}
function Visit(){return <section className="reference-visit" id="visit"><div className="visit-backdrop"><img src="/images/jairam-shop.jpg" alt="Jairam Sweets storefront in Qutubpur, Rewari" loading="lazy"/></div><div className="visit-content"><p className="eyebrow">✦ VISIT THE SHOP</p><h2>Follow the smell<br/>of <em>warm ghee.</em></h2><div className="shop-details"><div><span>ADDRESS</span><p>Saini Mohalla, Narnaul Road<br/>Qutubpur, Rewari<br/>Haryana 123401</p></div><div><span>HOURS</span><p>Good things take their time.<br/>Call for today’s opening hours<br/>and fresh selection.</p></div><div><span>ORDERS</span><a href={PHONE}>+91 87083 55090</a><p>For mithai, gifting<br/>and sweet celebrations.</p></div></div><a className="button button-small" href={MAPS} target="_blank" rel="noreferrer">Get directions ↗</a></div><div className="giant-mithaas" lang="hi" aria-label="Mithaas, sweetness">मिठास</div><div className="visit-bottom"><a href="#home">Jairam Sweets · Rewari</a><span>MADE BY HAND. SHARED WITH LOVE.</span><a href="#home">BACK TO TOP ↑</a></div></section>}
function TrustMarquee(){return <div className="marquee trust-marquee" aria-label="Made fresh at Jairam Sweets"><div aria-hidden="true">{Array.from({length:4},(_,i)=><span key={i}>Made fresh at Jairam. <i>✦</i> Pick little blessings. <i>✦</i> No preservatives. <i>✦</i> Hand orders over a flame. <i>✦</i></span>)}</div></div>}
export default function Jairam() {
  useSmoothScroll()
  useEffect(() => {
    const onAnchor = event => {
      const anchor = event.target.closest('a[href^="#"]')
      if (!anchor || !window.__lenis) return
      const target = document.getElementById(anchor.getAttribute('href').slice(1))
      if (target) { event.preventDefault(); window.__lenis.scrollTo(target, { duration: 1.3 }); history.replaceState(null, '', anchor.getAttribute('href')) }
    }
    document.addEventListener('click', onAnchor)
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray('.section-heading, .package-card, .price-list-heading, .visit-content').forEach(el => gsap.from(el, { y: 40, opacity: 0, duration: .9, clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }))
        gsap.fromTo('.gift-box-wrap', { rotation: -1, y: 30 }, { rotation: 0, y: 0, ease: 'none', scrollTrigger: { trigger: '.gift', start: 'top bottom', end: 'bottom top', scrub: 1 } })
      })
      return () => context.revert()
    })
    const refresh = () => ScrollTrigger.refresh()
    document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => { document.removeEventListener('click', onAnchor); window.removeEventListener('load', refresh); media.revert() }
  }, [])
  return <><div className="gold-intro" aria-hidden="true"><span /><span /></div><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main"><Hero /><TrustMarquee /><Collection /><CraftJourney /><GiftBox /><GiftCollections /><PriceList /><Visit /></main><a className="floating-order" href="#gifting">Make your Diwali box ↗</a></>
}
