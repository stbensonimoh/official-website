import { render, screen, cleanup } from '@testing-library/react'
import { describe, test, expect, afterEach } from 'bun:test'
import SocialIcons from '../SocialIcons'

describe('SocialIcons', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders all social media links', () => {
    render(<SocialIcons />)
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
    
    expect(links[0]).toHaveAttribute('href', 'https://github.com/stbensonimoh')
    expect(links[1]).toHaveAttribute('href', 'https://linkedin.com/in/stbensonimoh')
    expect(links[2]).toHaveAttribute('href', 'https://twitter.com/stbensonimoh')
    expect(links[3]).toHaveAttribute('href', 'https://instagram.com/stbensonimoh')
  })

  test('applies custom className', () => {
    render(<SocialIcons className="custom-class" />)
    const container = screen.getByTestId('social-icons')
    expect(container).toHaveClass('custom-class')
  })

  test('has proper accessibility attributes', () => {
    render(<SocialIcons />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })
})
