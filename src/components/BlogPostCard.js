import React from "react"
import AuthorBlob from "./AuthorBlob"
import { useStaticQuery, graphql } from "gatsby"

const BlogPostCard = ({ post }) => {
  const data = useStaticQuery(graphql`
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
  `)

  console.log(data)
  return (
    <div className="bg-white w-full p-8 rounded-md shadow-sm">
      <div className="image-container max-h-52 overflow-hidden">
        <img src={post.frontmatter.featured_image} />
      </div>
      <h2 className="text-lg font-roboto font-bold text-bensonblack my-2">
        {post.frontmatter.title}
      </h2>
      <AuthorBlob
        author={
          post.frontmatter?.author
            ? post.frontmatter.author
            : data.site.siteMetadata.author.name
        }
        date={new Date(post.frontmatter.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        timeToRead={post.fields.timeToRead.text}
        image={
          post.frontmatter?.author_image
            ? post.frontmatter.author_image
            : data.site.siteMetadata.author.image
        }
      />
      <p className="font-slabt">{post.excerpt}</p>
    </div>
  )
}

export default BlogPostCard
