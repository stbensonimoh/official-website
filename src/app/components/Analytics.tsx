'use client'

import Script from 'next/script'
import { useEffect } from 'react'

/**
 * Microsoft Clarity Analytics Component
 * 
 * Integrates Microsoft Clarity analytics for heatmap tracking and user behavior monitoring.
 * Only loads when NEXT_PUBLIC_CLARITY_TRACKING_ID environment variable is set.
 * 
 * Features:
 * - Privacy-conscious: only loads when tracking ID is provided
 * - Performance optimized: loads script after page becomes interactive
 * - Client-side only: marked with 'use client' directive
 */
export default function Analytics() {
  const trackingId = process.env.NEXT_PUBLIC_CLARITY_TRACKING_ID

  useEffect(() => {
    // Debug: log when component mounts
    if (trackingId && trackingId !== 'your_tracking_id_here') {
      console.log('[Clarity] Analytics component mounted with tracking ID:', trackingId.substring(0, 5) + '...')
    }
  }, [trackingId])

  // Don't render anything if tracking ID is not provided or is placeholder
  if (!trackingId || trackingId === 'your_tracking_id_here') {
    return null
  }

  return (
    <Script
      id="clarity-analytics"
      strategy="afterInteractive"
      onLoad={() => {
        console.log('[Clarity] Script loaded successfully')
        console.log('[Clarity] window.clarity available:', typeof (window as any).clarity !== 'undefined')
      }}
      onError={(e) => {
        console.error('[Clarity] Failed to load script:', e)
      }}
    >
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${trackingId}");
      `}
    </Script>
  )
}