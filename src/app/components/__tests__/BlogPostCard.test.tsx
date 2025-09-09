import { render, screen, cleanup } from '@testing-library/react'
import { describe, test, expect, afterEach } from 'bun:test'
import BlogPostCard from '../BlogPostCard'

describe('BlogPostCard', () => {
  afterEach(() => {
    cleanup()
  })

  const mockPost = {
    slug: 'test-post',
    frontmatter: {
      title: 'Test Post',
      featured_image: '/test-image.jpg',
      date: '2024-01-01',
      tags: ['test', 'featured'],
      author: 'Test Author',
      author_image: '/author-image.jpg',
      excerpt: 'Test excerpt'
    },
    content: 'Test content',
    readingTime: {
      text: '5 min read'
    }
  }

  test('renders post information correctly', () => {
    render(<BlogPostCard post={mockPost} />)

    expect(screen.getByRole('img', { name: 'Featured image for blog post: Test Post' }).getAttribute('src')).toBe(mockPost.frontmatter.featured_image)
    expect(screen.getByText(mockPost.frontmatter.title)).toBeTruthy()
    expect(screen.getByText(mockPost.frontmatter.author)).toBeTruthy()
    expect(screen.getByText(mockPost.frontmatter.excerpt)).toBeTruthy()
    expect(screen.getByText('Read More...').closest('a')?.getAttribute('href')).toBe(`/${mockPost.slug}`)
  })

  test('uses default author info when not provided in frontmatter', () => {
    const postWithoutAuthor = {
      ...mockPost,
      frontmatter: {
        ...mockPost.frontmatter,
        author: undefined,
        author_image: undefined
      }
    }

    render(<BlogPostCard post={postWithoutAuthor} />)
    // Should use default author from siteMetadata
    expect(screen.getByText('Benson Imoh,ST')).toBeTruthy()
  })
})
