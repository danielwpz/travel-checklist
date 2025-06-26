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
    const defaultItems: ChecklistItem[] = DEFAULT_ITEMS.map((text, index) => ({
      id: `default-${index}`,
      text,
      checked: false,
      isDefault: true
    }))
    setItems(defaultItems)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🧳 Travel Checklist
        </h1>
        <TravelChecklist
          items={items}
          setItems={setItems}
          onReset={initializeDefaultItems}
        />
      </div>
    </div>
  )
}

export default App
