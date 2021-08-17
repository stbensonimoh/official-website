import React from "react"
import Header from "../components/Header"
import SocialIcons from "../components/SocialIcons"
import Copyright from "../components/Copyright"
import Button from "../components/Button"
import { FiSend } from "react-icons/fi"

const Contact = () => {
  return (
    <div>
      <Header />
      <h1>Send me a message</h1>
      <p>
        Do you have a question, a project you’d like to have me on, or just want
        to say hi?
      </p>
      <form>
        <div>
          <div style={{ marginRight: "6rem" }}>
            <label htmlFor="name">Your Name</label>
            <input type="text" placeholder="John Doe" id="name" />
          </div>
          <div>
            <label htmlFor="email">Your Email</label>
            <input type="email" placeholder="johndoe@example.com" id="email" />
          </div>
        </div>
        <div>   
          <div>
            <label htmlFor="message">Your message</label>
            <textarea
              rows="2"
              placeholder="Hi, I think we need a design system for our products at Company X. How soon can you hop on to discuss this?"
              id="message"
            ></textarea>
          </div>
        </div>
        <div>
          <Button
            as="button"
            style={{
              paddingLeft: "3rem",
              paddingRight: "3rem",
              boxSizing: "content-box",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            Send <FiSend />
          </Button>
        </div>
      </form>
      <div>
        <SocialIcons />
      </div>
      <div>
        <Copyright />
      </div>
    </div>
  )
}

export default Contact
