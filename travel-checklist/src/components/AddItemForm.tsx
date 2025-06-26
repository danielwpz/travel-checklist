


import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 space-y-2">
          <Input
            type="text"
            value={newItemText}
            onChange={handleInputChange}
            placeholder="Add a new travel item..."
            className={`${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          />
          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}
        </div>
        <Button type="submit" className="px-6">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </form>
    </div>
  )
}

export default AddItemForm



