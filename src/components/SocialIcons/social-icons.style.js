import styled from "styled-components"
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa"
import theme from "../../theme.json"

export const SocialIconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  font-size: 2rem;
  margin-top: -1rem;
  color: ${theme.colors.bensonGrey};

  & > a {
    text-decoration: none;
    color: ${theme.colors.bensonGrey};
  }
`

export const GitHub = styled(FaGithub)``

export const LinkedIn = styled(FaLinkedinIn)``

export const Twitter = styled(FaTwitter)``

export const Instagram = styled(FaInstagram)``
