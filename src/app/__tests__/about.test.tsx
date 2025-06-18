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
    expect(mainHeading).toHaveTextContent(/Software Engineer.*DevOps Enthusiast.*OSS Advocate/)

    // Check sections content
    expect(screen.getByText('Over the past years,')).toBeInTheDocument()
    expect(screen.getByText('I design and build stuff')).toBeInTheDocument()
    expect(screen.getByText('I write too, sometimes')).toBeInTheDocument()
  })

  test('renders profile image', () => {
    render(<About />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/images/about-page-picture.png')
  })

  test('renders action buttons', () => {
    render(<About />)
    const workLink = screen.getByText(/See my work/i)
    const blogLink = screen.getByText(/Read my Blog/i)

    expect(workLink.closest('a')).toHaveAttribute('href', 'https://github.com/stbensonimoh')
    expect(blogLink.closest('a')).toHaveAttribute('href', '/blog')
  })
})
