import { render, screen } from '@testing-library/react'
import Contact from '../contact/page'

describe('Contact', () => {
  it('renders mobile layout correctly', () => {
    render(<Contact />)
    
    // Check mobile content
    const mobileSection = screen.getByText(/Got a question or proposal/)
    expect(mobileSection.closest('div')).toHaveClass('md:hidden')
    expect(screen.getByText(/Send me a mail/i)).toBeInTheDocument()
  })

  it('renders desktop layout correctly', () => {
    render(<Contact />)
    
    // Check desktop content
    const desktopContainer = screen.getByText(/Send me a message/).closest('div.main')?.parentElement
    expect(desktopContainer).toBeTruthy()
    expect(desktopContainer).toHaveClass('hidden', 'md:flex', 'flex-col')
    expect(screen.getByText(/Do you have a question/)).toBeInTheDocument()
  })

  it('renders social icons', () => {
    render(<Contact />)
    const socialIcons = screen.getAllByRole('link')
    expect(socialIcons.length).toBeGreaterThan(0)
    expect(socialIcons[0]).toHaveAttribute('target', '_blank')
  })

  it('renders copyright notice', () => {
    render(<Contact />)
    expect(screen.getByText(/Copyright © \d{4}/)).toBeInTheDocument()
  })

  it('renders contact button with correct email link', () => {
    render(<Contact />)
    const mailButton = screen.getAllByRole('link').find(link => 
      link.getAttribute('href')?.includes('mailto:benson@stbensonimoh.com')
    )
    expect(mailButton).toBeTruthy()
  })
})
