import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Plus, ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, animOn, finePointer } from '../lib/motion'
import projectsData from '../data/projects.json'
import config from '../data/siteConfig.json'

const links = [['liveUrl', 'Live site'], ['githubUrl', 'Source code'], ['caseStudyUrl', 'Case study']]

export default function Work() {
  const root = useRef(null), preview = useRef(null), first = useRef(true)
  const [tab, setTab] = useState('all')
  const [open, setOpen] = useState(null)
  const [hover, setHover] = useState(null)

  const sorted = useMemo(() => {
    const l = [...projectsData]
    if (config.projectOrder === 'featured-first') l.sort((a, b) => Number(b.featured) - Number(a.featured))
    return l
  }, [])
  const count = (id) => (id === 'all' ? sorted.length : sorted.filter((p) => p.type === id).length)
  const tabs = config.workTabs.filter((t) => t.id === 'all' || config.showEmptyTabs || count(t.id))
  const list = tab === 'all' ? sorted : sorted.filter((p) => p.type === tab)
  const hovered = sorted.find((p) => p.id === hover)

  useLayoutEffect(() => {
    if (!animOn()) return
    const ctx = gsap.context(() => {
      if (first.current) {
        first.current = false
        ScrollTrigger.batch('.row', { start: 'top 92%', once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }) })
        gsap.set('.row', { y: 40 })
      } else {
        gsap.fromTo('.row', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.09, ease: 'power3.out' })
        ScrollTrigger.refresh()
      }
    }, root)
    return () => ctx.revert()
  }, [tab])

  useLayoutEffect(() => {
    if (!animOn() || !finePointer()) return
    const el = preview.current
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.8 })
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' }), y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
    const move = (e) => { x(e.clientX); y(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  useLayoutEffect(() => {
    if (!animOn() || !finePointer()) return
    gsap.to(preview.current, { opacity: hover && open == null ? 1 : 0, scale: hover && open == null ? 1 : 0.8, rotate: hover ? -3 : 0, duration: 0.4, overwrite: 'auto' })
  }, [hover, open])

  return (
    <section id="work" ref={root} className="py-[var(--section-y)]">
      <div className="wrap">
        <div data-r className="mb-10 md:mb-16">
          <p className="eyebrow mb-5"><span className="text-accent">01</span> — Selected work</p>
          <h2 className="h-section max-w-5xl">Things I've <em className="text-accent">built.</em></h2>
        </div>

        <div role="tablist" aria-label="Filter projects" data-r className="mb-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls="work-panel" data-magnetic
              onClick={() => { setTab(t.id); setOpen(null) }}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors ${tab === t.id ? 'border-accent bg-accent text-accent-ink' : 'border-line hover:border-ink'}`}>
              {t.label}<sup className="text-[.65rem] opacity-70">{count(t.id)}</sup>
            </button>
          ))}
        </div>

        <ul id="work-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} onMouseLeave={() => setHover(null)} className="border-b border-line">
          {list.length === 0 && <li className="py-16 text-muted">Nothing here yet — add a project with type “{tab}” in projects.json.</li>}
          {list.map((p, i) => {
            const isOpen = open === p.id
            return (
              <li key={p.id} className="row border-t border-line">
                <h3>
                  <button aria-expanded={isOpen} aria-controls={`panel-${p.id}`} data-cursor={isOpen ? 'Close' : 'Open'}
                    onClick={() => setOpen(isOpen ? null : p.id)} onMouseEnter={() => setHover(p.id)}
                    className="group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-x-4 py-7 text-left md:grid-cols-[4rem_1fr_14rem_3rem] md:py-10">
                    <span className="text-sm text-muted">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[clamp(2rem,6.2vw,6rem)] font-semibold leading-[.95] tracking-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-accent">{p.title}</span>
                    <span className="hidden text-sm font-normal tracking-normal text-muted md:block">{p.category}</span>
                    <Plus className={`justify-self-end transition-transform duration-500 ${isOpen ? 'rotate-[135deg] text-accent' : ''}`} />
                  </button>
                </h3>
                <div id={`panel-${p.id}`} inert={!isOpen} className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <div className="grid gap-8 pb-12 md:grid-cols-12 md:gap-12 md:pl-[4rem]">
                      <div className="md:col-span-7">
                        <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface">
                          <img src={p.thumbnail} alt={`Illustrative interface preview for ${p.title} (placeholder visual)`} width="1200" height="900" loading="lazy" decoding="async" className="size-full object-cover" />
                        </div>
                      </div>
                      <div className="md:col-span-5">
                        <p className="eyebrow">{p.category}{p.featured && ' · Featured'}</p>
                        <p className="mt-4 text-muted">{p.description}</p>
                        {p.highlights?.length > 0 && <ul className="mt-5 space-y-1.5 text-sm">{p.highlights.map((h) => <li key={h} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />{h}</li>)}</ul>}
                        <p className="mt-5 text-sm"><span className="text-muted">Role — </span>{p.role}</p>
                        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">{p.technologies.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 text-xs">{t}</li>)}</ul>
                        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
                          {links.filter(([k]) => p[k]).map(([k, l]) => (
                            <a key={k} href={p[k]} target="_blank" rel="noreferrer" className="group/l inline-flex min-h-11 items-center gap-1.5 font-medium text-accent">
                              <span className="u-link">{l}</span><ArrowUpRight size={16} className="transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <p className="mt-6 text-xs text-muted">Previews are illustrative placeholder visuals, not screenshots. Live links open the deployed apps.</p>
      </div>
      <div ref={preview} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[4/3] w-[22rem] overflow-hidden rounded-xl border border-line bg-surface shadow-2xl md:block">
        {hovered && <img src={hovered.thumbnail} alt="" className="size-full object-cover" />}
      </div>
    </section>
  )
}
