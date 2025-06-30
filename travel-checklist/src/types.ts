export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  isDefault: boolean;
}

export interface TodoList {
  id: string;
  name: string;
  items: ChecklistItem[];
  color?: string;
}

export const DEFAULT_LISTS: TodoList[] = [
  {
    id: 'shopping-list',
    name: 'Shopping list',
    color: '#4ade80',
    items: [
      { id: 'shop-1', text: 'Milk', checked: false, isDefault: true },
      { id: 'shop-2', text: 'Cereals', checked: false, isDefault: true },
      { id: 'shop-3', text: 'Tacos, pickles and sausage', checked: false, isDefault: true },
      { id: 'shop-4', text: 'Shampoo + conditioner', checked: false, isDefault: true },
      { id: 'shop-5', text: 'Coca cola vanilla flavour', checked: false, isDefault: true },
      { id: 'shop-6', text: 'Chocolate for Elise', checked: false, isDefault: true },
      { id: 'shop-7', text: 'Kleenex', checked: false, isDefault: true }
    ]
  },
  {
    id: 'self-growth',
    name: 'Self-growth',
    color: '#f472b6',
    items: [
      { id: 'growth-1', text: 'Take product design course', checked: false, isDefault: true },
      { id: 'growth-2', text: 'Dream big and get info on...', checked: false, isDefault: true },
      { id: 'growth-3', text: 'Plan the Norway road-trip', checked: false, isDefault: true },
      { id: 'growth-4', text: 'Book spa', checked: false, isDefault: true },
      { id: 'growth-5', text: 'Buy new clothes', checked: false, isDefault: true },
      { id: 'growth-6', text: 'Plan workouts', checked: false, isDefault: true }
    ]
  },
  {
    id: 'travel-bucket-list',
    name: 'Travel bucket list',
    color: '#60a5fa',
    items: Array.from({ length: 124 }, (_, i) => ({
      id: `travel-${i + 1}`,
      text: i < 7 ? ['Passport', 'Toothbrush', 'Phone charger', 'Clothes', 'Sunglasses', 'Travel adapter', 'Snacks'][i] : `Travel item ${i + 1}`,
      checked: false,
      isDefault: true
    }))
  },
  {
    id: 'work-assignments',
    name: 'Work and assignments',
    color: '#fbbf24',
    items: Array.from({ length: 31 }, (_, i) => ({
      id: `work-${i + 1}`,
      text: `Work task ${i + 1}`,
      checked: false,
      isDefault: true
    }))
  },
  {
    id: 'fitness',
    name: 'Fitness',
    color: '#34d399',
    items: Array.from({ length: 11 }, (_, i) => ({
      id: `fitness-${i + 1}`,
      text: `Fitness goal ${i + 1}`,
      checked: false,
      isDefault: true
    }))
  }
];

export const DEFAULT_ITEMS: string[] = [
  "Passport",
  "Toothbrush",
  "Phone charger",
  "Clothes",
  "Sunglasses",
  "Travel adapter",
  "Snacks"
];
