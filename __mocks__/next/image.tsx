// Mock for Next.js Image component in tests
import React from 'react'

type ImageProps = {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  priority?: boolean
  className?: string
  style?: React.CSSProperties
  [key: string]: any
}

export default function Image({ src, alt, className, style, ...props }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...props}
    />
  )
}