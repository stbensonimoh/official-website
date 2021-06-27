import React from "react"
import {
  SocialIconsWrapper,
  GitHub,
  LinkedIn,
  Twitter,
  Instagram,
} from "./social-icons.style"

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

export default SocialIcons
