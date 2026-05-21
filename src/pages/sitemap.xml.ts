import { getCollection } from 'astro:content';

export async function GET() {
  const siteUrl = 'https://stbensonimoh.com';

  const staticPages = [
    { url: siteUrl, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 1 },
    { url: `${siteUrl}/about`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/blog`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.5 },
  ];

  const posts = await getCollection('blog');
  const blogPages = posts.map((post) => ({
    url: `${siteUrl}/${post.data.slug || post.id}`,
    lastmod: post.data.updatedDate?.toISOString() || post.data.pubDate.toISOString(),
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
