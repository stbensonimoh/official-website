'use client'

import Clarity from '@microsoft/clarity'
import { useEffect, useRef } from 'react'

/**
 * Microsoft Clarity Analytics Component
 * 
 * Integrates Microsoft Clarity analytics for heatmap tracking and user behavior monitoring.
 * Only loads when NEXT_PUBLIC_CLARITY_TRACKING_ID environment variable is set.
 * 
 * Features:
 * - Privacy-conscious: only loads when tracking ID is provided
 * - Uses official @microsoft/clarity npm package
 * - Client-side only: marked with 'use client' directive
 */
export default function Analytics() {
  const trackingId = process.env.NEXT_PUBLIC_CLARITY_TRACKING_ID
  const initialized = useRef(false)

  useEffect(() => {
    // Only initialize once and only if we have a valid tracking ID
    if (!initialized.current && trackingId && trackingId !== 'your_tracking_id_here') {
      initialized.current = true
      
      // Initialize Clarity with the project ID
      Clarity.init(trackingId)
      
      console.log('[Clarity] Initialized with project ID:', trackingId.substring(0, 5) + '...')
    }
  }, [trackingId])

  // This component doesn't render anything visible
  return null
}