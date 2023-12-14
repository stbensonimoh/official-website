import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa"

const SocialIcons = props => {
  const { twitter, linkedin, facebook, youtube, instagram, github } =
    useStaticQuery(SOCIAL_ICONS_QUERY).site.siteMetadata.social
  return (
    <div {...props}>
      <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer">
        <FaGithub />
      </a>
      <a href={linkedin} target="_blank" rel="noreferrer">
        <FaLinkedinIn />
      </a>
      <a
        href={`https://twitter.com/${twitter}`}
        target="_blank"
        rel="noreferrer"
      >
        <FaTwitter />
      </a>
      <a
        href={`https://instagram.com/${instagram}`}
        target="_blank"
        rel="noreferrer"
      >
        <FaInstagram />
      </a>
    </div>
  )
}

export default SocialIcons

export const SOCIAL_ICONS_QUERY = graphql`
  query SocialIconsQuery {
    site {
      siteMetadata {
        social {
          twitter
          linkedin
          github
          instagram
          facebook
          youtube
        }
      }
    }
  }
`
