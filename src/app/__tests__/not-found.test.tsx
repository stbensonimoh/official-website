import { render, screen, cleanup } from '@testing-library/react'
import { describe, test, expect, afterEach } from 'bun:test'
import NotFound from '../not-found'

describe('NotFound', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders 404 page correctly', () => {
    const { container } = render(<NotFound />)

    // Check for main elements
    expect(container.textContent).toContain('404')
    expect(container.textContent).toContain('Awww... Are you lost?')
    expect(container.textContent).toContain("Let's go home")
    
    // Check for home link
    const homeLink = container.querySelector('a[href="/"]')
    expect(homeLink).toBeTruthy()
  })

  test('has correct image attributes', () => {
    const { container } = render(<NotFound />)
    const image = container.querySelector('img[alt="404 error page illustration"]') as HTMLImageElement
    expect(image?.getAttribute('src')).toBe('/images/404.png')
    expect(image?.getAttribute('width')).toBe('400')
  })
})