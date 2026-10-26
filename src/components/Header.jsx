import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import config from '../data/siteConfig.json'
import profile from '../data/profile.json'
import { useActiveSection } from '../hooks/useActiveSection'
import { getLenis } from '../lib/motion'

const nav = config.navigation.filter((n) => n.id === 'home' || config.sections[n.id] !== false)
const ids = nav.map((n) => n.id)

export default function Header({ theme, toggleTheme }) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const on = () => { const y = window.scrollY; setSolid(y > 24); setHidden(y > 300 && y > last); last = y }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    if (!open) return
    const k = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  function toggle() {
    const next = !open
    setOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
    next ? getLenis()?.stop() : getLenis()?.start()
  }
  function close() { setOpen(false); document.body.style.overflow = ''; getLenis()?.start() }

  const themeBtn = config.theme.allowToggle && (
    <button onClick={toggleTheme} data-magnetic aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-accent">
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? '-translate-y-full' : ''} ${solid || open ? 'bg-bg/80 backdrop-blur-md' : ''}`}>
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#home" onClick={close} className="font-display text-xl font-semibold tracking-tight" aria-label={`${profile.name} — home`}>
          {profile.name.split(' ')[0]}<span className="text-accent">.</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.slice(1).map((n) => (
            <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined}
              className="group relative px-4 py-2 text-sm text-muted transition-colors hover:text-ink aria-[current=true]:text-ink">
              {n.label}
              <span className="absolute inset-x-4 bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-aria-[current=true]:scale-x-100 group-hover:scale-x-100" />
            </a>
          ))}
          <span className="ml-3">{themeBtn}</span>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          {themeBtn}
          <button onClick={toggle} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} className="grid size-11 place-items-center rounded-full border border-line">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <nav id="mobile-menu" aria-label="Mobile" inert={!open}
        className={`fixed inset-x-0 top-16 h-[calc(100svh-4rem)] bg-bg transition-all duration-500 md:hidden ${open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <ul className="wrap pt-4">
          {nav.map((n, i) => (
            <li key={n.id} style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }} className={`transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
              <a href={`#${n.id}`} onClick={close} className="flex min-h-16 items-center justify-between border-b border-line font-display text-4xl font-semibold">{n.label}<span className="text-sm text-muted">0{i + 1}</span></a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
