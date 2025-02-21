import { render, screen } from '@testing-library/react'
import NotFound from '../not-found'

describe('NotFound', () => {
  it('renders 404 page correctly', () => {
    render(<NotFound />)

    // Check for main elements
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '404 Image' })).toBeInTheDocument()
    expect(screen.getByText(/Awww... Are you lost?/)).toBeInTheDocument()
    
    // Check for home link
    const homeLink = screen.getByText("Let's go home")
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.closest('a')).toHaveAttribute('href', '/')
  })

  it('has correct image attributes', () => {
    render(<NotFound />)
    const image = screen.getByRole('img', { name: '404 Image' })
    expect(image).toHaveAttribute('src', '/images/404.png')
    expect(image).toHaveAttribute('width', '40%')
  })
})