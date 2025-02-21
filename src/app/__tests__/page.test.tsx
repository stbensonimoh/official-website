import { render, screen, within } from '@testing-library/react'
import Home from '../page'

describe('Home', () => {
  it('renders main content sections', () => {
    render(<Home />)
    
    // Check for main heading content
    expect(screen.getByText('Hello!')).toBeInTheDocument()
    expect(screen.getByText('I am Benson...')).toBeInTheDocument()
    
    // Find the desktop heading
    const desktopHeading = screen.getByRole('heading', { level: 1 })
    expect(within(desktopHeading).getByText(/Software Engineer/)).toBeInTheDocument()
    expect(within(desktopHeading).getByText(/Experience Designer \(xD\)/)).toBeInTheDocument()
    expect(within(desktopHeading).getByText(/OSS Advocate/)).toBeInTheDocument()
  })

  it('renders social icons and copyright', () => {
    render(<Home />)
    const socialIcons = screen.getByTestId('social-icons')
    expect(socialIcons).toHaveClass('social-icons')
    expect(screen.getByText(/Copyright © \d{4} Benson Imoh,ST/)).toBeInTheDocument()
  })

  it('renders responsive layouts', () => {
    render(<Home />)
    // Desktop layout
    const desktopSection = screen.getByText(/I'm passionate about blending technology and arts/).closest('div')
    expect(desktopSection?.parentElement).toHaveClass('hidden', 'md:flex')

    // Mobile layout
    const mobileSection = screen.getByText('SOFTWARE ENGINEER').closest('div.mobile-header')
    expect(mobileSection).toHaveClass('mobile-header', 'flex', 'flex-col')
  })
})
