import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <section className="blog-header h-1/2">
        <img src="/images/blog-header1.png" style={{ width: `100%` }} />
      </section>
      <section className="blog-body flex justify-center">
              <div className="article-div w-9/12 bg-white py-24 px-24 relative bottom-44 h-72" style={{boxShadow: `0px -30px 40px -15px #666` }}>
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h1 itemProp="headline" className="text-5xl font-roboto font-bold text-bensonpink">{post.frontmatter.title}</h1>
              <p className="my-8">{post.frontmatter.date}</p>
            </header>
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
                          itemProp="articleBody"
                          className="article-body font-slab text-lg"
            />
            <hr />
            <footer>
              <Bio />
            </footer>
          </article>
        </div>
      </section>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
