import React from "react"
import styled from "styled-components"
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa"
import theme from "../theme.json"

const SocialIcons = () => {
  return (
    <SocialIconsWrapper>
      <a
        href="https://github.com/stbensonimoh"
        target="_blank"
        rel="noreferrer"
      >
        <GitHub />
      </a>
      <a
        href="https://linkedin.com/in/stbensonimoh"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedIn />
      </a>
      <a
        href="https://twitter.com/stbensonimoh"
        target="_blank"
        rel="noreferrer"
      >
        <Twitter />
      </a>
      <a
        href="https://instagram.com/stbensonimoh"
        target="_blank"
        rel="noreferrer"
      >
        <Instagram />
      </a>
    </SocialIconsWrapper>
  )
}

/* ----------------- STYLES ------------------ */
const SocialIconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  font-size: 2rem;
  margin-top: -1rem;
  color: ${theme.colors.bensonGrey};
  width: 32px;

  & > a {
    text-decoration: none;
    color: ${theme.colors.bensonGrey};
  }
`

const GitHub = styled(FaGithub)``

const LinkedIn = styled(FaLinkedinIn)``

const Twitter = styled(FaTwitter)``

const Instagram = styled(FaInstagram)``

export default SocialIcons
