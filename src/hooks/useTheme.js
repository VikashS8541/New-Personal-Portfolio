import { useEffect, useState } from 'react'
import config from '../data/siteConfig.json'

const toVars = (c) => ({
  '--bg': c.bg, '--surface': c.surface, '--text': c.text, '--muted': c.muted, '--border': c.border,
  '--accent': c.accent, '--accent-text': c.accentText, '--accent-inv': c.accentOnInverse, '--inverse': c.inverse, '--inverse-text': c.inverseText,
})

function initial() {
  try { const s = localStorage.getItem('theme'); if (s === 'light' || s === 'dark') return s } catch { /* storage unavailable */ }
  return config.theme.default
}

export function useTheme() {
  const [theme, setTheme] = useState(initial)
  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    Object.entries(toVars(config.colors[theme])).forEach(([k, v]) => root.style.setProperty(k, v))
    root.style.setProperty('--font-heading', config.fonts.heading)
    root.style.setProperty('--font-body', config.fonts.body); root.style.setProperty('--font-accent', config.fonts.accent)
    try { localStorage.setItem('theme', theme) } catch { /* ignore */ }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))]
}
