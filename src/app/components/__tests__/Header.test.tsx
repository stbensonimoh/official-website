import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'
import { ThemeProvider } from '@/app/context/__mocks__/ThemeContext'

// Mock usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: () => '/'
}))

// Mock the ThemeContext
jest.mock('@/app/context/ThemeContext', () => ({
  __esModule: true,
  ...jest.requireActual('@/app/context/__mocks__/ThemeContext')
}))

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  )
}

describe('Header', () => {
  it('renders navigation items', () => {
    renderWithTheme(<Header />)
    const menuItems = ['Home', 'About', 'Blog', 'Contact']
    
    const desktopNav = screen.getByTestId('desktop-nav')
    menuItems.forEach(item => {
      expect(desktopNav).toHaveTextContent(item)
    })
  })

  it('renders Logo component', () => {
    renderWithTheme(<Header />)
    const desktopLogo = screen.getByTestId('desktop-logo')
    expect(desktopLogo.closest('a')).toHaveClass('logo', 'ml-4')
  })

  it('toggles mobile menu when menu button is clicked', () => {
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

  it('applies active class to current route', () => {
    renderWithTheme(<Header />)
    const desktopNav = screen.getByTestId('desktop-nav')
    const homeLink = desktopNav.querySelector('a[href="/"]')
    expect(homeLink).toHaveClass('active-menu-item')
  })
})
