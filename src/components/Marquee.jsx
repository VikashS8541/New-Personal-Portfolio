import config from '../data/siteConfig.json'

export default function Marquee() {
  const items = [...config.marquee, ...config.marquee]
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line bg-accent py-5 text-accent-ink">
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0">
            {items.map((t, i) => <li key={i} className="flex items-center whitespace-nowrap font-display text-[clamp(2rem,5vw,4rem)] font-semibold uppercase tracking-tight">{t}<span className="mx-6 text-[.6em]">✦</span></li>)}
          </ul>
        ))}
      </div>
    </div>
  )
}
