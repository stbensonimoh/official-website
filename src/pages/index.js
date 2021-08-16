import React from "react"
import styled from "styled-components"
import Header from "../components/Header"
import Copyright from "../components/Copyright"
import SocialIcons from "../components/SocialIcons"
import theme from "../theme.json"

const App = () => {
  return (
    <HomePageWrapper>
      <Header />
      <BodyWrapper>
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
            Highly skilled at design systems, automation, and customer
            experience engineering.
          </Description>
        </FeaturedTextWrapper>
        <FeaturedImageWrapper>
          <FeaturedImage src="images/front-image.png" />
        </FeaturedImageWrapper>
      </BodyWrapper>
      <SocialIcons />
      <CopyrightWrapper>
        <Copyright />
      </CopyrightWrapper>
    </HomePageWrapper>
  )
}

/* STYLE */
const HomePageWrapper = styled.div``

const BodyWrapper = styled.div`
  display: flex;
`
const FeaturedImageWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`

const FeaturedImage = styled.img`
  padding-left: 3rem;
  width: 100%;
  height: auto;
  object-fit: contain;
`

const FeaturedTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 3rem;
`

const GreetingWrapper = styled.div`
  margin-left: 3rem;
`

const Greeting = styled.h3`
  font-family: "Roboto";
  font-weight: 300;
  font-size: 2.25rem;
`

const Introduction = styled.h4`
  font-family: "Bad Script";
  font-size: 1.5rem;
  margin-top: -1rem;
  font-weight: 300;
`

const Title = styled.h1`
  margin-left: 3rem;
  font-family: "Bebas Neue";
  font-size: 3.5rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  line-height: 1.1;
`

const Description = styled.p`
  margin-left: 3rem;
  font-family: "Roboto";
  font-size: 0.875rem;
  margin-top: -0.31rem;
  width: 26rem;
  color: ${({ black }) =>
    black ? theme.colors.bensonBlack : theme.colors.bensonGrey};
`

const CopyrightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 3rem;
  position: relative;
  bottom: 2rem;
`

export default App
