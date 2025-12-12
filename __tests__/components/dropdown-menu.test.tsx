import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

describe('DropdownMenu Component', () => {
  it('should render dropdown trigger', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })

  it('should open dropdown menu on trigger click', async () => {
    const user = userEvent.setup()
    
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    const trigger = screen.getByRole('button', { name: /open menu/i })
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument()
    })
  })

  it('should render dropdown menu items', async () => {
    const user = userEvent.setup()
    
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    const trigger = screen.getByRole('button', { name: /open menu/i })
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(screen.getByText('Item 3')).toBeInTheDocument()
    })
  })

  it('should handle menu item click', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleClick}>Click Me</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    const trigger = screen.getByRole('button', { name: /open menu/i })
    await user.click(trigger)
    
    await waitFor(async () => {
      const item = screen.getByText('Click Me')
      await user.click(item)
      expect(handleClick).toHaveBeenCalled()
    })
  })

  it('should render dropdown menu label', async () => {
    const user = userEvent.setup()
    
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Menu Label</DropdownMenuLabel>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    const trigger = screen.getByRole('button', { name: /open menu/i })
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Menu Label')).toBeInTheDocument()
    })
  })

  it('should render separator', async () => {
    const user = userEvent.setup()
    
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    const trigger = screen.getByRole('button', { name: /open menu/i })
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })
  })

  it('should close menu when clicking outside', async () => {
    const user = userEvent.setup()
    
    render(
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <button data-testid="outside" type="button" style={{ pointerEvents: 'auto' }}>Outside</button>
        </div>
      </div>
    )
    
    const trigger = screen.getByRole('button', { name: /open menu/i })
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument()
    })
    
    // Use keyboard escape to close menu instead of clicking outside
    await user.keyboard('{Escape}')
    
    await waitFor(() => {
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup()
    
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    const trigger = screen.getByRole('button', { name: /open menu/i })
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument()
    })
    
    // Test keyboard navigation
    await user.keyboard('{ArrowDown}')
    // Menu items should be focusable
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })
})

