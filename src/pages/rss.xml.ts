import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { cloudinaryUrl } from '../lib/cloudinary';

export const prerender = true;

export async function GET() {
  const posts = await getCollection('blog');
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    trailingSlash: false,
    title: 'Benson Imoh,ST',
    description: 'Software Engineer | DevOps Enthusiast | OSS Advocate',
    site: 'https://stbensonimoh.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/${post.data.slug || post.id}`,
      pubDate: post.data.pubDate,
      customData: post.data.heroImage
        ? `<enclosure url="${cloudinaryUrl(post.data.heroImage, { width: 1200, autoFormat: false })}" type="image/jpeg" />`
        : undefined,
    })),
    customData: '<language>en-us</language>',
  });
}
