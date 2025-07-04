
// Emoji mapping for keywords
const EMOJI_KEYWORDS: Record<string, string> = {
  // Electronics & Technology
  'phone': '📱',
  'mobile': '📱',
  'cellphone': '📱',
  'iphone': '📱',
  'android': '📱',
  'smartphone': '📱',
  'charger': '🔌',
  'cable': '🔌',
  'adapter': '🔌',
  'laptop': '💻',
  'computer': '💻',
  'tablet': '📱',
  'ipad': '📱',
  'headphones': '🎧',
  'earphones': '🎧',
  'earbuds': '🎧',
  'camera': '📷',
  'gopro': '📷',
  'battery': '🔋',
  'powerbank': '🔋',
  'power bank': '🔋',

  // Clothing & Accessories
  'shirt': '👕',
  'tshirt': '👕',
  't-shirt': '👕',
  'blouse': '👕',
  'top': '👕',
  'pants': '👖',
  'jeans': '👖',
  'trousers': '👖',
  'shorts': '🩳',
  'dress': '👗',
  'skirt': '👗',
  'jacket': '🧥',
  'coat': '🧥',
  'sweater': '🧥',
  'hoodie': '🧥',
  'shoes': '👟',
  'sneakers': '👟',
  'boots': '🥾',
  'sandals': '👡',
  'flip flops': '🩴',
  'flipflops': '🩴',
  'socks': '🧦',
  'underwear': '🩲',
  'bra': '👙',
  'bikini': '👙',
  'swimsuit': '👙',
  'hat': '👒',
  'cap': '🧢',
  'sunglasses': '🕶️',
  'glasses': '👓',
  'watch': '⌚',
  'jewelry': '💍',
  'necklace': '📿',
  'ring': '💍',
  'earrings': '💍',

  // Personal Care & Health
  'toothbrush': '🪥',
  'toothpaste': '🦷',
  'shampoo': '🧴',
  'soap': '🧼',
  'deodorant': '🧴',
  'perfume': '🧴',
  'cologne': '🧴',
  'lotion': '🧴',
  'sunscreen': '🧴',
  'medicine': '💊',
  'medication': '💊',
  'pills': '💊',
  'vitamins': '💊',
  'bandaid': '🩹',
  'bandage': '🩹',
  'first aid': '🩹',
  'thermometer': '🌡️',
  'razor': '🪒',
  'brush': '🪥',
  'comb': '',
  'makeup': '💄',
  'lipstick': '💄',
  'mascara': '💄',
  'foundation': '💄',

  // Documents & Money
  'passport': '📘',
  'visa': '📄',
  'ticket': '🎫',
  'boarding pass': '🎫',
  'license': '🪪',
  'id': '🪪',
  'wallet': '👛',
  'money': '💰',
  'cash': '💰',
  'credit card': '💳',
  'card': '💳',
  'insurance': '📋',
  'documents': '📄',
  'papers': '📄',
  'itinerary': '📋',
  'map': '🗺️',
  'guidebook': '📖',

  // Food & Drinks
  'water': '💧',
  'bottle': '🍼',
  'snacks': '🍿',
  'food': '🍎',
  'gum': '🍬',
  'candy': '🍬',
  'chocolate': '🍫',
  'coffee': '☕',
  'tea': '🍵',

  // Travel Gear
  'suitcase': '🧳',
  'luggage': '🧳',
  'backpack': '🎒',
  'bag': '👜',
  'purse': '👛',
  'handbag': '👜',
  'duffel': '🧳',
  'carry on': '🧳',
  'carry-on': '🧳',
  'pillow': '🛏️',
  'blanket': '🛏️',
  'towel': '🏖️',
  'umbrella': '☂️',
  'raincoat': '🧥',

  // Entertainment
  'book': '📖',
  'kindle': '📖',
  'magazine': '📰',
  'music': '🎵',
  'playlist': '🎵',
  'game': '🎮',
  'cards': '🃏',
  'puzzle': '🧩',

  // Miscellaneous
  'keys': '🔑',
  'lock': '🔒',
  'padlock': '🔒',
  'flashlight': '🔦',
  'torch': '🔦',
  'batteries': '🔋',
  'pen': '✒️',
  'pencil': '✏️',
  'notebook': '📓',
  'journal': '📔',
  'diary': '📔',
  'gift': '🎁',
  'souvenir': '🎁',
  'laundry': '🧺',
  'detergent': '🧴',
  'plastic bag': '🛍️',
  'shopping bag': '🛍️',
  'trash bag': '🗑️',
  'tissues': '🧻',
  'toilet paper': '🧻',
  'wet wipes': '🧻',
  'hand sanitizer': '🧴',
  'sanitizer': '🧴',
};

const DEFAULT_EMOJI = '🧳';

/**
 * Get emoji for a given item text based on keyword matching
 */
export function getEmojiForItem(text: string): string {
  const lowerText = text.toLowerCase();

  // Check for exact matches first
  if (EMOJI_KEYWORDS[lowerText]) {
    return EMOJI_KEYWORDS[lowerText];
  }

  // Check for substring matches
  for (const [keyword, emoji] of Object.entries(EMOJI_KEYWORDS)) {
    if (lowerText.includes(keyword)) {
      return emoji;
    }
  }

  return DEFAULT_EMOJI;
}

/**
 * Ensure an item has an emoji, generating one if needed
 */
export function ensureItemHasEmoji(item: { text: string; emoji?: string }): string {
  return item.emoji || getEmojiForItem(item.text);
}

