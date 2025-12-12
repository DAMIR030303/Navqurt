import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Sidebar } from '@/components/sidebar'

describe('Sidebar Component', () => {
  const mockOnPageChange = jest.fn()
  const mockOnClose = jest.fn()
  const mockOnLogout = jest.fn()

  beforeEach(() => {
    mockOnPageChange.mockClear()
    mockOnClose.mockClear()
    mockOnLogout.mockClear()
  })

  it('should render sidebar when open', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        activePage="dashboard"
        onPageChange={mockOnPageChange}
        onLogout={mockOnLogout}
      />
    )
    
    expect(screen.getByText(/ai boshqaruv/i)).toBeInTheDocument()
  })

  it('should render navigation items', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        activePage="dashboard"
        onPageChange={mockOnPageChange}
        onLogout={mockOnLogout}
      />
    )
    
    expect(screen.getByText(/boshqaruv paneli/i)).toBeInTheDocument()
    expect(screen.getByText(/xodimlar/i)).toBeInTheDocument()
    expect(screen.getByText(/smenalar/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^vazifalar$/i })).toBeInTheDocument()
  })

  it('should highlight active page', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        activePage="employees"
        onPageChange={mockOnPageChange}
        onLogout={mockOnLogout}
      />
    )
    
    const employeesButton = screen.getByText(/xodimlar/i).closest('button')
    expect(employeesButton).toHaveClass('bg-gradient-to-r')
  })

  it('should call onPageChange when navigation item is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        activePage="dashboard"
        onPageChange={mockOnPageChange}
        onLogout={mockOnLogout}
      />
    )
    
    const employeesButton = screen.getByText(/xodimlar/i).closest('button')
    if (employeesButton) {
      await user.click(employeesButton)
      expect(mockOnPageChange).toHaveBeenCalledWith('employees')
      expect(mockOnClose).toHaveBeenCalled()
    }
  })

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        activePage="dashboard"
        onPageChange={mockOnPageChange}
        onLogout={mockOnLogout}
      />
    )
    
    const closeButtons = screen.getAllByRole('button')
    const closeButton = closeButtons.find(btn => 
      btn.querySelector('svg') && btn.getAttribute('aria-label') !== 'Menyuni ochish'
    )
    
    if (closeButton) {
      await user.click(closeButton)
      expect(mockOnClose).toHaveBeenCalled()
    }
  })

  it('should call onLogout when logout button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        activePage="dashboard"
        onPageChange={mockOnPageChange}
        onLogout={mockOnLogout}
      />
    )
    
    const logoutButton = screen.getByText(/chiqish/i).closest('button')
    if (logoutButton) {
      await user.click(logoutButton)
      expect(mockOnLogout).toHaveBeenCalled()
    }
  })

  it('should render super admin section when isSuperAdmin is true', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        activePage="dashboard"
        onPageChange={mockOnPageChange}
        onLogout={mockOnLogout}
        isSuperAdmin={true}
      />
    )
    
    expect(screen.getByText(/korxonalar boshqaruvi/i)).toBeInTheDocument()
  })

  it('should not render super admin section when isSuperAdmin is false', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        activePage="dashboard"
        onPageChange={mockOnPageChange}
        onLogout={mockOnLogout}
        isSuperAdmin={false}
      />
    )
    
    expect(screen.queryByText(/korxonalar boshqaruvi/i)).not.toBeInTheDocument()
  })

  it('should display user information', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        activePage="dashboard"
        onPageChange={mockOnPageChange}
        onLogout={mockOnLogout}
      />
    )
    
    expect(screen.getByText(/alisher karimov/i)).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        activePage="dashboard"
        onPageChange={mockOnPageChange}
        onLogout={mockOnLogout}
      />
    )
    
    const sidebar = screen.getByRole('complementary', { hidden: true }) || 
                   document.querySelector('aside')
    expect(sidebar).toBeInTheDocument()
  })
})
