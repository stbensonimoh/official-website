import React from "react"
import Button from "../components/Button"
import Header from "../components/Header"

const Blog = () => {
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
      <div className="second-section"></div>
    </div>
  )
}

export default Blog
