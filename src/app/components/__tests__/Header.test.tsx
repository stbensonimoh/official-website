import React from 'react'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { describe, test, expect, beforeEach, afterEach } from 'bun:test'
import Header from '../Header'
import { ThemeProvider } from '../../context/ThemeContext'

// Render helper that sets up ThemeProvider with required browser mocks
const renderHeader = () => {
  // Setup localStorage mock
  if (typeof localStorage === 'undefined' || !localStorage.getItem) {
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        length: 0,
        key: () => null,
      },
      writable: true,
      configurable: true,
    })
  }

  // Setup matchMedia mock  
  if (typeof window !== 'undefined' && !window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        onchange: null,
        dispatchEvent: () => false,
      }),
    })
  }

  return render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  )
}

describe('Header', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      ;(window as any).__NEXT_PATHNAME__ = '/'
    }
  })

  afterEach(() => {
    cleanup()
  })

  test('renders navigation items', () => {
    renderHeader()
    const menuItems = ['Home', 'About', 'Blog', 'Contact']
    
    const desktopNav = screen.getByTestId('desktop-nav')
    menuItems.forEach(item => {
      expect(desktopNav.textContent).toContain(item)
    })
  })

  test('renders Logo component', () => {
    renderHeader()
    const desktopLogo = screen.getByTestId('desktop-logo')
    expect(desktopLogo.closest('a')?.classList.contains('logo')).toBe(true)
    expect(desktopLogo.closest('a')?.classList.contains('ml-4')).toBe(true)
  })

  test('toggles mobile menu when menu button is clicked', async () => {
    renderHeader()
    const menuButton = screen.getByRole('button', { name: 'Open menu' })
    
    // Initial state - menu is closed
    expect(screen.getByRole('banner').classList.contains('-translate-y-full')).toBe(true)
    
    // Click to open menu and wait for state update
    fireEvent.click(menuButton)
    await waitFor(() => {
      expect(screen.getByRole('banner').classList.contains('-translate-y-0')).toBe(true)
    })
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeTruthy()
    
    // Click to close menu and wait for state update
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    await waitFor(() => {
      expect(screen.getByRole('banner').classList.contains('-translate-y-full')).toBe(true)
    })
  })

  test('displays navigation links', () => {
    renderHeader()
    const desktopNav = screen.getByTestId('desktop-nav')
    
    // Check that all navigation links are present
    expect(desktopNav.querySelector('a[href="/"]')).toBeTruthy()
    expect(desktopNav.querySelector('a[href="/about"]')).toBeTruthy()
    expect(desktopNav.querySelector('a[href="/blog"]')).toBeTruthy()
    expect(desktopNav.querySelector('a[href="/contact"]')).toBeTruthy()
  })
})
