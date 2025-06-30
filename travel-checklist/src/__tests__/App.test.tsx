
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

// Mock window.confirm
Object.defineProperty(window, 'confirm', {
  value: vi.fn(() => true)
})

// Mock window.print
const mockPrint = vi.fn()
Object.defineProperty(window, 'print', {
  value: mockPrint,
  writable: true,
})

describe('Travel Checklist App', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
    mockPrint.mockClear()
    vi.clearAllMocks()
  })

  it('renders the travel checklist title', () => {
    render(<App />)
    expect(screen.getByText('Travel Checklist')).toBeInTheDocument()
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

  it('shows correct progress count', () => {
    render(<App />)
    expect(screen.getByText(/Progress: 0\/7 items packed/)).toBeInTheDocument()
  })

  it('can add a new item', () => {
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new item...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Camera' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Camera')).toBeInTheDocument()
    expect(screen.getByText(/Progress: 0\/8 items packed/)).toBeInTheDocument()
  })

  it('can check items', () => {
    render(<App />)

    const passportCheckbox = screen.getByRole('checkbox', { name: '' })
    fireEvent.click(passportCheckbox)

    expect(screen.getByText(/Progress: 1\/7 items packed/)).toBeInTheDocument()
  })

  it('toggles edit mode', () => {
    render(<App />)

    const editButton = screen.getByText('Edit Mode')
    fireEvent.click(editButton)

    expect(screen.getByText('Exit Edit')).toBeInTheDocument()
    expect(screen.getAllByText('✏️')).toHaveLength(7) // Edit buttons for each item
    expect(screen.getAllByText('🗑️')).toHaveLength(7) // Delete buttons for each item
  })

  it('prevents adding duplicate items', () => {
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new item...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Passport' } })
    fireEvent.click(addButton)

    expect(screen.getByText('This item already exists in your checklist')).toBeInTheDocument()
  })

  it('prevents adding empty items', () => {
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new item...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Please enter an item name')).toBeInTheDocument()
  })

  it('renders print button and calls window.print when clicked', () => {
    render(<App />)

    const printButton = screen.getByText('Print')
    expect(printButton).toBeInTheDocument()

    fireEvent.click(printButton)
    expect(mockPrint).toHaveBeenCalledTimes(1)
  })

  it('print button has correct styling and icon', () => {
    render(<App />)

    const printButton = screen.getByText('Print')
    expect(printButton).toHaveClass('btn', 'btn-success', 'btn-sm', 'flex-fill')
  })
})

