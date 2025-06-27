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
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #f3e5f5 100%)' }}>
      <div className="container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="text-center mb-5">
              <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
                <Luggage className="text-primary" size={48} />
                <h1 className="display-4 fw-bold text-primary mb-0">
                  Travel Checklist
                </h1>
              </div>
              <p className="lead text-muted">
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
      </div>
    </div>
  )
}

export default App
