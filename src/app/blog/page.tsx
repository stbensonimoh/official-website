import { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import BlogPostCard from "@/app/components/BlogPostCard";

type Post = {
  slug: string;
  frontmatter: {
    title: string;
    featured_image: string;
    date: string;
    tags: string[];
    author?: string;
    author_image?: string;
    excerpt: string;
  };
  content: string;
  readingTime: {
    text: string;
  };
};

type Posts = Post[];

export const metadata: Metadata = {
  title: "Blog - Benson Imoh,ST",
  description: "Software Engineer. DevOps Enthusiast. OSS Advocate.",
  openGraph: {
    url: "https://stbensonimoh.com/about",
    title: "Blog - Benson Imoh,ST",
    description: "Software Engineer. DevOps Enthusiast. OSS Advocate.",
    images: [
      {
        url: "https://res.cloudinary.com/stbensonimoh/image/upload/v1735318948/stbensonimoh_logo.png",
        width: 1500,
        height: 1500,
        alt: "Benson Imoh,ST",
      },
    ],
    siteName: "Benson Imoh,ST",
  },
  twitter: {
    creator: "@stbensonimoh",
    card: "summary_large_image",
    title: "Benson Imoh,ST",
    description: "Software Engineer. DevOps Enthusiast. OSS Advocate.",
    images: {
      url: "https://res.cloudinary.com/stbensonimoh/image/upload/v1735318948/stbensonimoh_logo.png",
      alt: "Benson Imoh, ST's Logo",
    },
  },
};

export default async function Blog({ params }: any) {
  // Extracting posts from params
  const { slug } = await params;
  const posts: Posts = getAllPosts().map((post) => ({
    ...post,
    frontmatter: {
      title: post.frontmatter.title || "",
      featured_image: post.frontmatter.featured_image || "",
      date: post.frontmatter.date || "",
      tags: post.frontmatter.tags || [],
      author: post.frontmatter.author || "",
      author_image: post.frontmatter.author_image || "",
      excerpt: post.frontmatter.excerpt || "",
    },
  }));

  // Extracting featured posts
  const getFeaturedPosts = (posts: Posts) => {
    const featuredPosts = posts.filter(
      (post: Post) =>
        post.frontmatter.tags &&
        Array.isArray(post.frontmatter.tags) &&
        post.frontmatter.tags.includes("featured")
    );
    featuredPosts.sort(
      (a: Post, b: Post) =>
        new Date(b.frontmatter.date || 0).getTime() -
        new Date(a.frontmatter.date || 0).getTime()
    );
    return featuredPosts.slice(0, 1);
  };

  // Extracting latest posts
  const getLatestPosts = (posts: Post[]): Post[] => {
    const sortedPosts = [...posts].sort(
      (a, b) =>
        new Date(b.frontmatter.date || 0).getTime() -
        new Date(a.frontmatter.date || 0).getTime()
    );
    return sortedPosts.slice(0, 2);
  };

  return (
    <div className="flex flex-col">
      <div className="first-section flex flex-col md:h-screen">
        <section
          className="flex flex-col md:flex-row justify-center items-center flex-grow lg:space-x-12 pt-40 md:pt-0 w-full pb-20 bg-surface"
        >
          <div className="text-center md:text-left flex flex-col items-center lg:items-start lg:ml-12">
            <h2 className="text-lg font-dosis uppercase text-primary">
              Welcome to my blog
            </h2>
            <h1 className="text-5xl font-roboto font-medium xl:w-2/4 my-6 mx-10 md:mx-0">
              We all owe death a life.
            </h1>
            <p className="font-roboto xl:w-2/4 mb-12 md:mb-4 mx-10 md:mx-0">
              I write about technology, design, engineering, productivity hacks,
              and life generally...
            </p>
          </div>
          <img
            src="/images/blog-header-image.png"
            className="hidden lg:block pt-12 lg:w-2/5 lg:pr-12"
          />
        </section>
      </div>
      <div className="second-section bg-background py-12 flex flex-col items-center">
        <div className="flex flex-col items-start w-10/12 md:w-11/12 lg:w-4/5">
          <h2 className="text-3xl font-roboto font-medium text-foreground my-8">
            Latest Posts
          </h2>
          <div className="posts w-full grid gap-8 md:grid-cols-2 xl:grid-cols-3" data-testid="latest-posts">
            {getLatestPosts(posts).map((post, index) => (
              <BlogPostCard key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start w-10/12 md:w-11/12 lg:w-4/5">
          <h2 className="text-3xl font-roboto fomedium text-foreground my-8">
            Featured Posts
          </h2>
          <div className="posts w-full grid gap-8 md:grid-cols-2 xl:grid-cols-3" data-testid="featured-posts">
            {getFeaturedPosts(posts).map((post, index) => (
              <BlogPostCard key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
