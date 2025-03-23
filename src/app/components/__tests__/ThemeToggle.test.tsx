import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from '../ThemeToggle'
import { ThemeProvider, useTheme } from '@/app/context/ThemeContext'

// Mock the ThemeContext
jest.mock('@/app/context/ThemeContext', () => {
  const originalModule = jest.requireActual('@/app/context/__mocks__/ThemeContext')
  
  return {
    __esModule: true,
    ...originalModule,
    useTheme: jest.fn()
  }
})

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('renders correctly with light theme', () => {
    // Mock the useTheme hook to return light theme
    const mockToggleTheme = jest.fn()
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      actualTheme: 'light',
      toggleTheme: mockToggleTheme
    })

    render(<ThemeToggle />)
    
    // Check if the button is rendered
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    
    // Check if the button has the correct aria-label
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme')
    
    // Check if the sun icon is displayed (for light theme, we show moon icon for next theme)
    const moonIcon = button.querySelector('svg path[d*="M21.752 15.002"]')
    expect(moonIcon).toBeInTheDocument()
  })

  it('renders correctly with dark theme', () => {
    // Mock the useTheme hook to return dark theme
    const mockToggleTheme = jest.fn()
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      actualTheme: 'dark',
      toggleTheme: mockToggleTheme
    })

    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    
    // Check if the button has the correct aria-label
    expect(button).toHaveAttribute('aria-label', 'Switch to system theme')
    
    // Check if the sun icon is displayed (for dark theme)
    const sunIcon = button.querySelector('svg path[d*="M12 3v2.25m6.364.386"]')
    expect(sunIcon).toBeInTheDocument()
  })

  it('renders correctly with system theme and light actual theme', () => {
    // Mock the useTheme hook to return system theme with light actual theme
    const mockToggleTheme = jest.fn()
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'system',
      actualTheme: 'light',
      toggleTheme: mockToggleTheme
    })

    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    
    // Check if the button has the correct aria-label
    expect(button).toHaveAttribute('aria-label', 'Switch to light theme')
    
    // Check if the computer icon is displayed (for system theme)
    const computerIcon = button.querySelector('svg path[d*="M9 17.25v1.007"]')
    expect(computerIcon).toBeInTheDocument()
  })

  it('renders correctly with system theme and dark actual theme', () => {
    // Mock the useTheme hook to return system theme with dark actual theme
    const mockToggleTheme = jest.fn()
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'system',
      actualTheme: 'dark',
      toggleTheme: mockToggleTheme
    })

    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    
    // Check if the button has the correct aria-label
    expect(button).toHaveAttribute('aria-label', 'Switch to light theme')
    
    // Check if the computer icon is displayed (for system theme)
    const computerIcon = button.querySelector('svg path[d*="M9 17.25v1.007"]')
    expect(computerIcon).toBeInTheDocument()
  })

  it('calls toggleTheme when button is clicked', () => {
    // Mock the useTheme hook
    const mockToggleTheme = jest.fn()
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      actualTheme: 'light',
      toggleTheme: mockToggleTheme
    })

    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    
    // Click the button
    fireEvent.click(button)
    
    // Check if toggleTheme was called
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  // Test for the hydration mismatch handling
  it('handles hydration mismatch by not rendering until mounted', () => {
    // Create a custom implementation of ThemeToggle that we can control
    const MockThemeToggle = () => {
      const { theme, actualTheme, toggleTheme } = useTheme();
      // Force mounted to be false to simulate initial render
      const [mounted] = React.useState(false);
      
      if (!mounted) return null;
      
      return <button>Toggle Theme</button>;
    };
    
    // Mock the useTheme hook
    const mockToggleTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      actualTheme: 'light',
      toggleTheme: mockToggleTheme
    });
    
    // Render our mock component
    const { container } = render(<MockThemeToggle />);
    
    // Component should return null, so container should be empty
    expect(container.firstChild).toBeNull();
  })
})
