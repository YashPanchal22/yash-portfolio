/**
 * Single source of truth for personal details.
 * Every value here is taken from the uploaded resume
 * (Yashkumar_Panchal_Resume_ATS.pdf) or a verified GitHub URL.
 */

export const profile = {
  name: 'Yashkumar M. Panchal',
  shortName: 'Yashkumar Panchal',
  initials: 'YP',
  title: 'B.Sc. Data Science Student · Full-Stack Developer · AI/ML Enthusiast',
  headline: 'Building Intelligent Solutions with Code, Data & AI.',
  subheadline:
    'I develop full-stack applications, AI-powered solutions, and interactive data analytics experiences that solve practical problems.',
  location: 'Ahmedabad, Gujarat, India',
  email: 'panchalyash862@gmail.com',
  availability: 'Open to full-stack developer & AI/ML internships',
  summary:
    'Third-year B.Sc. Data Science student at Silver Oak University who builds and ships complete web applications — React + TypeScript front ends, FastAPI and Express back ends, and AI / analytics features layered on top. Each project is deployed publicly on GitHub Pages with its own repository and documentation.',
  links: {
    github: 'https://github.com/YashPanchal22',
    linkedin: 'https://www.linkedin.com/in/panchal-yash-a8a16b190',
    email: 'mailto:panchalyash862@gmail.com',
  },
  resume: {
    url: '/Yashkumar_Panchal_Resume.pdf',
    fileName: 'Yashkumar_Panchal_Resume.pdf',
  },
  /** Real, countable facts — no invented metrics. */
  highlights: [
    { value: '3', label: 'Full-stack projects built', note: 'public repos' },
    { value: '3', label: 'Live deployments', note: 'GitHub Pages' },
    { value: '17', label: 'Automated tests', note: 'ScamShield AI' },
    { value: '8.16', label: 'CGPA', note: 'B.Sc. Data Science' },
  ],
  languages: ['Gujarati', 'Hindi', 'English'],
} as const

export const education = [
  {
    degree: 'Bachelor of Science in Data Science (B.Sc. Data Science)',
    school: 'Silver Oak University',
    place: 'Ahmedabad, Gujarat',
    period: 'Expected 2027',
    detail: 'CGPA 8.16',
    current: true,
    coursework: [
      'Programming & problem solving',
      'Statistics and probability',
      'Data preprocessing & exploratory analysis',
      'Machine learning fundamentals',
      'Database management systems',
    ],
  },
  {
    degree: 'Higher Secondary Certificate (HSC) — 12th',
    school: 'Shree Panchtirth Vidyalaya',
    place: 'GSHSEB, Gujarat',
    period: '2024',
    detail: null,
    current: false,
    coursework: [],
  },
  {
    degree: 'Secondary School Certificate (SSC) — 10th',
    school: 'Shree Panchtirth Vidyalaya',
    place: 'GSHSEB, Gujarat',
    period: '2021',
    detail: '89.21%',
    current: false,
    coursework: [],
  },
] as const

export const certifications = [
  {
    name: 'AWS Cloud Practitioner Essentials',
    issuer: 'AWS Training & Certification',
    kind: 'Course',
    date: 'Jul 2026',
  },
  {
    name: 'AI–Machine Learning Engineer Certificate Course',
    issuer: 'Reliance Foundation Skilling Academy',
    kind: 'Certificate course',
    date: 'Aug 2026',
  },
  {
    name: 'Gemini for Data Scientists and Analysts',
    issuer: 'Google Cloud',
    kind: 'Course',
    date: null,
  },
  {
    name: 'C Training',
    issuer: 'Spoken Tutorial Project, IIT Bombay',
    kind: 'Training',
    date: null,
  },
] as const

export const activities = [
  {
    name: 'KALPVRUKSH 2.0 — NextGen ChatBot Arena, Rapid Web Challenge',
    role: 'Participant',
    org: 'Silver Oak University',
    date: 'Sep 2026',
    note: 'Built and presented the Faculty Anonymous Feedback & Performance Analytics System.',
  },
  {
    name: 'Ideathon: Viksit Bharat 2047',
    role: 'Participant',
    org: 'Silver Oak University',
    date: null,
    note: 'Idea-stage innovation challenge.',
  },
] as const
