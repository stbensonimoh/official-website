import { render, screen, cleanup } from '@testing-library/react'
import { describe, test, expect, afterEach } from 'bun:test'
import Copyright from '../Copyright'

describe('Copyright', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders with current year', () => {
    const currentYear = new Date().getFullYear()
    render(<Copyright />)
    expect(screen.getByText(`Copyright © ${currentYear} Benson Imoh,ST`)).toBeTruthy()
  })

  test('accepts and applies additional props', () => {
    render(<Copyright className="test-class" data-testid="copyright" />)
    const copyright = screen.getByTestId('copyright')
    expect(copyright.classList.contains('test-class')).toBe(true)
  })
})