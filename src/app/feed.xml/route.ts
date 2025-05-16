import { getAllPosts } from '@/lib/posts';
import siteMetadata from '../../../siteMetadata'; 
import MarkdownIt from 'markdown-it';

// Initialize markdown-it
const md = new MarkdownIt({
  html: true, // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
});

export async function GET() {
  const { siteUrl, title: siteTitle, description: siteDescription } = siteMetadata;
  const allPosts = getAllPosts();

  // Configure markdown-it to make image URLs absolute
  // This needs access to siteUrl
  const originalImageRule = md.renderer.rules.image || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const srcIndex = token.attrIndex('src');
    if (srcIndex >= 0 && token.attrs) {
      let src = token.attrs[srcIndex][1];
      if (src.startsWith('/')) {
        // Convert root-relative image paths to absolute URLs
        // e.g., /images/foo.png -> https://yourdomain.com/images/foo.png
        // Assumes siteUrl ends with a '/'
        token.attrs[srcIndex][1] = `${siteUrl}${src.substring(1)}`;
      }
      // Note: Fully relative paths (e.g., "image.png") are not explicitly handled here
      // and would remain relative. Ensure Markdown image paths are root-relative or absolute.
    }
    return originalImageRule(tokens, idx, options, env, self);
  };

  const feedItems = allPosts
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
    .map((post) => {
      const postUrl = `${siteUrl}${post.slug.startsWith('/') ? post.slug.substring(1) : post.slug}`;
      const pubDate = post.frontmatter.date ? new Date(post.frontmatter.date).toUTCString() : new Date().toUTCString();

      // For <description>, use excerpt or a short summary of the markdown content
      const summary = post.frontmatter.excerpt || post.content.substring(0, 250) + (post.content.length > 250 ? '...' : '');

      // For <content:encoded>, use full HTML content
      // Convert markdown post content to HTML
      let htmlContent = md.render(post.content);

      // Prepend featured image if available
      if (post.frontmatter.featuredImage) {
        let featuredImageUrl = post.frontmatter.featuredImage;
        // Ensure featured image URL is absolute
        if (featuredImageUrl.startsWith('/')) {
          featuredImageUrl = `${siteUrl}${featuredImageUrl.substring(1)}`;
        } else if (!featuredImageUrl.startsWith('http://') && !featuredImageUrl.startsWith('https://')) {
          // If it's a relative path not starting with '/', assume it's relative to site root
          featuredImageUrl = `${siteUrl}${featuredImageUrl}`;
        }
        // Prepend the featured image, wrapped in a paragraph, to the HTML content
        htmlContent = `<p><img src="${featuredImageUrl}" alt="${post.frontmatter.title || 'Featured image'}" /></p>${htmlContent}`;
      }

      return `
        <item>
          <title><![CDATA[${post.frontmatter.title}]]></title>
          <link>${postUrl}</link>
          <guid isPermaLink="true">${postUrl}</guid>
          <pubDate>${pubDate}</pubDate>
          <description><![CDATA[${summary}]]></description>
          <content:encoded><![CDATA[${htmlContent}]]></content:encoded>
        </item>
      `;
    })
    .join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[${siteTitle}]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${siteDescription}]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date(allPosts[0]?.frontmatter.date || Date.now()).toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}feed.xml" rel="self" type="application/rss+xml" />
    ${feedItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}