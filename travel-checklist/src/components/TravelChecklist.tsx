
import { useState } from 'react'
import { type ChecklistItem } from '../types'
import ChecklistItemComponent from './ChecklistItem'
import AddItemForm from './AddItemForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Edit3, RotateCcw, CheckCircle2 } from 'lucide-react'

interface TravelChecklistProps {
  items: ChecklistItem[]
  setItems: (items: ChecklistItem[]) => void
  onReset: () => void
}

const TravelChecklist = ({ items, setItems, onReset }: TravelChecklistProps) => {
  const [editMode, setEditMode] = useState(false)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItemText = (id: string, newText: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, text: newText } : item
    ))
  }

  const addItem = (text: string) => {
    // Check for duplicates
    if (items.some(item => item.text.toLowerCase() === text.toLowerCase())) {
      return false
    }

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      text,
      checked: false,
      isDefault: false
    }
    setItems([...items, newItem])
    return true
  }

  const [showResetDialog, setShowResetDialog] = useState(false)

  const handleReset = () => {
    localStorage.removeItem('travel-checklist-items')
    onReset()
    setShowResetDialog(false)
  }

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()

    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null)
      return
    }

    const draggedIndex = items.findIndex(item => item.id === draggedItem)
    const targetIndex = items.findIndex(item => item.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItem(null)
      return
    }

    const newItems = [...items]
    const [draggedItemObj] = newItems.splice(draggedIndex, 1)
    newItems.splice(targetIndex, 0, draggedItemObj)

    setItems(newItems)
    setDraggedItem(null)
  }

  const checkedCount = items.filter(item => item.checked).length
  const totalCount = items.length

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              Your Travel Checklist
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Progress: {checkedCount}/{totalCount} items packed</span>
              {totalCount > 0 && (
                <span className="text-primary font-medium">
                  {Math.round((checkedCount / totalCount) * 100)}% complete
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              onClick={() => setEditMode(!editMode)}
              variant={editMode ? "default" : "outline"}
              size="sm"
              className="flex-1 sm:flex-none"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              {editMode ? 'Exit Edit' : 'Edit Mode'}
            </Button>
            <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm" className="flex-1 sm:flex-none">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset to Default Checklist</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to reset to the default checklist? This will remove all custom items and uncheck all items. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowResetDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleReset}>
                    Reset Checklist
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <Progress
            value={totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}
            className="h-3"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Add item form */}
        <AddItemForm onAddItem={addItem} />

        {/* Checklist items */}
        <div className="space-y-3">
          {items.map((item) => (
            <ChecklistItemComponent
              key={item.id}
              item={item}
              editMode={editMode}
              onToggle={toggleItem}
              onDelete={deleteItem}
              onUpdateText={updateItemText}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              isDragging={draggedItem === item.id}
            />
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No items in your checklist</p>
            <p className="text-sm">Add some items above to get started on your travel preparations!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TravelChecklist

