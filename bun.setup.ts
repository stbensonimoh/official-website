import '@testing-library/jest-dom'

// Mock Next.js navigation for all tests
const mockRouter = {
  push: () => {},
  back: () => {},
  replace: () => {},
}

// Create global mocks
;(global as any).mockNextRouter = mockRouter
;(global as any).mockNextPathname = () => '/'
