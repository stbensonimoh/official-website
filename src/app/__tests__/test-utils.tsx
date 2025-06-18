import React from 'react'
import { render } from '@testing-library/react'
import { mock } from 'bun:test'

const MockNextImage = ({ src, alt }: { src: string; alt: string }) => {
  return React.createElement('img', { src, alt })
}

const mockRouter = {
  push: mock(() => {}),
  replace: mock(() => {}),
  back: mock(() => {}),
  pathname: '/',
}

const setupTest = () => {
  mock.module('next/navigation', () => ({
    useRouter: () => mockRouter,
    usePathname: () => '/',
    notFound: mock(() => {}),
  }))

  mock.module('next/image', () => MockNextImage)
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