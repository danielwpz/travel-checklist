
import { useState } from 'react'
import { ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { type TodoList, type ChecklistItem } from '../types'

interface ListViewProps {
  list: TodoList
  onBack: () => void
  onUpdateList: (updatedList: TodoList) => void
}

const ListView = ({ list, onBack, onUpdateList }: ListViewProps) => {
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

    const newItem: ChecklistItem = {
      id: `item-${Date.now()}`,
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-8">
          <button onClick={onBack} className="p-2">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <span className="text-gray-400">My lists</span>
        </div>

        {/* List Title */}
        <div className="px-4 mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold">{list.name}</h1>
            <span className="text-lg">({activeItems.length})</span>
            {list.color && activeItems.length > 0 && (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: list.color }}
              >
                {activeItems.length}
              </div>
            )}
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
              <button
                onClick={() => deleteItem(item.id)}
                className="p-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
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
              onKeyPress={handleKeyPress}
              placeholder="Add a new item..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Completed Section */}
        {completedItems.length > 0 && (
          <div className="px-4">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="w-full bg-gray-800 rounded-t-2xl p-4 flex items-center justify-between hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-white font-medium">Done</span>
                {showCompleted ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteAllCompleted()
                }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                Delete all
              </button>
            </button>

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
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListView

