import { Plus } from 'lucide-react'
import { type TodoList } from '../types'

interface ListOverviewProps {
  lists: TodoList[]
  onSelectList: (listId: string) => void
  onAddList: () => void
}

const ListOverview = ({ lists, onSelectList, onAddList }: ListOverviewProps) => {
  const getItemCounts = (list: TodoList) => {
    const total = list.items.length
    const completed = list.items.filter(item => item.checked).length
    return { total, completed }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-sm mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold mb-2">ToDo</h1>
          <p className="text-gray-400">My lists ({lists.length})</p>
        </div>

        {/* Lists */}
        <div className="space-y-3 mb-6">
          {lists.map((list) => {
            const { total } = getItemCounts(list)
            return (
              <div
                key={list.id}
                onClick={() => onSelectList(list.id)}
                className="bg-gray-800 rounded-2xl p-4 cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-600 rounded"></div>
                    </div>
                    <span className="text-white font-medium">{list.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {list.color && (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: list.color }}
                      >
                        {total > 0 ? total : ''}
                      </div>
                    )}
                    <span className="text-gray-400 text-lg">{total}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Add List Button */}
        <button
          onClick={onAddList}
          className="w-full bg-gray-800 rounded-2xl p-4 flex items-center justify-center space-x-2 hover:bg-gray-700 transition-colors"
        >
          <Plus size={20} className="text-white" />
          <span className="text-white font-medium">Add a list</span>
        </button>
      </div>
    </div>
  )
}

export default ListOverview
