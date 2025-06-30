
import { useState } from 'react'
import { type ChecklistItem } from '../types'
import { Plus, Trash2, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'

interface TravelChecklistProps {
  items: ChecklistItem[]
  setItems: (items: ChecklistItem[]) => void
  onReset: () => void
}

const TravelChecklist = ({ items, setItems, onReset }: TravelChecklistProps) => {
  const [newItemText, setNewItemText] = useState('')
  const [showCompleted, setShowCompleted] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)

  const activeItems = items.filter(item => !item.checked)
  const completedItems = items.filter(item => item.checked)

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
      isDefault: false
    }

    setItems([...items, newItem])
    setNewItemText('')
  }

  const deleteAllCompleted = () => {
    setItems(items.filter(item => !item.checked))
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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="text-center pt-8 pb-6">
          <h1 className="text-4xl font-bold mb-2">Travel</h1>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-400">My checklist ({activeItems.length})</span>
            <button
              onClick={() => setShowResetDialog(true)}
              className="p-1 text-gray-500 hover:text-red-500 transition-colors"
              title="Reset to default items"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Travel Checklist */}
        <div className="px-4 mb-6">
          <div className="bg-gray-800 rounded-2xl p-4 mb-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                </div>
                <span className="text-white font-medium">Travel checklist</span>
              </div>
              <div className="flex items-center space-x-2">
                {activeItems.length > 0 && (
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    {activeItems.length}
                  </div>
                )}
                <span className="text-gray-400 text-lg">{activeItems.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Items */}
        <div className="px-4 space-y-3 mb-6">
          {activeItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-2xl p-4 flex items-center space-x-3"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-6 h-6 border-2 border-gray-600 rounded-full flex items-center justify-center hover:border-green-500 transition-colors"
              >
                {item.checked && (
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                )}
              </button>
              <span className="flex-1 text-white">{item.text}</span>
              {!item.isDefault && (
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          {/* Add Item Input */}
          <div className="bg-gray-800 rounded-2xl p-4 flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-gray-600 rounded-full flex items-center justify-center">
              <Plus size={16} className="text-gray-600" />
            </div>
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new item..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Completed Section */}
        {completedItems.length > 0 && (
          <div className="px-4">
            <div className="w-full bg-gray-800 rounded-t-2xl p-4 flex items-center justify-between hover:bg-gray-700 transition-colors">
              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className="flex items-center space-x-3 flex-1"
              >
                <span className="text-white font-medium">Done</span>
                {showCompleted ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              <button
                onClick={deleteAllCompleted}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                Delete all
              </button>
            </div>

            {showCompleted && (
              <div className="bg-gray-800 rounded-b-2xl space-y-3 p-4 pt-0">
                {completedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 py-2"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </button>
                    <span className="flex-1 text-gray-400 line-through">{item.text}</span>
                    {!item.isDefault && (
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {items.length === 0 && (
          <div className="text-center text-gray-400 py-8 px-4">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={24} className="text-gray-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">No items in your checklist</h3>
            <p className="text-sm">Add some items above to get started on your travel preparations!</p>
          </div>
        )}

        {/* Reset Confirmation Modal */}
        {showResetDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-white mb-4">Reset to Default Checklist</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to reset to the default checklist? This will remove all custom items and uncheck all items. This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowResetDialog(false)}
                  className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-xl hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TravelChecklist

