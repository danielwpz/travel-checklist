

import React, { useState } from 'react'
import { type TodoList, type ChecklistItem } from '../types'

interface TodoListViewProps {
  list: TodoList
  onBack: () => void
  onUpdateList: (list: TodoList) => void
}

const TodoListView: React.FC<TodoListViewProps> = ({
  list,
  onBack,
  onUpdateList
}) => {
  const [newItemText, setNewItemText] = useState('')
  const [showCompleted, setShowCompleted] = useState(false)

  const activeItems = list.items.filter(item => !item.checked)
  const completedItems = list.items.filter(item => item.checked)

  const toggleItem = (id: string) => {
    const updatedItems = list.items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    )
    onUpdateList({ ...list, items: updatedItems })
  }

  const deleteItem = (id: string) => {
    const updatedItems = list.items.filter(item => item.id !== id)
    onUpdateList({ ...list, items: updatedItems })
  }

  const addItem = () => {
    const trimmedText = newItemText.trim()
    if (!trimmedText) return

    // Check for duplicates
    if (list.items.some(item => item.text.toLowerCase() === trimmedText.toLowerCase())) {
      return
    }

    const newItem: ChecklistItem = {
      id: `${list.id}-${Date.now()}`,
      text: trimmedText,
      checked: false,
      isDefault: false
    }

    const updatedItems = [...list.items, newItem]
    onUpdateList({ ...list, items: updatedItems })
    setNewItemText('')
  }

  const deleteAllCompleted = () => {
    const updatedItems = list.items.filter(item => !item.checked)
    onUpdateList({ ...list, items: updatedItems })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }

  return (
    <>
      {/* Navigation Header */}
      <div className="nav-header">
        <button className="nav-back-btn" onClick={onBack}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h1 className="nav-title">My lists</h1>
      </div>

      {/* List Header */}
      <div className="container-fluid px-3 py-3">
        <div className="card list-card">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div
                className="btn-circle me-3"
                style={{ backgroundColor: list.color }}
              >
                <i className={list.icon}></i>
              </div>
              <div>
                <h6 className="mb-0 text-white">{list.name}</h6>
                <small className="text-muted-custom">
                  {activeItems.length} items
                </small>
              </div>
            </div>
            <div className="d-flex align-items-center">
              {activeItems.length > 0 && (
                <span className="badge-count me-2">
                  {activeItems.length}
                </span>
              )}
              <span className="text-muted-custom fs-5">
                {activeItems.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Items */}
      <div className="container-fluid px-3">
        <div className="row g-2">
          {activeItems.map((item) => (
            <div key={item.id} className="col-12">
              <div className="card list-item-card">
                <div className="card-body d-flex align-items-center py-3">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="custom-checkbox me-3"
                  />
                  <span className="flex-grow-1 text-white">{item.text}</span>
                  {!item.isDefault && (
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="btn btn-sm text-muted-custom"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add Item Input */}
          <div className="col-12">
            <div className="card list-item-card">
              <div className="card-body d-flex align-items-center py-3">
                <div className="btn-circle me-3">
                  <i className="fas fa-plus"></i>
                </div>
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

        {/* Completed Section */}
        {completedItems.length > 0 && (
          <div className="mt-4">
            <div className="card list-card">
              <div
                className="card-body d-flex align-items-center justify-content-between cursor-pointer"
                onClick={() => setShowCompleted(!showCompleted)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setShowCompleted(!showCompleted)
                  }
                }}
              >
                <div className="d-flex align-items-center">
                  <span className="text-white fw-medium me-2">Done</span>
                  <i className={`fas fa-chevron-${showCompleted ? 'up' : 'down'} text-muted-custom`}></i>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteAllCompleted()
                  }}
                  className="btn btn-sm text-muted-custom"
                >
                  Delete all
                </button>
              </div>

              {showCompleted && (
                <div className="card-body pt-0">
                  <div className="row g-2">
                    {completedItems.map((item) => (
                      <div key={item.id} className="col-12">
                        <div className="d-flex align-items-center py-2">
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="custom-checkbox checked me-3"
                          />
                          <span className="flex-grow-1 text-completed">{item.text}</span>
                          {!item.isDefault && (
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="btn btn-sm text-muted-custom"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {list.items.length === 0 && (
          <div className="text-center py-5">
            <div className="btn-circle mx-auto mb-3" style={{ width: '4rem', height: '4rem' }}>
              <i className="fas fa-plus fs-3"></i>
            </div>
            <h5 className="text-white mb-2">No items in your list</h5>
            <p className="text-muted-custom">Add some items above to get started!</p>
          </div>
        )}
      </div>
    </>
  )
}

export default TodoListView


