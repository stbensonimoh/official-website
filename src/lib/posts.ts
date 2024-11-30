import fs from "fs";
import path from "path";
import matter from "gray-matter";
import slugify from "slugify";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "blog");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data: frontmatter, content } = matter(fileContents);

    const slug = slugify(frontmatter.title, { lower: true, strict: true });

    const readTime = readingTime(content);

    return {
      slug,
      frontmatter,
      content,
      readingTime: readTime,
    };
  });

  return posts;
}

export function getPostBySlug(slug: string) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}
