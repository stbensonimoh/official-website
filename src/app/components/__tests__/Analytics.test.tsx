import { describe, test, expect, beforeEach, afterEach, mock } from 'bun:test'
import { render } from '@testing-library/react'
import Analytics from '../Analytics'

// Mock the @microsoft/clarity package
const mockClarityInit = mock(() => {})

mock.module('@microsoft/clarity', () => ({
  default: {
    init: mockClarityInit,
  },
}))

describe('Analytics', () => {
  const originalEnv = process.env

  beforeEach(() => {
    // Reset environment variables and mock data before each test
    process.env = { ...originalEnv }
    mockClarityInit.mockClear()
  })

  afterEach(() => {
    // Restore original environment variables
    process.env = originalEnv
  })

  test('renders without crashing when tracking ID is provided', () => {
    // Set tracking ID environment variable
    process.env.NEXT_PUBLIC_CLARITY_TRACKING_ID = 'test-tracking-id'
    
    expect(() => render(<Analytics />)).not.toThrow()
  })

  test('renders nothing when tracking ID is not provided', () => {
    // Ensure tracking ID is not set
    delete process.env.NEXT_PUBLIC_CLARITY_TRACKING_ID
    
    const { container } = render(<Analytics />)
    
    // Should not render any children
    expect(container.children.length).toBe(0)
  })

  test('renders nothing when tracking ID is empty', () => {
    // Set empty tracking ID
    process.env.NEXT_PUBLIC_CLARITY_TRACKING_ID = ''
    
    const { container } = render(<Analytics />)
    
    // Should not render any children for empty tracking ID
    expect(container.children.length).toBe(0)
  })

  test('renders nothing when tracking ID is placeholder value', () => {
    // Set placeholder tracking ID
    process.env.NEXT_PUBLIC_CLARITY_TRACKING_ID = 'your_tracking_id_here'
    
    const { container } = render(<Analytics />)
    
    // Should not render any children for placeholder tracking ID
    expect(container.children.length).toBe(0)
  })

  test('component exports correctly', () => {
    // Test that the component can be imported and is a function
    expect(typeof Analytics).toBe('function')
    expect(Analytics.name).toBe('Analytics')
  })
})