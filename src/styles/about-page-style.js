import { Link } from "gatsby"
import styled from "styled-components"
import theme from "../theme.json"

export const AboutPageWrapper = styled.div``

export const FirstSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
export const HeaderImage = styled.img`
  margin-left: 9rem;
  margin-top: 5rem;
`

export const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8rem;
`

export const IntroTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 4.375em;
  margin-bottom: 1rem;

  & > span {
    color: ${theme.colors.bensonPink};
  }
`

export const IntroText = styled.p`
  width: 55%;
  font-family: "Roboto", sans-serif;
  color: ${({ grey }) =>
    grey ? theme.colors.bensonGrey : theme.colors.bensonBlack};
  font-size: 1.125rem;
  margin-top: ${({ grey }) => (grey ? "1rem" : "0.5rem")};
`

export const AboutSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.bensonPink};
  height: 100vh;
  color: #fff;
`
export const LeftContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8rem;
  margin-top: 8rem;
  width: 30%;

  & > h1 {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 4rem;
    width: 60%;
  }

  & > p {
    font-family: "Roboto", sans-serif;
    font-size: 1.125rem;
    line-height: 1.318rem;
  }
`

export const RightContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-left: 8rem;
  margin-top: 8rem;

  & > p {
    font-family: "Roboto", sans-serif;
    font-size: 1.125rem;
    line-height: 1.318rem;
  }

  & > ul {
    font-family: "Roboto", sans-serif;
    font-size: 1.125rem;
    line-height: 1.318rem;
  }
`

export const ThirdSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`
export const OtherSectionWrapper = styled.div`
  width: 33.875rem;
  height: 34.813rem;
  background-color: #fff;
  padding-left: 4.875rem;
  padding-top: 5rem;
  padding-right: 10.688rem;
  padding-bottom: 7.6rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const OtherSectionTitle = styled.h1`
  font-size: 3rem;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  color: ${theme.colors.bensonPink};
`

export const OtherSectionText = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  color: ${theme.colors.bensonGrey};
`

export const Button = styled(Link)`
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
  transition: all .7s ease-out;

  &:hover {
    background-position: left;
    color: #fff;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
