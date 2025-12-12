import { render, screen } from '@testing-library/react'

import { StatsOverview } from '@/components/stats-overview'

describe('StatsOverview Component', () => {
  it('should render stats overview', () => {
    render(<StatsOverview />)
    
    expect(screen.getByText(/jami xodimlar/i)).toBeInTheDocument()
  })

  it('should render all stat cards', () => {
    render(<StatsOverview />)
    
    expect(screen.getByText(/jami xodimlar/i)).toBeInTheDocument()
    expect(screen.getByText(/faol loyihalar/i)).toBeInTheDocument()
    expect(screen.getByText(/o'sish sur'ati/i)).toBeInTheDocument()
    expect(screen.getByText(/o'rtacha ish vaqti/i)).toBeInTheDocument()
  })

  it('should display stat values', () => {
    render(<StatsOverview />)
    
    expect(screen.getByText('128')).toBeInTheDocument()
    expect(screen.getByText('23')).toBeInTheDocument()
    expect(screen.getByText('18%')).toBeInTheDocument()
    expect(screen.getByText('7.8h')).toBeInTheDocument()
  })

  it('should display change indicators', () => {
    render(<StatsOverview />)
    
    expect(screen.getByText('+4')).toBeInTheDocument()
    expect(screen.getByText('+2')).toBeInTheDocument()
    expect(screen.getByText('+3%')).toBeInTheDocument()
    expect(screen.getByText('-0.2h')).toBeInTheDocument()
  })

  it('should render icons for each stat', () => {
    const { container } = render(<StatsOverview />)
    
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('should have proper grid layout', () => {
    const { container } = render(<StatsOverview />)
    
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-2', 'lg:grid-cols-4')
  })

  it('should be accessible', () => {
    render(<StatsOverview />)
    
    // All stat labels should be readable
    expect(screen.getByText(/jami xodimlar/i)).toBeInTheDocument()
    expect(screen.getByText(/faol loyihalar/i)).toBeInTheDocument()
  })
})

