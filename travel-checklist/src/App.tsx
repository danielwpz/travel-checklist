import { useState, useEffect } from 'react'
import { type TodoList, DEFAULT_LISTS } from './types'
import ListOverview from './components/ListOverview'
import ListView from './components/ListView'

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

  const handleSelectList = (listId: string) => {
    setCurrentListId(listId)
  }

  const handleBackToOverview = () => {
    setCurrentListId(null)
  }

  const handleUpdateList = (updatedList: TodoList) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === updatedList.id ? updatedList : list
      )
    )
  }

  const handleAddList = () => {
    const newList: TodoList = {
      id: `list-${Date.now()}`,
      name: 'New List',
      items: [],
      color: '#6b7280'
    }
    setLists(prevLists => [...prevLists, newList])
    setCurrentListId(newList.id)
  }

  const currentList = lists.find(list => list.id === currentListId)

  if (currentList) {
    return (
      <ListView
        list={currentList}
        onBack={handleBackToOverview}
        onUpdateList={handleUpdateList}
      />
    )
  }

  return (
    <ListOverview
      lists={lists}
      onSelectList={handleSelectList}
      onAddList={handleAddList}
    />
  )
}

export default App
