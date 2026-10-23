import { useRef, useState, type FormEvent } from 'react'
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Send,
} from 'lucide-react'
import { profile } from '../data/profile'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import {
  buildMailto,
  contactFallbackEmail,
  submitContact,
  type ContactPayload,
} from '../lib/contact'
import { GithubMark, LinkedinMark } from '../components/BrandIcons'

type FieldName = 'name' | 'email' | 'subject' | 'message'
type Values = Record<FieldName, string>
type Errors = Partial<Record<FieldName, string>>

const EMPTY: Values = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

function validate(values: Values): Errors {
  const errors: Errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (name.length < 2) errors.name = 'Please enter your name (at least 2 characters).'
  else if (name.length > 60) errors.name = 'Please keep your name under 60 characters.'

  if (!email) errors.email = 'An email address is required so I can reply.'
  else if (!EMAIL_RE.test(email)) errors.email = 'That email address does not look valid.'

  if (subject.trim().length < 4) errors.subject = 'Add a short subject (at least 4 characters).'
  else if (subject.length > 120) errors.subject = 'Please keep the subject under 120 characters.'

  if (message.length < 20) errors.message = 'Please write at least 20 characters.'
  else if (message.length > 1500) errors.message = 'Please keep the message under 1500 characters.'

  return errors
}

