import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.print for testing
Object.defineProperty(window, 'print', {
  value: vi.fn(),
  writable: true,
})
