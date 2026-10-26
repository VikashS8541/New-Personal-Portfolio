import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Work from './components/Work'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import { About, Expertise, Experience, Services, Contact } from './components/sections'
import { useTheme } from './hooks/useTheme'
import { gsap, ScrollTrigger, animOn, initScroll, getLenis, scrollToId } from './lib/motion'
import config from './data/siteConfig.json'

const skipLoader = !animOn() || !config.animations.loader
if (animOn()) document.documentElement.classList.add('anim')

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [ready, setReady] = useState(skipLoader)
  const [loading, setLoading] = useState(!skipLoader)
  const on = (k) => config.sections[k] !== false

  useEffect(() => {
    const destroy = initScroll()
    if (loading) getLenis()?.stop()
    return destroy
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { document.documentElement.style.overflow = loading ? 'hidden' : '' }, [loading])

  const reveal = useCallback(() => setReady(true), [])
  const done = useCallback(() => {
    setLoading(false); getLenis()?.start()
  }, [])

  useEffect(() => {
    const click = (e) => {
      const a = e.target.closest('a[href^="#"]')
      const id = a?.getAttribute('href').slice(1)
      if (!id) return
      e.preventDefault(); scrollToId(id); history.replaceState(null, '', `#${id}`)
    }
    document.addEventListener('click', click)
    return () => document.removeEventListener('click', click)
  }, [])

  useEffect(() => {
    if (!animOn()) return
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-r]', { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', overwrite: true }) })
      gsap.to('#progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {loading && <Loader onReveal={reveal} onDone={done} />}
      <Cursor />
      <div id="progress" aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-accent" />
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">Skip to content</a>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero play={ready} />
        <Marquee />
        {on('work') && <Work />}
        {on('about') && <About />}
        {on('expertise') && <Expertise />}
        {on('experience') && <Experience />}
        {on('services') && <Services />}
        {on('contact') && <Contact />}
      </main>
    </>
  )
}
