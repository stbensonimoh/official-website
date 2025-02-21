import { render, screen } from '@testing-library/react'
import Blog from '../blog/page'

// Mock the post module
jest.mock('@/lib/posts', () => ({
  getAllPosts: () => ([
    {
      slug: 'test-post',
      frontmatter: {
        title: 'Test Post',
        featured_image: '/test-image.jpg',
        date: '2024-01-01',
        tags: ['featured'],
        author: 'Test Author',
        excerpt: 'Test excerpt'
      },
      content: 'Test content',
      readingTime: { text: '5 min read' }
    },
    {
      slug: 'test-post-2',
      frontmatter: {
        title: 'Test Post 2',
        featured_image: '/test-image-2.jpg',
        date: '2024-01-02',
        tags: ['test'],
        author: 'Test Author',
        excerpt: 'Test excerpt 2'
      },
      content: 'Test content 2',
      readingTime: { text: '3 min read' }
    }
  ])
}))

describe('Blog', () => {
  it('renders blog header section', async () => {
    render(await Blog({ params: {} }))
    
    expect(screen.getByText('Welcome to my blog')).toBeInTheDocument()
    expect(screen.getByText('We all owe death a life.')).toBeInTheDocument()
    expect(screen.getByText(/I write about technology/)).toBeInTheDocument()
  })

  it('displays latest posts section', async () => {
    render(await Blog({ params: {} }))
    expect(screen.getByText('Latest Posts')).toBeInTheDocument()
    const latestPostsContainer = screen.getByTestId('latest-posts')
    const latestPosts = latestPostsContainer.querySelectorAll('[role="article"]')
    expect(latestPosts).toHaveLength(2)
  })

  it('displays featured posts section', async () => {
    render(await Blog({ params: {} }))
    expect(screen.getByText('Featured Posts')).toBeInTheDocument()
    const featuredPostsContainer = screen.getByTestId('featured-posts')
    const featuredPosts = featuredPostsContainer.querySelectorAll('[role="article"]')
    expect(featuredPosts).toHaveLength(1)
  })
})
