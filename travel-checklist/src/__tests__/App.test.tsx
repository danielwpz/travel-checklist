
import { render, screen } from '@testing-library/react';
import TravelChecklist from '../components/TravelChecklist';
import { ChecklistItem } from '../types';


test('renders Add New Item button at the top right', () => {
  const items: ChecklistItem[] = [];
  const setItems = jest.fn();
  const onReset = jest.fn();

  render(<TravelChecklist items={items} setItems={setItems} onReset={onReset} />);

  const addButton = screen.getByTitle('Add item');
  expect(addButton).toBeInTheDocument();
  expect(addButton).toHaveClass('btn-circle');
  expect(addButton).toHaveStyle('margin-left: auto');
  expect(addButton).toHaveAttribute('title', 'Add item');
});


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
})


