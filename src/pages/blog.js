import React from "react"
import { graphql } from "gatsby"
import Button from "../components/Button"
import Header from "../components/Header"
import BlogPostCard from "../components/BlogPostCard"
import { HeadSeo } from "gatsby-plugin-head-seo/src"

const Blog = ({ data }) => {
  // Extracting posts from data
  const posts = data.allMdx.nodes

  // Extracting featured posts
  const getFeaturedPosts = posts => {
    const featuredPosts = posts.filter(post =>
      post.frontmatter.tags.includes("featured")
    )
    featuredPosts.sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    )
    return featuredPosts.slice(0, 3)
  }

  // Extracting latest posts
  const getLatestPosts = posts => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    )
    return sortedPosts.slice(0, 3)
  }

  return (
    <div className="flex flex-col">
      <div className="first-section flex flex-col h-screen">
        <Header />
        <section
          className="flex justify-center items-center flex-grow space-x-12"
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <div>
            <h2 className="text-lg font-dosis uppercase text-bensonpink">
              Welcome to my blog
            </h2>
            <h1 className="text-5xl font-roboto font-bold w-2/4 my-6">
              We all owe death a life.
            </h1>
            <p className="font-roboto w-2/4 mb-4">
              I write about technology, design, engineering, productivity hacks,
              and life generally...
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="Your name"
                className="bg-transparent border text-roboto px-4 mr-4 outline-none"
              />
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent border text-roboto px-4 mr-4 outline-none"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
          <img src="/images/blog-header-image.png" />
        </section>
      </div>
      <div className="second-section bg-slate-100 py-12 flex flex-col items-center">
        <div className="flex flex-col items-start w-4/5">
          <h2 className="text-3xl font-roboto font-bold text-bensonblack my-8">
            Latest Posts
          </h2>
          <div className="posts w-full grid gap-8 grid-cols-3">
            {getLatestPosts(posts).map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start w-4/5">
          <h2 className="text-3xl font-roboto font-bold text-bensonblack my-8">
            Featured Posts
          </h2>
          <div className="posts w-full grid gap-8 grid-cols-3">
            {getFeaturedPosts(posts).map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog

export const pageQuery = graphql`
  query BlogPageQuery {
    site {
      siteMetadata {
        author {
          name
          image
        }
      }
    }
    allMdx {
      nodes {
        id
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
          slug
          timeToRead {
            text
          }
        }
      }
    }
  }
`
export const Head = ({ location }) => {
  return (
    <HeadSeo
      location={location}
      title={`Benson's Blog`}
      description="I write about technology, design, engineering, productivity hacks, and life generally."
    />
  )
}