export function Contact() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const [copied, setCopied] = useState(false)
  const mountedAt = useRef(Date.now())
  const honeypot = useRef<HTMLInputElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  const setField = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors(validate({ ...values, [field]: value }))
    }
  }

  const onBlur = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setFeedback('Please fix the highlighted fields before sending.')
      const first = Object.keys(nextErrors)[0]
      document.getElementById(`contact-${first}`)?.focus()
      return
    }

    setStatus('sending')
    setFeedback('')

    const payload: ContactPayload = {
      ...values,
      company: honeypot.current?.value ?? '',
      elapsedMs: Date.now() - mountedAt.current,
    }

    const result = await submitContact(payload)

    if (result.ok && result.mode === 'endpoint') {
      setStatus('sent')
      setFeedback('')
      setValues(EMPTY)
      setTouched({})
      mountedAt.current = Date.now()
    } else if (result.ok) {
      setStatus('mailto')
      setFeedback('')
    } else {
      setStatus('error')
      setFeedback(result.error)
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactFallbackEmail)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${contactFallbackEmail}`
    }
  }

  const fieldClass = (field: FieldName) =>
    `w-full rounded-lg border bg-bg px-3.5 py-2.5 text-[14px] text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
      errors[field] && touched[field] ? 'border-rose-500/60' : 'border-line-strong'
    }`

  return (
    <section id="contact" className="section relative overflow-hidden border-t border-line">
      <div className="glow left-[-12%] bottom-[-20%] h-[360px] w-[360px] bg-accent2" aria-hidden="true" />

      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="05 — Contact"
          title="Let's talk about internships and projects."
          description="Open to full-stack developer, AI/ML and data analytics internships or entry-level roles — and always happy to discuss a project idea."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* Details */}
          <div className="space-y-3">
            <Reveal>
              <a
                href={profile.links.email}
                className="card card-hover group flex items-center gap-3 p-4 focus-ring"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent-line bg-accent-soft text-accent">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    Email
                  </span>
                  <span className="block truncate text-[13.5px] font-medium text-fg group-hover:text-accent">
                    {profile.email}
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={50}>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover group flex items-center gap-3 p-4 focus-ring"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent-line bg-accent-soft text-accent">
                  <LinkedinMark className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    LinkedIn
                  </span>
                  <span className="block truncate text-[13.5px] font-medium text-fg group-hover:text-accent">
                    panchal-yash-a8a16b190
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={100}>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover group flex items-center gap-3 p-4 focus-ring"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent-line bg-accent-soft text-accent">
                  <GithubMark className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    GitHub
                  </span>
                  <span className="block truncate text-[13.5px] font-medium text-fg group-hover:text-accent">
                    github.com/YashPanchal22
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={150}>
              <div className="card flex items-center gap-3 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-surface2 text-accent">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Location</p>
                  <p className="text-[13.5px] font-medium text-fg">{profile.location}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-3 text-[11.5px] leading-relaxed text-muted">
                <span className="dot-live shrink-0" aria-hidden="true" />
                Usually replies within 1–2 days. Quickest route is email.
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={80}>
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface2/50 px-5 py-3.5">
                <p className="font-display text-[15px] font-semibold">Send a message</p>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-md border border-line bg-bg px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:text-fg"
                >
                  {copied ? <Check className="h-3 w-3" aria-hidden="true" /> : <Copy className="h-3 w-3" aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy email'}
                </button>
              </div>

              <div className="p-5">
                {status === 'sent' ? (
                  <div className="flex flex-col items-center py-10 text-center" role="status">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold">Message sent</h3>
                    <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted">
                      Thanks for reaching out — I&apos;ll reply to the email address you provided.
                    </p>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm mt-5"
                      onClick={() => {
                        setStatus('idle')
                        mountedAt.current = Date.now()
                      }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : status === 'mailto' ? (
                  <div className="flex flex-col items-center py-8 text-center" role="status">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-accent-line bg-accent-soft text-accent">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold">Your mail app should be open</h3>
                    <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted">
                      Your message is prefilled and addressed to{' '}
                      <span className="text-soft">{contactFallbackEmail}</span>. Press send in your
                      mail app to deliver it.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      <a href={buildMailto({ ...values, company: '' })} className="btn btn-primary btn-sm">
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        Open mail app again
                      </a>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setStatus('idle')
                          mountedAt.current = Date.now()
                        }}
                      >
                        Back to form
                      </button>
                    </div>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="mb-1.5 block text-[12px] font-medium text-soft">
                          Name <span className="text-accent">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={values.name}
                          onChange={(e) => setField('name', e.target.value)}
                          onBlur={() => onBlur('name')}
                          aria-invalid={Boolean(errors.name && touched.name)}
                          aria-describedby={errors.name && touched.name ? 'error-name' : undefined}
                          className={fieldClass('name')}
                          placeholder="Your full name"
                        />
                        {errors.name && touched.name ? (
                          <p id="error-name" className="field-error">
                            {errors.name}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="mb-1.5 block text-[12px] font-medium text-soft">
                          Email <span className="text-accent">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={values.email}
                          onChange={(e) => setField('email', e.target.value)}
                          onBlur={() => onBlur('email')}
                          aria-invalid={Boolean(errors.email && touched.email)}
                          aria-describedby={errors.email && touched.email ? 'error-email' : undefined}
                          className={fieldClass('email')}
                          placeholder="you@company.com"
                        />
                        {errors.email && touched.email ? (
                          <p id="error-email" className="field-error">
                            {errors.email}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="mb-1.5 block text-[12px] font-medium text-soft">
                        Subject <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        value={values.subject}
                        onChange={(e) => setField('subject', e.target.value)}
                        onBlur={() => onBlur('subject')}
                        aria-invalid={Boolean(errors.subject && touched.subject)}
                        aria-describedby={errors.subject && touched.subject ? 'error-subject' : undefined}
                        className={fieldClass('subject')}
                        placeholder="Internship opportunity, project question…"
                      />
                      {errors.subject && touched.subject ? (
                        <p id="error-subject" className="field-error">
                          {errors.subject}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-baseline justify-between">
                        <label htmlFor="contact-message" className="block text-[12px] font-medium text-soft">
                          Message <span className="text-accent">*</span>
                        </label>
                        <span className="font-mono text-[10.5px] text-muted">{values.message.length}/1500</span>
                      </div>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        maxLength={1600}
                        value={values.message}
                        onChange={(e) => setField('message', e.target.value)}
                        onBlur={() => onBlur('message')}
                        aria-invalid={Boolean(errors.message && touched.message)}
                        aria-describedby={errors.message && touched.message ? 'error-message' : undefined}
                        className={`${fieldClass('message')} resize-y`}
                        placeholder="Tell me about the role, the team or the problem you're working on."
                      />
                      {errors.message && touched.message ? (
                        <p id="error-message" className="field-error">
                          {errors.message}
                        </p>
                      ) : null}
                    </div>

                    {/* Honeypot: `hidden` keeps it out of the rendered text and the a11y tree.
                        Bots that fill every input still trip it. */}
                    <div hidden aria-hidden="true">
                      <label htmlFor="contact-company">Company</label>
                      <input
                        ref={honeypot}
                        id="contact-company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {status === 'error' && feedback ? (
                      <div
                        role="alert"
                        className="notice notice-danger"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <p>{feedback}</p>
                      </div>
                    ) : null}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <p className="text-[11px] leading-relaxed text-muted">
                        Your details are used only to reply. No tracking, no third-party scripts.
                      </p>
                      <button
                        type="submit"
                        className="btn btn-primary h-10 px-5"
                        disabled={status === 'sending'}
                      >
                        {status === 'sending' ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" aria-hidden="true" />
                            Send message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
