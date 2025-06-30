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
    items: [
      { id: 'travel-1', text: 'Passport', checked: false, isDefault: true },
      { id: 'travel-2', text: 'Toothbrush', checked: false, isDefault: true },
      { id: 'travel-3', text: 'Phone charger', checked: false, isDefault: true },
      { id: 'travel-4', text: 'Clothes', checked: false, isDefault: true },
      { id: 'travel-5', text: 'Sunglasses', checked: false, isDefault: true },
      { id: 'travel-6', text: 'Travel adapter', checked: false, isDefault: true },
      { id: 'travel-7', text: 'Snacks', checked: false, isDefault: true }
    ]
  },
  {
    id: 'work-assignments',
    name: 'Work and assignments',
    color: '#fbbf24',
    items: []
  },
  {
    id: 'fitness',
    name: 'Fitness',
    color: '#34d399',
    items: []
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
