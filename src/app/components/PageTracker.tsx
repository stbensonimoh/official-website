'use client';

import { useEffect } from 'react';
import { setPageContext } from '@/lib/clarity';

interface PageTrackerProps {
  pageType: string;
  additionalTags?: Record<string, string>;
}

/**
 * Client component to handle page context tracking
 */
export default function PageTracker({ pageType, additionalTags }: PageTrackerProps) {
  useEffect(() => {
    setPageContext(pageType, additionalTags);
  }, [pageType, additionalTags]);

  // This component doesn't render anything visible
  return null;
}
