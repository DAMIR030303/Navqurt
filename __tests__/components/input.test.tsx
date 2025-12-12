import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Input } from '@/components/ui/input'

describe('Input Component', () => {
  it('should render input with placeholder', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('should handle text input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    await user.type(input, 'Hello World')
    
    expect(input).toHaveValue('Hello World')
  })

  it('should handle different input types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />)
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" placeholder="Password" />)
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled input" />)
    expect(screen.getByPlaceholderText('Disabled input')).toBeDisabled()
  })

  it('should apply custom className', () => {
    const { container } = render(<Input className="custom-class" placeholder="Test" />)
    const input = container.querySelector('input')
    expect(input).toHaveClass('custom-class')
  })

  it('should have proper accessibility attributes', () => {
    render(<Input aria-label="Email input" placeholder="Email" />)
    expect(screen.getByLabelText('Email input')).toBeInTheDocument()
  })

  it('should handle aria-invalid attribute', () => {
    const { container } = render(<Input aria-invalid="true" placeholder="Test" />)
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('should support controlled input', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    
    render(<Input value="initial" onChange={handleChange} placeholder="Test" />)
    
    const input = screen.getByPlaceholderText('Test')
    await user.clear(input)
    await user.type(input, 'new value')
    
    expect(handleChange).toHaveBeenCalled()
  })
})

