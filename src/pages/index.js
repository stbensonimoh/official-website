import React from "react"
import Header from "../components/Header"
import Copyright from "../components/Copyright"
import SocialIcons from "../components/SocialIcons"

const App = () => {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center mt-12">
        <div className="flex flex-col mx-10 w-1/3">
            <h3 className="text-4xl font-roboto">Hello!</h3>
            <h4 className="text-2xl font-badscript">I am Benson...</h4>
                  <h1 className="font-bebas my-4 lg:text-3xl xl:text-5xl">
            Experience Designer (xD) <br />
            Software Engineer <br />
            Technology Advocate
          </h1>
          <p className="xl:w-4/5">
            I'm passionate about blending technology and arts, to creatively and
            efficiently solve problems, using new and experimental ideas and
            methods. I build products with great User Experiences.
          </p>
          <p className="pt-4 text-bensongrey xl:w-3/5">
            Highly skilled at design systems, automation, customer
            experience, and developer experience engineering.
          </p>
        </div>
        <div className="image-section mx-10">
          <img src="images/front-image.png" />
        </div>
      </div>
      <SocialIcons className="absolute bottom-10 social-icons flex flex-col w-8 ml-4 text-center text-bensongrey" />
      <div className="copyright-container absolute right-8 bottom-8 font-roboto text-sm text-bensongrey">
        <Copyright />
      </div>
    </div>
  )
}

export default App
