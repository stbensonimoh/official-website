import { render, screen } from '@testing-library/react'
import Logo from '../Logo'

// Mock next/image directly in test file
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image(props: any) {
    return <img {...props} data-testid="logo" />
  }
}))

describe('Logo', () => {
  it('renders with default props', () => {
    render(<Logo width={100} height={100} />)
    const logo = screen.getByTestId('logo')
    expect(logo).toBeInTheDocument()
  })
})