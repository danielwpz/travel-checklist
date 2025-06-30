
import { useState } from 'react'
import { type ChecklistItem } from '../types'
import ChecklistItemComponent from './ChecklistItem'
import AddItemForm from './AddItemForm'
import { Edit3, RotateCcw, CheckCircle2, Printer } from 'lucide-react'

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

  const [showResetDialog, setShowResetDialog] = useState(false)

  const handleReset = () => {
    localStorage.removeItem('travel-checklist-items')
    onReset()
    setShowResetDialog(false)
  }

  const handlePrint = () => {
    window.print()
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
    <div className="card shadow-lg border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
      <div className="card-header bg-transparent border-bottom-0 pb-2">
        <div className="row align-items-center g-3">
          <div className="col-12 col-md-8">
            <h2 className="card-title d-flex align-items-center gap-2 mb-2 h4">
              <CheckCircle2 className="text-primary" size={24} />
              Your Travel Checklist
            </h2>
            <div className="d-flex align-items-center gap-3 small text-muted">
              <span>Progress: {checkedCount}/{totalCount} items packed</span>
              {totalCount > 0 && (
                <span className="text-primary fw-medium">
                  {Math.round((checkedCount / totalCount) * 100)}% complete
                </span>
              )}
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="d-flex gap-2 flex-wrap">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`btn btn-sm flex-fill ${editMode ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                <Edit3 size={16} className="me-2" />
                {editMode ? 'Exit Edit' : 'Edit Mode'}
              </button>
              <button
                onClick={handlePrint}
                className="btn btn-success btn-sm flex-fill"
              >
                <Printer size={16} className="me-2" />
                Print
              </button>
              <button
                onClick={() => setShowResetDialog(true)}
                className="btn btn-danger btn-sm flex-fill"
              >
                <RotateCcw size={16} className="me-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="progress" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%` }}
              aria-valuenow={totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      </div>

      <div className="card-body">
        {/* Add item form */}
        <div className="mb-4">
          <AddItemForm onAddItem={addItem} />
        </div>

        {/* Checklist items */}
        <div className="d-flex flex-column gap-3">
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
          <div className="text-center text-muted py-5">
            <CheckCircle2 size={48} className="mx-auto mb-3 opacity-50" />
            <h5 className="mb-2">No items in your checklist</h5>
            <p className="small">Add some items above to get started on your travel preparations!</p>
          </div>
        )}
      </div>

      {/* Bootstrap Modal for Reset Confirmation */}
      {showResetDialog && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reset to Default Checklist</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowResetDialog(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to reset to the default checklist? This will remove all custom items and uncheck all items. This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
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
                  Reset Checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TravelChecklist

