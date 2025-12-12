import { render, screen } from '@testing-library/react'

import { KPICards } from '@/components/kpi-cards'

describe('KPICards Component', () => {
  it('should render all KPI cards', () => {
    render(<KPICards />)

    // Check for KPI titles
    expect(screen.getByText('Davomat darajasi')).toBeInTheDocument()
    expect(screen.getByText('Bajarilgan vazifalar')).toBeInTheDocument()
    expect(screen.getByText('Berilgan jarimalar')).toBeInTheDocument()
  })

  it('should display correct KPI values', () => {
    render(<KPICards />)

    expect(screen.getByText('94.2%')).toBeInTheDocument()
    expect(screen.getByText('847')).toBeInTheDocument()
    expect(screen.getByText('23')).toBeInTheDocument()
  })

  it('should display trend indicators', () => {
    render(<KPICards />)

    // Check for positive trends (+)
    expect(screen.getByText('+2.1%')).toBeInTheDocument()
    expect(screen.getByText('+12.5%')).toBeInTheDocument()

    // Check for negative trend (-)
    expect(screen.getByText('-8.3%')).toBeInTheDocument()
  })

  it('should display descriptions', () => {
    render(<KPICards />)

    expect(screen.getAllByText("o'tgan oyga nisbatan").length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('shu oy')).toBeInTheDocument()
  })

  it('should render with gradient backgrounds', () => {
    const { container } = render(<KPICards />)
    const cards = container.querySelectorAll('[class*="rounded-2xl"]')

    expect(cards.length).toBeGreaterThanOrEqual(3)
  })

  it('should have hover effects', () => {
    const { container } = render(<KPICards />)
    const cards = container.querySelectorAll('[class*="group"]')

    // All cards should have group class for hover effects
    expect(cards.length).toBeGreaterThanOrEqual(3)
  })
})
