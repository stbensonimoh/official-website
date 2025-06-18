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
      expect(desktopNav).toHaveTextContent(item)
    })
  })

  test('renders Logo component', () => {
    renderWithTheme(<Header />)
    const desktopLogo = screen.getByTestId('desktop-logo')
    expect(desktopLogo.closest('a')).toHaveClass('logo', 'ml-4')
  })

  test('toggles mobile menu when menu button is clicked', () => {
    renderWithTheme(<Header />)
    const menuButton = screen.getByRole('button')
    
    // Initial state - menu is closed
    expect(screen.getByRole('banner')).toHaveClass('-translate-y-full')
    
    // Click to open menu
    fireEvent.click(menuButton)
    expect(screen.getByRole('banner')).toHaveClass('-translate-y-0')
    
    // Click to close menu
    fireEvent.click(menuButton)
    expect(screen.getByRole('banner')).toHaveClass('-translate-y-full')
  })

  test('displays navigation links', () => {
    renderWithTheme(<Header />)
    const desktopNav = screen.getByTestId('desktop-nav')
    
    // Check that all navigation links are present
    expect(desktopNav.querySelector('a[href="/"]')).toBeInTheDocument()
    expect(desktopNav.querySelector('a[href="/about"]')).toBeInTheDocument()
    expect(desktopNav.querySelector('a[href="/blog"]')).toBeInTheDocument()
    expect(desktopNav.querySelector('a[href="/contact"]')).toBeInTheDocument()
  })
})
