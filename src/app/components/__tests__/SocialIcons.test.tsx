import { render, screen } from '@testing-library/react'
import SocialIcons from '../SocialIcons'

// Mock the siteMetadata import
jest.mock('../../../../siteMetadata', () => ({
  social: {
    twitter: 'twitter-handle',
    linkedin: 'linkedin-handle',
    github: 'github-handle',
    instagram: 'instagram-handle'
  }
}))

describe('SocialIcons', () => {
  it('renders all social media links', () => {
    render(<SocialIcons />)
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
    
    expect(links[0]).toHaveAttribute('href', 'https://github.com/github-handle')
    expect(links[1]).toHaveAttribute('href', 'https://linkedin.com/in/linkedin-handle')
    expect(links[2]).toHaveAttribute('href', 'https://twitter.com/twitter-handle')
    expect(links[3]).toHaveAttribute('href', 'https://instagram.com/instagram-handle')
  })

  it('applies custom className', () => {
    render(<SocialIcons className="custom-class" />)
    const container = screen.getByTestId('social-icons')
    expect(container).toHaveClass('custom-class')
  })

  it('has proper accessibility attributes', () => {
    render(<SocialIcons />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })
})
