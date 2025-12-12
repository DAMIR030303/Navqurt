import { render, screen } from '@testing-library/react'

import { Badge } from '@/components/ui/badge'

describe('Badge Component', () => {
  it('should render badge with text', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('should apply default variant styles', () => {
    const { container } = render(<Badge>Default</Badge>)
    const badge = container.querySelector('[data-slot="badge"]')
    expect(badge).toHaveClass('bg-primary')
  })

  it('should apply secondary variant', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>)
    const badge = container.querySelector('[data-slot="badge"]')
    expect(badge).toHaveClass('bg-secondary')
  })

  it('should apply destructive variant', () => {
    const { container } = render(<Badge variant="destructive">Destructive</Badge>)
    const badge = container.querySelector('[data-slot="badge"]')
    expect(badge).toHaveClass('bg-destructive')
  })

  it('should apply outline variant', () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>)
    const badge = container.querySelector('[data-slot="badge"]')
    expect(badge).toHaveClass('text-foreground')
  })

  it('should apply custom className', () => {
    const { container } = render(<Badge className="custom-class">Test</Badge>)
    const badge = container.querySelector('[data-slot="badge"]')
    expect(badge).toHaveClass('custom-class')
  })

  it('should render with icon', () => {
    render(
      <Badge>
        <span data-testid="icon">🔥</span>
        Hot
      </Badge>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('Hot')).toBeInTheDocument()
  })

  it('should support asChild prop', () => {
    render(
      <Badge asChild>
        <a href="/test">Link Badge</a>
      </Badge>
    )
    expect(screen.getByRole('link')).toBeInTheDocument()
  })
})

