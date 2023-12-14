import React, { useState } from "react"
import { graphql } from "gatsby"
import Button from "../components/Button"
import Header from "../components/Header"
import BlogPostCard from "../components/BlogPostCard"
import { HeadSeo } from "gatsby-plugin-head-seo/src"
import Swal from "sweetalert2"

const Blog = ({ data }) => {
  const [subscriberName, setSubscriberName] = useState("")
  const [subscriberEmail, setSubscriberEmail] = useState("")
  const [userIsSubscribed, setUserIsSubscribed] = useState(false)

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

  const handleSubscriberEmail = e => setSubscriberEmail(e.target.value)
  const handleSubscriberName = e => setSubscriberName(e.target.value)

  const handleSubscription = async () => {
    if (userIsSubscribed === true) {
      Swal.fire({
        title: "Already Subscribed!",
        text: "You have already subscribed!",
        icon: "warning",
        confirmButtonText: "OK",
      })
      return
    }

    const response = await fetch(`/api/fetchsubscriber`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: subscriberEmail }),
    }).then(response => {
      if (response.status === 200) {
        setUserIsSubscribed(true)
        Swal.fire({
          title: "Already Subscribed!",
          text: "You have already subscribed!",
          icon: "warning",
          confirmButtonText: "OK",
        })
        return
      } else {
        const postData = {
          name: subscriberName,
          email: subscriberEmail,
        }

        fetch(`/api/subscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        })
          .then(response => {
            if (response.status === 201) {
              Swal.fire({
                title: "Success!",
                text: "You have been successfully subscribed! Check your email for confirmation.",
                icon: "success",
                confirmButtonText: "OK",
              })
              setUserIsSubscribed(true)
              setSubscriberEmail("")
              setSubscriberName("")
            }
          })
          .catch(err => {
            // Handle errors and update the error state
            console.log(err)
          })
      }
    })
  }

  return (
    <div className="flex flex-col">
      <div className="first-section flex flex-col md:h-screen">
        <Header />
        <section
          className="flex flex-col md:flex-row justify-center items-center flex-grow lg:space-x-12 pt-40 md:pt-0 w-full pb-20"
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <div className="text-center md:text-left flex flex-col items-center lg:items-start lg:ml-12">
            <h2 className="text-lg font-dosis uppercase text-bensonpink">
              Welcome to my blog
            </h2>
            <h1 className="text-5xl font-roboto font-bold xl:w-2/4 my-6 mx-10 md:mx-0">
              We all owe death a life.
            </h1>
            <p className="font-roboto xl:w-2/4 mb-12 md:mb-4 mx-10 md:mx-0">
              I write about technology, design, engineering, productivity hacks,
              and life generally...
            </p>
            <div className="flex flex-col md:flex-row items-center md:items-stretch">
              <input
                type="text"
                value={subscriberName}
                onChange={handleSubscriberName}
                placeholder="Your name"
                className="bg-transparent border text-roboto py-3 px-4 mr-4 outline-none mb-4 md:mb-0 w-full"
              />
              <input
                type="email"
                value={subscriberEmail}
                onChange={handleSubscriberEmail}
                placeholder="Your email"
                className="bg-transparent border text-roboto py-3 px-4 mr-4 outline-none w-full mb-8 md:mb-0"
              />
              <Button onClick={handleSubscription}>Subscribe</Button>
            </div>
          </div>
          <img
            src="/images/blog-header-image.png"
            className="hidden lg:block pt-12 lg:w-2/5 lg:pr-12"
          />
        </section>
      </div>
      <div className="second-section bg-slate-100 py-12 flex flex-col items-center">
        <div className="flex flex-col items-start w-10/12 md:w-11/12 lg:w-4/5">
          <h2 className="text-3xl font-roboto font-bold text-bensonblack my-8">
            Latest Posts
          </h2>
          <div className="posts w-full grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {getLatestPosts(posts).map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start w-10/12 md:w-11/12 lg:w-4/5">
          <h2 className="text-3xl font-roboto font-bold text-bensonblack my-8">
            Featured Posts
          </h2>
          <div className="posts w-full grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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
