import { useEffect } from 'react'

type PageMeta = {
  title: string
  description: string
  /** Path beginning with "/" — resolved against the deployment base. */
  path?: string
  type?: 'website' | 'article'
  image?: string
}

const SITE_NAME = 'Yashkumar M. Panchal'

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function usePageMeta({ title, description, path = '/', type = 'website', image }: PageMeta) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`
    document.title = fullTitle
    upsertMeta('meta[name="description"]', 'name', 'description', description)
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type)
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)

    const base = import.meta.env.BASE_URL || '/'
    const canonical = `${window.location.origin}${base.replace(/\/$/, '')}${path}`
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical)

    if (image) {
      const abs = `${window.location.origin}${base.replace(/\/$/, '')}/${image.replace(/^\//, '')}`
      upsertMeta('meta[property="og:image"]', 'property', 'og:image', abs)
      upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', abs)
    }
  }, [title, description, path, type, image])
}
