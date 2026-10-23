import type { ElementType, ReactNode } from 'react'
import { useReveal } from '../lib/useReveal'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  as?: ElementType
}

export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(delay)
  return (
    <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </Tag>
  )
}
