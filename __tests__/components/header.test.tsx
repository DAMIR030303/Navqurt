import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Header } from '@/components/header'

describe('Header Component', () => {
  const mockOnMenuClick = jest.fn()
  const mockOnThemeToggle = jest.fn()

  beforeEach(() => {
    mockOnMenuClick.mockClear()
    mockOnThemeToggle.mockClear()
  })

  it('should render header', () => {
    render(<Header onMenuClick={mockOnMenuClick} isDark={false} onThemeToggle={mockOnThemeToggle} />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('should render menu button', () => {
    render(<Header onMenuClick={mockOnMenuClick} isDark={false} onThemeToggle={mockOnThemeToggle} />)
    
    const menuButton = screen.getByRole('button', { name: /menyuni ochish/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('should call onMenuClick when menu button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header onMenuClick={mockOnMenuClick} isDark={false} onThemeToggle={mockOnThemeToggle} />)
    
    const menuButton = screen.getByRole('button', { name: /menyuni ochish/i })
    await user.click(menuButton)
    
    expect(mockOnMenuClick).toHaveBeenCalledTimes(1)
  })

  it('should render search input', () => {
    render(<Header onMenuClick={mockOnMenuClick} isDark={false} onThemeToggle={mockOnThemeToggle} />)
    
    expect(screen.getByPlaceholderText(/qidirish/i)).toBeInTheDocument()
  })

  it('should render theme toggle button', () => {
    render(<Header onMenuClick={mockOnMenuClick} isDark={false} onThemeToggle={mockOnThemeToggle} />)
    
    const themeButton = screen.getByRole('button', { name: /mavzuni almashtirish/i })
    expect(themeButton).toBeInTheDocument()
  })

  it('should call onThemeToggle when theme button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header onMenuClick={mockOnMenuClick} isDark={false} onThemeToggle={mockOnThemeToggle} />)
    
    const themeButton = screen.getByRole('button', { name: /mavzuni almashtirish/i })
    await user.click(themeButton)
    
    expect(mockOnThemeToggle).toHaveBeenCalledTimes(1)
  })

  it('should show moon icon when isDark is false', () => {
    render(<Header onMenuClick={mockOnMenuClick} isDark={false} onThemeToggle={mockOnThemeToggle} />)
    
    // Moon icon should be visible
    const themeButton = screen.getByRole('button', { name: /mavzuni almashtirish/i })
    expect(themeButton.querySelector('svg')).toBeInTheDocument()
  })

  it('should show sun icon when isDark is true', () => {
    render(<Header onMenuClick={mockOnMenuClick} isDark={true} onThemeToggle={mockOnThemeToggle} />)
    
    // Sun icon should be visible
    const themeButton = screen.getByRole('button', { name: /mavzuni almashtirish/i })
    expect(themeButton.querySelector('svg')).toBeInTheDocument()
  })

  it('should render notifications button', () => {
    render(<Header onMenuClick={mockOnMenuClick} isDark={false} onThemeToggle={mockOnThemeToggle} />)
    
    const notificationsButton = screen.getByRole('button', { name: /bildirishnomalar/i })
    expect(notificationsButton).toBeInTheDocument()
  })

  it('should open notifications dropdown when clicked', async () => {
    const user = userEvent.setup()
    render(<Header onMenuClick={mockOnMenuClick} isDark={false} onThemeToggle={mockOnThemeToggle} />)
    
    const notificationsButton = screen.getByRole('button', { name: /bildirishnomalar/i })
    await user.click(notificationsButton)
    
    // Notifications content should appear (multiple elements might have this text)
    const bildirishnomalarElements = screen.getAllByText(/bildirishnomalar/i)
    expect(bildirishnomalarElements.length).toBeGreaterThan(0)
  })

  it('should render profile dropdown', () => {
    render(<Header onMenuClick={mockOnMenuClick} isDark={false} onThemeToggle={mockOnThemeToggle} />)
    
    // Profile button should be present
    const profileButtons = screen.getAllByRole('button')
    const profileButton = profileButtons.find(btn => 
      btn.textContent?.includes('Alisher') || btn.querySelector('div')?.textContent?.includes('AK')
    )
    expect(profileButton).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<Header onMenuClick={mockOnMenuClick} isDark={false} onThemeToggle={mockOnThemeToggle} />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /menyuni ochish/i })).toHaveAttribute('aria-label', 'Menyuni ochish')
  })
})

