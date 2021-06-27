import styled from "styled-components"
import { Link } from "gatsby"
import * as theme from "../../theme.json"

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 1rem;
  justify-content: space-between;
`
export const Logo = styled.img`
  margin-top: 1rem;
  margin-left: 1rem;
  width: 120px;
`
export const NavWrapper = styled.div`
  margin-right: 6rem;
`

export const NavItem = styled(Link)`
  padding-left: 3rem;
  font-family: "Dosis";
  text-transform: uppercase;
  color: ${theme.colors.bensonGrey};
  font-size: 1rem;

  &:hover {
    color: ${theme.colors.bensonPink};
    cursor: pointer;
  }
`
