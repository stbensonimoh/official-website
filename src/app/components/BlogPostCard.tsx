import Link from "next/link";
import Image from "next/image";
import AuthorBlob from "./AuthorBlob";
import siteMetadata from "../../../siteMetadata";

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

export default function BlogPostCard({ post }: { post: Post }) {
  const { name, image } = siteMetadata.author;
  const { featured_image, title, author, author_image, date } =
    post.frontmatter;

  return (
    <div role="article" className="bg-surface w-full p-8 rounded-md shadow-sm">
      <Link href={`/${post.slug}`}>
        <div className="image-container max-h-52 overflow-hidden">
          <Image 
            src={featured_image} 
            alt={`Featured image for blog post: ${title}`}
            width={400}
            height={200}
            className="w-full h-auto object-cover"
          />
        </div>
      </Link>
      <h2 className="text-lg font-roboto font-medium text-foreground my-2">
        <Link href={`/${post.slug}`}>{title}</Link>
      </h2>
      <AuthorBlob
        author={author ? author : name}
        date={new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        timeToRead={post.readingTime.text}
        image={author_image ? author_image : image}
      />
      <p>{post.frontmatter.excerpt}</p>

      <small className="text-primary">
        <Link href={`/${post.slug}`}>Read More...</Link>
      </small>
    </div>
  );
}
