export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  isDefault: boolean;
}

export const DEFAULT_ITEMS: string[] = [
  "Passport",
  "Toothbrush",
  "Phone charger",
  "Clothes",
  "Sunglasses",
  "Travel adapter",
  "Snacks"
];
