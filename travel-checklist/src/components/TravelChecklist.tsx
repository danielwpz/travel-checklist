
import { useState } from 'react'
import { type ChecklistItem } from '../types'
import { ensureItemHasEmoji, getEmojiForItem } from '../utils/emojiUtils'

interface TravelChecklistProps {
  items: ChecklistItem[]
  setItems: (items: ChecklistItem[]) => void
  onReset: () => void
}

const TravelChecklist = ({ items, setItems, onReset }: TravelChecklistProps) => {
  const [newItemText, setNewItemText] = useState('')
  const [showResetDialog, setShowResetDialog] = useState(false)

  // Sort items: unchecked items first, then checked items at the end
  const sortedItems = [...items].sort((a, b) => {
    if (a.checked === b.checked) return 0
    return a.checked ? 1 : -1
  })

  const activeItems = items.filter(item => !item.checked)

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const addItem = () => {
    const trimmedText = newItemText.trim()
    if (!trimmedText) return

    // Check for duplicates
    if (items.some(item => item.text.toLowerCase() === trimmedText.toLowerCase())) {
      return
    }

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      text: trimmedText,
      checked: false,
      isDefault: false,
      emoji: getEmojiForItem(trimmedText)
    }

    setItems([...items, newItem])
    setNewItemText('')
  }



  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }

  const handleReset = () => {
    localStorage.removeItem('travel-checklist-items')
    onReset()
    setShowResetDialog(false)
  }

  return (
    <>
      {/* Header */}
      <div className="app-header">
        <h1 className="app-title">Travel</h1>
        <div className="d-flex align-items-center justify-content-center">
          <span className="app-subtitle me-2">My checklist ({activeItems.length})</span>
          <button
            onClick={() => setShowResetDialog(true)}
            className="btn btn-sm btn-outline-secondary"
            title="Reset to default items"
          >
            <i className="fas fa-undo"></i>
          </button>
        </div>
      </div>

      {/* Travel Checklist Header Card */}
      <div className="container-fluid px-3">
        <div className="row g-3">
          <div className="col-12">
            <div className="card list-card">
              <div className="card-body d-flex align-items-center">
                <div className="d-flex align-items-center flex-grow-1">
                  <div className="btn-circle me-3" style={{ backgroundColor: '#007bff' }}>
                    <i className="fas fa-plane"></i>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="card-title mb-0 text-white">Travel checklist</h6>
                    <small className="text-muted-custom">
                      {activeItems.length} of {items.length} items
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Items (sorted: unchecked first, then checked) */}
          {sortedItems.map((item) => (
            <div key={item.id} className="col-12">
              <div className="card list-item-card">
                <div className="card-body d-flex align-items-center">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`custom-checkbox me-3 ${item.checked ? 'checked' : ''}`}
                  >
                  </button>
                  <span className={`flex-grow-1 ${item.checked ? 'text-completed' : 'text-white'}`}>
                    {ensureItemHasEmoji(item)} {item.text}
                  </span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="btn btn-sm btn-outline-danger ms-2"
                    title="Delete item"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Item Input */}
          <div className="col-12">
            <div className="card list-item-card">
              <div className="card-body d-flex align-items-center">
                <button
                  onClick={addItem}
                  className="btn-circle me-3"
                  title="Add item"
                >
                  <i className="fas fa-plus"></i>
                </button>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a new item..."
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-5">
            <div className="btn-circle mx-auto mb-3" style={{ width: '4rem', height: '4rem' }}>
              <i className="fas fa-plane fs-3"></i>
            </div>
            <h5 className="text-white mb-2">No items in your checklist</h5>
            <p className="text-muted-custom">Add some items above to get started on your travel preparations!</p>
          </div>
        )}
      </div>

      {/* Reset Confirmation Modal */}
      {showResetDialog && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-0">
              <div className="modal-header border-secondary">
                <h5 className="modal-title text-white">Reset to Default Checklist</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowResetDialog(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-muted-custom mb-0">
                  Are you sure you want to reset to the default checklist? This will remove all custom items and uncheck all items. This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer border-secondary">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowResetDialog(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TravelChecklist

