export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  isDefault: boolean;
  emoji?: string;
}

export const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: 'travel-1', text: 'Passport', checked: false, isDefault: true, emoji: '📘' },
  { id: 'travel-2', text: 'Toothbrush', checked: false, isDefault: true, emoji: '🪥' },
  { id: 'travel-3', text: 'Phone charger', checked: false, isDefault: true, emoji: '🔌' },
  { id: 'travel-4', text: 'Sunglasses', checked: false, isDefault: true, emoji: '🕶️' },
  { id: 'travel-5', text: 'Camera', checked: false, isDefault: true, emoji: '📷' },
  { id: 'travel-6', text: 'Travel insurance', checked: false, isDefault: true, emoji: '📋' },
  { id: 'travel-7', text: 'Medications', checked: false, isDefault: true, emoji: '💊' },
  { id: 'travel-8', text: 'Comfortable shoes', checked: false, isDefault: true, emoji: '👟' },
  { id: 'travel-9', text: 'Travel adapter', checked: false, isDefault: true, emoji: '🔌' },
  { id: 'travel-10', text: 'Clothes for weather', checked: false, isDefault: true, emoji: '👕' }
];
