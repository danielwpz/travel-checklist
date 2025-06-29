
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'

describe('Travel Checklist App', () => {
  beforeEach(() => {
    // Reset localStorage mock to return null for fresh state
    vi.mocked(localStorage.getItem).mockReturnValue(null)
  })

  it('renders the travel checklist title', () => {
    render(<App />)
    expect(screen.getByText('Travel Checklist')).toBeInTheDocument()
  })

  it('displays default items on first load', () => {
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

    const input = screen.getByPlaceholderText('Add a new travel item...')
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

    const input = screen.getByPlaceholderText('Add a new travel item...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Passport' } })
    fireEvent.click(addButton)

    expect(screen.getByText('This item already exists in your checklist')).toBeInTheDocument()
  })

  it('prevents adding empty items', () => {
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new travel item...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Please enter an item name')).toBeInTheDocument()
  })

  it('displays icons for default items', () => {
    render(<App />)

    // Check that default items have their expected icons
    expect(screen.getByText('📘')).toBeInTheDocument() // Passport
    expect(screen.getByText('🪥')).toBeInTheDocument() // Toothbrush
    expect(screen.getByText('🔌')).toBeInTheDocument() // Phone charger
    expect(screen.getByText('👕')).toBeInTheDocument() // Clothes
    expect(screen.getByText('🕶️')).toBeInTheDocument() // Sunglasses
    expect(screen.getByText('🍿')).toBeInTheDocument() // Snacks
  })

  it('assigns appropriate icons to new items', () => {
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new travel item...')
    const addButton = screen.getByText('Add')

    // Add a camera item
    fireEvent.change(input, { target: { value: 'Camera' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Camera')).toBeInTheDocument()
    expect(screen.getByText('📷')).toBeInTheDocument() // Camera icon

    // Add a laptop item
    fireEvent.change(input, { target: { value: 'Laptop' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Laptop')).toBeInTheDocument()
    expect(screen.getByText('💻')).toBeInTheDocument() // Laptop icon
  })

  it('assigns default icon to unrecognized items', () => {
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new travel item...')
    const addButton = screen.getByText('Add')

    // Add an unrecognized item
    fireEvent.change(input, { target: { value: 'Random unknown item' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Random unknown item')).toBeInTheDocument()
    expect(screen.getByText('📦')).toBeInTheDocument() // Default icon
  })
})

