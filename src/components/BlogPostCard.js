import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import AuthorBlob from "../components/AuthorBlob"

const BlogPostCard = ({ post }) => {
  const { author } = useStaticQuery(BLOG_POST_CARD_QUERY).site.siteMetadata

  return (
    <div className="bg-white w-full p-8 rounded-md shadow-sm">
      <Link to={post.fields.slug}>
        <div className="image-container max-h-52 overflow-hidden">
          <img src={post.frontmatter.featured_image} alt="Featured Image" />
        </div>
      </Link>
      <h2 className="text-lg font-roboto font-bold text-bensonblack my-2">
        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
      </h2>
      <AuthorBlob
        author={post.frontmatter?.author ?? author.name}
        date={new Date(post.frontmatter.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        timeToRead={post.fields.timeToRead.text}
        image={post.frontmatter?.author_image ?? author.image}
      />
      <p>{post.excerpt}</p>

      <small className="text-bensonpink">
        <Link to={post.fields.slug}>Read More...</Link>
      </small>
    </div>
  )
}

export default BlogPostCard

export const BLOG_POST_CARD_QUERY = graphql`
  query BlogPostCardQuery {
    site {
      siteMetadata {
        author {
          name
          image
        }
      }
    }
  }
`
