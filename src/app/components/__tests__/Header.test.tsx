import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

// Mock usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: () => '/'
}))

describe('Header', () => {
  it('renders navigation items', () => {
    render(<Header />)
    const menuItems = ['Home', 'About', 'Blog', 'Contact']
    
    const desktopNav = screen.getByTestId('desktop-nav')
    menuItems.forEach(item => {
      expect(desktopNav).toHaveTextContent(item)
    })
  })

  it('renders Logo component', () => {
    render(<Header />)
    const desktopLogo = screen.getByTestId('desktop-logo')
    expect(desktopLogo.closest('a')).toHaveClass('logo', 'ml-4')
  })

  it('toggles mobile menu when menu button is clicked', () => {
    render(<Header />)
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
    render(<Header />)
    const desktopNav = screen.getByTestId('desktop-nav')
    const homeLink = desktopNav.querySelector('a[href="/"]')
    expect(homeLink).toHaveClass('active-menu-item')
  })
})
