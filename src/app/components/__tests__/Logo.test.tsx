import { render, screen, cleanup } from '@testing-library/react'
import { describe, test, expect, beforeEach, afterEach } from 'bun:test'
import Logo from '../Logo'
import { ThemeProvider } from '@/app/context/ThemeContext'

describe('Logo', () => {
  beforeEach(() => {
    // Setup localStorage for ThemeProvider
    if (typeof localStorage === 'undefined') {
      Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
          clear: () => {},
          length: 0,
          key: () => null,
        },
        writable: true
      })
    }

    // Setup matchMedia for ThemeProvider
    if (typeof window !== 'undefined' && !window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: false,
          media: query,
          addEventListener: () => {},
          removeEventListener: () => {},
        }),
      })
    }
  })

  afterEach(() => {
    cleanup()
  })

  test('renders with default props', () => {
    render(
      <ThemeProvider>
        <Logo width={100} height={100} />
      </ThemeProvider>
    )
    const logo = screen.getByTestId('logo')
    expect(logo).toBeInTheDocument()
    expect(logo.tagName.toLowerCase()).toBe('svg')
  })

  test('applies correct width and height', () => {
    render(
      <ThemeProvider>
        <Logo width={150} height={75} />
      </ThemeProvider>
    )
    const logo = screen.getByTestId('logo')
    expect(logo).toHaveAttribute('width', '150')
    expect(logo).toHaveAttribute('height', '75')
  })

  test('renders with different theme contexts', () => {
    render(
      <ThemeProvider>
        <Logo width={100} height={100} />
      </ThemeProvider>
    )
    const logo = screen.getByTestId('logo')
    
    // Should render successfully with ThemeProvider
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('viewBox')
  })
})
