// Single source of truth for all portfolio content.
// Every value here is taken from Yashkumar M. Panchal's resume and supplied brief.

export const PERSON = {
  name: "Yashkumar M. Panchal",
  shortName: "Yashkumar",
  initials: "YP",
  roleLine: "Full-Stack Developer | React · TypeScript · FastAPI",
  degreeLine: "B.Sc. Data Science Student | Silver Oak University",
  location: "Ahmedabad, Gujarat, India",
  headline: "Building Intelligent Digital Experiences Through Code.",
  supporting:
    "I am a Full-Stack Developer and Data Science student passionate about building scalable web applications, AI-powered solutions, computer vision systems, and meaningful digital products.",
  availability: "Open to Internship & Entry-Level Opportunities",
  resumeFile: "Yashkumar_Panchal_Resume.pdf",
} as const;

export const CONTACT = {
  email: "panchalyash862@gmail.com",
  phone: "+91 7600339053",
  phoneHref: "+917600339053",
  location: "Ahmedabad, Gujarat, India",
  linkedin: "https://linkedin.com/in/panchal-yash-a8a16b190",
  linkedinLabel: "linkedin.com/in/panchal-yash-a8a16b190",
  github: "https://github.com/YashPanchal22",
  githubLabel: "github.com/YashPanchal22",
  portfolio: "https://yashpanchal22.github.io/yash-portfolio",
  portfolioLabel: "yashpanchal22.github.io/yash-portfolio",
} as const;

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const ABOUT = {
  paragraphs: [
    "I am a third-year B.Sc. Data Science student at Silver Oak University, Ahmedabad, with a CGPA of 8.16. I focus on full-stack development, AI integration, computer vision, data analytics, and building practical software solutions.",
    "I have developed three full-stack applications using React, TypeScript, FastAPI, and Node.js, covering privacy-first analytics, AI-powered nutrition assistance, and road-damage detection.",
  ],
  focusAreas: [
    "Full-Stack Development",
    "AI Integration",
    "Computer Vision",
    "Data Analytics",
    "Practical Software Solutions",
  ],
  stats: [
    { value: 8.16, decimals: 2, label: "CGPA", hint: "B.Sc. Data Science" },
    { value: 3, decimals: 0, label: "Full-Stack Projects", hint: "Shipped end-to-end" },
    { value: 79, decimals: 0, label: "Automated Tests", hint: "Pytest + Vitest" },
    { value: 2027, decimals: 0, label: "Expected Graduation", hint: "Silver Oak University" },
  ],
} as const;

export type SkillCategoryId =
  | "languages"
  | "frontend"
  | "backend"
  | "ai"
  | "testing"
  | "tools";

export const SKILL_CATEGORIES: {
  id: SkillCategoryId;
  title: string;
  description: string;
  skills: string[];
}[] = [
  {
    id: "languages",
    title: "Programming Languages",
    description: "Languages used across web, backend, and data work.",
    skills: ["Python", "TypeScript", "JavaScript", "C"],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Interfaces, data visualization, and mapping.",
    skills: ["React", "Vite", "Tailwind CSS", "Recharts", "Leaflet"],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "APIs, validation, and secure access control.",
    skills: ["FastAPI", "Pydantic", "Node.js", "Express", "JWT", "BCrypt"],
  },
  {
    id: "ai",
    title: "Data Science & AI",
    description: "Machine learning, computer vision, and language tooling.",
    skills: [
      "PyTorch",
      "YOLOv8 (Ultralytics)",
      "Computer Vision",
      "Pandas",
      "scikit-learn",
      "Google Gemini AI SDK",
      "Rule-based NLP",
    ],
  },
  {
    id: "testing",
    title: "Testing",
    description: "Backend and frontend automated test suites.",
    skills: ["Pytest", "Vitest"],
  },
  {
    id: "tools",
    title: "Databases & Developer Tools",
    description: "Data storage, version control, and developer tooling.",
    skills: ["SQLite", "SQLAlchemy", "SQL", "Git", "GitHub", "VS Code", "jsPDF"],
  },
];

export type ProjectId = "feedback" | "nutrizero" | "roadguard";

export interface Project {
  id: ProjectId;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  stack: string[];
  features: string[];
  contribution: string;
  summaryImpact: string;
  github: string;
  live: string;
  accent: "blue" | "violet" | "cyan";
}

