import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <Reveal className={align === 'center' ? 'text-center' : ''}>
      <p className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
      {description ? (
        <p className={`lead mt-4 max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>
      ) : null}
    </Reveal>
  )
}
