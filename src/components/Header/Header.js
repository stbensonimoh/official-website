import React from "react"
import { HeaderWrapper, Logo, NavWrapper, NavItem } from "./header.style"

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo src="/logo.svg" />
      <NavWrapper>
        <NavItem>Home</NavItem>
        <NavItem>About</NavItem>
        <NavItem>Resume</NavItem>
        <NavItem>Projects</NavItem>
        <NavItem>Writing</NavItem>
        <NavItem>Speaking</NavItem>
        <NavItem>Blog</NavItem>
        <NavItem>Contact</NavItem>
      </NavWrapper>
    </HeaderWrapper>
  )
}

export default Header
