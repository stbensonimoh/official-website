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
    expect(container).toHaveTextContent('404')
    expect(container).toHaveTextContent('Awww... Are you lost?')
    expect(container).toHaveTextContent("Let's go home")
    
    // Check for home link
    const homeLink = container.querySelector('a[href="/"]')
    expect(homeLink).toBeTruthy()
  })

  test('has correct image attributes', () => {
    const { container } = render(<NotFound />)
    const image = container.querySelector('img[alt="404 Image"]')
    expect(image).toHaveAttribute('src', '/images/404.png')
    expect(image).toHaveAttribute('width', '40%')
  })
})