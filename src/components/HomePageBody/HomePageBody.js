import React from "react"
import {
  PageWrapper,
  FeaturedImage,
  Description,
  Introduction,
  Title,
  Greeting,
  GreetingWrapper,
  FeaturedTextWrapper,
} from "./home-page.style"

const HomePageBody = () => {
  return (
    <PageWrapper>
      <FeaturedTextWrapper>
        <GreetingWrapper>
          <Greeting>Hello!</Greeting>
          <Introduction>I am Benson...</Introduction>
        </GreetingWrapper>
        <Title>
          Experience Designer (xD) <br />
          Software Engineer <br />
          Technology Advocate
        </Title>
        <Description black>
          I'm passionate about blending technology and arts, to creatively and
          efficiently solve problems, using new and experimental ideas and
          methods. I build products with great User Experiences.
        </Description>
        <Description>
          Highly skilled at design systems, automation, and customer experience
          engineering.
        </Description>
      </FeaturedTextWrapper>
      <FeaturedImage src="front-image.png" />
    </PageWrapper>
  )
}

export default HomePageBody
