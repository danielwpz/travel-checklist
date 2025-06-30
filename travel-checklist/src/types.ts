export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  isDefault: boolean;
}

export interface TodoList {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: ChecklistItem[];
}

export const DEFAULT_LISTS: TodoList[] = [
  {
    id: 'shopping',
    name: 'Shopping list',
    icon: 'fas fa-shopping-cart',
    color: '#28a745',
    items: [
      { id: 'shop-1', text: 'Milk', checked: false, isDefault: true },
      { id: 'shop-2', text: 'Cereals', checked: false, isDefault: true },
      { id: 'shop-3', text: 'Tacos, pickles and sausages', checked: false, isDefault: true },
      { id: 'shop-4', text: 'Shampoo + conditioner', checked: false, isDefault: true },
      { id: 'shop-5', text: 'Coca cola vanilla flavour', checked: false, isDefault: true },
      { id: 'shop-6', text: 'Chocolate for Elise', checked: false, isDefault: true },
      { id: 'shop-7', text: 'Kleenex', checked: false, isDefault: true }
    ]
  },
  {
    id: 'self-growth',
    name: 'Self-growth',
    icon: 'fas fa-seedling',
    color: '#e91e63',
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
    id: 'travel-bucket',
    name: 'Travel bucket list',
    icon: 'fas fa-plane',
    color: '#007bff',
    items: [
      { id: 'travel-1', text: 'Visit Japan', checked: false, isDefault: true },
      { id: 'travel-2', text: 'Road trip across Europe', checked: false, isDefault: true },
      { id: 'travel-3', text: 'See Northern Lights', checked: false, isDefault: true },
      { id: 'travel-4', text: 'Climb Mount Fuji', checked: false, isDefault: true },
      { id: 'travel-5', text: 'Safari in Africa', checked: false, isDefault: true }
    ]
  },
  {
    id: 'work-assignments',
    name: 'Work and assignments',
    icon: 'fas fa-briefcase',
    color: '#fd7e14',
    items: [
      { id: 'work-1', text: 'Complete project proposal', checked: false, isDefault: true },
      { id: 'work-2', text: 'Review team performance', checked: false, isDefault: true },
      { id: 'work-3', text: 'Prepare presentation', checked: false, isDefault: true },
      { id: 'work-4', text: 'Update documentation', checked: false, isDefault: true }
    ]
  },
  {
    id: 'fitness',
    name: 'Fitness',
    icon: 'fas fa-dumbbell',
    color: '#6f42c1',
    items: [
      { id: 'fitness-1', text: 'Morning run', checked: false, isDefault: true },
      { id: 'fitness-2', text: 'Gym workout', checked: false, isDefault: true },
      { id: 'fitness-3', text: 'Yoga session', checked: false, isDefault: true },
      { id: 'fitness-4', text: 'Meal prep', checked: false, isDefault: true }
    ]
  }
];
