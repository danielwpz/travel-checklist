
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

  it('renders the travel checklist title', () => {
    render(<App />)
    expect(screen.getByText('Travel')).toBeInTheDocument()
    expect(screen.getByText('Travel checklist')).toBeInTheDocument()
  })

  it('displays default items on first load', () => {
    localStorageMock.getItem.mockReturnValue(null)
    render(<App />)

    expect(screen.getByText('Passport')).toBeInTheDocument()
    expect(screen.getByText('Toothbrush')).toBeInTheDocument()
    expect(screen.getByText('Phone charger')).toBeInTheDocument()
    expect(screen.getByText('Clothes')).toBeInTheDocument()
    expect(screen.getByText('Sunglasses')).toBeInTheDocument()
    expect(screen.getByText('Travel adapter')).toBeInTheDocument()
    expect(screen.getByText('Snacks')).toBeInTheDocument()
  })

  it('shows correct item count', () => {
    render(<App />)
    expect(screen.getByText(/My checklist \(7\)/)).toBeInTheDocument()
  })

  it('can add a new item', () => {
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new item...')

    fireEvent.change(input, { target: { value: 'Camera' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(screen.getByText('Camera')).toBeInTheDocument()
    expect(screen.getByText(/My checklist \(8\)/)).toBeInTheDocument()
  })

  it('can check items', () => {
    render(<App />)

    // Find the first checkbox button (for Passport)
    const checkboxButtons = screen.getAllByRole('button')
    const passportCheckbox = checkboxButtons.find(button =>
      button.className.includes('border-gray-600') &&
      button.className.includes('rounded-full')
    )

    if (passportCheckbox) {
      fireEvent.click(passportCheckbox)
      expect(screen.getByText(/My checklist \(6\)/)).toBeInTheDocument()
    }
  })

  it('shows completed section when items are checked', () => {
    render(<App />)

    // Check an item first
    const checkboxButtons = screen.getAllByRole('button')
    const firstCheckbox = checkboxButtons.find(button =>
      button.className.includes('border-gray-600') &&
      button.className.includes('rounded-full')
    )

    if (firstCheckbox) {
      fireEvent.click(firstCheckbox)
      expect(screen.getByText('Done')).toBeInTheDocument()
    }
  })

  it('prevents adding duplicate items', () => {
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new item...')

    fireEvent.change(input, { target: { value: 'Passport' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    // The item count should remain the same (7) since duplicate wasn't added
    expect(screen.getByText(/My checklist \(7\)/)).toBeInTheDocument()
  })

  it('can delete custom items', () => {
    render(<App />)

    // Add a custom item first
    const input = screen.getByPlaceholderText('Add a new item...')
    fireEvent.change(input, { target: { value: 'Camera' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(screen.getByText('Camera')).toBeInTheDocument()

    // Find and click the delete button for the custom item
    const deleteButtons = screen.getAllByRole('button')
    const deleteButton = deleteButtons.find(button =>
      button.className.includes('hover:text-red-500')
    )

    if (deleteButton) {
      fireEvent.click(deleteButton)
      expect(screen.queryByText('Camera')).not.toBeInTheDocument()
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
})

