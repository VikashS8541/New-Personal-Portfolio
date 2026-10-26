import { useLayoutEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, animOn } from '../lib/motion'
import profile from '../data/profile.json'
import skills from '../data/skills.json'
import experience from '../data/experience.json'
import education from '../data/education.json'
import certs from '../data/certifications.json'
import services from '../data/services.json'
import socials from '../data/socialLinks.json'
import config from '../data/siteConfig.json'
import { socialIcon } from './Icons'

const Head = ({ n, label, children }) => (
  <div data-r className="mb-12 md:mb-20">
    <p className="eyebrow mb-5"><span className="text-accent">{n}</span> — {label}</p>
    <h2 className="h-section max-w-5xl">{children}</h2>
  </div>
)

export function About() {
  const root = useRef(null)
  useLayoutEffect(() => {
    if (!animOn()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.aw', { opacity: 0.15 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.about-text', start: 'top 80%', end: 'bottom 50%', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  const [lead, ...rest] = profile.about
  return (
    <section id="about" ref={root} className="on-inverse py-[var(--section-y)]"><div className="wrap">
      <p data-r className="eyebrow mb-8"><span className="text-accent">02</span> — About</p>
      <p className="about-text font-display text-[clamp(1.7rem,4.4vw,4rem)] font-semibold leading-[1.1] tracking-tight">
        {lead.split(' ').map((w, i) => <span key={i} className="aw mr-[.28em] inline-block">{w}</span>)}
      </p>
      <div className="mt-16 grid gap-10 md:grid-cols-12 items-center">
        <div className="space-y-5 text-lg md:col-span-6">{rest.map((t, i) => <p key={i} data-r className="opacity-80">{t}</p>)}</div>
        <dl className="grid grid-cols-2 gap-4 md:col-span-4 md:col-start-8">
          {profile.stats.map((s) => (
            <div key={s.label} data-r className="border-t border-line pt-4"><dd className="font-display text-5xl font-semibold tracking-tight text-center text-accent sm:text-6xl">{s.value}</dd><dt className="mt-2 text-center text-sm text-muted">{s.label}</dt></div>
          ))}
        </dl>
      </div>
    </div></section>
  )
}

export function Expertise() {
  return (
    <section id="expertise" className="py-[var(--section-y)]"><div className="wrap">
      <Head n="03" label="Expertise">Tools I work <em className="text-accent">with.</em></Head>
      <div className="border-t border-line">
        {skills.map((s) => (
          <div key={s.category} data-r className="group grid gap-4 border-b border-line py-8 transition-colors hover:bg-surface md:grid-cols-12 md:gap-8 md:px-4">
            <h3 className="text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent md:col-span-4 md:text-3xl">{s.category}</h3>
            <ul className="flex flex-wrap gap-2 md:col-span-8">
              {s.items.map((it) => <li key={it} className="rounded-full border border-line px-4 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent">{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div></section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="pb-[var(--section-y)]"><div className="wrap">
      <Head n="04" label="Experience">Where I've <em className="text-accent">worked.</em></Head>
      {experience.map((e) => (
        <div key={e.company} data-r className="grid gap-8 border-t border-line py-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-sm text-accent">{e.period}</p>
            <h3 className="mt-3 text-4xl tracking-tight sm:text-5xl">{e.role}</h3>
            <p className="mt-3 text-muted">{e.url ? <a href={e.url} target="_blank" rel="noreferrer" className="u-link">{e.company}</a> : e.company} · {e.location}</p>
            <a href={e.url} target='blank' className='mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors border-accent bg-accent text-accent-ink'>{e.link_button}</a>
          </div>
          <ul className="space-y-3 md:col-span-6 md:col-start-7">
            {e.points.map((p) => <li key={p} className="flex gap-4"><span className="mt-3 h-px w-4 shrink-0 bg-accent" />{p}</li>)}
          </ul>
        </div>
      ))}
      {config.sections.education !== false && (
        <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-2">
          {[['Education', education], ['Courses', certs]].map(([label, items]) => (
            <div key={label} data-r><p className="eyebrow mb-5">{label}</p>
              {items.map((x) => (
                <div key={x.title}><h3 className="text-3xl tracking-tight sm:text-4xl">{x.title}</h3>
                  <p className="mt-3 text-muted">{x.place} · {x.period}</p><p className="text-sm text-muted">{x.note}</p></div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div></section>
  )
}

export function Services() {
  if (config.sections.services === false) return null
  return (
    <section id="services" className="pb-[var(--section-y)]"><div className="wrap">
      <Head n="05" label="Services">Work with <em className="text-accent">me.</em></Head>
      <ul className="border-t border-line">
        {services.map((s, i) => (
          <li key={s.title} data-r className="group items-center grid items-baseline gap-3 border-b border-line py-8 transition-colors duration-500 hover:bg-accent hover:text-accent-ink md:grid-cols-12 md:gap-8 md:px-6">
            <span className="text-sm text-muted transition-colors group-hover:text-accent-ink md:col-span-1">0{i + 1}</span>
            <h3 className="text-3xl tracking-tight sm:text-4xl md:col-span-6">{s.title}</h3>
            <p className="text-muted transition-colors group-hover:text-accent-ink md:col-span-5">{s.text}</p>
          </li>
        ))}
      </ul>
    </div></section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="on-inverse pt-[var(--section-y)] pb-12"><div className="wrap">
      <p data-r className="eyebrow mb-6"><span className="text-accent">06</span> — Contact</p>
      <h2 data-r className="flex items-end gap-6 flex-wrap text-[clamp(3.2rem,13vw,13rem)] font-bold uppercase leading-[.85] tracking-[-.05em]">Let's<br />build <em className="normal-case text-accent">something.</em></h2>
      <div data-r className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <a href={`mailto:${profile.email}`} data-magnetic className="group inline-flex items-center gap-3 break-all font-display text-2xl font-semibold sm:text-4xl">
          <span className="u-link">{profile.email}</span><ArrowUpRight className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
        <ul className="flex gap-3">
          {socials.filter((s) => s.label !== 'Email').map((s) => { const I = socialIcon(s.label); return (
            <li key={s.label}><a href={s.url} target="_blank" rel="noreferrer" data-magnetic className="btn btn-ghost"><I /> {s.label}</a></li>
          )})}
        </ul>
      </div>
      <Footer />
    </div></section>
  )
}

function Footer() {
  const links = config.navigation.filter((n) => n.id !== 'home' && config.sections[n.id] !== false)
  return (
    <footer className="mt-24 flex flex-col gap-6 border-t border-line pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted">© {new Date().getFullYear()} {profile.name}</p>
      <nav aria-label="Footer"><ul className="flex flex-wrap gap-x-6 gap-y-1">
        {links.map((n) => <li key={n.id}><a href={`#${n.id}`} className="u-link inline-block py-2">{n.label}</a></li>)}
        {socials.filter((s) => s.label !== 'Email').map((s) => <li key={s.label}><a href={s.url} target="_blank" rel="noreferrer" className="u-link inline-block py-2">{s.label}</a></li>)}
      </ul></nav>
    </footer>
  )
}
