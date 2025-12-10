'use client'

import Button from '@/app/components/Button'
import { trackCTAWithUpgrade } from '@/lib/clarity'
import { ReactNode } from 'react'

interface CTAButtonProps {
  type: 'internal' | 'external'
  href: string
  target?: string
  ctaName: string
  children: ReactNode
  className?: string
}

export default function CTAButton({ type, href, target, ctaName, children, className }: CTAButtonProps) {
  const handleClick = () => {
    trackCTAWithUpgrade(ctaName)
  }

  return (
    <Button
      type={type}
      href={href}
      target={target}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Button>
  )
}
