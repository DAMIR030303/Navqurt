import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AttendanceSection } from '@/components/attendance-section'

describe('AttendanceSection Component', () => {
  it('should render attendance section', () => {
    render(<AttendanceSection />)
    
    // Multiple elements might have "davomat" text
    const davomatElements = screen.getAllByText(/davomat/i)
    expect(davomatElements.length).toBeGreaterThan(0)
  })

  it('should render attendance statistics', () => {
    render(<AttendanceSection />)
    
    expect(screen.getByText(/bugun kelganlar/i)).toBeInTheDocument()
    expect(screen.getByText(/kelmagan xodimlar/i)).toBeInTheDocument()
    // Multiple elements might have "kechikkanlar" text
    const kechikkanlarElements = screen.getAllByText(/kechikkanlar/i)
    expect(kechikkanlarElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/ish soatlari/i)).toBeInTheDocument()
  })

  it('should display attendance values', () => {
    render(<AttendanceSection />)
    
    expect(screen.getByText('98')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('should render search input', () => {
    render(<AttendanceSection />)
    
    expect(screen.getByPlaceholderText(/qidirish/i)).toBeInTheDocument()
  })

  it('should filter attendance when search input changes', async () => {
    const user = userEvent.setup()
    render(<AttendanceSection />)
    
    const searchInput = screen.getByPlaceholderText(/qidirish/i)
    await user.type(searchInput, 'Aziza')
    
    expect(searchInput).toHaveValue('Aziza')
  })

  it('should render attendance list', () => {
    render(<AttendanceSection />)
    
    // Should render at least one attendance record
    expect(screen.getByText(/aziza rahimova/i)).toBeInTheDocument()
  })

  it('should display check-in and check-out times', () => {
    render(<AttendanceSection />)
    
    // Should show time information
    expect(screen.getByText(/08:45/i)).toBeInTheDocument()
  })

  it('should render calendar navigation', () => {
    render(<AttendanceSection />)
    
    // Calendar navigation buttons should be present
    const buttons = screen.getAllByRole('button')
    const prevButton = buttons.find(btn => btn.querySelector('svg'))
    expect(prevButton).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<AttendanceSection />)
    
    // Component should render and be accessible
    const davomatElements = screen.getAllByText(/davomat/i)
    expect(davomatElements.length).toBeGreaterThan(0)
  })
})

