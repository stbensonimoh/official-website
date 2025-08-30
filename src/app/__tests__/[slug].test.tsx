import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'bun:test'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import BlogPost, { generateStaticParams, generateMetadata } from '../[slug]/page'

describe('BlogPost', () => {
  test('generates static params correctly', async () => {
    const params = await generateStaticParams()
    const allPosts = getAllPosts()
    
    // Should return params for all available posts
    expect(params.length).toBeGreaterThan(0)
    expect(params[0]).toHaveProperty('slug')
    
    // Check that all returned slugs are valid
    params.forEach(param => {
      expect(typeof param.slug).toBe('string')
      expect(param.slug.length).toBeGreaterThan(0)
    })
  })

  test('generates metadata correctly for existing post', async () => {
    const allPosts = getAllPosts()
    if (allPosts.length === 0) {
      console.log('No posts available for testing')
      return
    }
    
    const firstPost = allPosts[0]
    const metadata = await generateMetadata({ params: { slug: firstPost.slug } })
    
    expect(metadata.title).toBe(`${firstPost.frontmatter.title} - Benson Imoh,ST`)
    expect(metadata.description).toBe(firstPost.frontmatter.excerpt)
  })

  test('renders blog post content for existing post', async () => {
    const allPosts = getAllPosts()
    if (allPosts.length === 0) {
      console.log('No posts available for testing')
      return
    }
    
    const firstPost = allPosts[0]
    const Component = await BlogPost({ params: { slug: firstPost.slug } })
    render(Component)
    
    // Check for post title
    expect(screen.getByText(firstPost.frontmatter.title)).toBeTruthy()
    
    // Check for author (either from frontmatter or default)
    const authorName = firstPost.frontmatter.author || 'Benson Imoh,ST'
    expect(screen.getByText(authorName)).toBeTruthy()
    
    // Check for tags if they exist
    if (firstPost.frontmatter.tags && firstPost.frontmatter.tags.length > 0) {
      const tagsText = `Tags: #${firstPost.frontmatter.tags.join(' #')}`
      expect(screen.getByText(tagsText)).toBeTruthy()
    }
  })

  test('handles non-existent post slug', async () => {
    // Test with a slug that definitely doesn't exist
    const nonExistentSlug = 'this-post-definitely-does-not-exist-12345'
    
    // This should trigger notFound() and throw an error
    await expect(async () => {
      await BlogPost({ params: { slug: nonExistentSlug } })
    }).toThrow()
  })
})
