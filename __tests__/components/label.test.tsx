import { render, screen } from '@testing-library/react'

import { Label } from '@/components/ui/label'

describe('Label Component', () => {
  it('should render label with text', () => {
    render(<Label>Email Address</Label>)
    expect(screen.getByText('Email Address')).toBeInTheDocument()
  })

  it('should associate with input using htmlFor', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" type="email" />
      </>
    )
    
    const label = screen.getByText('Email')
    const input = screen.getByLabelText('Email')
    
    expect(label).toHaveAttribute('for', 'email')
    expect(input).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<Label className="custom-class">Test Label</Label>)
    const label = container.querySelector('[data-slot="label"]')
    expect(label).toHaveClass('custom-class')
  })

  it('should support asChild prop', () => {
    render(
      <Label asChild>
        <span>Custom Label</span>
      </Label>
    )
    expect(screen.getByText('Custom Label')).toBeInTheDocument()
  })

  it('should have proper accessibility role', () => {
    render(<Label>Test Label</Label>)
    const label = screen.getByText('Test Label')
    expect(label.tagName.toLowerCase()).toBe('label')
  })
})

