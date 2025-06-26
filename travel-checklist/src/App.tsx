import { useState, useEffect } from 'react'
import { type ChecklistItem, DEFAULT_ITEMS } from './types'
import TravelChecklist from './components/TravelChecklist'
import { Luggage } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Luggage className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Travel Checklist
            </h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Stay organized and never forget the essentials for your next adventure
          </p>
        </div>
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
