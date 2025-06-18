import { render, screen, cleanup } from '@testing-library/react'
import { describe, test, expect, afterEach } from 'bun:test'
import Button from '../Button'

describe('Button', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders as an internal link', () => {
    render(
      <Button type="internal" href="/test">
        Test Link
      </Button>
    )
    const link = screen.getByRole('link', { name: /test link/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveClass('button')
  })

  test('renders as an external link', () => {
    render(
      <Button type="external" href="https://example.com">
        External Link
      </Button>
    )
    const link = screen.getByRole('link', { name: /external link/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveClass('button')
  })

  test('renders as a button element', () => {
    render(
      <Button onClick={() => {}}>
        Click Me
      </Button>
    )
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('button')
  })
})