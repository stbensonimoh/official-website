import { render, screen } from '@testing-library/react'
import Copyright from '../Copyright'

describe('Copyright', () => {
  it('renders with current year', () => {
    const currentYear = new Date().getFullYear()
    render(<Copyright />)
    expect(screen.getByText(`Copyright © ${currentYear} Benson Imoh,ST`)).toBeInTheDocument()
  })

  it('accepts and applies additional props', () => {
    render(<Copyright className="test-class" data-testid="copyright" />)
    const copyright = screen.getByTestId('copyright')
    expect(copyright).toHaveClass('test-class')
  })
})