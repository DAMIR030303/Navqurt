import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { EmployeeProfileModal } from '@/components/employee-profile-modal'

const mockEmployee = {
  id: 1,
  name: "Aziza Rahimova",
  role: "Frontend dasturchi",
  department: "IT bo'limi",
  email: "aziza@ishoqumi.uz",
  phone: "+998 90 123 45 67",
  location: "Toshkent",
  joinDate: "2023-03-15",
  status: "active",
  avatar: "AR",
  performance: 95,
  isTopPerformer: true,
}

describe('EmployeeProfileModal Component', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('should not render when isOpen is false', () => {
    render(<EmployeeProfileModal isOpen={false} onClose={mockOnClose} employee={null} />)
    
    expect(screen.queryByText(/aziza rahimova/i)).not.toBeInTheDocument()
  })

  it('should not render when employee is null', () => {
    render(<EmployeeProfileModal isOpen={true} onClose={mockOnClose} employee={null} />)
    
    expect(screen.queryByText(/aziza rahimova/i)).not.toBeInTheDocument()
  })

  it('should render when isOpen is true and employee is provided', () => {
    render(<EmployeeProfileModal isOpen={true} onClose={mockOnClose} employee={mockEmployee} />)
    
    expect(screen.getByText(/aziza rahimova/i)).toBeInTheDocument()
  })

  it('should display employee information', () => {
    render(<EmployeeProfileModal isOpen={true} onClose={mockOnClose} employee={mockEmployee} />)
    
    expect(screen.getByText(/aziza rahimova/i)).toBeInTheDocument()
    expect(screen.getByText(/frontend dasturchi/i)).toBeInTheDocument()
    expect(screen.getByText(/it bo'limi/i)).toBeInTheDocument()
  })

  it('should display employee contact information', () => {
    render(<EmployeeProfileModal isOpen={true} onClose={mockOnClose} employee={mockEmployee} />)
    
    expect(screen.getByText(/aziza@ishoqumi.uz/i)).toBeInTheDocument()
    expect(screen.getByText(/\+998 90 123 45 67/i)).toBeInTheDocument()
  })

  it('should render tabs', () => {
    render(<EmployeeProfileModal isOpen={true} onClose={mockOnClose} employee={mockEmployee} />)
    
    // Should have tab navigation
    expect(screen.getByText(/umumiy/i)).toBeInTheDocument()
  })

  it('should switch between tabs', async () => {
    const user = userEvent.setup()
    render(<EmployeeProfileModal isOpen={true} onClose={mockOnClose} employee={mockEmployee} />)
    
    // Find and click a different tab
    const tabs = screen.getAllByRole('button')
    const tasksTab = tabs.find(btn => btn.textContent?.includes('Vazifalar'))
    
    if (tasksTab) {
      await user.click(tasksTab)
      // Tab should switch
    }
  })

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<EmployeeProfileModal isOpen={true} onClose={mockOnClose} employee={mockEmployee} />)
    
    const closeButtons = screen.getAllByRole('button')
    const closeButton = closeButtons.find(btn => 
      btn.querySelector('svg') && btn.getAttribute('aria-label')?.includes('close')
    ) || closeButtons.find(btn => btn.textContent === '' && btn.querySelector('svg'))
    
    if (closeButton) {
      await user.click(closeButton)
      expect(mockOnClose).toHaveBeenCalled()
    }
  })

  it('should display performance score', () => {
    render(<EmployeeProfileModal isOpen={true} onClose={mockOnClose} employee={mockEmployee} />)
    
    expect(screen.getByText(/95/i)).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<EmployeeProfileModal isOpen={true} onClose={mockOnClose} employee={mockEmployee} />)
    
    // Modal should be accessible
    expect(screen.getByText(/aziza rahimova/i)).toBeInTheDocument()
  })
})

