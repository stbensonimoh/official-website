import { render, screen } from '@testing-library/react'
import BlogPostCard from '../BlogPostCard'

// Mock the siteMetadata import
jest.mock('../../../../siteMetadata', () => ({
  author: {
    name: 'Default Author',
    image: '/default-author.jpg'
  }
}))

describe('BlogPostCard', () => {
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

  it('renders post information correctly', () => {
    render(<BlogPostCard post={mockPost} />)

    expect(screen.getByRole('img', { name: 'Featured Image' })).toHaveAttribute('src', mockPost.frontmatter.featured_image)
    expect(screen.getByText(mockPost.frontmatter.title)).toBeInTheDocument()
    expect(screen.getByText(mockPost.frontmatter.author)).toBeInTheDocument()
    expect(screen.getByText(mockPost.frontmatter.excerpt)).toBeInTheDocument()
    expect(screen.getByText('Read More...').closest('a')).toHaveAttribute('href', `/${mockPost.slug}`)
  })

  it('uses default author info when not provided in frontmatter', () => {
    const postWithoutAuthor = {
      ...mockPost,
      frontmatter: {
        ...mockPost.frontmatter,
        author: undefined,
        author_image: undefined
      }
    }

    render(<BlogPostCard post={postWithoutAuthor} />)
    expect(screen.getByText('Default Author')).toBeInTheDocument()
  })
})
