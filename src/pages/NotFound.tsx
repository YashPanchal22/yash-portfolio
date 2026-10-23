import { Link, useLocation, useNavigate } from 'react-router-dom'

export function NotFound() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="grid-backdrop relative flex min-h-[70vh] items-center overflow-hidden">
      <div className="glow left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 bg-accent" aria-hidden="true" />
      <div className="container-page relative z-10 py-20 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Error 404</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-none tracking-tight">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-muted">
          The page you were looking for doesn&apos;t exist, or it may have moved. Try the home page
          or jump straight into a project case study.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <button type="button" onClick={() => navigate('/')} className="btn btn-primary h-10 px-5">
            Back to home
          </button>
          <Link to="/projects/nutrizero-ai" className="btn btn-secondary h-10 px-4">
            View a case study
          </Link>
        </div>

        <div className="mx-auto mt-10 max-w-md rounded-xl border border-line bg-surface p-4 text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Requested path</p>
          <p className="mt-1 break-all font-mono text-[12px] text-soft">{location.pathname}</p>
        </div>
      </div>
    </div>
  )
}
