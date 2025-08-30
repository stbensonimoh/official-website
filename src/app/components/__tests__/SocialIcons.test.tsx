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
    
    expect(links[0].getAttribute('href')).toBe('https://github.com/stbensonimoh')
    expect(links[1].getAttribute('href')).toBe('https://linkedin.com/in/stbensonimoh')
    expect(links[2].getAttribute('href')).toBe('https://twitter.com/stbensonimoh')
    expect(links[3].getAttribute('href')).toBe('https://instagram.com/stbensonimoh')
  })

  test('applies custom className', () => {
    render(<SocialIcons className="custom-class" />)
    const container = screen.getByTestId('social-icons')
    expect(container.classList.contains('custom-class')).toBe(true)
  })

  test('has proper accessibility attributes', () => {
    render(<SocialIcons />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link.getAttribute('target')).toBe('_blank')
      expect(link.getAttribute('rel')).toBe('noreferrer')
    })
  })
})
