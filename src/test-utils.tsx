import React from 'react'
import { render } from '@testing-library/react'

const MockNextImage = ({ src, alt }: { src: string; alt: string }) => {
  return React.createElement('img', { src, alt })
}

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  pathname: '/',
}

const setupTest = () => {
  jest.mock('next/navigation', () => ({
    useRouter: () => mockRouter,
    usePathname: () => '/',
    notFound: jest.fn(),
  }))

  jest.mock('next/image', () => MockNextImage)
}

const renderWithSetup = (ui: React.ReactElement, options = {}) => {
  setupTest()
  return render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  })
}

export { renderWithSetup as render, mockRouter }
export * from '@testing-library/react'