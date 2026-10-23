/**
 * Contact submission.
 *
 * Two supported delivery paths, chosen at build time:
 *  1. VITE_CONTACT_FORM_ENDPOINT  — any POST-accepting form service
 *     (Formspree, Basin, Getform, your own API). No secret is needed for these.
 *  2. Email fallback — when no endpoint is configured, the visitor is handed a
 *     prefilled mail draft. Nothing pretends to have been delivered.
 */

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  /** Honeypot — must stay empty. */
  company?: string
  /** Milliseconds the form was on screen; sub-second submits are bots. */
  elapsedMs?: number
}

export type ContactResult =
  | { ok: true; mode: 'endpoint' }
  | { ok: true; mode: 'mailto' }
  | { ok: false; error: string }

const ENDPOINT = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? '').trim()
export const contactFallbackEmail = 'panchalyash862@gmail.com'
export const isEndpointConfigured = ENDPOINT.length > 0

export function buildMailto(payload: ContactPayload): string {
  const subject = encodeURIComponent(payload.subject || `Portfolio enquiry from ${payload.name}`)
  const body = encodeURIComponent(
    `${payload.message}\n\n—\n${payload.name}\n${payload.email}`,
  )
  return `mailto:${contactFallbackEmail}?subject=${subject}&body=${body}`
}

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  // Bot heuristics: silently succeed for bots without sending anything.
  if (payload.company && payload.company.trim().length > 0) {
    return { ok: true, mode: 'mailto' }
  }
  if (typeof payload.elapsedMs === 'number' && payload.elapsedMs < 2500) {
    return { ok: false, error: 'That was a little too quick — please review your message and try again.' }
  }

  if (!ENDPOINT) {
    // Genuine fallback: open the visitor's mail client with the message prefilled.
    window.location.href = buildMailto(payload)
    return { ok: true, mode: 'mailto' }
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        _gotcha: payload.company ?? '',
      }),
    })
    if (!res.ok) {
      return {
        ok: false,
        error: `The form service responded with ${res.status}. Please email me directly instead.`,
      }
    }
    return { ok: true, mode: 'endpoint' }
  } catch {
    return {
      ok: false,
      error: 'Network error while sending. Please check your connection or email me directly.',
    }
  }
}
