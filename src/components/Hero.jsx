import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowDown, Download } from "lucide-react";
import { gsap, animOn } from "../lib/motion";
import profile from "../data/profile.json";
import config from "../data/siteConfig.json";
import socials from "../data/socialLinks.json";
import { socialIcon } from "./Icons";

const Chars = ({ text }) =>
  text.split("").map((c, i) => (
    <span key={i} className="h-char inline-block" aria-hidden="true">
      {c}
    </span>
  ));

export default function Hero({ play }) {
  const root = useRef(null);
  const on = animOn();
  const [first, last] = profile.name.toUpperCase().split(" ");

  useLayoutEffect(() => {
    if (!on) return;
    const ctx = gsap.context(() => {
      gsap.set(".h-char", { yPercent: 118 });
      gsap.set("[data-h]", { opacity: 0, y: 30 });
      gsap.set(".badge", { scale: 0 });
      const st = {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(".hl-1", { xPercent: -10, ease: "none", scrollTrigger: st });
      gsap.to(".hl-2", { xPercent: 8, ease: "none", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, [on]);

  useEffect(() => {
    if (!play || !on) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(".h-char", { yPercent: 0, duration: 1.3, stagger: 0.05 })
        .to(
          "[data-h]",
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          "-=0.9",
        )
        .to(
          ".badge",
          { scale: 1, duration: 1.4, ease: "elastic.out(1,.6)" },
          "-=1",
        );
    }, root);
    return () => ctx.revert();
  }, [play, on]);

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-8 pt-28"
    >
      <div
        aria-hidden="true"
        className="grain absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]"
      />
      <div className="wrap">
        <div
          data-h
          className="eyebrow mb-6 flex items-center justify-between gap-4"
        >
          <span>{profile.role} — React · WordPress · GSAP</span>
          <span className="hidden sm:block">{profile.location}</span>
        </div>
        <h1
          aria-label={profile.name}
          className="relative text-[min(19vw,24rem)] font-bold uppercase leading-[.82] tracking-[-.055em]"
        >
          <span className="hl-1 block overflow-hidden pb-[.06em]">
            <span className="flex">
              <Chars text={first} />
            </span>
          </span>
          <span className="hl-2 block overflow-hidden pb-[.06em] pl-[4vw]">
            <span className="outline-text flex">
              <Chars text={last} />
            </span>
          </span>

          <div
            className="badge absolute right-0 top-0 hidden size-[clamp(7rem,13vw,12rem)] md:block"
            aria-hidden="true"
          >
            <svg viewBox="0 0 200 200" className="spin-slow size-full text-ink">
              <defs>
                <path
                  id="circ"
                  d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                />
              </defs>

              <text
                fontSize="16"
                letterSpacing="4.5"
                fill="currentColor"
                className="font-sans uppercase"
              >
                <textPath
                  href="#circ"
                  startOffset="0%"
                  textLength="470"
                  lengthAdjust="spacing"
                >
                  FRONTEND DEVELOPER • REACT • WORDPRESS •
                </textPath>
              </text>
            </svg>

            <ArrowDown
              className="absolute inset-0 m-auto text-accent"
              size={32}
            />
          </div>
        </h1>
        <div className="mt-10 grid gap-8 border-t border-line pt-6 md:grid-cols-12">
          <div data-h className="md:col-span-6">
            <p className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              {profile.headline}
            </p>
            <p className="mt-3 max-w-xl text-muted">{profile.intro}</p>
          </div>
          <div
            data-h
            className="flex flex-col gap-5 md:col-span-6 md:items-end"
          >
            <div className="flex flex-wrap gap-3">
              <a href="#work" data-magnetic className="btn btn-primary">
                Explore My Work <ArrowDown size={18} />
              </a>
              <a
                href={config.resume}
                download="Vikash_Sharma_CV.pdf"
                data-magnetic
                className="btn btn-ghost"
              >
                <Download size={18} /> Download CV
              </a>
            </div>
            <ul className="flex gap-3" aria-label="Social links">
              {socials.map((s) => {
                const I = socialIcon(s.label);
                return (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      aria-label={s.label}
                      data-magnetic
                      {...(s.url.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
                    >
                      <I />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
