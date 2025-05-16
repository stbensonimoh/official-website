import { MetadataRoute } from 'next';
import siteMetadata from '../../siteMetadata'; 

export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = siteMetadata;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Add disallow rules here if needed, for example:
        // disallow: '/admin/', 
      },
    ],
    sitemap: [
        `${siteUrl}sitemap.xml`,
        `${siteUrl}feed.xml`, // Optional: some crawlers might pick up the feed
    ],
  };
}