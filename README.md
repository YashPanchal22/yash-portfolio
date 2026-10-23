# Yashkumar M. Panchal — Developer Portfolio

A production-ready personal portfolio built with **React 19 + TypeScript + Vite 8 + Tailwind CSS 4**.
Dark-first design with a full light theme, real project screenshots captured from the deployed
applications, working navigation and deep-linkable case-study routes.

---

## 1. What is in here

| Area | Notes |
| --- | --- |
| **Sections** | Hero · About · Skills · Projects (filterable) · Projects & Technical Experience (includes Education, Certifications, Activities) · Contact |
| **Routes** | `/` (single-page sections) and `/projects/:slug` (three case-study pages) plus a real 404 page |
| **Theme** | Dark ⇄ light toggle, persisted in `localStorage`, applied before first paint (no flash) |
| **Resume** | Real PDF download from `public/Yashkumar_Panchal_Resume.pdf` → saved as `Yashkumar_Panchal_Resume.pdf` |
| **Contact** | Validated form (inline errors, honeypot, submit-timing guard) with two delivery modes — see §5 |
| **SEO** | Per-route `<title>`/description/canonical/OG/Twitter tags, JSON-LD `Person` schema, `sitemap.xml` + `robots.txt` on build |
| **Accessibility** | Keyboard navigable, skip link, visible focus rings, `aria-live` filter results, AA contrast in both themes, `prefers-reduced-motion` respected. **axe-core: 0 violations (WCAG 2.0/2.1 A + AA + best-practice) on home, case study and 404 in both themes.** |
| **Images** | Real screenshots of the three deployed apps, converted to WebP (37–81 KB each), lazy-loaded with skeleton + error state |

### Verified project links (checked 23 Oct 2026, all HTTP 200)

| Project | Repository | Live demo |
| --- | --- | --- |
| NutriZero AI | `github.com/YashPanchal22/NutriZero-AI` | `yashpanchal22.github.io/NutriZero-AI/` |
| Faculty Feedback & Analytics | `github.com/YashPanchal22/faculty-anonymous-feedback` | `yashpanchal22.github.io/faculty-anonymous-feedback/` |
| ScamShield AI | `github.com/YashPanchal22/scamshield-ai` | `yashpanchal22.github.io/scamshield-ai/` |

No URL in the codebase is guessed. If a deployment ever disappears, change that project's
`demoUrl` to `null` in `src/data/projects.ts` — the card automatically switches to a
"Source only / not deployed" state and the Live-demo button disappears everywhere.

---

## 2. Run locally

```bash
npm install --legacy-peer-deps     # the flag avoids an npm peer-resolution edge case with the toolchain
npm run dev                        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check + production build into dist/ (+ 404.html, .nojekyll, sitemap)
npm run preview    # serve the production build locally
npm run typecheck  # tsc only
```

Requires Node 20+ (20 LTS recommended).

---

## 3. Project structure

```
portfolio/
├─ index.html                 # SEO meta, JSON-LD, no-flash theme script, noscript fallback
├─ public/
│  ├─ Yashkumar_Panchal_Resume.pdf
│  ├─ shots/*.webp            # real screenshots of the deployed apps
│  ├─ favicon.svg · apple-touch-icon.png · og-image.jpg · site.webmanifest
├─ scripts/postbuild.mjs      # 404.html bounce + .nojekyll + sitemap/robots
├─ src/
│  ├─ data/                   # profile.ts · skills.ts · projects.ts  ← edit content here
│  ├─ lib/                    # theme, seo, navigation/scroll, contact, reveal hook, asset()
│  ├─ components/             # Navbar, Footer, ProjectCard, SmartImage, TechIcon, Reveal …
│  ├─ sections/               # Hero, About, Skills, Projects, Experience, Contact
│  └─ pages/                  # Home, ProjectDetail, NotFound
└─ vite.config.ts · vercel.json · netlify.toml · .github/workflows/deploy.yml · .env.example
```

**All content lives in `src/data/`.** Adding a project = one object in `projects.ts` (plus its
screenshots in `public/shots/`); the card grid, filters, case-study page, prev/next links,
sitemap route and footer counts update automatically.

---

## 4. Environment variables

Copy `.env.example` → `.env.local`. Every variable is optional.

| Variable | Purpose | Default |
| --- | --- | --- |
| `VITE_CONTACT_FORM_ENDPOINT` | POST endpoint for the contact form (Formspree, Basin, Getform, your API) | empty → mail-draft fallback |
| `VITE_BASE_PATH` | Sub-path the site is served from (`/portfolio/` for GitHub Pages project sites) | `/` |
| `VITE_SITE_URL` | Public origin used to generate `sitemap.xml` / `robots.txt` | empty → skipped |

**Never** put API keys in `VITE_*` variables — Vite inlines them into the client bundle. The form
endpoints listed above are public identifiers, not secrets.

---

