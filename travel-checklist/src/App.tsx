import { useState, useEffect } from 'react'
import { type TodoList, DEFAULT_LISTS } from './types'
import TodoDashboard from './components/TodoDashboard'
import TodoListView from './components/TodoListView'

function App() {
  const [lists, setLists] = useState<TodoList[]>([])
  const [currentListId, setCurrentListId] = useState<string | null>(null)

  // Load lists from localStorage on mount
  useEffect(() => {
    const savedLists = localStorage.getItem('todo-lists')
    if (savedLists) {
      try {
        setLists(JSON.parse(savedLists))
      } catch (error) {
        console.error('Error parsing saved lists:', error)
        initializeDefaultLists()
      }
    } else {
      initializeDefaultLists()
    }
  }, [])

  // Save lists to localStorage whenever lists change
  useEffect(() => {
    if (lists.length > 0) {
      localStorage.setItem('todo-lists', JSON.stringify(lists))
    }
  }, [lists])

  const initializeDefaultLists = () => {
    setLists(DEFAULT_LISTS)
  }

  const handleReset = () => {
    localStorage.removeItem('todo-lists')
    initializeDefaultLists()
  }

  const openList = (listId: string) => {
    setCurrentListId(listId)
  }

  const goBackToDashboard = () => {
    setCurrentListId(null)
  }

  const updateList = (updatedList: TodoList) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === updatedList.id ? updatedList : list
      )
    )
  }

  const addNewList = (name: string, icon: string, color: string) => {
    const newList: TodoList = {
      id: `custom-${Date.now()}`,
      name,
      icon,
      color,
      items: []
    }
    setLists(prevLists => [...prevLists, newList])
  }

  const deleteList = (listId: string) => {
    setLists(prevLists => prevLists.filter(list => list.id !== listId))
    if (currentListId === listId) {
      setCurrentListId(null)
    }
  }

  const currentList = currentListId ? lists.find(list => list.id === currentListId) : null

  return (
    <div className="mobile-container">
      {currentList ? (
        <TodoListView
          list={currentList}
          onBack={goBackToDashboard}
          onUpdateList={updateList}
        />
      ) : (
        <TodoDashboard
          lists={lists}
          onOpenList={openList}
          onAddList={addNewList}
          onDeleteList={deleteList}
          onReset={handleReset}
        />
      )}
    </div>
  )
}

export default App
