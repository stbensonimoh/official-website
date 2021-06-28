import styled from "styled-components"
import theme from "../../theme.json"

export const HomePageWrapper = styled.div``

export const PageWrapper = styled.div`
  display: flex;
`
export const FeaturedImageWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`

export const FeaturedImage = styled.img`
  padding-left: 3rem;
  width: 100%;
  height: auto;
  object-fit: contain;
`

export const FeaturedTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 3rem;
`

export const GreetingWrapper = styled.div`
  margin-left: 3rem;
`

export const Greeting = styled.h3`
  font-family: "Roboto";
  font-weight: 300;
  font-size: 2.25rem;
`

export const Introduction = styled.h4`
  font-family: "Bad Script";
  font-size: 1.5rem;
  margin-top: -1rem;
  font-weight: 300;
`

export const Title = styled.h1`
  margin-left: 3rem;
  font-family: "Bebas Neue";
  font-size: 3.5rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  line-height: 1.1;
`

export const Description = styled.p`
  margin-left: 3rem;
  font-family: "Roboto";
  font-size: 0.875rem;
  margin-top: -1rem;
  width: 26rem;
  color: ${({ black }) =>
    black ? theme.colors.bensonBlack : theme.colors.bensonGrey};
`

export const CopyrightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Copyright = styled.div`
  margin-right: 3rem;
  align-self: center;
  font-family: "Roboto";
  font-size: 14px;
  color: ${theme.colors.bensonGrey};
`
