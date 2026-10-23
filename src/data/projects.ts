/**
 * Project data — every repository URL, live URL, feature and technology
 * below was verified against the public repo / README / live deployment.
 * Last link check: 23 Oct 2026 (HTTP 200 on every demoUrl).
 */

export type ProjectCategory = 'AI & ML' | 'Full-Stack' | 'Data & Analytics'

export type Project = {
  slug: string
  title: string
  tagline: string
  categories: ProjectCategory[]
  year: string
  status: 'Live demo' | 'Source only'
  summary: string
  problem: string
  users: string
  features: string[]
  stack: { name: string; icon?: string }[]
  repoUrl: string
  demoUrl: string | null
  demoNote?: string
  cover: string
  gallery: { src: string; alt: string; caption: string }[]
  architecture: { layer: string; detail: string }[]
  challenges: { title: string; detail: string }[]
  integrity?: string
  license?: string
}

const GH = 'https://github.com/YashPanchal22'
const PAGES = 'https://yashpanchal22.github.io'

export const projects: Project[] = [
  {
    slug: 'nutrizero-ai',
    title: 'NutriZero AI',
    tagline: 'Nutrition & zero-waste meal planning, aligned to UN SDG 2',
    categories: ['AI & ML', 'Full-Stack'],
    year: '2026',
    status: 'Live demo',
    summary:
      'A full-stack nutrition assistant with ten modules for budget-aware meal planning, pantry-based recipes, food-waste rescue and storage safety — built around UN Sustainable Development Goal 2, Zero Hunger.',
    problem:
      'Affordable, balanced eating is hard when you are cooking on a fixed budget with whatever is already in the kitchen. Most recipe apps assume a stocked pantry and an open wallet, and they rarely help with the food that is about to spoil.',
    users:
      'Students and budget-constrained households who want practical, low-cost meals built from ingredients they already own.',
    features: [
      'Budget meal planner for ₹50–₹300 per person per day and households of 1–6 people',
      'Pantry Chef: recipes generated only from the ingredients you actually have',
      'Food-waste rescue module that upcycles scraps, stale bread and leftovers',
      'Food storage & safety reference with shelf-life rules and freezer guidance',
      'Nutrition explorer with cost-per-gram protein comparisons',
      'Smart grocery planner with budget-capped, category-wise lists',
      'AI nutrition chat with voice read-out through the Web Speech API',
      'Impact dashboard (Recharts) tracking meals planned, waste diverted and usage',
      'SDG 2 knowledge hub covering the four pillars of food security',
      'Settings & diagnostics panel with live backend / Gemini connection health tests',
    ],
    stack: [
      { name: 'React 18', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Google GenAI SDK', icon: 'googlegemini' },
      { name: 'Recharts', icon: 'recharts' },
      { name: 'Web Speech API', icon: 'speech' },
    ],
    repoUrl: `${GH}/NutriZero-AI`,
    demoUrl: `${PAGES}/NutriZero-AI/`,
    demoNote:
      'The GitHub Pages build runs entirely in the browser with offline-first knowledge engines — no API key is shipped to the client.',
    cover: 'shots/nutrizero-chat.webp',
    gallery: [
      {
        src: 'shots/nutrizero-chat.webp',
        alt: 'NutriZero AI chat interface with module sidebar and quick prompt suggestions',
        caption: 'AI nutrition chat with voice read-out and quick prompts',
      },
      {
        src: 'shots/nutrizero-planner.webp',
        alt: 'Budget Meal Planner screen with budget, household size and dietary preference options',
        caption: 'Budget meal planner: budget, household size and diet inputs',
      },
      {
        src: 'shots/nutrizero-dashboard.webp',
        alt: 'Impact and household metrics dashboard with Recharts bar and donut charts',
        caption: 'Impact dashboard built with Recharts',
      },
    ],
    architecture: [
      { layer: 'Frontend', detail: 'React 18 + TypeScript + Vite, Tailwind CSS, Recharts, Web Speech API' },
      { layer: 'Backend', detail: 'Python FastAPI service with Pydantic v2 request/response validation' },
      { layer: 'AI layer', detail: 'Google GenAI (Gemini) via the google-genai SDK, with retry logic and a domain fallback engine' },
      { layer: 'Deployment', detail: 'Static frontend on GitHub Pages; the FastAPI service runs locally for AI-backed responses' },
    ],
    challenges: [
      {
        title: 'Never ship the API key',
        detail:
          'The public deployment is a static GitHub Pages build, so a Gemini key cannot be embedded. The app ships with offline-first knowledge engines and labels clearly when an answer comes from the local engine instead of the model.',
      },
      {
        title: 'Model calls fail in the real world',
        detail:
          'Gemini requests are wrapped in retry logic with a graceful fallback, so a rate limit or network drop degrades the answer instead of breaking the screen.',
      },
      {
        title: 'Voice without a native app',
        detail:
          'Hands-free cooking read-out uses the browser Web Speech API with mute controls, avoiding an audio dependency or a native build.',
      },
    ],
    integrity:
      'No user data is claimed or collected by the public demo; chat history is stored locally in the browser.',
    license: 'MIT',
  },
  {
    slug: 'faculty-feedback-analytics',
    title: 'Faculty Feedback & Analytics',
    tagline: 'Anonymous student feedback with aggregate-only faculty analytics',
    categories: ['Full-Stack', 'Data & Analytics'],
    year: '2026',
    status: 'Live demo',
    summary:
      'A role-based academic feedback platform: students rate eight teaching parameters anonymously, faculty see only aggregated performance, and administrators get a seven-KPI institutional dashboard with eight analytics charts and PDF/CSV export.',
    problem:
      'Honest course feedback rarely happens when students fear their identity can be traced. Institutions still need useful, comparable teaching metrics — so the system has to make anonymity structural, not a promise.',
    users:
      'Students submitting course feedback, faculty reviewing their own aggregated teaching metrics, and academic administrators monitoring institutional quality.',
    features: [
      'Anonymous submission flow across eight teaching parameters with 1–5 ratings',
      'Anti-identity ingestion: identity fields are dropped before records are stored',
      'One-way anonymous receipt token so a student can confirm submission without a link back',
      'Duplicate-submission blocking via anonymous session hashing, per course',
      'Three-tier role-based access control enforced on frontend routes and backend middleware',
      'Faculty dashboard showing only aggregate metrics — never raw student records',
      'Administrator dashboard with seven KPIs and eight analytics charts (Recharts)',
      'Longitudinal rating trends, subject-wise breakdowns and parameter health views',
      'Client-side PDF summary export (jsPDF) and CSV export',
      'Local rule-based sentiment categorisation with no third-party AI calls',
    ],
    stack: [
      { name: 'React 19', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Recharts', icon: 'recharts' },
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Express', icon: 'express' },
      { name: 'JWT', icon: 'jsonwebtokens' },
      { name: 'BCrypt', icon: 'bcrypt' },
      { name: 'jsPDF', icon: 'pdf' },
    ],
    repoUrl: `${GH}/faculty-anonymous-feedback`,
    demoUrl: `${PAGES}/faculty-anonymous-feedback/`,
    demoNote:
      'The public build is a static demo running on bundled mock data. The Express + JWT API in the repository runs locally — use the demo accounts printed on the login screen.',
    cover: 'shots/faculty-login.webp',
    gallery: [
      {
        src: 'shots/faculty-login.webp',
        alt: 'Faculty evaluation portal login with Student, Faculty and Authority access tiers',
        caption: 'Role-based login with three access tiers',
      },
      {
        src: 'shots/faculty-dashboard.webp',
        alt: 'Administrator KPI dashboard showing responses, faculty, subjects, departments and rating metrics',
        caption: 'Administrator view: seven KPIs and faculty performance ranking',
      },
    ],
    architecture: [
      { layer: 'Frontend', detail: 'React 19 + TypeScript + Vite, Tailwind CSS, Recharts, jsPDF' },
      { layer: 'Backend', detail: 'Node.js + Express REST API with JWT auth, BCrypt password hashing and role middleware' },
      { layer: 'Data handling', detail: 'Identity-stripped feedback records, anonymous receipt tokens, session-hash duplicate guard' },
      { layer: 'Deployment', detail: 'Static demo on GitHub Pages; full API runs locally via `node server.js`' },
    ],
    challenges: [
      {
        title: 'Anonymity had to survive the data model',
        detail:
          'Removing names from the UI is not enough — identity columns are stripped during ingestion, so stored feedback cannot be joined back to a student even by an administrator.',
      },
      {
        title: 'Aggregate-only means aggregate-only',
        detail:
          'Faculty endpoints are restricted by middleware to computed aggregates. Raw rows and individual timestamps never reach a faculty session.',
      },
      {
        title: 'One person, one course, one submission',
        detail:
          'Repeated submissions are blocked using a hashed anonymous session token combined with the course identifier, which prevents ballot stuffing without storing a student identifier.',
      },
    ],
    integrity:
      'Anonymity is implemented as identity-field stripping at ingestion with aggregate-only faculty queries. It is not presented as a mathematical anonymity guarantee, and the public demo runs on synthetic data.',
  },
  {
    slug: 'scamshield-ai',
    title: 'ScamShield AI',
    tagline: 'Explainable scam detection for messages, links and screenshots',
    categories: ['AI & ML', 'Full-Stack'],
    year: '2026',
    status: 'Live demo',
    summary:
      'A privacy-first scam detector that scores text, URLs and screenshots from 0–100, highlights the exact phrases that triggered the score, and explains the recommended next step in English, Hindi, Hinglish and Gujarati.',
    problem:
      'Fraud messages succeed because people cannot tell which specific line is the trap. A score alone is not actionable — the tool has to show its evidence and stay trustworthy about its own uncertainty.',
    users:
      'Everyday mobile users, families and first-time internet users in India who receive suspicious SMS, WhatsApp or email messages.',
    features: [
      '0–100 risk index with LOW / MEDIUM / HIGH severity and a suspected scam category',
      'Fourteen-family rule engine covering OTP theft, fake KYC, lottery, job scams and more',
      'Evidence highlighting: each matched rule shows the excerpt and why it is dangerous',
      'Multilingual coverage for English, Hindi, Hinglish and Gujarati',
      'Diminishing-weight and context-paired scoring to reduce false positives',
      'URL inspector for lookalike domains, punycode spoofing, shorteners and suspicious TLDs — links are never opened',
      'On-device OCR via Tesseract.js so screenshots never leave the browser',
      "Guided emergency checklists with India's 1930 fraud helpline and cybercrime.gov.in",
      'Redacted report export and a local scan history you can delete',
      'Seventeen automated tests — 10 Pytest and 7 Vitest — covering detection, URL rules and XSS-safe rendering',
    ],
    stack: [
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Pydantic', icon: 'pydantic' },
      { name: 'Tesseract.js', icon: 'tesseract' },
      { name: 'Vitest', icon: 'vitest' },
      { name: 'Pytest', icon: 'pytest' },
    ],
    repoUrl: `${GH}/scamshield-ai`,
    demoUrl: `${PAGES}/scamshield-ai/`,
    demoNote:
      'The live demo runs a clearly-labelled on-device fallback engine when the FastAPI backend is unreachable, so the scanner still works with no server.',
    cover: 'shots/scamshield-hero.webp',
    gallery: [
      {
        src: 'shots/scamshield-hero.webp',
        alt: 'ScamShield AI landing screen with a live scanner preview showing a high-warning OTP message',
        caption: 'Landing screen with a live scanner preview',
      },
    ],
    architecture: [
      { layer: 'Frontend', detail: 'React + Vite + TypeScript, Tailwind CSS, React Router, Recharts, Tesseract.js for on-device OCR' },
      { layer: 'Detection engine', detail: 'Fourteen rule families with severity weights, context pairing and diminishing returns' },
      { layer: 'Backend', detail: 'Python FastAPI with Pydantic schemas, modular rule endpoints and in-memory rate limiting' },
      { layer: 'Fallback', detail: 'A TypeScript mirror of the rule engine runs in-browser when the API is unavailable, and results state their source' },
    ],
    challenges: [
      {
        title: 'False positives destroy trust',
        detail:
          'Generic words like "bank" or "urgent" appear in genuine messages. Rules are paired with context and scored with diminishing weights so repeated weak signals cannot alone push a message to HIGH.',
      },
      {
        title: 'Explainability over a black box',
        detail:
          'Every point of the risk index traces back to a named rule with the matched excerpt, so a user can verify the reasoning instead of accepting a verdict.',
      },
      {
        title: 'Never open the suspicious link',
        detail:
          'URL analysis is purely lexical — punycode, lookalike characters, shorteners, IP hosts and suspicious TLDs — so inspecting a hostile link cannot trigger a visit.',
      },
      {
        title: 'Privacy as a design constraint',
        detail:
          'Screenshots are processed with on-device OCR and history stays in local storage. The tool never asks for OTPs, PINs or passwords.',
      },
    ],
    integrity:
      'The risk index is an experimental rule-based indicator, not a validated fraud probability. A low score never guarantees a message is genuine — the interface states this uncertainty on every result.',
  },
]

export const projectCategories: ('All' | ProjectCategory)[] = [
  'All',
  'AI & ML',
  'Full-Stack',
  'Data & Analytics',
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

/** Derived counts — components read these so no number is ever hardcoded twice. */
export const projectCount = projects.length
export const deployedCount = projects.filter((p) => p.demoUrl).length

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
export const numberWord = (n: number) => WORDS[n] ?? String(n)
