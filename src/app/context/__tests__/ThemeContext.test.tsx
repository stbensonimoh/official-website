import React from 'react'
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react'
import { describe, test, expect, beforeEach, afterEach } from 'bun:test'
import { ThemeProvider, useTheme } from '../ThemeContext'

describe('ThemeContext', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {}
    let setItemCalls: Array<{ key: string; value: string }> = []
    
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value
        setItemCalls.push({ key, value })
      },
      clear: () => {
        store = {}
        setItemCalls = []
      },
      removeItem: (key: string) => {
        delete store[key]
      },
      getSetItemCalls: () => setItemCalls,
      setMockValue: (key: string, value: string) => {
        store[key] = value
      }
    }
  })()
  
  // Mock matchMedia
  let mediaListeners: Record<string, ((e: MediaQueryListEvent) => void)[]> = {}
  let currentMatches = false
  let matchMediaMockFn: any
  
  // Setup mocks before each test
  beforeEach(() => {
    // Reset localStorage mock
    Object.defineProperty(global, 'localStorage', { 
      value: localStorageMock,
      writable: true
    })
    localStorageMock.clear()
    
    // Reset media listeners
    mediaListeners = {}
    currentMatches = false
    
    // Create matchMedia mock
    matchMediaMockFn = (query: string) => {
      return {
        matches: currentMatches,
        media: query,
        addEventListener: (event: string, listener: (e: MediaQueryListEvent) => void) => {
          if (!mediaListeners[event]) {
            mediaListeners[event] = []
          }
          mediaListeners[event].push(listener)
        },
        removeEventListener: (event: string, listener: (e: MediaQueryListEvent) => void) => {
          if (mediaListeners[event]) {
            mediaListeners[event] = mediaListeners[event].filter(l => l !== listener)
          }
        },
      }
    }
    
    // Apply matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMockFn,
    })
  })
  
  afterEach(() => {
    cleanup()
  })
  
  // Helper to simulate media query change
  const simulateMediaQueryChange = (matches: boolean) => {
    currentMatches = matches
    
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

  test('provides default theme as system', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme').textContent).toBe('system')
    expect(screen.getByTestId('actual-theme').textContent).toBe('light') // Default system theme is light
  })

  test('toggles theme correctly from system -> light -> dark -> system', () => {
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

  test('persists theme preference in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const toggleButton = screen.getByTestId('toggle-button')
    
    // Toggle to light theme
    fireEvent.click(toggleButton)
    const calls = localStorageMock.getSetItemCalls()
    expect(calls.some(call => call.key === 'theme' && call.value === 'light')).toBe(true)
    
    // Toggle to dark theme
    fireEvent.click(toggleButton)
    const updatedCalls = localStorageMock.getSetItemCalls()
    expect(updatedCalls.some(call => call.key === 'theme' && call.value === 'dark')).toBe(true)
  })

  test('loads theme from localStorage on mount', () => {
    // Set theme in localStorage
    localStorageMock.setMockValue('theme', 'dark')
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    // Should load dark theme from localStorage
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(screen.getByTestId('actual-theme').textContent).toBe('dark')
  })

  test('detects system theme correctly', () => {
    // Set system theme to dark before rendering
    currentMatches = true
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    // Should detect system theme as dark
    expect(screen.getByTestId('theme').textContent).toBe('system')
    expect(screen.getByTestId('actual-theme').textContent).toBe('dark')
  })

  test('updates theme when system preference changes', () => {
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

  test('throws error when useTheme is used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = () => {}
    
    // Expect error when rendering TestComponent without ThemeProvider
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useTheme must be used within a ThemeProvider')
    
    // Restore console.error
    console.error = originalError
  })
})
