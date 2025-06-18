import { render, screen, cleanup } from '@testing-library/react'
import { describe, test, expect, afterEach } from 'bun:test'
import AuthorBlob from '../AuthorBlob'

describe('AuthorBlob', () => {
  afterEach(() => {
    cleanup()
  })

  const defaultProps = {
    image: '/test-image.jpg',
    date: '2024-01-01',
    author: 'John Doe',
    timeToRead: '5 min read'
  }

  test('renders with all props', () => {
    const { container } = render(<AuthorBlob {...defaultProps} />)
    
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('src', defaultProps.image)
    expect(container).toHaveTextContent(defaultProps.author)
    expect(container).toHaveTextContent('2024-01-01')
    expect(container).toHaveTextContent('5 min read')
  })

  test('displays date and reading time with separator', () => {
    const { container } = render(<AuthorBlob {...defaultProps} />)
    const metaText = container.querySelector('.text-xs')
    expect(metaText).toHaveTextContent('2024-01-01')
    expect(metaText).toHaveTextContent('5 min read')
    expect(metaText).toHaveTextContent('|')
  })
})