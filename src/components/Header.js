import React from "react"
import Logo from "./Logo"
import { Link } from "gatsby"

const Header = () => {
  return (
    <div>
      <div>
        <Link to="/">
          <Logo className="" />
        </Link>
      </div>
      <nav>
        <Link to="/" activeClassName="active">
          Home
        </Link>
        <Link to="/about" activeClassName="active">
          About
        </Link>
        <Link to="/resume" activeClassName="active">
          Resume
        </Link>
        <Link to="/projects" activeClassName="active">
          Projects
        </Link>
        <Link to="/writing" activeClassName="active">
          Writing
        </Link>
        <Link to="/speaking" activeClassName="active">
          Speaking
        </Link>
        <Link to="/blog" activeClassName="active">
          Blog
        </Link>
        <Link to="/contact" activeClassName="active">
          Contact
        </Link>
      </nav>
    </div>
  )
}

export default Header
