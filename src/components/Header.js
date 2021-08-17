import React from "react"
import Logo from "./Logo"
import { Link } from "gatsby"

const Header = () => {
  return (
    <div className="header flex justify-between items-center my-4">
        <Link to="/" className="logo ml-4">
          <Logo className="w-24" />
        </Link>
      <nav className="main-navigation uppercase text-base font-dosis mr-8">
        <Link to="/" activeClassName="active">
          Home
        </Link>
        <Link to="/about" activeClassName="active-menu-item">
          About
        </Link>
        <Link to="/resume" activeClassName="active-menu-item">
          Resume
        </Link>
        <Link to="/projects" activeClassName="active-menu-item">
          Projects
        </Link>
        <Link to="/writing" activeClassName="active-menu-item">
          Writing
        </Link>
        <Link to="/speaking" activeClassName="active-menu-item">
          Speaking
        </Link>
        <Link to="/blog" activeClassName="active-menu-item">
          Blog
        </Link>
        <Link to="/contact" activeClassName="active-menu-item">
          Contact
        </Link>
      </nav>
    </div>
  )
}

export default Header
