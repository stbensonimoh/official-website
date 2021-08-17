import React from "react"
import Header from "../components/Header"
import Copyright from "../components/Copyright"
import SocialIcons from "../components/SocialIcons"

const App = () => {
  return (
    <div>
      <Header />
      <div>
        <div>
          <div>
            <h3>Hello!</h3>
            <h4>I am Benson...</h4>
          </div>
          <h1>
            Experience Designer (xD) <br />
            Software Engineer <br />
            Technology Advocate
          </h1>
          <p>
            I'm passionate about blending technology and arts, to creatively and
            efficiently solve problems, using new and experimental ideas and
            methods. I build products with great User Experiences.
          </p>
          <p>
            Highly skilled at design systems, automation, and customer
            experience engineering.
          </p>
        </div>
        <div>
          <img src="images/front-image.png" />
        </div>
      </div>
      <SocialIcons />
      <div>
        <Copyright />
      </div>
    </div>
  )
}

export default App
