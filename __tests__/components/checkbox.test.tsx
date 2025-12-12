import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Checkbox } from '@/components/ui/checkbox'

describe('Checkbox Component', () => {
  it('should render checkbox', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('should be checked when checked prop is true', () => {
    render(<Checkbox checked />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('should be unchecked by default', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('should handle click events', async () => {
    const user = userEvent.setup()
    const handleCheckedChange = jest.fn()
    
    render(<Checkbox onCheckedChange={handleCheckedChange} />)
    
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    
    expect(handleCheckedChange).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Checkbox disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('should not respond to clicks when disabled', async () => {
    const user = userEvent.setup()
    const handleCheckedChange = jest.fn()
    
    render(<Checkbox disabled onCheckedChange={handleCheckedChange} />)
    
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    
    expect(handleCheckedChange).not.toHaveBeenCalled()
  })

  it('should apply custom className', () => {
    const { container } = render(<Checkbox className="custom-class" />)
    const checkbox = container.querySelector('[data-slot="checkbox"]')
    expect(checkbox).toHaveClass('custom-class')
  })

  it('should have proper accessibility attributes', () => {
    render(<Checkbox aria-label="Accept terms" />)
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
  })

  it('should support controlled state', async () => {
    const user = userEvent.setup()
    const handleCheckedChange = jest.fn()
    
    render(<Checkbox checked={false} onCheckedChange={handleCheckedChange} />)
    
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    
    expect(handleCheckedChange).toHaveBeenCalledWith(true)
  })
})

