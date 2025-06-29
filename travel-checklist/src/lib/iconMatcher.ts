// Icon mapping for travel items
const ICON_MAP: Record<string, string> = {
  // Travel documents
  'passport': '📘',
  'visa': '📄',
  'id': '🪪',
  'license': '🪪',
  'ticket': '🎫',
  'boarding pass': '🎫',
  'insurance': '📋',

  // Personal care
  'toothbrush': '🪥',
  'toothpaste': '🦷',
  'shampoo': '🧴',
  'soap': '🧼',
  'deodorant': '🧴',
  'perfume': '🧴',
  'cologne': '🧴',
  'razor': '🪒',
  'towel': '🏖️',
  'sunscreen': '🧴',
  'lotion': '🧴',
  'moisturizer': '🧴',
  'makeup': '💄',
  'lipstick': '💄',
  'brush': '',
  'comb': '',
  'hairbrush': '',
  'contact': '👁️',
  'glasses': '👓',
  'sunglasses': '🕶️',

  // Clothing
  'clothes': '👕',
  'shirt': '👕',
  't-shirt': '👕',
  'pants': '👖',
  'jeans': '👖',
  'shorts': '🩳',
  'dress': '👗',
  'skirt': '👗',
  'jacket': '🧥',
  'coat': '🧥',
  'sweater': '🧥',
  'hoodie': '🧥',
  'underwear': '🩲',
  'socks': '🧦',
  'shoes': '👟',
  'sneakers': '👟',
  'boots': '🥾',
  'sandals': '👡',
  'hat': '👒',
  'cap': '🧢',
  'scarf': '🧣',
  'gloves': '🧤',
  'swimsuit': '👙',
  'bikini': '👙',
  'pajamas': '🩱',
  'pjs': '🩱',

  // Electronics
  'phone': '📱',
  'charger': '🔌',
  'phone charger': '🔌',
  'cable': '🔌',
  'adapter': '🔌',
  'travel adapter': '🔌',
  'laptop': '💻',
  'tablet': '📱',
  'camera': '📷',
  'headphones': '🎧',
  'earbuds': '🎧',
  'power bank': '🔋',
  'battery': '🔋',
  'speaker': '🔊',
  'watch': '⌚',
  'smartwatch': '⌚',

  // Health & Medicine
  'medicine': '💊',
  'medication': '💊',
  'pills': '💊',
  'vitamins': '💊',
  'bandaid': '🩹',
  'bandage': '🩹',
  'first aid': '🩹',
  'thermometer': '🌡️',
  'mask': '😷',
  'hand sanitizer': '🧴',
  'sanitizer': '🧴',

  // Food & Snacks
  'snacks': '🍿',
  'food': '🍎',
  'water': '💧',
  'bottle': '🍼',
  'gum': '🍬',
  'candy': '🍬',
  'chocolate': '🍫',
  'nuts': '🥜',
  'crackers': '🍪',

  // Travel accessories
  'luggage': '🧳',
  'suitcase': '🧳',
  'backpack': '🎒',
  'bag': '👜',
  'purse': '👛',
  'wallet': '👛',
  'money': '💰',
  'cash': '💵',
  'credit card': '💳',
  'keys': '🔑',
  'lock': '🔒',
  'padlock': '🔒',
  'umbrella': '☂️',
  'map': '🗺️',
  'guidebook': '📖',
  'book': '📚',
  'magazine': '📰',
  'journal': '📔',
  'pen': '✒️',
  'pencil': '✏️',
  'notebook': '📓',

  // Entertainment
  'games': '🎮',
  'cards': '🃏',
  'puzzle': '🧩',
  'kindle': '📱',
  'ebook': '📱',

  // Miscellaneous
  'pillow': '🛏️',
  'blanket': '🛏️',
  'eye mask': '😴',
  'earplugs': '👂',
  'tissues': '🤧',
  'wipes': '🧻',
  'laundry': '🧺',
  'detergent': '🧴',
  'plastic bags': '🛍️',
  'trash bags': '🗑️',
  'flashlight': '🔦',
  'torch': '🔦',
  'matches': '🔥',
  'lighter': '🔥',
}

// Keywords that might appear in item names (ordered by priority)
const KEYWORD_PATTERNS: Array<{ keywords: string[], icon: string }> = [
  { keywords: ['charger', 'charge'], icon: '🔌' }, // Put charger before phone
  { keywords: ['tooth'], icon: '🪥' },
  { keywords: ['phone', 'mobile'], icon: '📱' },
  { keywords: ['cloth', 'wear'], icon: '👕' },
  { keywords: ['sun', 'solar'], icon: '☀️' },
  { keywords: ['water', 'drink'], icon: '💧' },
  { keywords: ['book', 'read'], icon: '📚' },
  { keywords: ['bag', 'pack'], icon: '🎒' },
  { keywords: ['key'], icon: '🔑' },
  { keywords: ['card'], icon: '💳' },
  { keywords: ['medicine', 'med', 'pill'], icon: '💊' },
  { keywords: ['camera', 'photo'], icon: '📷' },
  { keywords: ['music', 'audio'], icon: '🎧' },
  { keywords: ['game'], icon: '🎮' },
  { keywords: ['clean', 'wash'], icon: '🧼' },
  { keywords: ['travel'], icon: '✈️' },
]

/**
 * Matches an appropriate icon for a travel item based on its name
 * @param itemText The text of the travel item
 * @returns The emoji icon that best matches the item, or a default travel icon
 */
export function getIconForItem(itemText: string): string {
  const normalizedText = itemText.toLowerCase().trim()

  // Handle empty strings
  if (!normalizedText) {
    return '🧳'
  }

  // First, try exact match
  if (ICON_MAP[normalizedText]) {
    return ICON_MAP[normalizedText]
  }

  // Try keyword patterns first for better matching
  for (const pattern of KEYWORD_PATTERNS) {
    if (pattern.keywords.some(keyword => normalizedText.includes(keyword))) {
      return pattern.icon
    }
  }

  // Then try partial matches for compound words (prioritize longer matches)
  const sortedKeys = Object.keys(ICON_MAP).sort((a, b) => b.length - a.length)
  for (const key of sortedKeys) {
    if (normalizedText.includes(key)) {
      return ICON_MAP[key]
    }
  }

  // Default travel icon for unmatched items
  return '🧳'
}

/**
 * Updates an array of items to include appropriate icons
 * @param items Array of checklist items
 * @returns Array of items with icons assigned
 */
export function assignIconsToItems<T extends { text: string }>(items: T[]): (T & { icon: string })[] {
  return items.map(item => ({
    ...item,
    icon: getIconForItem(item.text)
  }))
}
