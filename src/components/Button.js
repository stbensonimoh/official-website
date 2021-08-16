import React from "react"
import { Link } from "gatsby"

const Button = ({ children,...props}) => {
    return <ButtonStyle {...props}> {children}</ButtonStyle>
}

/* -----------------       STYLES          ------------------ */
const ButtonStyle = styled(Link)`
  padding: 1rem 3rem;
  padding-right: 2rem;
  width: 11rem;
  background: #fff;
  color: ${theme.colors.bensonPink};
  text-transform: uppercase;
  font-family: "Dosis";
  text-decoration: none;
  font-size: 1.5rem;
  border: 1px solid ${theme.colors.bensonPink};
  background: linear-gradient(
      to right,
      ${theme.colors.bensonPink} 50%,
      #fff 50%
    )
    right;
  background-size: 200% 100%;
  background-position: right;
  transition: all 0.7s ease-out;
  cursor: pointer;

  &:hover {
    background-position: left;
    color: #fff;
  }
`

export default Button