## 5. Contact form behaviour

* **With `VITE_CONTACT_FORM_ENDPOINT` set** — the form POSTs JSON (`name`, `email`, `subject`,
  `message`, `_gotcha`) and shows a genuine success state only after a 2xx response; failures show
  the HTTP status and point to email.
* **Without an endpoint (default)** — submitting opens a prefilled mail draft to
  `panchalyash862@gmail.com`. The confirmation screen states that the draft must still be sent from
  the mail app, so the flow is never presented as a fake in-page send. The visitor-facing UI does not
  show any setup or developer instructions.
* Bot guards: a hidden honeypot field and a minimum time-on-form threshold.

To enable real in-page delivery in ~2 minutes: create a Formspree form, copy the endpoint
(`https://formspree.io/f/xxxxxxx`), put it in `.env.local` as `VITE_CONTACT_FORM_ENDPOINT`, rebuild.

---

## 6. Deployment

### A. GitHub Pages (recommended — matches your existing demos)

A workflow is already included at `.github/workflows/deploy.yml`.

1. Create a repository (e.g. `portfolio`) and push this folder to the `main` branch.
2. Repository → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push. The workflow builds with `VITE_BASE_PATH=/<repo-name>/` and publishes `dist/`.
4. Site URL: `https://<username>.github.io/<repo-name>/`.

Why it works on refresh: the post-build step writes a `404.html` that stores the requested path in
`sessionStorage` and bounces to the app shell; `index.html` restores that path with
`history.replaceState` before React mounts. `public/.nojekyll` stops Pages from filtering assets.

> For a **user site** (`<username>.github.io`), set `VITE_BASE_PATH: /` in the workflow env.

### B. Netlify

`netlify.toml` is included (SPA rewrite + immutable asset caching). Connect the repo and deploy —
or drag `dist/` into the Netlify drop zone. No base path needed.

### C. Vercel

`vercel.json` is included (SPA rewrite + caching). Import the repo; the Vite preset is detected.

### Manual build upload

```bash
npm run build          # domain root
# or
VITE_BASE_PATH=/repo/ VITE_SITE_URL=https://user.github.io/repo npm run build
```

Upload the contents of `dist/` to any static host. Keep the host's SPA/404 fallback enabled for
`/projects/*` deep links.

> Section headings, filter counts and the hero's project numbers are derived from
> `src/data/projects.ts` (see `projectCount` / `deployedCount`), so removing or adding a project
> updates every count on the site automatically.

---

## 7. QA performed on this build

Executed against the production build served the way GitHub Pages serves it
(unknown paths → `404.html`, HTTP 404):

```
✓ TypeScript build clean (tsc -b, strict, noUnusedLocals/Parameters)
✓ Production build: 407 KB JS (130 KB gzip), 62 KB CSS (14 KB gzip), fonts self-hosted
✓ Deep link + hard refresh on all 3 /projects/:slug routes → correct page, correct URL
✓ 404 page renders and "Back to home" returns to /
✓ Nav (6 items) + hero CTA scroll to the right sections; URL hash updates
✓ Resume download → Yashkumar_Panchal_Resume.pdf, 55,768 bytes, %PDF- magic
✓ Theme toggle dark → light, persists across reload
✓ Project filters: All 3 · AI & ML 2 · Full-Stack 3 · Data & Analytics 1 (+ live region)
✓ Contact form: empty submit → 4 errors; invalid values → 4 errors; valid submit → mail draft + honest status
✓ Mobile 390×844: no horizontal overflow, hamburger panel opens/closes (button, click-outside layout, Escape)
✓ Tab order: skip link → brand → nav items → resume…
✓ axe-core (WCAG A/AA + best practice): 0 violations — home / case study / 404, dark + light
✓ GitHub Pages sub-path build (/portfolio/) re-tested: assets, fonts, images, resume, deep links all resolve
✓ Console: no runtime errors on any route
```

Full transcript: [`QA-REPORT.md`](./QA-REPORT.md).

---

## 8. Still needed from you

| Item | Status |
| --- | --- |
| Resume PDF | ✅ included (`public/Yashkumar_Panchal_Resume.pdf`) — replace the file to update |
| GitHub / LinkedIn / email | ✅ verified from your resume |
| Project links | ✅ all 6 (3 repos + 3 demos) verified HTTP 200 |
| Screenshots | ✅ real captures of the three deployed apps |
| Contact delivery | ⚠️ optional — add `VITE_CONTACT_FORM_ENDPOINT` for in-page sending (otherwise the prefilled-mail-draft fallback, with no setup notice shown to visitors) |
| Deployment URL | ⚠️ set `VITE_SITE_URL` when you know it, then rebuild for sitemap/robots |
| Photo | Optional — the hero uses a code card + monogram, so no photo is required. If you want one, drop `public/portrait.jpg` and add it to `Hero.tsx` |

Nothing else on the site is a placeholder.
