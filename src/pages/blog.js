import React from "react"
import Header from "../components/Header"

const Blog = () => {
  return (
    <div>
      <div>
        <Header />
        <section>
          <div>
            <h2>Welcome to my blog</h2>
            <h1>We all owe death a life.</h1>
            <p>
              I write about technology, design, engineering, productivity hacks,
              and life generally...
            </p>
            <div>
              <input type="text" placeholder="Your name" />
              <input type="email" placeholder="Your email" />
              <button>Subscribe</button>
            </div>
          </div>
          <img src="/images/blog-header-image.png" />
        </section>
      </div>
    </div>
  )
}

export default Blog
