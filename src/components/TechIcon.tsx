import {
  siC,
  siCss,
  siExpress,
  siFastapi,
  siGit,
  siGithub,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siNodedotjs,
  siNumpy,
  siPandas,
  siPydantic,
  siPostgresql,
  siPytest,
  siPython,
  siReact,
  siScikitlearn,
  siSqlite,
  siSwagger,
  siTailwindcss,
  siTypescript,
  siVite,
  siVitest,
} from 'simple-icons'
import {
  AudioLines,
  CodeXml,
  FileSpreadsheet,
  FileText,
  Filter,
  Gauge,
  Languages,
  LayoutDashboard,
  Lock,
  Radio,
  ScanText,
  Search,
  ChartSpline,
  ChartColumn,
  type LucideIcon,
} from 'lucide-react'

type Brand = { path: string; hex: string; title: string }

/** simple-icons marks, keyed by the short names used in the data files. */
const brands: Record<string, Brand> = {
  c: siC,
  css: siCss,
  express: siExpress,
  fastapi: siFastapi,
  git: siGit,
  github: siGithub,
  googlegemini: siGooglegemini,
  html5: siHtml5,
  javascript: siJavascript,
  jsonwebtokens: siJsonwebtokens,
  nodedotjs: siNodedotjs,
  numpy: siNumpy,
  pandas: siPandas,
  pydantic: siPydantic,
  postgresql: siPostgresql,
  pytest: siPytest,
  python: siPython,
  react: siReact,
  scikitlearn: siScikitlearn,
  sqlite: siSqlite,
  swagger: siSwagger,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  vite: siVite,
  vitest: siVitest,
}

/** Icons that have no brand mark — a consistent Lucide glyph keeps the set coherent. */
const glyphs: Record<string, LucideIcon> = {
  bcrypt: Lock,
  recharts: ChartSpline,
  vscode: CodeXml,
  pdf: FileText,
  tesseract: ScanText,
  websocket: Radio,
  speech: AudioLines,
  nlp: Languages,
  prep: Filter,
  eda: Search,
  eval: Gauge,
  kpi: LayoutDashboard,
  chart: ChartColumn,
  report: FileSpreadsheet,
}

type TechIconProps = {
  name?: string
  className?: string
  /** Renders the brand colour; otherwise inherits currentColor. */
  colored?: boolean
}

export function TechIcon({ name, className = 'h-4 w-4', colored = true }: TechIconProps) {
  if (!name) return null

  const brand = brands[name]
  if (brand) {
    return (
      <svg
        role="img"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        className={className}
        fill={colored ? `#${brand.hex}` : 'currentColor'}
      >
        <path d={brand.path} />
      </svg>
    )
  }

  const Glyph = glyphs[name]
  if (Glyph) return <Glyph className={className} aria-hidden="true" />

  return null
}

/** Small inline pill: icon + label, used for tech stacks. */
export function TechPill({ name, icon }: { name: string; icon?: string }) {
  return (
    <span className="chip chip-mono">
      <TechIcon name={icon} className="h-3.5 w-3.5" />
      {name}
    </span>
  )
}
