import React from "react"
import { HeaderWrapper, Logo, NavWrapper, NavItem } from "./header.style"

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo src="/logo.svg" />
      <NavWrapper>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/resume">Resume</NavItem>
        <NavItem to="/projects">Projects</NavItem>
        <NavItem to="/writing">Writing</NavItem>
        <NavItem to="/speaking">Speaking</NavItem>
        <NavItem to="/blog">Blog</NavItem>
        <NavItem to="/contact">Contact</NavItem>
      </NavWrapper>
    </HeaderWrapper>
  )
}

export default Header