export const PROJECTS: Project[] = [
  {
    id: "feedback",
    number: "01",
    title: "Faculty Anonymous Feedback & Performance Analytics System",
    shortTitle: "Faculty Feedback Analytics",
    tagline: "Privacy-first faculty evaluation with role-based dashboards",
    description:
      "Built a full-stack faculty evaluation platform where students can submit anonymous teacher reviews across eight parameters and administrators can monitor institutional performance through a seven-KPI dashboard with eight analytics charts.",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Recharts",
      "Node.js",
      "Express",
      "JWT",
      "BCrypt",
      "jsPDF",
    ],
    features: [
      "Three user roles with JWT-based role-based access control",
      "Anonymous student feedback across eight evaluation parameters",
      "Privacy-first ingestion pipeline that removes identity fields before storage",
      "One-way receipt tokens and duplicate prevention via anonymous session hashing",
      "Aggregate analytics for faculty: seven KPIs and eight charts",
      "PDF and CSV export",
      "Local rule-based sentiment analysis with no third-party AI API transmission",
    ],
    contribution:
      "Built the full-stack platform: the React 19 + TypeScript frontend with Recharts analytics, the Node.js / Express API with JWT and BCrypt security, the privacy-first feedback pipeline, and the PDF and CSV reporting.",
    summaryImpact: "Seven-KPI dashboard with eight analytics charts and role-based access for three user types.",
    github: "https://github.com/YashPanchal22/faculty-anonymous-feedback",
    live: "https://yashpanchal22.github.io/faculty-anonymous-feedback",
    accent: "blue",
  },
  {
    id: "nutrizero",
    number: "02",
    title: "NutriZero AI — Nutrition & Zero-Waste Meal Planning",
    shortTitle: "NutriZero AI",
    tagline: "AI nutrition planning aligned with UN SDG 2 (Zero Hunger)",
    description:
      "Developed a full-stack AI-powered nutrition platform aligned with UN Sustainable Development Goal 2 (Zero Hunger), helping users plan budget-aware meals, create recipes from available ingredients, and reduce food waste.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "Google Gemini AI SDK",
      "Recharts",
      "Web Speech API",
    ],
    features: [
      "Ten application modules",
      "Budget-aware meal planning",
      "Pantry-based recipe generation from available ingredients",
      "Food-waste reduction and food storage safety guidance",
      "Google Gemini AI integration with retry logic and offline fallback engines",
      "Voice readout using the Web Speech API",
      "FastAPI backend with Pydantic v2 validation",
      "Sustainability impact dashboard",
    ],
    contribution:
      "Built the full-stack application: the React + TypeScript interface across its ten modules, the FastAPI backend with Pydantic v2 validation, the Gemini AI integration with retry and offline fallback logic, and the sustainability dashboard.",
    summaryImpact: "Ten application modules, AI recipe generation with offline fallback, and voice readout.",
    github: "https://github.com/YashPanchal22/NutriZero-AI",
    live: "https://yashpanchal22.github.io/NutriZero-AI",
    accent: "violet",
  },
  {
    id: "roadguard",
    number: "03",
    title: "RoadGuard AI — Road Damage Detection & Geospatial Analytics",
    shortTitle: "RoadGuard AI",
    tagline: "YOLOv8 road-damage detection with geospatial reporting",
    description:
      "Developed a full-stack road-damage reporting platform using a pretrained YOLOv8s computer vision model to identify five types of road distress from uploaded images.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Python",
      "FastAPI",
      "PyTorch",
      "YOLOv8",
      "SQLite",
      "SQLAlchemy",
      "Leaflet",
      "Pytest",
      "Vitest",
    ],
    features: [
      "AI-powered road damage detection with annotated image output",
      "Five road distress categories",
      "Approximately 0.2-second CPU inference, as stated in project results",
      "Explainable six-factor road repair priority scoring",
      "Duplicate-report assistance using perceptual hashing",
      "GPS and geospatial mapping through Leaflet",
      "JWT role-based access and SQLite audit trails",
      "Eight-chart analytics dashboard with CSV, JSON, and PDF exports",
      "79 automated tests: 54 Pytest backend tests and 25 Vitest frontend tests",
    ],
    contribution:
      "Built the full-stack platform: the FastAPI backend with SQLAlchemy and SQLite audit trails, integration of the pretrained YOLOv8s model for inference and annotated output, the priority-scoring and duplicate-detection logic, the Leaflet mapping UI, and the automated test suites.",
    summaryImpact: "Five road-distress classes, ~0.2 s CPU inference, and 79 automated tests (54 Pytest + 25 Vitest).",
    github: "https://github.com/YashPanchal22/roadguard-ai",
    live: "https://yashpanchal22.github.io/roadguard-ai",
    accent: "cyan",
  },
];

export interface Certification {
  title: string;
  provider: string;
  date?: string;
  type: "course" | "certificate";
  icon: "cloud" | "brain" | "sparkles" | "code";
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "AWS Cloud Practitioner Essentials",
    provider: "AWS Training & Certification",
    date: "July 2026",
    type: "course",
    icon: "cloud",
  },
  {
    title: "AI-Machine Learning Engineer Certificate Course",
    provider: "Reliance Foundation Skilling Academy",
    date: "August 2026",
    type: "certificate",
    icon: "brain",
  },
  {
    title: "Gemini for Data Scientists and Analysts",
    provider: "Google Cloud",
    type: "certificate",
    icon: "sparkles",
  },
  {
    title: "C Training",
    provider: "Spoken Tutorial Project, IIT Bombay",
    type: "certificate",
    icon: "code",
  },
];

export const EDUCATION = [
  {
    degree: "B.Sc. in Data Science",
    institution: "Silver Oak University, Ahmedabad",
    period: "Expected Graduation: 2027",
    detail: "CGPA: 8.16",
    current: true,
  },
  {
    degree: "HSC (12th)",
    institution: "Shree Panchtirth Vidyalaya, GSHSEB",
    period: "2024",
    detail: undefined,
    current: false,
  },
  {
    degree: "SSC (10th)",
    institution: "Shree Panchtirth Vidyalaya, GSHSEB",
    period: "2021",
    detail: "Percentage: 89.21%",
    current: false,
  },
];

export const ACTIVITIES = [
  {
    title: "Ideathon: Viksit Bharat 2047",
    organizer: "Silver Oak University",
    date: undefined,
    role: "Participant",
  },
  {
    title: "KALPVRUKSH 2.0",
    organizer: "Silver Oak University",
    subtitle: "NextGen ChatBot Arena · RapidWeb Challenge",
    date: "September 2026",
    role: "Participant",
  },
];

export const TECH_TICKER = [
  "React",
  "TypeScript",
  "FastAPI",
  "Python",
  "PyTorch",
  "YOLOv8",
  "Node.js",
  "Express",
  "SQLite",
  "Tailwind CSS",
  "Pytest",
  "Vitest",
  "Gemini AI",
  "Leaflet",
];
