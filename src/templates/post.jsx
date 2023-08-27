import React from "react"
import Header from "../components/Header"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import AuthorBlob from "../components/AuthorBlob"
import { HeadSeo } from "gatsby-plugin-head-seo/src"

const shortcodes = { Link }

export default function PageTemplate({ data, children }) {
  return (
    <div className="">
      <Header />
      <main className="flex flex-col w-full">
        <div
          className="featured-image"
          style={{
            backgroundImage: `url(${data.mdx.frontmatter?.featured_image})`,
            backgroundRepeat: 'no-repeat"',
            backgroundSize: "cover",
            height: `calc(100vh - 400px`,
          }}
        ></div>
        <div
          className="w-3/4 bg-white self-center h-60 relative bottom-36"
          style={{ boxShadow: `0px -20px 20px rgba(0, 0, 0, 0.2)` }}
        ></div>
        <div className="w-3/4 px-32 self-center relative bottom-72">
          <h1 className="my-4 lg:text-5xl font-roboto font-bold text-bensonpink">
            {data.mdx.frontmatter.title}
          </h1>
          <AuthorBlob
            date={new Date(data.mdx.frontmatter?.date).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            )}
            image={
              data.mdx.frontmatter?.author_image
                ? data.mdx.frontmatter.author_image
                : data.site.siteMetadata.author.image
            }
            author={
              data.mdx.frontmatter?.author
                ? data.mdx.frontmatter.author
                : data.site.siteMetadata.author.name
            }
            timeToRead={data.mdx.fields.timeToRead.text}
          />
          <article className="prose max-w-none">
            <MDXProvider components={shortcodes} className="prose">
              {children}
            </MDXProvider>
          </article>
          <p className="text-bensonpink text-lg mt-8">
            Tags: {data.mdx.frontmatter?.tags.map(tag => `#${tag} `)}
          </p>
        </div>
      </main>
    </div>
  )
}

export const query = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        author {
          name
          image
        }
      }
    }
    mdx(id: { eq: $id }) {
      excerpt
      frontmatter {
        title
        date
        featured_image
        author_image
        author
        tags
      }
      fields {
        timeToRead {
          text
        }
      }
    }
  }
`

export const Head = ({ location, data }) => {
  return (
    <HeadSeo
      location={location}
      title={data.mdx.frontmatter.title}
      description={data.mdx.excerpt}
    />
  )
}
