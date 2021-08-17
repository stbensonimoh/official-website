import React from "react"
import { graphql } from "gatsby"
import Button from "../components/Button"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <div>
        <img
          src="/images/404.png"
          width="40%"
          alt="404 Image"
          style={{ marginBottom: "1rem" }}
        />
        <h1>404</h1>
        <p>
          Awww... Are you lost? It seems like the page you are looking for does
          not exist.
        </p>
        <Button to="/">Let's go home</Button>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
