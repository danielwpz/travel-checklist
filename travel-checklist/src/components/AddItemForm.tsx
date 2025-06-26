


import { useState } from 'react'

interface AddItemFormProps {
  onAddItem: (text: string) => boolean
}

const AddItemForm = ({ onAddItem }: AddItemFormProps) => {
  const [newItemText, setNewItemText] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedText = newItemText.trim()

    if (!trimmedText) {
      setError('Please enter an item name')
      return
    }

    const success = onAddItem(trimmedText)

    if (success) {
      setNewItemText('')
      setError('')
    } else {
      setError('This item already exists in your checklist')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemText(e.target.value)
    if (error) {
      setError('') // Clear error when user starts typing
    }
  }

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={newItemText}
            onChange={handleInputChange}
            placeholder="Add a new item..."
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {error && (
            <p className="text-red-600 text-sm mt-1">{error}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default AddItemForm



