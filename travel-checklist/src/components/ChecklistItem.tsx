

import { useState } from 'react'
import { type ChecklistItem } from '../types'

interface ChecklistItemProps {
  item: ChecklistItem
  editMode: boolean
  selectionMode: boolean
  isSelected: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdateText: (id: string, text: string) => void
  onToggleSelection: (id: string) => void
  onDragStart: (e: React.DragEvent, id: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, id: string) => void
  isDragging: boolean
}

const ChecklistItemComponent = ({
  item,
  editMode,
  selectionMode,
  isSelected,
  onToggle,
  onDelete,
  onUpdateText,
  onToggleSelection,
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
      className={`d-flex align-items-center gap-3 p-3 border rounded-3 ${
        item.checked
          ? 'bg-success bg-opacity-10 border-success border-opacity-25'
          : selectionMode && isSelected
          ? 'bg-warning bg-opacity-10 border-warning border-opacity-50'
          : 'bg-white border-secondary border-opacity-25'
      } ${isDragging ? 'opacity-50' : ''} ${editMode ? 'user-select-none' : ''}`}
      style={{
        transition: 'all 0.2s ease',
        cursor: editMode ? 'move' : selectionMode ? 'pointer' : 'default'
      }}
      draggable={editMode}
      onDragStart={(e) => editMode && onDragStart(e, item.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, item.id)}
      onClick={() => selectionMode && onToggleSelection(item.id)}
    >
      {/* Drag handle (only visible in edit mode) */}
      {editMode && (
        <div className="text-muted" style={{ cursor: 'move', fontSize: '1.2rem' }}>
          ⋮⋮
        </div>
      )}

      {/* Selection checkbox (only visible in selection mode) */}
      {selectionMode && (
        <div className="form-check">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation()
              onToggleSelection(item.id)
            }}
            className="form-check-input border-warning"
            style={{ transform: 'scale(1.2)' }}
          />
        </div>
      )}

      {/* Packed checkbox (only visible when not in selection mode) */}
      {!selectionMode && (
        <div className="form-check">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => onToggle(item.id)}
            className="form-check-input"
            style={{ transform: 'scale(1.2)' }}
          />
        </div>
      )}

      {/* Item text */}
      <div className="flex-grow-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyPress}
            className="form-control form-control-sm"
            autoFocus
          />
        ) : (
          <span
            className={`${
              item.checked
                ? 'text-decoration-line-through text-muted'
                : 'text-dark'
            } ${editMode || selectionMode ? 'user-select-none' : ''}`}
            style={{ cursor: editMode ? 'pointer' : 'default' }}
            onClick={(e) => {
              if (editMode) {
                e.stopPropagation()
                setIsEditing(true)
              }
            }}
          >
            {item.text}
          </span>
        )}
      </div>

      {/* Edit/Delete buttons (only visible in edit mode) */}
      {editMode && !isEditing && (
        <div className="d-flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsEditing(true)
            }}
            className="btn btn-sm btn-outline-primary"
            title="Edit item"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(item.id)
            }}
            className="btn btn-sm btn-outline-danger"
            title="Delete item"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  )
}

export default ChecklistItemComponent


