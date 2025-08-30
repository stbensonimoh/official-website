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
    expect(img?.getAttribute('src')).toBe(defaultProps.image)
    expect(container.textContent).toContain(defaultProps.author)
    expect(container.textContent).toContain('2024-01-01')
    expect(container.textContent).toContain('5 min read')
  })

  test('displays date and reading time with separator', () => {
    const { container } = render(<AuthorBlob {...defaultProps} />)
    const metaText = container.querySelector('.text-xs')
    expect(metaText?.textContent).toContain('2024-01-01')
    expect(metaText?.textContent).toContain('5 min read')
    expect(metaText?.textContent).toContain('|')
  })
})