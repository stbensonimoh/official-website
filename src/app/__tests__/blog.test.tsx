import { render, screen, cleanup } from '@testing-library/react'
import { describe, test, expect, afterEach } from 'bun:test'
import Blog from '../blog/page'

describe('Blog', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders blog header section', async () => {
    render(await Blog({ params: {} }))
    
    expect(screen.getByText('Welcome to my blog')).toBeTruthy()
    expect(screen.getByText('We all owe death a life.')).toBeTruthy()
    expect(screen.getByText(/I write about technology/)).toBeTruthy()
  })

  test('displays latest posts section', async () => {
    const { container } = render(await Blog({ params: {} }))
    const latestPostsHeading = container.querySelector('h2:has-text("Latest Posts")') || 
                              [...container.querySelectorAll('h2')].find(h => h.textContent?.includes('Latest Posts'))
    expect(latestPostsHeading).toBeTruthy()
    
    const latestPostsContainer = container.querySelector('[data-testid="latest-posts"]')
    expect(latestPostsContainer).toBeTruthy()
  })

  test('displays featured posts section', async () => {
    const { container } = render(await Blog({ params: {} }))
    const featuredPostsHeading = container.querySelector('h2:has-text("Featured Posts")') || 
                                [...container.querySelectorAll('h2')].find(h => h.textContent?.includes('Featured Posts'))
    expect(featuredPostsHeading).toBeTruthy()
    
    const featuredPostsContainer = container.querySelector('[data-testid="featured-posts"]')
    expect(featuredPostsContainer).toBeTruthy()
  })
})
