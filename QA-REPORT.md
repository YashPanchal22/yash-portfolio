# QA report — production build

Environment: Chromium (Playwright, headless) against `dist/` served with GitHub-Pages semantics
(unknown paths return `404.html` with HTTP 404). Viewport 1440×950 desktop, 390×844 mobile.
Ran on 23 Oct 2026. Accessibility via axe-core 4.x, rulesets `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `best-practice`.

> Note: the `404 (Not Found)` console entries in the deep-link rows are **expected** — they are the
> static host's 404 response that the bounce page intercepts before React renders the route.

```
HOME title: Yashkumar M. Panchal — B.Sc. Data Science Student · Full-Stack Developer · AI/ML Enthusiast — Yashkumar M. Panchal
HOME console errors: none
DEEP nutrizero-ai: http=404 -> path=/projects/nutrizero-ai h1="NutriZero AI" errors=Failed to load resource: the server responded with a status of 404 (Not Found)
REFRESH nutrizero-ai: path=/projects/nutrizero-ai h1="NutriZero AI"
DEEP faculty-feedback-analytics: http=404 -> path=/projects/faculty-feedback-analytics h1="Faculty Feedback & Analytics" errors=Failed to load resource: the server responded with a status of 404 (Not Found)
REFRESH faculty-feedback-analytics: path=/projects/faculty-feedback-analytics h1="Faculty Feedback & Analytics"
DEEP scamshield-ai: http=404 -> path=/projects/scamshield-ai h1="ScamShield AI" errors=Failed to load resource: the server responded with a status of 404 (Not Found)
REFRESH scamshield-ai: path=/projects/scamshield-ai h1="ScamShield AI"
DEEP smart-triage: http=404 -> path=/projects/smart-triage h1="Smart Healthcare Ecosystem" errors=Failed to load resource: the server responded with a status of 404 (Not Found)
REFRESH smart-triage: path=/projects/smart-triage h1="Smart Healthcare Ecosystem"
404 page h1: Page not found
404 -> home path: / | h1: Building Intelligent
Solutions
NAV About -> hash=#about
NAV Skills -> hash=#skills
NAV Projects -> hash=#projects
NAV Experience & Learning -> hash=#experience
NAV Contact -> hash=#contact
HERO CTA -> #projects
NAV console errors: none
RESUME download: filename=Yashkumar_Panchal_Resume.pdf bytes=55768 magic=%PDF-
RESUME direct: 200 application/pdf 55768 bytes
THEME dark -> light -> after reload light
FILTER AI & ML: cards=3 | Showing 3 of 4 projects.
FILTER Full-Stack: cards=4 | Showing 4 of 4 projects.
FILTER Data & Analytics: cards=2 | Showing 2 of 4 projects.
FILTER All: cards=4 | Showing 4 of 4 projects.
FORM empty submit errors: Please enter your name (at least 2 characters).,An email address is required so I can reply.,Add a short subject (at least 4 characters).,Please write at least 20 characters.
FORM invalid values errors: Please enter your name (at least 2 characters).,That email address does not look valid.,Add a short subject (at least 4 characters).,Please write at least 20 characters.
FORM submit -> mailto navigation attempted | status: Your mail app should be open  The message is prefilled and addressed to panchalyash862@gma
MOBILE overflowX=0px menuOpen=true hashAfterNav=#projects errors=none
AXE home: no violations
AXE project: no violations
AXE 404: no violations```

## Additional checks

- **Link verification (all HTTP 200):** 4 GitHub repositories + 4 live GitHub Pages demos, plus the GitHub profile and repositories tab.
  LinkedIn returns HTTP 999 to datacenter IPs (LinkedIn's bot protection) — the URL is taken directly from the uploaded resume.
- **Build:** `tsc -b` strict clean; bundle 407 KB JS (130 KB gzip), 62 KB CSS (14 KB gzip); fonts self-hosted (no CDN).
- **GitHub Pages sub-path (`/portfolio/`):** root 200, deep link 404 → correct route, reload OK, images/fonts/resume all resolve under the base path, in-app project links carry the prefix.
- **Expected console output:** only the host's 404 for deep-link entry; no runtime, React or asset errors on any route.
