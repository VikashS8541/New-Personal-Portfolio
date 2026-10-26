import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/motion'
import profile from '../data/profile.json'

export default function Loader({ onReveal, onDone }) {
  const root = useRef(null)
  const num = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const progress = { value: 0 }
      const timeline = gsap.timeline({ paused: true })

      timeline
        .from('.ld-top, .ld-bottom', { opacity: 0, y: 12, duration: 0.6, ease: 'power3.out' })
        .fromTo('.ld-orbit', { rotation: -90, scale: 0.72, opacity: 0 }, { rotation: 270, scale: 1, opacity: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
        .fromTo('.ld-core', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(2)' }, 0.25)
        .from('.ld-word', { yPercent: 110, duration: 0.8, stagger: 0.08, ease: 'power4.out' }, 0.25)
        .to(progress, {
          value: 100,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (num.current) num.current.textContent = String(Math.round(progress.value)).padStart(3, '0')
          },
        }, 0)
        .to('.ld-bar', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
        .to('.ld-inner', { y: -16, opacity: 0, duration: 0.45, ease: 'power2.in' }, '+=0.1')
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'power4.inOut' }, '<')
        .call(onReveal, null, '-=0.5')
        .call(onDone)

      const fonts = document.fonts?.ready ?? Promise.resolve()
      Promise.race([fonts, new Promise((resolve) => setTimeout(resolve, 1800))]).then(() => timeline.play())
    }, root)

    return () => ctx.revert()
  }, [onReveal, onDone])

  return (
    <div ref={root} role="status" aria-label="Loading portfolio" className="fixed inset-0 z-[100] bg-bg" style={{ clipPath: 'inset(0 0 0% 0)' }}>
      <div className="ld-inner wrap flex h-full flex-col justify-between py-7 sm:py-9">
        <div className="ld-top flex items-center justify-between">
          <span className="eyebrow">VS<span className="text-accent">.</span></span>
          <span className="eyebrow">Portfolio — {new Date().getFullYear()}</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-8 grid size-20 place-items-center sm:mb-10 sm:size-24" aria-hidden="true">
            <div className="ld-orbit absolute inset-0 rounded-full border border-line">
              <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_18px_var(--accent)]" />
            </div>
            <div className="ld-core size-2 rounded-full bg-accent shadow-[0_0_24px_var(--accent)]" />
          </div>
          <p className="eyebrow mb-3">A little patience</p>
          <div className="font-display text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[.95] tracking-[-.05em]">
            {profile.name.split(' ').map((word) => (
              <span key={word} className="block overflow-hidden"><span className="ld-word block">{word}</span></span>
            ))}
          </div>
          <p className="ld-word mt-3 overflow-hidden font-accent text-2xl italic text-accent sm:text-3xl">{profile.role}</p>
        </div>

        <div className="ld-bottom">
          <div className="mb-3 flex items-end justify-between">
            <span className="eyebrow">Loading experience</span>
            <span ref={num} className="font-display text-2xl font-semibold tabular-nums">000</span>
          </div>
          <div className="h-px bg-line">
            <div className="ld-bar h-px origin-left scale-x-0 bg-accent shadow-[0_0_12px_var(--accent)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
