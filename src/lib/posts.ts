import { postsData } from "./posts.data";

export type Post = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    featured_image: string;
    author?: string;
    author_image?: string;
    excerpt: string;
    tags: string[];
  };
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
};

export function getAllPosts(): Post[] {
  return postsData.map((post) => ({
    ...post,
    frontmatter: {
      ...post.frontmatter,
    },
    readingTime: {
      ...post.readingTime,
    },
  })) as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
