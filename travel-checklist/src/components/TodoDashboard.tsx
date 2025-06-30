
import React, { useState } from 'react'
import { type TodoList } from '../types'

interface TodoDashboardProps {
  lists: TodoList[]
  onOpenList: (listId: string) => void
  onAddList: (name: string, icon: string, color: string) => void
  onDeleteList: (listId: string) => void
  onReset: () => void
}

const TodoDashboard: React.FC<TodoDashboardProps> = ({
  lists,
  onOpenList,
  onAddList,
  onDeleteList,
  onReset
}) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [showResetDialog, setShowResetDialog] = useState(false)

  const handleAddList = () => {
    const trimmedName = newListName.trim()
    if (!trimmedName) return

    // Default icon and color for new lists
    onAddList(trimmedName, 'fas fa-list', '#007bff')
    setNewListName('')
    setShowAddForm(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddList()
    } else if (e.key === 'Escape') {
      setShowAddForm(false)
      setNewListName('')
    }
  }

  const getActiveItemsCount = (list: TodoList) => {
    return list.items.filter(item => !item.checked).length
  }

  const getTotalItemsCount = (list: TodoList) => {
    return list.items.length
  }

  return (
    <>
      {/* Header */}
      <div className="app-header">
        <h1 className="app-title">ToDo</h1>
        <div className="d-flex align-items-center justify-content-center">
          <span className="app-subtitle me-2">My lists ({lists.length})</span>
          <button
            onClick={() => setShowResetDialog(true)}
            className="btn btn-sm btn-outline-secondary"
            title="Reset to default lists"
          >
            <i className="fas fa-undo"></i>
          </button>
        </div>
      </div>

      {/* Lists Container */}
      <div className="container-fluid px-3">
        <div className="row g-3">
          {lists.map((list) => (
            <div key={list.id} className="col-12">
              <div
                className="card list-card h-100 cursor-pointer"
                onClick={() => onOpenList(list.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onOpenList(list.id)
                  }
                }}
              >
                <div className="card-body d-flex align-items-center">
                  <div className="d-flex align-items-center flex-grow-1">
                    <div
                      className="btn-circle me-3"
                      style={{ backgroundColor: list.color }}
                    >
                      <i className={list.icon}></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="card-title mb-0 text-white">{list.name}</h6>
                      <small className="text-muted-custom">
                        {getActiveItemsCount(list)} of {getTotalItemsCount(list)} items
                      </small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {getActiveItemsCount(list) > 0 && (
                      <span className="badge-count me-2">
                        {getActiveItemsCount(list)}
                      </span>
                    )}
                    <span className="text-muted-custom fs-5">
                      {getTotalItemsCount(list)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add New List Card */}
          <div className="col-12">
            {showAddForm ? (
              <div className="card list-item-card">
                <div className="card-body d-flex align-items-center">
                  <div className="btn-circle me-3">
                    <i className="fas fa-plus"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter list name..."
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => {
                      if (!newListName.trim()) {
                        setShowAddForm(false)
                      }
                    }}
                    autoFocus
                  />
                </div>
              </div>
            ) : (
              <div
                className="card list-card cursor-pointer"
                onClick={() => setShowAddForm(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setShowAddForm(true)
                  }
                }}
              >
                <div className="card-body d-flex align-items-center">
                  <div className="btn-circle me-3">
                    <i className="fas fa-plus"></i>
                  </div>
                  <span className="text-muted-custom">Add a list</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {lists.length === 0 && (
          <div className="text-center py-5">
            <div className="btn-circle mx-auto mb-3" style={{ width: '4rem', height: '4rem' }}>
              <i className="fas fa-list fs-3"></i>
            </div>
            <h5 className="text-white mb-2">No lists yet</h5>
            <p className="text-muted-custom">Create your first list to get started!</p>
          </div>
        )}
      </div>

      {/* Reset Confirmation Modal */}
      {showResetDialog && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-0">
              <div className="modal-header border-secondary">
                <h5 className="modal-title text-white">Reset to Default Lists</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowResetDialog(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-muted-custom mb-0">
                  Are you sure you want to reset to the default lists? This will remove all custom lists and reset all items. This action cannot be undone.
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
                  onClick={() => {
                    onReset()
                    setShowResetDialog(false)
                  }}
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

export default TodoDashboard

