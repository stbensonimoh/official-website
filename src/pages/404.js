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
      <div className="flex flex-col items-center justify-center font-roboto">
        <img
          src="/images/404.png"
          width="40%"
          alt="404 Image"
          style={{ marginBottom: "1rem" }}
        />
        <h1 className="font-roboto font-bold text-bensonpink text-6xl">404</h1>
        <p className="my-6">
          Awww... Are you lost? It seems like the page you are looking for does
          not exist.
        </p>
        <Button type="internal" to="/">Let's go home</Button>
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
