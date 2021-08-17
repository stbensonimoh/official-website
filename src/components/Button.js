import React from "react"
import { Link } from "gatsby"

const Button = props => {
  return <button {...props}> {props.children}</button>
}

export default Button
