import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, test, expect, beforeEach, afterEach } from 'bun:test'
import Header from '../Header'
import { ThemeProvider } from '@/app/context/ThemeContext'

const renderWithTheme = (component: React.ReactNode) => {
  // Setup localStorage and matchMedia for ThemeProvider
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

  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  )
}

describe('Header', () => {
  beforeEach(() => {
    // Mock usePathname to return home page
    const mockUsePathname = () => '/'
    if (typeof window !== 'undefined') {
      ;(window as any).__NEXT_PATHNAME__ = '/'
    }
  })

  afterEach(() => {
    cleanup()
  })

  test('renders navigation items', () => {
    renderWithTheme(<Header />)
    const menuItems = ['Home', 'About', 'Blog', 'Contact']
    
    const desktopNav = screen.getByTestId('desktop-nav')
    menuItems.forEach(item => {
      expect(desktopNav.textContent).toContain(item)
    })
  })

  test('renders Logo component', () => {
    renderWithTheme(<Header />)
    const desktopLogo = screen.getByTestId('desktop-logo')
    expect(desktopLogo.closest('a')?.classList.contains('logo')).toBe(true)
    expect(desktopLogo.closest('a')?.classList.contains('ml-4')).toBe(true)
  })

  test('toggles mobile menu when menu button is clicked', () => {
    renderWithTheme(<Header />)
    const menuButton = screen.getByRole('button', { name: 'Open menu' })
    
    // Initial state - menu is closed
    expect(screen.getByRole('banner').classList.contains('-translate-y-full')).toBe(true)
    
    // Click to open menu
    fireEvent.click(menuButton)
    const closeButton = screen.getByRole('button', { name: 'Close menu' })
    expect(screen.getByRole('banner').classList.contains('-translate-y-0')).toBe(true)
    
    // Click to close menu
    fireEvent.click(closeButton)
    expect(screen.getByRole('banner').classList.contains('-translate-y-full')).toBe(true)
  })

  test('displays navigation links', () => {
    renderWithTheme(<Header />)
    const desktopNav = screen.getByTestId('desktop-nav')
    
    // Check that all navigation links are present
    expect(desktopNav.querySelector('a[href="/"]')).toBeTruthy()
    expect(desktopNav.querySelector('a[href="/about"]')).toBeTruthy()
    expect(desktopNav.querySelector('a[href="/blog"]')).toBeTruthy()
    expect(desktopNav.querySelector('a[href="/contact"]')).toBeTruthy()
  })
})
