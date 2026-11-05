import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";
import { CONTACT } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Reveal, SectionHeading } from "./Reveal";

/**
 * Submissions are delivered by FormSubmit (https://formsubmit.co), which forwards
 * them to the owner's inbox. The endpoint is called directly from the browser.
 * The first submission requires one-time activation of the address on FormSubmit.
 */
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT.email}`;
const REQUEST_TIMEOUT_MS = 20000;

type FieldName = "name" | "email" | "subject" | "message";
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;
type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success" } | { kind: "error"; message: string };

const EMPTY: FormValues = { name: "", email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > 80) errors.name = "Name must be 80 characters or fewer.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address, e.g. name@example.com.";

  if (!subject) errors.subject = "Please enter a subject.";
  else if (subject.length < 3) errors.subject = "Subject must be at least 3 characters.";
  else if (subject.length > 120) errors.subject = "Subject must be 120 characters or fewer.";

  if (!message) errors.message = "Please write a message.";
  else if (message.length < 10) errors.message = "Message must be at least 10 characters.";
  else if (message.length > 2000) errors.message = "Message must be 2000 characters or fewer.";

  return errors;
}

interface ContactLinkProps {
  icon: LucideIcon | typeof GithubIcon;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  ariaLabel: string;
}

function ContactLink({ icon: Icon, label, value, href, external, ariaLabel }: ContactLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/[0.06]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-violet-500/30 text-cyan-200 transition-transform duration-300 group-hover:scale-110">
        <Icon size={19} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] uppercase tracking-widest text-slate-500">{label}</span>
        <span className="block truncate text-sm font-medium text-slate-100 group-hover:text-cyan-200">{value}</span>
      </span>
    </a>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
        >
          <AlertCircle size={13} aria-hidden="true" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-rose-400/70 focus:ring-rose-400/30"
      : "border-white/10 hover:border-white/20 focus:border-cyan-300/60 focus:ring-cyan-300/20"
  }`;

