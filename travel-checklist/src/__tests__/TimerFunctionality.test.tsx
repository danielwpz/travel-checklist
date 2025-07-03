

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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

describe('Timer Functionality', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
    vi.clearAllMocks()
  })

  it('shows Set Timer button when adding new items', () => {
    render(<App />)

    const setTimerButton = screen.getByText('Set Timer')
    expect(setTimerButton).toBeInTheDocument()
  })

  it('can open timer form and set a countdown timer', async () => {
    render(<App />)

    // Click Set Timer button
    const setTimerButton = screen.getByText('Set Timer')
    fireEvent.click(setTimerButton)

    // Check if timer form is displayed
    expect(screen.getByText('Timer Type')).toBeInTheDocument()
    expect(screen.getByText('Countdown')).toBeInTheDocument()
    expect(screen.getByText('Deadline')).toBeInTheDocument()

    // Fill in timer details
    const descriptionInput = screen.getByLabelText('Description')
    fireEvent.change(descriptionInput, { target: { value: 'before departure' } })

    // Set timer
    const setTimerFormButton = screen.getByRole('button', { name: 'Set Timer' })
    fireEvent.click(setTimerFormButton)

    // Check if button changes to Edit Timer
    await waitFor(() => {
      expect(screen.getByText('Edit Timer')).toBeInTheDocument()
    })
  })

  it('can add item with timer and display timer information', async () => {
    render(<App />)

    // Add item text
    const input = screen.getByPlaceholderText('Add a new item...')
    fireEvent.change(input, { target: { value: 'Pack medicine' } })

    // Set timer
    const setTimerButton = screen.getByText('Set Timer')
    fireEvent.click(setTimerButton)

    const descriptionInput = screen.getByLabelText('Description')
    fireEvent.change(descriptionInput, { target: { value: 'before departure' } })

    const setTimerFormButton = screen.getByRole('button', { name: 'Set Timer' })
    fireEvent.click(setTimerFormButton)

    // Add the item
    const addButton = screen.getByTitle('Add item')
    fireEvent.click(addButton)

    // Check if item is added with timer
    await waitFor(() => {
      expect(screen.getByText('Pack medicine')).toBeInTheDocument()
      expect(screen.getByText('(before departure)')).toBeInTheDocument()
    })
  })

  it('can switch between countdown and deadline timer types', () => {
    render(<App />)

    // Open timer form
    const setTimerButton = screen.getByText('Set Timer')
    fireEvent.click(setTimerButton)

    // Check countdown is selected by default
    const countdownRadio = screen.getByLabelText('Countdown')
    const deadlineRadio = screen.getByLabelText('Deadline')

    expect(countdownRadio).toBeChecked()
    expect(deadlineRadio).not.toBeChecked()

    // Switch to deadline
    fireEvent.click(deadlineRadio)

    expect(deadlineRadio).toBeChecked()
    expect(countdownRadio).not.toBeChecked()

    // Check if deadline input appears
    expect(screen.getByLabelText('Deadline date and time')).toBeInTheDocument()
  })

  it('validates timer form - requires description', () => {
    render(<App />)

    // Open timer form
    const setTimerButton = screen.getByText('Set Timer')
    fireEvent.click(setTimerButton)

    // Try to set timer without description
    const setTimerFormButton = screen.getByRole('button', { name: 'Set Timer' })
    expect(setTimerFormButton).toBeDisabled()

    // Add description
    const descriptionInput = screen.getByLabelText('Description')
    fireEvent.change(descriptionInput, { target: { value: 'test description' } })

    // Button should now be enabled
    expect(setTimerFormButton).not.toBeDisabled()
  })

  it('can cancel timer form', () => {
    render(<App />)

    // Open timer form
    const setTimerButton = screen.getByText('Set Timer')
    fireEvent.click(setTimerButton)

    // Check form is open
    expect(screen.getByText('Timer Type')).toBeInTheDocument()

    // Cancel form
    const cancelButton = screen.getByRole('button', { name: '' }) // X button
    fireEvent.click(cancelButton)

    // Form should be closed
    expect(screen.queryByText('Timer Type')).not.toBeInTheDocument()
    expect(screen.getByText('Set Timer')).toBeInTheDocument()
  })

  it('displays timer countdown correctly', async () => {
    render(<App />)

    // Add item with timer
    const input = screen.getByPlaceholderText('Add a new item...')
    fireEvent.change(input, { target: { value: 'Test item' } })

    const setTimerButton = screen.getByText('Set Timer')
    fireEvent.click(setTimerButton)

    // Set a short countdown (1 minute)
    const minutesInput = screen.getByLabelText('Minutes from now')
    fireEvent.change(minutesInput, { target: { value: '1' } })

    const descriptionInput = screen.getByLabelText('Description')
    fireEvent.change(descriptionInput, { target: { value: 'test timer' } })

    const setTimerFormButton = screen.getByRole('button', { name: 'Set Timer' })
    fireEvent.click(setTimerFormButton)

    // Add the item
    const addButton = screen.getByTitle('Add item')
    fireEvent.click(addButton)

    // Check if timer display shows
    await waitFor(() => {
      expect(screen.getByText('Test item')).toBeInTheDocument()
      expect(screen.getByText('(test timer)')).toBeInTheDocument()
      // Should show some time remaining (could be 0m or 1m depending on timing)
      const timerElements = screen.getAllByText(/\d+m/)
      expect(timerElements.length).toBeGreaterThan(0)
    })
  })

  it('persists timer data in localStorage', async () => {
    render(<App />)

    // Add item with timer
    const input = screen.getByPlaceholderText('Add a new item...')
    fireEvent.change(input, { target: { value: 'Persistent item' } })

    const setTimerButton = screen.getByText('Set Timer')
    fireEvent.click(setTimerButton)

    const descriptionInput = screen.getByLabelText('Description')
    fireEvent.change(descriptionInput, { target: { value: 'persistent timer' } })

    const setTimerFormButton = screen.getByRole('button', { name: 'Set Timer' })
    fireEvent.click(setTimerFormButton)

    const addButton = screen.getByTitle('Add item')
    fireEvent.click(addButton)

    // Check if localStorage.setItem was called with timer data
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled()
      const lastCall = localStorageMock.setItem.mock.calls[localStorageMock.setItem.mock.calls.length - 1]
      const savedData = JSON.parse(lastCall[1])

      // Find the item with timer
      const itemWithTimer = savedData.find((item: any) => item.text === 'Persistent item')
      expect(itemWithTimer).toBeDefined()
      expect(itemWithTimer.timer).toBeDefined()
      expect(itemWithTimer.timer.label).toBe('persistent timer')
    })
  })
})


