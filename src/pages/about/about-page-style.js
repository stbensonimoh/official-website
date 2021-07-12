import styled from "styled-components"
import theme from "../../theme.json"

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
  width: 50%;
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
`

export const ThirdSectionWrapper = styled.div``

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
