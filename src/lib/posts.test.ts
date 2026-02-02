import { test, expect, describe } from "bun:test";
import { getAllPosts, getPostBySlug } from "./posts";

describe("Blog Posts Library", () => {
  test("getAllPosts returns an array of posts", () => {
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
  });

  test("getAllPosts returns posts with required fields", () => {
    const posts = getAllPosts();
    if (posts.length > 0) {
      const firstPost = posts[0];
      expect(firstPost).toHaveProperty("slug");
      expect(firstPost).toHaveProperty("frontmatter");
      expect(firstPost).toHaveProperty("content");
      expect(firstPost).toHaveProperty("readingTime");
    }
  });

  test("getPostBySlug returns undefined for non-existent slug", () => {
    const post = getPostBySlug("this-slug-definitely-does-not-exist-12345");
    expect(post).toBeUndefined();
  });

  test("getPostBySlug returns correct post when slug exists", () => {
    const posts = getAllPosts();
    if (posts.length > 0) {
      const existingSlug = posts[0].slug;
      const foundPost = getPostBySlug(existingSlug);
      expect(foundPost).toBeDefined();
      expect(foundPost?.slug).toBe(existingSlug);
    }
  });

  test("post slugs are lowercase and URL-safe", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      expect(post.slug).toBe(post.slug.toLowerCase());
      expect(post.slug).not.toContain(" ");
      expect(post.slug).not.toContain("?");
      expect(post.slug).not.toContain("&");
    }
  });
});
