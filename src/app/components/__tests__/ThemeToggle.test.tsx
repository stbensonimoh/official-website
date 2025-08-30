import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, test, expect, beforeEach, afterEach } from 'bun:test'
import ThemeToggle from '../ThemeToggle'
import { ThemeProvider } from '@/app/context/ThemeContext'

describe('ThemeToggle', () => {
  // Setup localStorage mock
  const localStorageMock = (() => {
    let store: Record<string, string> = {}
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value
      },
      clear: () => {
        store = {}
      },
      removeItem: (key: string) => {
        delete store[key]
      },
    }
  })()

  beforeEach(() => {
    // Setup localStorage mock
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true
    })
    localStorageMock.clear()

    // Setup matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false, // Default to light mode
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
    })
  })

  afterEach(() => {
    cleanup()
  })

  test('renders correctly with default system theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    // Check if the button is rendered
    const button = screen.getByRole('button')
    expect(button).toBeTruthy()
    
    // Should show computer icon for system theme and aria-label for next action (light)
    expect(button.getAttribute('aria-label')).toBe('Switch to light theme')
  })

  test('changes theme when clicked multiple times', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    const button = screen.getByRole('button')
    
    // Initial state should be system theme
    expect(button.getAttribute('aria-label')).toBe('Switch to light theme')
    
    // First click: system -> light
    fireEvent.click(button)
    expect(button.getAttribute('aria-label')).toBe('Switch to dark theme')
    
    // Second click: light -> dark
    fireEvent.click(button)
    expect(button.getAttribute('aria-label')).toBe('Switch to system theme')
    
    // Third click: dark -> system
    fireEvent.click(button)
    expect(button.getAttribute('aria-label')).toBe('Switch to light theme')
  })

  test('displays correct icons for each theme state', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    const button = screen.getByRole('button')
    
    // System theme should show computer icon
    let computerIcon = button.querySelector('svg path[d*="M9 17.25v1.007"]')
    expect(computerIcon).toBeTruthy()
    
    // Click to light theme
    fireEvent.click(button)
    let moonIcon = button.querySelector('svg path[d*="M21.752 15.002"]')
    expect(moonIcon).toBeTruthy()
    
    // Click to dark theme  
    fireEvent.click(button)
    let sunIcon = button.querySelector('svg path[d*="M12 3v2.25m6.364.386"]')
    expect(sunIcon).toBeTruthy()
  })

  test('persists theme preference', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    const button = screen.getByRole('button')
    
    // Click to set light theme
    fireEvent.click(button)
    
    // Check localStorage was updated
    expect(localStorageMock.getItem('theme')).toBe('light')
    
    // Click to set dark theme
    fireEvent.click(button)
    
    // Check localStorage was updated again
    expect(localStorageMock.getItem('theme')).toBe('dark')
  })

  test('loads saved theme from localStorage', () => {
    // Pre-set localStorage to dark theme
    localStorageMock.setItem('theme', 'dark')
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    const button = screen.getByRole('button')
    
    // Should show system theme switch since current is dark
    expect(button.getAttribute('aria-label')).toBe('Switch to system theme')
    
    // Should show sun icon (for dark theme)
    const sunIcon = button.querySelector('svg path[d*="M12 3v2.25m6.364.386"]')
    expect(sunIcon).toBeTruthy()
  })
})
