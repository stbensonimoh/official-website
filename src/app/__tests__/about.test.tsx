import { render, screen, cleanup } from '@testing-library/react'
import { describe, test, expect, afterEach } from 'bun:test'
import About from '../about/page'

describe('About', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders main sections', () => {
    render(<About />)
    
    // Check main heading with role descriptions - target the first h1 which contains the roles
    const mainHeading = screen.getAllByRole('heading', { level: 1 })[0]
    console.log(mainHeading.textContent)
    expect(mainHeading.textContent).toMatch(/Software Engineer.*DevOps Enthusiast.*OSS Advocate/)

    // Check sections content
    expect(screen.getByText('Over the past years,')).toBeTruthy()
    expect(screen.getByText('I design and build stuff')).toBeTruthy()
    expect(screen.getByText('I write too, sometimes')).toBeTruthy()
  })

  test('renders profile image', () => {
    render(<About />)
    const image = screen.getByRole('img')
    expect(image.getAttribute('src')).toBe('/images/about-page-picture.png')
  })

  test('renders action buttons', () => {
    render(<About />)
    const workLink = screen.getByText(/See my work/i)
    const blogLink = screen.getByText(/Read my Blog/i)

    expect(workLink.closest('a')?.getAttribute('href')).toBe('https://github.com/stbensonimoh')
    expect(blogLink.closest('a')?.getAttribute('href')).toBe('/blog')
  })
})
