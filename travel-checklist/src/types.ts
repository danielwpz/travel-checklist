export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  isDefault: boolean;
  timer?: {
    type: 'countdown' | 'deadline';
    value: number | string; // minutes for countdown, ISO string for deadline
    label: string;
    createdAt: string; // ISO string for when timer was set
  };
}

export const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: 'travel-1', text: 'Passport', checked: false, isDefault: true },
  { id: 'travel-2', text: 'Toothbrush', checked: false, isDefault: true },
  { id: 'travel-3', text: 'Phone charger', checked: false, isDefault: true },
  { id: 'travel-4', text: 'Sunglasses', checked: false, isDefault: true },
  { id: 'travel-5', text: 'Camera', checked: false, isDefault: true },
  { id: 'travel-6', text: 'Travel insurance', checked: false, isDefault: true },
  { id: 'travel-7', text: 'Medications', checked: false, isDefault: true },
  { id: 'travel-8', text: 'Comfortable shoes', checked: false, isDefault: true },
  { id: 'travel-9', text: 'Travel adapter', checked: false, isDefault: true },
  { id: 'travel-10', text: 'Clothes for weather', checked: false, isDefault: true }
];
