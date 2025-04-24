import { render, screen } from '@testing-library/react'
import About from '../about/page'

describe('About', () => {
  it('renders main sections', () => {
    render(<About />)
    
    // Check main headings
    const heading = screen.getByText(/Software Engineer.*DevOps Ethusiast.*OSS Advocate/);
    expect(heading).toBeInTheDocument();

    // Check sections content
    expect(screen.getByText('Over the past years,')).toBeInTheDocument()
    expect(screen.getByText('I design and build stuff')).toBeInTheDocument()
    expect(screen.getByText('I write too, sometimes')).toBeInTheDocument()
  })

  it('renders profile image', () => {
    render(<About />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/images/about-page-picture.png')
  })

  it('renders action buttons', () => {
    render(<About />)
    const workLink = screen.getByText(/See my work/i)
    const blogLink = screen.getByText(/Read my Blog/i)

    expect(workLink.closest('a')).toHaveAttribute('href', 'https://github.com/stbensonimoh')
    expect(blogLink.closest('a')).toHaveAttribute('href', '/blog')
  })
})
