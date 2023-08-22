import React from "react"
import Header from "../components/Header"
import SocialIcons from "../components/SocialIcons"
import Copyright from "../components/Copyright"
import Button from "../components/Button"
import { FiSend } from "react-icons/fi"
import { HeadSeo } from "gatsby-plugin-head-seo/src"

const Contact = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="main flex flex-col items-center justify-center mt-12">
        <h1 className="font-roboto font-bold text-6xl text-bensonpink">
          Send me a message
        </h1>
        <p className="font-roboto text-2xl my-6 w-5/12 text-center">
          Do you have a question, a project you’d like to have me on, or just
          want to say hi?
        </p>
        <form className="contact-form flex flex-col w-3/4 items-center mt-14">
          <div className="row flex w-full">
            <div className="column w-1/2 px-12">
              <label htmlFor="name">Your Name</label>
              <input type="text" placeholder="John Doe" id="name" />
            </div>
            <div className="column w-1/2 px-12">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                placeholder="johndoe@example.com"
                id="email"
              />
            </div>
          </div>
          <div className="row my-14 w-full">
            <div className="column w-full px-12">
              <label htmlFor="message">Your message</label>
              <textarea
                rows="2"
                placeholder="Hi, I think we need a design system for our products at Company X. How soon can you hop on to discuss this?"
                id="message"
              ></textarea>
            </div>
          </div>
          <div>
            <Button>
              Send &nbsp; <FiSend />
            </Button>
          </div>
        </form>
      </div>
      <SocialIcons className="absolute bottom-10 social-icons flex flex-col w-8 ml-4 text-center text-bensongrey" />
      <div>
        <div className="copyright-container absolute right-8 bottom-8 font-roboto text-sm text-bensongrey">
          <Copyright />
        </div>
      </div>
    </div>
  )
}

export default Contact

export const Head = ({ location }) => {
  return <HeadSeo location={location} />
}
