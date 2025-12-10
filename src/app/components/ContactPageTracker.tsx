'use client';

import { useEffect } from 'react';
import { setPageContext, upgradeSession } from '@/lib/clarity';

/**
 * Client component to handle contact page tracking with session upgrade
 */
export default function ContactPageTracker() {
  useEffect(() => {
    setPageContext('contact');
    upgradeSession('visited_contact_page');
  }, []);

  // This component doesn't render anything visible
  return null;
}
