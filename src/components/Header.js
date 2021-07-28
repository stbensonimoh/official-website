import React from "react"
import Logo from "./Logo"
import styled from "styled-components"
import { Link } from "gatsby"
import theme from "../theme.json"

const Header = () => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Link to="/">
          <Logo width="120" />
        </Link>
      </LogoWrapper>
      <NavWrapper>
        <NavItem to="/" activeClassName="active">
          Home
        </NavItem>
        <NavItem to="/about" activeClassName="active">
          About
        </NavItem>
        <NavItem to="/resume" activeClassName="active">
          Resume
        </NavItem>
        <NavItem to="/projects" activeClassName="active">
          Projects
        </NavItem>
        <NavItem to="/writing" activeClassName="active">
          Writing
        </NavItem>
        <NavItem to="/speaking" activeClassName="active">
          Speaking
        </NavItem>
        <NavItem to="/blog" activeClassName="active">
          Blog
        </NavItem>
        <NavItem to="/contact" activeClassName="active">
          Contact
        </NavItem>
      </NavWrapper>
    </HeaderWrapper>
  )
}

/* -----------------    STYLES  ----------------- */
const LogoWrapper = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
`

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 1rem;
  justify-content: space-between;
`
const NavWrapper = styled.nav`
  margin-right: 6rem;
`

const NavItem = styled(Link)`
  padding-left: 3rem;
  font-family: "Dosis";
  text-transform: uppercase;
  color: ${theme.colors.bensonGrey};
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    color: ${theme.colors.bensonPink};
    cursor: pointer;
  }

  &.active {
    color: ${theme.colors.bensonPink};
  }
`

export default Header
