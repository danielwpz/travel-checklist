
import { useState } from 'react'
import { type ChecklistItem } from '../types'
import ChecklistItemComponent from './ChecklistItem'
import AddItemForm from './AddItemForm'

interface TravelChecklistProps {
  items: ChecklistItem[]
  setItems: (items: ChecklistItem[]) => void
  onReset: () => void
}

const TravelChecklist = ({ items, setItems, onReset }: TravelChecklistProps) => {
  const [editMode, setEditMode] = useState(false)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItemText = (id: string, newText: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, text: newText } : item
    ))
  }

  const addItem = (text: string) => {
    // Check for duplicates
    if (items.some(item => item.text.toLowerCase() === text.toLowerCase())) {
      return false
    }

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      text,
      checked: false,
      isDefault: false
    }
    setItems([...items, newItem])
    return true
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to the default checklist? This will remove all custom items and uncheck all items.')) {
      localStorage.removeItem('travel-checklist-items')
      onReset()
    }
  }

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()

    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null)
      return
    }

    const draggedIndex = items.findIndex(item => item.id === draggedItem)
    const targetIndex = items.findIndex(item => item.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItem(null)
      return
    }

    const newItems = [...items]
    const [draggedItemObj] = newItems.splice(draggedIndex, 1)
    newItems.splice(targetIndex, 0, draggedItemObj)

    setItems(newItems)
    setDraggedItem(null)
  }

  const checkedCount = items.filter(item => item.checked).length
  const totalCount = items.length

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header with progress and controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="text-sm text-gray-600">
          Progress: {checkedCount}/{totalCount} items packed
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              editMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {editMode ? 'Exit Edit' : 'Edit Mode'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Reset to Default
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%` }}
        ></div>
      </div>

      {/* Add item form */}
      <AddItemForm onAddItem={addItem} />

      {/* Checklist items */}
      <div className="space-y-2">
        {items.map((item) => (
          <ChecklistItemComponent
            key={item.id}
            item={item}
            editMode={editMode}
            onToggle={toggleItem}
            onDelete={deleteItem}
            onUpdateText={updateItemText}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            isDragging={draggedItem === item.id}
          />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No items in your checklist. Add some items to get started!
        </div>
      )}
    </div>
  )
}

export default TravelChecklist

