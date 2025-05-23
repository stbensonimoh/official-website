import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import siteMetadata from "../../siteMetadata";

const sitemap = (): MetadataRoute.Sitemap => {
  const { siteUrl } = siteMetadata;

  // Get static routes
  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${siteUrl}about`, // Assuming your about page is at /about
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}contact`, // Assuming your contact page is at /contact
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}blog`, // Assuming your blog listing page is at /blog
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  // Get dynamic routes (blog posts)
  const posts = getAllPosts();
  const blogPostRoutes = posts.map((post) => {
    // Assuming your frontmatter contains a 'date' field for the last modification
    // If not, you might want to use a default date or modify getAllPosts
    const lastModified = post.frontmatter.date
      ? new Date(post.frontmatter.date).toISOString()
      : new Date().toISOString();

    return {
      url: `${siteUrl}${post.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...blogPostRoutes];
};

export default sitemap;
