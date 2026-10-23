/**
 * Skill inventory — limited to technologies evidenced by the resume,
 * the public repositories, or coursework. No proficiency percentages.
 */

export type SkillGroup = {
  id: string
  title: string
  blurb: string
  icon: 'code' | 'layout' | 'server' | 'brain' | 'database' | 'chart' | 'check'
  skills: { name: string; icon?: string; note?: string }[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Programming',
    blurb: 'Languages I write day to day.',
    icon: 'code',
    skills: [
      { name: 'Python', icon: 'python' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'SQL', icon: 'sqlite', note: 'SQLite · queries & schema design' },
      { name: 'C', icon: 'c' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Interface engineering with a component-first mindset.',
    icon: 'layout',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css' },
      { name: 'Recharts', icon: 'recharts', note: 'dashboard & chart UIs' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    blurb: 'Typed APIs, validation and auth.',
    icon: 'server',
    skills: [
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Pydantic', icon: 'pydantic' },
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Express', icon: 'express' },
      { name: 'JWT', icon: 'jsonwebtokens' },
      { name: 'BCrypt', icon: 'bcrypt' },
      { name: 'REST APIs', icon: 'swagger' },
    ],
  },
  {
    id: 'data-ai',
    title: 'Data & AI',
    blurb: 'From raw data to an evaluated model.',
    icon: 'brain',
    skills: [
      { name: 'Pandas', icon: 'pandas' },
      { name: 'NumPy', icon: 'numpy' },
      { name: 'scikit-learn', icon: 'scikitlearn' },
      { name: 'Google Gemini SDK', icon: 'googlegemini' },
      { name: 'Rule-based NLP', icon: 'nlp', note: 'multilingual rule engines' },
      { name: 'Data preprocessing', icon: 'prep' },
      { name: 'Exploratory data analysis', icon: 'eda' },
      { name: 'Model evaluation', icon: 'eval' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing & QA',
    blurb: 'Tests written alongside features.',
    icon: 'check',
    skills: [
      { name: 'Pytest', icon: 'pytest' },
      { name: 'Vitest', icon: 'vitest' },
    ],
  },
  {
    id: 'tools',
    title: 'Databases & Tools',
    blurb: 'The everyday workflow.',
    icon: 'database',
    skills: [
      { name: 'SQLite', icon: 'sqlite' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'jsPDF', icon: 'pdf' },
      { name: 'Tesseract.js', icon: 'tesseract', note: 'on-device OCR' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & Visualisation',
    blurb: 'Turning records into decisions.',
    icon: 'chart',
    skills: [
      { name: 'Recharts', icon: 'recharts' },
      { name: 'KPI dashboards', icon: 'kpi' },
      { name: 'Data visualisation', icon: 'chart' },
      { name: 'CSV / PDF reporting', icon: 'report' },
    ],
  },
]
