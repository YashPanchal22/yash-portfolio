import { scrollToHash } from './navigation'

/** Scrolls to a section, tolerating both in-page and cross-page navigation. */
export function scrollToSection(id: string) {
  scrollToHash(`#${id}`)
}
