


import { useState } from 'react'
import { Plus } from 'lucide-react'

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
    <div className="mb-3">
      <form onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col">
            <input
              type="text"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              value={newItemText}
              onChange={handleInputChange}
              placeholder="Add a new travel item..."
            />
            {error && (
              <div className="invalid-feedback">{error}</div>
            )}
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              <Plus size={16} className="me-2" />
              Add Item
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddItemForm



