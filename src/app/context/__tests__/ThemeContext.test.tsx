import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../ThemeContext'

describe('ThemeContext', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {}
    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value
      }),
      clear: jest.fn(() => {
        store = {}
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key]
      }),
    }
  })()
  
  // Mock matchMedia
  let matchMediaMockFn: jest.Mock
  let mediaListeners: Record<string, ((e: MediaQueryListEvent) => void)[]> = {}
  
  // Setup mocks before each test
  beforeEach(() => {
    // Reset localStorage mock
    Object.defineProperty(window, 'localStorage', { 
      value: localStorageMock,
      writable: true
    })
    localStorageMock.clear()
    jest.clearAllMocks()
    
    // Reset media listeners
    mediaListeners = {}
    
    // Create matchMedia mock
    matchMediaMockFn = jest.fn().mockImplementation((query) => {
      return {
        matches: false, // Default to light mode
        media: query,
        addEventListener: jest.fn((event, listener) => {
          if (!mediaListeners[event]) {
            mediaListeners[event] = []
          }
          mediaListeners[event].push(listener)
        }),
        removeEventListener: jest.fn((event, listener) => {
          if (mediaListeners[event]) {
            mediaListeners[event] = mediaListeners[event].filter(l => l !== listener)
          }
        }),
      }
    })
    
    // Apply matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMockFn,
    })
  })
  
  // Helper to simulate media query change
  const simulateMediaQueryChange = (matches: boolean) => {
    // Update the mock to return the new value
    matchMediaMockFn.mockImplementation(() => ({
      matches,
      media: '(prefers-color-scheme: dark)',
      addEventListener: jest.fn((event, listener) => {
        if (!mediaListeners[event]) {
          mediaListeners[event] = []
        }
        mediaListeners[event].push(listener)
      }),
      removeEventListener: jest.fn(),
    }))
    
    // Trigger any registered listeners
    if (mediaListeners['change']) {
      mediaListeners['change'].forEach(listener => {
        listener({ matches } as unknown as MediaQueryListEvent)
      })
    }
  }

  // Test component to access theme context
  const TestComponent = () => {
    const { theme, actualTheme, toggleTheme } = useTheme()
    return (
      <div>
        <div data-testid="theme">{theme}</div>
        <div data-testid="actual-theme">{actualTheme}</div>
        <button data-testid="toggle-button" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
    )
  }

  it('provides default theme as system', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme').textContent).toBe('system')
    expect(screen.getByTestId('actual-theme').textContent).toBe('light') // Default system theme is light
  })

  it('toggles theme correctly from system -> light -> dark -> system', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const toggleButton = screen.getByTestId('toggle-button')
    
    // Initial state: system theme
    expect(screen.getByTestId('theme').textContent).toBe('system')
    
    // First toggle: system -> light
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(screen.getByTestId('actual-theme').textContent).toBe('light')
    
    // Second toggle: light -> dark
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(screen.getByTestId('actual-theme').textContent).toBe('dark')
    
    // Third toggle: dark -> system
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('theme').textContent).toBe('system')
  })

  it('persists theme preference in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const toggleButton = screen.getByTestId('toggle-button')
    
    // Toggle to light theme
    fireEvent.click(toggleButton)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
    
    // Toggle to dark theme
    fireEvent.click(toggleButton)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('loads theme from localStorage on mount', () => {
    // Set theme in localStorage
    localStorageMock.getItem.mockReturnValueOnce('dark')
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    // Should load dark theme from localStorage
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(screen.getByTestId('actual-theme').textContent).toBe('dark')
  })

  it('detects system theme correctly', () => {
    // Set system theme to dark before rendering
    matchMediaMockFn.mockImplementation(() => ({
      matches: true, // Dark mode
      media: '(prefers-color-scheme: dark)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    // Should detect system theme as dark
    expect(screen.getByTestId('theme').textContent).toBe('system')
    expect(screen.getByTestId('actual-theme').textContent).toBe('dark')
  })

  it('updates theme when system preference changes', () => {
    // Start with light system theme (default in beforeEach)
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    // Initial state: system theme (light)
    expect(screen.getByTestId('theme').textContent).toBe('system')
    expect(screen.getByTestId('actual-theme').textContent).toBe('light')
    
    // Simulate system theme change to dark
    act(() => {
      simulateMediaQueryChange(true) // Change to dark mode
    })
    
    // Theme should now be dark
    expect(screen.getByTestId('theme').textContent).toBe('system')
    expect(screen.getByTestId('actual-theme').textContent).toBe('dark')
  })

  it('throws error when useTheme is used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = jest.fn()
    
    // Expect error when rendering TestComponent without ThemeProvider
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useTheme must be used within a ThemeProvider')
    
    // Restore console.error
    console.error = originalError
  })
})
