// Test environment setup for Bun
import { Window } from 'happy-dom'

// Set up DOM environment first
const window = new Window()
const document = window.document

// Make DOM available globally
Object.assign(global, {
  window,
  document,
  navigator: window.navigator,
  HTMLElement: window.HTMLElement,
  Element: window.Element,
  Node: window.Node,
  localStorage: window.localStorage,
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  } as MediaQueryList),
})

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  },
})

// Mock Next.js font functions - override the global require/import
const mockFont = {
  className: 'mock-font',
  style: { fontFamily: 'mock-font' },
  variable: '--mock-font'
}

// Try to intercept Next.js font imports using Bun's module system
if (typeof Bun !== 'undefined') {
  // Override the module loader for font imports
  const originalRequire = globalThis.require as any
  globalThis.require = function(id: string): any {
    if (id === 'next/font/google') {
      return {
        Roboto: () => mockFont,
        Bebas_Neue: () => mockFont,
        Bad_Script: () => mockFont,
        Dosis: () => mockFont,
        Roboto_Slab: () => mockFont,
      }
    }
    if (id === '@/app/fonts') {
      return {
        roboto: mockFont,
        bebas: mockFont,
        badScript: mockFont,
        dosis: mockFont,
        robotoSlab: mockFont,
      }
    }
    return originalRequire ? originalRequire(id) : undefined
  } as any
}

// Import jest-dom matchers after DOM is set up
import '@testing-library/jest-dom'
