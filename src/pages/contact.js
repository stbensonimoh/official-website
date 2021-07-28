import React from "react"
import styled from "styled-components"
import Header from "../components/Header"
import SocialIcons from "../components/SocialIcons"
import Copyright from "../components/Copyright"
import Button from "../components/Button"
import theme from "../theme.json"
import { FiSend } from "react-icons/fi"

const Contact = () => {
  return (
    <ContactWrapper>
      <Header />
      <FormTitle>Send me a message</FormTitle>
      <FormSubtitle>
        Do you have a question, a project you’d like to have me on, or just want
        to say hi?
      </FormSubtitle>
      <FormContainer>
        <Row>
          <InputGroup style={{ marginRight: "6rem" }}>
            <label>Your Name</label>
            <Input type="text" placeholder="John Doe" />
          </InputGroup>
          <InputGroup>
            <label>Your Email</label>
            <Input type="email" placeholder="johndoe@example.com" />
          </InputGroup>
        </Row>
        <Row>
          <InputGroup>
            <label>Your message</label>
            <TextArea
              rows="2"
              placeholder="Hi, I think we need a design system for our products at Company X. How soon can you hop on to discuss this?"
            ></TextArea>
          </InputGroup>
        </Row>
        <ButtonWrapper>
                  <Button as="button" style={{paddingLeft: "3rem", paddingRight: "3rem", boxSizing: "content-box", display: "flex", flexDirection: "row", justifyContent: "center"}}>
            Send <FiSend />
          </Button>
        </ButtonWrapper>
      </FormContainer>
      <SocialIconsWrapper>
        <SocialIcons />
      </SocialIconsWrapper>
      <CopyrightWrapper>
        <Copyright />
      </CopyrightWrapper>
    </ContactWrapper>
  )
}

/* ----------------- COMPONENT ------------------ */
const ContactWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("/images/front-image.svg");
  background-repeat: no-repeat;
  background-position: 80% center;
  height: 100vh;
`

const FormTitle = styled.h1`
  font-size: 4rem;
  font-family: "Roboto", sans-serif;
  color: ${theme.colors.bensonPink};
`

const FormSubtitle = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  width: 35rem;
  text-align: center;
  margin-top: 0;
`

const FormContainer = styled.form`
 width: 58rem;

 & label {
     font-size: 1.25rem;
     font-family: "Roboto", sans-serif;
     color: ${theme.colors.bensonGrey};
     margin-bottom: 1.3rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  margin-top: 3rem;
`
const Input = styled.input`
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid ${theme.colors.bensonPink};
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;

  &:focus-visible,
  &:focus {
    border: none;
    outline: none;
    border-bottom: 1px solid ${theme.colors.bensonPink};
  }
`

const TextArea = styled.textarea`
  width: 100%;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid ${theme.colors.bensonPink};
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;

  &:focus-visible,
  &:focus {
    border: none;
    outline: none;
    border-bottom: 1px solid ${theme.colors.bensonPink};
  }
`

const SocialIconsWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  align-self: flex-start;
`

const CopyrightWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  align-self: flex-end;
  margin-right: 2rem;
`

const ButtonWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
margin-top: 8.2rem;
`

export default Contact
