import React from "react"
import { graphql } from "gatsby"
import {
  Copyright,
  CopyrightWrapper,
  HomePageWrapper,
} from "../components/HomePageBody/home-page.style"
import Header from "../components/Header/Header"
import HomePageBody from "../components/HomePageBody/HomePageBody"
import SocialIcons from "../components/SocialIcons/SocialIcons"

const App = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <HomePageWrapper location={location} title={siteTitle}>
      <Header />
      <HomePageBody />
      <SocialIcons />
      <CopyrightWrapper>
        <Copyright>
          Copyright &copy; {new Date().getFullYear()} Benson Imoh,ST
        </Copyright>
      </CopyrightWrapper>
    </HomePageWrapper>
  )
}

export default App

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
