import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { asset } from '../lib/assets'

type SmartImageProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
}

/**
 * Lazy, fade-in image with an honest error state.
 * Screenshots are real captures of the deployed applications.
 */
export function SmartImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  width = 1440,
  height = 900,
  priority = false,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-surface2 text-muted ${className}`}
        role="img"
        aria-label={`${alt} (preview unavailable)`}
      >
        <ImageOff className="h-5 w-5" aria-hidden="true" />
        <span className="text-[11px]">Preview unavailable</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-surface2 ${className}`}>
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      <img
        src={asset(src)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}
