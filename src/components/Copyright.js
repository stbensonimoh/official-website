import React from "react"
import styled from "styled-components"
import theme from "../theme.json"

const Copyright = () => {
  return <Text>Copyright &copy; {new Date().getFullYear()} Benson Imoh,ST</Text>
}

/* STYLES */
const Text = styled.p`
  align-self: center;
  font-family: "Roboto";
  font-size: 14px;
  color: ${theme.colors.bensonGrey};
`

export default Copyright
