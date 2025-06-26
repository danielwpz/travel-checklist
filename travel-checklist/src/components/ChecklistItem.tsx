

import { useState } from 'react'
import { type ChecklistItem } from '../types'

interface ChecklistItemProps {
  item: ChecklistItem
  editMode: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdateText: (id: string, text: string) => void
  onDragStart: (e: React.DragEvent, id: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, id: string) => void
  isDragging: boolean
}

const ChecklistItemComponent = ({
  item,
  editMode,
  onToggle,
  onDelete,
  onUpdateText,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging
}: ChecklistItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(item.text)

  const handleEditSubmit = () => {
    const trimmedText = editText.trim()
    if (trimmedText && trimmedText !== item.text) {
      onUpdateText(item.id, trimmedText)
    } else {
      setEditText(item.text) // Reset if empty or unchanged
    }
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setEditText(item.text)
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit()
    } else if (e.key === 'Escape') {
      handleEditCancel()
    }
  }

  return (
    <div
      className={`flex items-center gap-3 p-3 border rounded-lg transition-all duration-200 ${
        item.checked
          ? 'bg-green-50 border-green-200'
          : 'bg-white border-gray-200 hover:border-gray-300'
      } ${isDragging ? 'opacity-50' : ''} ${editMode ? 'cursor-move' : ''}`}
      draggable={editMode}
      onDragStart={(e) => editMode && onDragStart(e, item.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, item.id)}
    >
      {/* Drag handle (only visible in edit mode) */}
      {editMode && (
        <div className="text-gray-400 cursor-move">
          ⋮⋮
        </div>
      )}

      {/* Checkbox */}
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggle(item.id)}
        className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
      />

      {/* Item text */}
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyPress}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span
            className={`${
              item.checked
                ? 'line-through text-gray-500'
                : 'text-gray-800'
            } ${editMode ? 'cursor-pointer' : ''}`}
            onClick={() => editMode && setIsEditing(true)}
          >
            {item.text}
          </span>
        )}
      </div>

      {/* Edit/Delete buttons (only visible in edit mode) */}
      {editMode && !isEditing && (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 text-sm"
            title="Edit item"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-600 hover:text-red-800 text-sm"
            title="Delete item"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  )
}

export default ChecklistItemComponent


