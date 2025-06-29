import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
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

describe('Bulk Delete Functionality', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
    vi.clearAllMocks()
  })

  it('shows Delete Item button', () => {
    render(<App />)
    expect(screen.getByText('Delete Item')).toBeInTheDocument()
  })

  it('enters selection mode when Delete Item button is clicked', () => {
    render(<App />)

    const deleteButton = screen.getByText('Delete Item')
    fireEvent.click(deleteButton)

    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('0 items selected')).toBeInTheDocument()
    expect(screen.getByText('Select All')).toBeInTheDocument()
    expect(screen.getByText('Clear Selection')).toBeInTheDocument()
  })

  it('can select items in selection mode', () => {
    render(<App />)

    // Enter selection mode
    const deleteButton = screen.getByText('Delete Item')
    fireEvent.click(deleteButton)

    // Get all selection checkboxes (should be 7 for default items)
    const selectionCheckboxes = screen.getAllByRole('checkbox')
    expect(selectionCheckboxes).toHaveLength(7)

    // Select first item
    fireEvent.click(selectionCheckboxes[0])
    expect(screen.getByText('1 item selected')).toBeInTheDocument()

    // Select second item
    fireEvent.click(selectionCheckboxes[1])
    expect(screen.getByText('2 items selected')).toBeInTheDocument()
  })

  it('can select all items', () => {
    render(<App />)

    // Enter selection mode
    const deleteButton = screen.getByText('Delete Item')
    fireEvent.click(deleteButton)

    // Click Select All
    const selectAllButton = screen.getByText('Select All')
    fireEvent.click(selectAllButton)

    expect(screen.getByText('7 items selected')).toBeInTheDocument()
  })

  it('can clear selection', () => {
    render(<App />)

    // Enter selection mode
    const deleteButton = screen.getByText('Delete Item')
    fireEvent.click(deleteButton)

    // Select all items
    const selectAllButton = screen.getByText('Select All')
    fireEvent.click(selectAllButton)

    // Clear selection
    const clearButton = screen.getByText('Clear Selection')
    fireEvent.click(clearButton)

    expect(screen.getByText('0 items selected')).toBeInTheDocument()
  })

  it('can delete selected items', () => {
    render(<App />)

    // Enter selection mode
    const deleteButton = screen.getByText('Delete Item')
    fireEvent.click(deleteButton)

    // Select first two items
    const selectionCheckboxes = screen.getAllByRole('checkbox')
    fireEvent.click(selectionCheckboxes[0])
    fireEvent.click(selectionCheckboxes[1])

    // Delete selected items
    const deleteSelectedButton = screen.getByText('Delete Selected (2)')
    fireEvent.click(deleteSelectedButton)

    // Should exit selection mode and show remaining items
    expect(screen.getByText('Delete Item')).toBeInTheDocument()
    expect(screen.getByText(/Progress: 0\/5 items packed/)).toBeInTheDocument()
  })

  it('disables Edit Mode when in selection mode', () => {
    render(<App />)

    // Enter selection mode
    const deleteButton = screen.getByText('Delete Item')
    fireEvent.click(deleteButton)

    // Edit Mode button should be disabled
    const editButton = screen.getByText('Edit Mode')
    expect(editButton).toBeDisabled()
  })

  it('disables Reset button when in selection mode', () => {
    render(<App />)

    // Enter selection mode
    const deleteButton = screen.getByText('Delete Item')
    fireEvent.click(deleteButton)

    // Reset button should be disabled
    const resetButton = screen.getByText('Reset')
    expect(resetButton).toBeDisabled()
  })

  it('exits selection mode when Cancel is clicked', () => {
    render(<App />)

    // Enter selection mode
    const deleteButton = screen.getByText('Delete Item')
    fireEvent.click(deleteButton)

    // Click Cancel
    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)

    // Should be back to normal mode
    expect(screen.getByText('Delete Item')).toBeInTheDocument()
    expect(screen.queryByText('0 items selected')).not.toBeInTheDocument()
  })

  it('shows packed checkboxes in normal mode and selection checkboxes in selection mode', () => {
    render(<App />)

    // In normal mode, should show packed checkboxes
    const normalCheckboxes = screen.getAllByRole('checkbox')
    expect(normalCheckboxes).toHaveLength(7)

    // Enter selection mode
    const deleteButton = screen.getByText('Delete Item')
    fireEvent.click(deleteButton)

    // Should still have 7 checkboxes but they should be selection checkboxes
    const selectionCheckboxes = screen.getAllByRole('checkbox')
    expect(selectionCheckboxes).toHaveLength(7)

    // Exit selection mode
    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)

    // Should be back to packed checkboxes
    const backToNormalCheckboxes = screen.getAllByRole('checkbox')
    expect(backToNormalCheckboxes).toHaveLength(7)
  })
})
