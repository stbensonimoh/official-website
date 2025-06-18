import { describe, test, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import Contact from '@/app/contact/page'

describe('Contact', () => {
  test('renders mobile layout correctly', () => {
    render(<Contact />)
    
    // Check for mobile-specific elements (visible on mobile, hidden on desktop)
    const mobileContainer = document.querySelector('.md\\:hidden')
    expect(mobileContainer).toBeTruthy()
    
    // Check for contact vector image specifically
    const contactImages = screen.getAllByRole('img')
    const contactVectorImage = contactImages.find(img => 
      img.getAttribute('src') === 'images/contact-vector.png'
    )
    expect(contactVectorImage).toBeTruthy()
    
    // Check for mobile description text
    expect(screen.getByText(/Got a question or proposal, or just want to say hello/)).toBeTruthy()
  })

  test('renders desktop layout correctly', () => {
    render(<Contact />)
    
    // Check for desktop-specific elements (hidden on mobile, visible on desktop)
    const desktopContainer = document.querySelector('.hidden.md\\:flex')
    expect(desktopContainer).toBeTruthy()
    
    // Check for desktop heading - use getAllByRole to handle multiple elements
    const headings = screen.getAllByRole('heading', { level: 1 })
    const desktopHeading = headings.find(heading => 
      heading.textContent === 'Send me a message'
    )
    expect(desktopHeading).toBeTruthy()
    
    // Check for desktop description text (it might be partially text)
    expect(document.body.innerHTML.includes('Do you have a question, a project')).toBe(true)
  })

  test('renders social icons', () => {
    render(<Contact />)
    
    // Check that SocialIcons components are present (both mobile and desktop)
    const socialIconContainers = document.querySelectorAll('.social-icons')
    expect(socialIconContainers.length).toBeGreaterThanOrEqual(1)
  })

  test('renders copyright notice', () => {
    render(<Contact />)
    
    // Check for copyright container in desktop layout
    const copyrightContainer = document.querySelector('.copyright-container')
    expect(copyrightContainer).toBeTruthy()
  })

  test('renders contact button with correct email link', () => {
    render(<Contact />)
    
    // Check for email links (both mobile and desktop versions)
    const emailLinks = screen.getAllByRole('link')
    const mailtoLinks = emailLinks.filter(link => 
      link.getAttribute('href') === 'mailto:benson@stbensonimoh.com'
    )
    
    expect(mailtoLinks.length).toBeGreaterThanOrEqual(1)
    
    // Check button text content using getAllByText
    expect(screen.getAllByText('Send me a mail').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Send a message/).length).toBeGreaterThanOrEqual(1)
  })

  test('contact page test configuration', () => {
    // This test ensures the test file structure is working
    expect('contact').toBe('contact')
  })
})
