import { useState, useEffect } from 'react'
import { type ChecklistItem, DEFAULT_ITEMS } from './types'
import TravelChecklist from './components/TravelChecklist'
import { getEmojiForItem } from './utils/emojiUtils'

function App() {
  const [items, setItems] = useState<ChecklistItem[]>([])

  // Load items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('travel-checklist-items')
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems)
        setItems(ensureItemsHaveEmojis(parsedItems))
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
    setItems(DEFAULT_ITEMS)
  }

  // Ensure all items have emojis for backward compatibility
  const ensureItemsHaveEmojis = (items: ChecklistItem[]): ChecklistItem[] => {
    return items.map(item => ({
      ...item,
      emoji: item.emoji || getEmojiForItem(item.text)
    }))
  }

  const handleReset = () => {
    localStorage.removeItem('travel-checklist-items')
    initializeDefaultItems()
  }

  return (
    <div className="mobile-container">
      <TravelChecklist
        items={items}
        setItems={setItems}
        onReset={handleReset}
      />
    </div>
  )
}

export default App
