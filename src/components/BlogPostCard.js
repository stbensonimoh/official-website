import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import AuthorBlob from "../components/AuthorBlob"
import { HeadSeo } from "gatsby-plugin-head-seo/src"

const BlogPostCard = ({ post, location }) => {
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
        siteUrl
        author {
          name
          image
        }
      }
    }
  }
`

export const Head = ({ post }) => {
  const { siteUrl } = useStaticQuery(BLOG_POST_CARD_QUERY).site.siteMetadata

  return (
    <>
      <meta property="og:title" content={post.frontmatter.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}${post.fields.slug}`} />
      <meta property="og:image" content={post.frontmatter.featured_image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.frontmatter.title} />
      <meta name="twitter:url" content={`${siteUrl}${post.fields.slug}`} />
      <meta name="twitter:description" content={post.excerpt} />
      <meta name="twitter:image" content={post.frontmatter.featured_image} />
      <meta name="twitter:creator" content={`@stbensonimoh`} />
    </>
  )
}
