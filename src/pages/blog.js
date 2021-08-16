import React from "react"
import Header from "../components/Header"

const Blog = () => {
  return (
    <AboutPageWrapper>
      <FirstSectionWrapper>
        <Header />
        <SectionWrapper>
          <SectionHeaderWrapper>
            <Subtitle>Welcome to my blog</Subtitle>
            <Title>We all owe death a life.</Title>
            <p>
              I write about technology, design, engineering, productivity hacks,
              and life generally...
            </p>
            <SubscribeSection>
              <Input type="text" placeholder="Your name" />
              <Input type="email" placeholder="Your email" />
              <Button>Subscribe</Button>
            </SubscribeSection>
          </SectionHeaderWrapper>
          <SectionImage src="/images/blog-header-image.png" />
        </SectionWrapper>
      </FirstSectionWrapper>
    </AboutPageWrapper>
  )
}

/* -----------------    STYLES  ------------------ */
const AboutPageWrapper = styled.div``

const FirstSectionWrapper = styled.div`
  background-color: #f9f9f9;
  height: 100vh;
`
const SectionHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & p {
    font-family: "Roboto";
    width: 24rem;
  }
`

const Button = styled.button`
  background-color: ${theme.colors.bensonPink};
  border: none;
  color: white;
  font-family: "Dosis";
  text-transform: uppercase;
  padding: .5rem 2rem;
  font-weight: bold;
  cursor: pointer;
`

const SectionWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const SectionImage = styled.img`
  width: 32%;
`

const Subtitle = styled.h2`
  font-family: "Dosis";
  font-size: 1.2rem;
  text-transform: uppercase;
  color: ${theme.colors.bensonPink};
  font-weight: 300;
`

const Title = styled.h1`
  font-family: "Roboto";
  font-size: 3rem;
  width: 16rem;
  margin-top: 0rem;
  margin-bottom: 0rem;
`

const SubscribeSection = styled.div`
  display: flex;
`
const Input = styled.input`
  background: none;
  margin-right: 0.5rem;
  border: 2px solid #c4c4c4;
  font-family: "Roboto";
  padding: 0.8rem 0.9rem;

  &:focus-visible {
    outline: none;
  }
`

export default Blog
