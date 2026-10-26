# Vikash Sharma — Portfolio

React + Vite + Tailwind CSS v4 + GSAP (ScrollTrigger) + Lenis smooth scroll. All content comes from JSON in `src/data/`.

## Run
```bash
npm install
npm run dev      # development
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Edit content (rebuild + redeploy required — it's static JSON, not a live CMS)
| What | File |
|---|---|
| Title, description, theme default, fonts, colors, nav labels, section on/off, project ordering, animations on/off | `src/data/siteConfig.json` |
| Name, headline, intro, about text, email, phone | `src/data/profile.json` |
| GitHub / LinkedIn / email links | `src/data/socialLinks.json` |
| Skills, experience, education, courses, services | `skills.json`, `experience.json`, `education.json`, `certifications.json`, `services.json` |

Also update `<title>`/meta tags in `index.html` if you change the site title.

## Projects (`src/data/projects.json`)
- **Add:** append one object (copy an existing one), give it a unique `id` and `slug`, put the image in `public/images/projects/`, and set `thumbnail` to `/images/projects/your-file.png`.
- **Edit / remove:** change or delete its object.
- **Feature:** set `"featured": true` (with `"projectOrder": "featured-first"` in siteConfig, featured projects go first; any other value keeps JSON order).
- **Reorder:** move objects in the array.
- **Optional fields:** `liveUrl`, `githubUrl`, `caseStudyUrl`, `highlights`. Empty/missing links are hidden automatically.
- **Replace images:** the current SVGs are *placeholder visuals, not screenshots*. Drop real screenshots (4:3 ratio, e.g. 1200×900) over them or change `thumbnail`.

## Colors, fonts, theme
`siteConfig.json` → `colors.light` / `colors.dark`, `fonts` (also edit the Google Fonts link in `index.html` if you change families), `theme.default` (`light`/`dark`), `theme.allowToggle`.

## Replace the CV
Overwrite `public/files/resume.pdf` (keep the name) and rebuild.

## Deploy
Static site: Vercel / Netlify — build command `npm run build`, output `dist`. Nothing is deployed yet.

## Still needs your input
- Real project screenshots and GitHub repo URLs (left empty — not in CV).
- Site URL / social preview image (`og:image`) after hosting.
- No contact form (no backend configured); contact is via email/social links.
- Your CV lists a "Portfolio" link (vikash8541.netlify.app) — not used here.

## Work tabs (WordPress / HTML-CSS / etc.)
Each project in `projects.json` has a `"type"`: `react`, `wordpress`, `html-css` or `other`. Tabs live in `siteConfig.json` → `workTabs` (add your own id + label). By default tabs with no projects are hidden; set `"showEmptyTabs": true` to show them. To add a WordPress project: add an entry with `"type": "wordpress"`.

## Animation settings (`siteConfig.json` → `animations`)
`enabled`, `loader` (intro, shown once per session), `customCursor` (desktop only), `smoothScroll`. `prefers-reduced-motion` disables all of them automatically.
