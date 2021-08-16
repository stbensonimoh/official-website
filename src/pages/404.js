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
      <Container>
        <img
          src="/images/404.png"
          width="40%"
          alt="404 Image"
          style={{ marginBottom: "1rem" }}
        />
        <Title>404</Title>
        <p>
          Awww... Are you lost? It seems like the page you are looking for does not
          exist.
        </p>
        <Button to="/">Let's go home</Button>
      </Container>
    </Layout>
  )
}

/* STYLES */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & p {
    font-family: "Roboto", "Open Sans", sans-serif;
    margin-bottom: 2rem;
  }
`
const Title = styled.h1`
  font-family: "Dosis", sans-serif;
  font-size: 500%;
  font-weight: 300;
  color: ${theme.colors.bensonPink};
  margin-top: 0rem;
  margin-bottom: 0rem;
`

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
