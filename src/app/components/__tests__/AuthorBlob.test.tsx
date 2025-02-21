import { render, screen } from '@testing-library/react'
import AuthorBlob from '../AuthorBlob'

describe('AuthorBlob', () => {
  const defaultProps = {
    image: '/test-image.jpg',
    date: '2024-01-01',
    author: 'John Doe',
    timeToRead: '5 min read'
  }

  it('renders with all props', () => {
    render(<AuthorBlob {...defaultProps} />)
    
    expect(screen.getByRole('img')).toHaveAttribute('src', defaultProps.image)
    expect(screen.getByText(defaultProps.author)).toBeInTheDocument()
    expect(screen.getByText(/2024-01-01/)).toBeInTheDocument()
    expect(screen.getByText(/5 min read/)).toBeInTheDocument()
  })

  it('displays date and reading time with separator', () => {
    render(<AuthorBlob {...defaultProps} />)
    const metaText = screen.getByText(/2024-01-01.*\|.*5 min read/)
    expect(metaText).toBeInTheDocument()
  })
})