'use client'

import { useEffect } from 'react'
import { setPageContext, trackEvent } from '@/lib/clarity'

export default function NotFoundTracker() {
  useEffect(() => {
    // Tag this as a 404 page
    setPageContext('404', {
      page_name: 'not_found',
      error_type: '404'
    })
    
    // Track 404 occurrence
    trackEvent('404_page_view')
  }, [])

  return null
}
