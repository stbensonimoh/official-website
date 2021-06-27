import React from "react"
import { graphql } from "gatsby"
import { Copyright } from '../components/HomePageBody/home-page.style'

import Layout from "../components/layout"
import HomePageBody from "../components/HomePageBody/HomePageBody"

const App = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
          <HomePageBody />
          <Copyright>Copyright &copy; { new Date().getFullYear() } Benson Imoh,ST</Copyright>
    </Layout>
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
