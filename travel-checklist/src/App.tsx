import { useState, useEffect } from 'react'
import { type ChecklistItem, DEFAULT_ITEMS } from './types'
import TravelChecklist from './components/TravelChecklist'

function App() {
  const [items, setItems] = useState<ChecklistItem[]>([])

  // Load items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('travel-checklist-items')
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems))
      } catch (error) {
        console.error('Error parsing saved items:', error)
        initializeDefaultItems()
      }
    } else {
      initializeDefaultItems()
    }
  }, [])

  // Save items to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('travel-checklist-items', JSON.stringify(items))
    }
  }, [items])

  const initializeDefaultItems = () => {
    const defaultItems: ChecklistItem[] = DEFAULT_ITEMS.map((item, index) => ({
      id: `default-${index}`,
      text: item,
      checked: false,
      isDefault: true
    }))
    setItems(defaultItems)
  }

  const handleReset = () => {
    initializeDefaultItems()
  }

  return (
    <TravelChecklist
      items={items}
      setItems={setItems}
      onReset={handleReset}
    />
  )
}

export default App