export default function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [honey, setHoney] = useState("");

  const mailtoFallback = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    `Portfolio contact: ${values.subject || "Hello"}`
  )}&body=${encodeURIComponent(`${values.message}\n\n— ${values.name}\n${values.email}`)}`;

  const update = (field: FieldName, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field] || status.kind === "error") {
      setErrors(validate(next));
    }
    if (status.kind !== "submitting" && status.kind !== "idle") setStatus({ kind: "idle" });
  };

  const blur = (field: FieldName) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.kind === "submitting") return;

    setTouched({ name: true, email: true, subject: true, message: true });
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ kind: "error", message: "Please correct the highlighted fields and try again." });
      const firstInvalid = (["name", "email", "subject", "message"] as FieldName[]).find((f) => nextErrors[f]);
      if (firstInvalid) document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    // Honeypot: silently ignore bot submissions
    if (honey.trim() !== "") {
      setStatus({ kind: "success" });
      setValues(EMPTY);
      return;
    }

    setStatus({ kind: "submitting" });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          _replyto: values.email.trim(),
          subject: `Portfolio contact: ${values.subject.trim()}`,
          message: values.message.trim(),
          _subject: `Portfolio contact: ${values.subject.trim()}`,
          _captcha: "false",
          _template: "table",
        }),
        signal: controller.signal,
      });

      const data = (await response.json().catch(() => null)) as { success?: boolean | string; message?: string } | null;
      const ok = response.ok && data !== null && (data.success === true || data.success === "true");

      if (!ok) {
        throw new Error(data?.message || `The message service responded with status ${response.status}.`);
      }

      setStatus({ kind: "success" });
      setValues(EMPTY);
      setErrors({});
      setTouched({});
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === "AbortError";
      setStatus({
        kind: "error",
        message: aborted
          ? "The request timed out. Please check your connection and try again, or email me directly."
          : `Your message could not be sent. ${err instanceof Error ? err.message : ""} You can email me directly instead.`.replace(
              /\s+/g,
              " "
            ).trim(),
      });
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const submitting = status.kind === "submitting";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="contact-title"
          index="06"
          eyebrow="Contact"
          title="Let's Build Something Together"
          description="Open to internship and entry-level opportunities in full-stack, React, Python, and AI/data roles. I reply to every message."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-4">
            <div className="glass rounded-3xl p-6 md:p-8">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">Direct contact</p>
              <h3 className="mt-2 text-2xl font-black text-white">Yashkumar M. Panchal</h3>
              <p className="mt-2 text-sm text-slate-400">Full-Stack Developer · B.Sc. Data Science, Silver Oak University</p>

              <div className="mt-6 grid gap-3">
                <ContactLink
                  icon={Mail}
                  label="Email"
                  value={CONTACT.email}
                  href={`mailto:${CONTACT.email}`}
                  ariaLabel={`Send an email to ${CONTACT.email}`}
                />
                <ContactLink
                  icon={Phone}
                  label="Phone (click to call)"
                  value={CONTACT.phone}
                  href={`tel:${CONTACT.phoneHref}`}
                  ariaLabel={`Call ${CONTACT.phone}`}
                />
                <ContactLink
                  icon={MapPin}
                  label="Location"
                  value={CONTACT.location}
                  href="https://www.google.com/maps/search/?api=1&query=Ahmedabad%2C%20Gujarat%2C%20India"
                  external
                  ariaLabel="Ahmedabad, Gujarat, India on Google Maps (opens in a new tab)"
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className="btn-secondary !py-2.5 !text-[13px]"
                >
                  <LinkedinIcon width={16} height={16} />
                  LinkedIn
                </a>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="btn-secondary !py-2.5 !text-[13px]"
                >
                  <GithubIcon width={16} height={16} />
                  GitHub
                </a>
                <a
                  href={CONTACT.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Existing portfolio website (opens in a new tab)"
                  className="btn-ghost !py-2.5"
                >
                  Existing portfolio
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              noValidate
              onSubmit={handleSubmit}
              aria-labelledby="contact-form-title"
              className="glass-strong rounded-3xl p-6 md:p-8"
            >
              <h3 id="contact-form-title" className="text-xl font-bold text-white">
                Send me a message
              </h3>
              <p className="mt-1 text-sm text-slate-400">Fields marked * are required.</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-slate-200">
                    Name <span className="text-cyan-300" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => blur("name")}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    placeholder="Your full name"
                    className={inputClass(!!errors.name)}
                  />
                  <FieldError id="contact-name-error" message={errors.name} />
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-slate-200">
                    Email <span className="text-cyan-300" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => blur("email")}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    placeholder="you@company.com"
                    className={inputClass(!!errors.email)}
                  />
                  <FieldError id="contact-email-error" message={errors.email} />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-slate-200">
                  Subject <span className="text-cyan-300" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  onBlur={() => blur("subject")}
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  placeholder="Internship opportunity, project feedback, collaboration…"
                  className={inputClass(!!errors.subject)}
                />
                <FieldError id="contact-subject-error" message={errors.subject} />
              </div>

              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="contact-message" className="block text-sm font-medium text-slate-200">
                    Message <span className="text-cyan-300" aria-hidden="true">*</span>
                  </label>
                  <span className="text-xs tabular-nums text-slate-500" aria-live="off">
                    {values.message.length}/2000
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  onBlur={() => blur("message")}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  placeholder="Tell me about the role, team, or project you have in mind."
                  className={`${inputClass(!!errors.message)} resize-y`}
                />
                <FieldError id="contact-message-error" message={errors.message} />
              </div>

              {/* Honeypot field for bots; hidden from people and assistive tech */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-website">Leave this field empty</label>
                <input
                  id="contact-website"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                />
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70">
                  {submitting ? (
                    <>
                      <Loader2 size={17} className="animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-500">Or email me at {CONTACT.email}</p>
              </div>

              <div role="status" aria-live="polite" className="mt-5 min-h-[1px]">
                <AnimatePresence mode="wait">
                  {status.kind === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100"
                    >
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden="true" />
                      <p>
                        <strong className="block font-semibold">Message sent successfully.</strong>
                        Thank you for reaching out. I will reply to the email address you provided.
                      </p>
                    </motion.div>
                  )}
                  {status.kind === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 rounded-2xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-100"
                    >
                      <AlertCircle size={20} className="mt-0.5 shrink-0 text-rose-300" aria-hidden="true" />
                      <p>
                        <strong className="block font-semibold">Message not sent.</strong>
                        {status.message}{" "}
                        <a href={mailtoFallback} className="font-semibold text-cyan-200 underline underline-offset-4 hover:text-white">
                          Open my email app instead
                        </a>
                        .
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
