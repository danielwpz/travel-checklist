

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from '../App'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('ToDo App', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
    vi.clearAllMocks()
  })

  it('renders the todo app title', () => {
    render(<App />)
    expect(screen.getByText('ToDo')).toBeInTheDocument()
    expect(screen.getByText(/My lists \(5\)/)).toBeInTheDocument()
  })

  it('displays default lists on first load', () => {
    localStorageMock.getItem.mockReturnValue(null)
    render(<App />)

    expect(screen.getByText('Shopping list')).toBeInTheDocument()
    expect(screen.getByText('Self-growth')).toBeInTheDocument()
    expect(screen.getByText('Travel bucket list')).toBeInTheDocument()
    expect(screen.getByText('Work and assignments')).toBeInTheDocument()
    expect(screen.getByText('Fitness')).toBeInTheDocument()
  })

  it('shows correct list count', () => {
    render(<App />)
    expect(screen.getByText(/My lists \(5\)/)).toBeInTheDocument()
  })

  it('can navigate to a list', () => {
    render(<App />)

    const shoppingListButton = screen.getByText('Shopping list').closest('button')
    if (shoppingListButton) {
      fireEvent.click(shoppingListButton)
      expect(screen.getByText('My lists')).toBeInTheDocument()
      expect(screen.getByText('Milk')).toBeInTheDocument()
      expect(screen.getByText('Cereals')).toBeInTheDocument()
    }
  })

  it('can add a new item to a list', () => {
    render(<App />)

    // Navigate to shopping list
    const shoppingListButton = screen.getByText('Shopping list').closest('button')
    if (shoppingListButton) {
      fireEvent.click(shoppingListButton)

      const input = screen.getByPlaceholderText('Add a new item...')
      fireEvent.change(input, { target: { value: 'Bread' } })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

      expect(screen.getByText('Bread')).toBeInTheDocument()
    }
  })

  it('can check items in a list', () => {
    render(<App />)

    // Navigate to shopping list
    const shoppingListButton = screen.getByText('Shopping list').closest('button')
    if (shoppingListButton) {
      fireEvent.click(shoppingListButton)

      // Find the first checkbox button
      const checkboxButtons = screen.getAllByRole('button')
      const firstCheckbox = checkboxButtons.find(button =>
        button.className.includes('custom-checkbox')
      )

      if (firstCheckbox) {
        fireEvent.click(firstCheckbox)
        expect(screen.getByText('Done')).toBeInTheDocument()
      }
    }
  })

  it('shows reset confirmation dialog', () => {
    render(<App />)

    // Find and click the reset button
    const resetButton = screen.getByTitle('Reset to default lists')
    fireEvent.click(resetButton)

    expect(screen.getByText('Reset to Default Lists')).toBeInTheDocument()
    expect(screen.getByText(/Are you sure you want to reset/)).toBeInTheDocument()
  })

  it('can navigate back from list view', () => {
    render(<App />)

    // Navigate to shopping list
    const shoppingListButton = screen.getByText('Shopping list').closest('button')
    if (shoppingListButton) {
      fireEvent.click(shoppingListButton)

      // Find and click the back button
      const backButton = screen.getAllByRole('button').find(button =>
        button.className.includes('nav-back-btn')
      )

      if (backButton) {
        fireEvent.click(backButton)
        expect(screen.getByText('ToDo')).toBeInTheDocument()
        expect(screen.getByText(/My lists \(5\)/)).toBeInTheDocument()
      }
    }
  })

  it('prevents adding duplicate items', () => {
    render(<App />)

    // Navigate to shopping list
    const shoppingListButton = screen.getByText('Shopping list').closest('button')
    if (shoppingListButton) {
      fireEvent.click(shoppingListButton)

      const input = screen.getByPlaceholderText('Add a new item...')
      fireEvent.change(input, { target: { value: 'Milk' } })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

      // Should still only have one "Milk" item
      const milkItems = screen.getAllByText('Milk')
      expect(milkItems).toHaveLength(1)
    }
  })
})


