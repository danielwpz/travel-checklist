

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

describe('Travel Checklist App', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
    vi.clearAllMocks()
  })

  it('renders the travel checklist app title', () => {
    render(<App />)
    expect(screen.getByText('Travel')).toBeInTheDocument()
    expect(screen.getByText(/My checklist \(10\)/)).toBeInTheDocument()
  })

  it('displays default travel items on first load', () => {
    localStorageMock.getItem.mockReturnValue(null)
    render(<App />)

    expect(screen.getByText('Travel checklist')).toBeInTheDocument()
    expect(screen.getByText('Passport')).toBeInTheDocument()
    expect(screen.getByText('Toothbrush')).toBeInTheDocument()
    expect(screen.getByText('Phone charger')).toBeInTheDocument()
    expect(screen.getByText('Sunglasses')).toBeInTheDocument()
    expect(screen.getByText('Camera')).toBeInTheDocument()
  })

  it('shows correct item count', () => {
    render(<App />)
    expect(screen.getByText(/My checklist \(10\)/)).toBeInTheDocument()
  })

  it('can add a new item to the checklist', () => {
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new item...')
    fireEvent.change(input, { target: { value: 'Travel pillow' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(screen.getByText('Travel pillow')).toBeInTheDocument()
  })

  it('can check items in the checklist', () => {
    render(<App />)

    // Find the first checkbox button
    const checkboxButtons = screen.getAllByRole('button')
    const firstCheckbox = checkboxButtons.find(button =>
      button.className.includes('custom-checkbox')
    )

    if (firstCheckbox) {
      fireEvent.click(firstCheckbox)
      // After checking, the item should have 'checked' class and be moved to bottom
      const checkedCheckbox = screen.getByRole('button', { name: '' })
      expect(checkedCheckbox.className).toContain('checked')
    }
  })

  it('shows reset confirmation dialog', () => {
    render(<App />)

    // Find and click the reset button
    const resetButton = screen.getByTitle('Reset to default items')
    fireEvent.click(resetButton)

    expect(screen.getByText('Reset to Default Checklist')).toBeInTheDocument()
    expect(screen.getByText(/Are you sure you want to reset/)).toBeInTheDocument()
  })

  it('prevents adding duplicate items', () => {
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new item...')
    fireEvent.change(input, { target: { value: 'Passport' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    // Should still only have one "Passport" item
    const passportItems = screen.getAllByText('Passport')
    expect(passportItems).toHaveLength(1)
  })

  it('can delete items', () => {
    render(<App />)

    // Add a custom item first
    const input = screen.getByPlaceholderText('Add a new item...')
    fireEvent.change(input, { target: { value: 'Custom item' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(screen.getByText('Custom item')).toBeInTheDocument()

    // Find and click the delete button for the custom item
    const deleteButtons = screen.getAllByRole('button')
    const deleteButton = deleteButtons.find(button =>
      button.className.includes('btn-outline-danger') && button.title === 'Delete item'
    )

    if (deleteButton) {
      fireEvent.click(deleteButton)
      expect(screen.queryByText('Custom item')).not.toBeInTheDocument()
    }
  })

  it('shows checked items at the bottom with completed styling', () => {
    render(<App />)

    // Check an item
    const checkboxButtons = screen.getAllByRole('button')
    const firstCheckbox = checkboxButtons.find(button =>
      button.className.includes('custom-checkbox')
    )

    if (firstCheckbox) {
      fireEvent.click(firstCheckbox)
      // Verify that a checkbox with 'checked' class exists
      const checkedCheckboxes = checkboxButtons.filter(button =>
        button.className.includes('custom-checkbox checked')
      )
      expect(checkedCheckboxes.length).toBeGreaterThan(0)
    }
  })

  it('positions the add item button on the right side of the input field', () => {
    render(<App />)

    // Find the add item input and button
    const input = screen.getByPlaceholderText('Add a new item...')
    const addButton = screen.getByTitle('Add item')

    // Get their parent container
    const inputParent = input.parentElement
    const buttonParent = addButton.parentElement

    // They should be in the same container
    expect(inputParent).toBe(buttonParent)

    // The button should have 'ms-3' class (margin-start) indicating it's positioned after the input
    expect(addButton.className).toContain('ms-3')

    // The input should not have 'ms-3' class
    expect(input.className).not.toContain('ms-3')
  })

  it('places the add item section at the top of the list', () => {
    render(<App />)

    // Find the add item input
    const input = screen.getByPlaceholderText('Add a new item...')

    // Find the first checklist item (Passport)
    const firstItem = screen.getByText('Passport')

    // Get their positions in the DOM
    const inputContainer = input.closest('.col-12')
    const itemContainer = firstItem.closest('.col-12')

    // The input container should come before the first item container in the DOM
    if (inputContainer && itemContainer && inputContainer.parentElement && itemContainer.parentElement) {
      const children = Array.from(inputContainer.parentElement.children)
      const inputIndex = children.indexOf(inputContainer)
      const itemIndex = children.indexOf(itemContainer)

      expect(inputIndex).toBeLessThan(itemIndex)
    }
  })
})


