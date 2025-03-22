import { render, screen } from '@testing-library/react'
import Logo from '../Logo'
import { ThemeProvider } from '@/app/context/__mocks__/ThemeContext'

// Mock the ThemeContext
jest.mock('@/app/context/ThemeContext', () => ({
  __esModule: true,
  ...jest.requireActual('@/app/context/__mocks__/ThemeContext')
}))

describe('Logo', () => {
  it('renders with default props', () => {
    render(
      <ThemeProvider>
        <Logo width={100} height={100} />
      </ThemeProvider>
    )
    const logo = screen.getByTestId('logo')
    expect(logo).toBeInTheDocument()
    expect(logo.tagName.toLowerCase()).toBe('svg')
  })
})
