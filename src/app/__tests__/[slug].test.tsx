import { render, screen } from '@testing-library/react'
import { notFound } from 'next/navigation'
import BlogPost, { generateStaticParams, generateMetadata } from '../[slug]/page'

// Mock the posts module
jest.mock('@/lib/posts', () => ({
  getAllPosts: () => ([
    {
      slug: 'test-post',
      frontmatter: {
        title: 'Test Post',
        featured_image: '/test-image.jpg',
        date: '2024-01-01',
        tags: ['test'],
        author: 'Test Author',
        excerpt: 'Test excerpt'
      },
      content: 'Test content',
      readingTime: { text: '5 min read' }
    }
  ]),
  getPostBySlug: (slug: string) => {
    if (slug === 'test-post') {
      return {
        slug: 'test-post',
        frontmatter: {
          title: 'Test Post',
          featured_image: '/test-image.jpg',
          date: '2024-01-01',
          tags: ['test'],
          author: 'Test Author',
          excerpt: 'Test excerpt'
        },
        content: 'Test content',
        readingTime: { text: '5 min read' }
      }
    }
    return null
  }
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn()
}))

describe('BlogPost', () => {
  it('generates static params correctly', async () => {
    const params = await generateStaticParams()
    expect(params).toEqual([{ slug: 'test-post' }])
  })

  it('generates metadata correctly', async () => {
    const metadata = await generateMetadata({ params: { slug: 'test-post' } })
    expect(metadata.title).toBe('Test Post - Benson Imoh,ST')
    expect(metadata.description).toBe('Test excerpt')
  })

  it('renders blog post content', async () => {
    render(await BlogPost({ params: { slug: 'test-post' } }))
    
    expect(screen.getByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
    expect(screen.getByText('Tags: #test')).toBeInTheDocument()
  })

  it('calls notFound for non-existent post', async () => {
    try {
      await BlogPost({ params: { slug: 'non-existent' } })
    } catch (error) {
      // Ignore error
    }
    expect(notFound).toHaveBeenCalled()
  })
})
