import { useEffect, useRef } from 'react'
import { gsap, finePointer, animOn } from '../lib/motion'
import config from '../data/siteConfig.json'

export default function Cursor() {
  const dot = useRef(null), ring = useRef(null), label = useRef(null)
  useEffect(() => {
    if (!config.animations.customCursor || !animOn() || !finePointer()) return
    const html = document.documentElement
    html.classList.add('has-cursor')
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, opacity: 0 })
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.1 }), dy = gsap.quickTo(dot.current, 'y', { duration: 0.1 })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' }), ry = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })
    let shown = false, mag = null
    const move = (e) => {
      if (!shown) { shown = true; gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 }) }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
      const t = e.target.closest?.('a,button,[data-cursor],[data-magnetic]')
      const text = t?.dataset.cursor
      gsap.to(ring.current, { scale: text ? 1 : t ? 1.6 : 1, width: text ? 88 : 36, height: text ? 88 : 36, backgroundColor: text ? 'var(--accent)' : 'transparent', borderColor: t ? 'var(--accent)' : 'var(--text)', duration: 0.35, overwrite: 'auto' })
      gsap.to(dot.current, { scale: t ? 0 : 1, duration: 0.25, overwrite: 'auto' })
      label.current.textContent = text || ''
      const m = e.target.closest?.('[data-magnetic]')
      if (mag && mag !== m) gsap.to(mag, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,.4)' })
      if (m) { const r = m.getBoundingClientRect(); gsap.to(m, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 }) }
      mag = m
    }
    const leave = () => { shown = false; gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 }) }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseleave', leave); html.classList.remove('has-cursor') }
  }, [])
  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[120]">
      <div ref={ring} className="fixed left-0 top-0 grid size-9 place-items-center rounded-full border border-ink opacity-0"><span ref={label} className="text-xs font-semibold uppercase tracking-wider text-accent-ink" /></div>
      <div ref={dot} className="fixed left-0 top-0 size-2 rounded-full bg-accent opacity-0" />
    </div>
  )
}
