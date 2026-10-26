import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import config from '../data/siteConfig.json'

gsap.registerPlugin(ScrollTrigger)

const mq = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches
export const reduced = () => mq('(prefers-reduced-motion: reduce)')
export const animOn = () => config.animations.enabled && !reduced()
export const finePointer = () => mq('(hover: hover) and (pointer: fine)')

let lenis = null
export const getLenis = () => lenis

export function initScroll() {
  if (!animOn() || !config.animations.smoothScroll) return () => {}
  lenis = new Lenis({ lerp: 0.09 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t) => lenis.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => { gsap.ticker.remove(tick); lenis.destroy(); lenis = null }
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
  else el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' })
}

export { gsap, ScrollTrigger }
