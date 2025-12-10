'use client';

import { useEffect } from 'react';
import { setPageContext, trackEngagedReader, trackScrollDepth } from '@/lib/clarity';

interface BlogPostTrackerProps {
  slug: string;
  tags?: string[];
}

/**
 * Client component to handle blog post analytics tracking
 */
export default function BlogPostTracker({ slug, tags }: BlogPostTrackerProps) {
  useEffect(() => {
    // Set page context
    setPageContext('blog_post', { 
      post_slug: slug,
      post_tags: tags?.join(',') || 'untagged'
    });

    // Track engaged reading after 30 seconds
    const startTime = Date.now();
    const engagementTimer = setTimeout(() => {
      const duration = Date.now() - startTime;
      trackEngagedReader(duration);
    }, 30000);

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
      trackScrollDepth(scrollPercentage);
    };
    
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      clearTimeout(engagementTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [slug, tags]);

  // This component doesn't render anything visible
  return null;
}
