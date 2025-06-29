/**
 * Automatically matches appropriate icons for travel items based on keywords
 */

interface IconMapping {
  keywords: string[];
  icon: string;
}

const ICON_MAPPINGS: IconMapping[] = [
  // Documents & Travel
  { keywords: ['passport', 'id', 'identification', 'document'], icon: '📘' },
  { keywords: ['visa', 'permit'], icon: '📄' },
  { keywords: ['ticket', 'boarding pass', 'flight'], icon: '🎫' },
  { keywords: ['insurance', 'policy'], icon: '📋' },
  { keywords: ['itinerary', 'schedule', 'plan'], icon: '📅' },
  { keywords: ['map', 'guide', 'guidebook'], icon: '🗺️' },
  { keywords: ['money', 'cash', 'currency', 'wallet'], icon: '💰' },
  { keywords: ['credit card', 'debit card', 'card'], icon: '💳' },

  // Electronics & Gadgets
  { keywords: ['phone charger', 'charger', 'cable'], icon: '🔌' },
  { keywords: ['phone', 'mobile', 'smartphone'], icon: '📱' },
  { keywords: ['camera', 'photography'], icon: '📷' },
  { keywords: ['laptop', 'computer', 'macbook'], icon: '💻' },
  { keywords: ['headphones', 'earphones', 'earbuds'], icon: '🎧' },
  { keywords: ['power bank', 'battery pack', 'portable charger'], icon: '🔋' },
  { keywords: ['adapter', 'travel adapter', 'plug adapter'], icon: '🔌' },
  { keywords: ['tablet', 'ipad'], icon: '📱' },
  { keywords: ['watch', 'smartwatch'], icon: '⌚' },

  // Personal Care & Hygiene
  { keywords: ['toothbrush'], icon: '🪥' },
  { keywords: ['toothpaste'], icon: '🦷' },
  { keywords: ['shampoo', 'conditioner'], icon: '🧴' },
  { keywords: ['soap', 'body wash'], icon: '🧼' },
  { keywords: ['deodorant', 'antiperspirant'], icon: '🧴' },
  { keywords: ['razor', 'shaver'], icon: '🪒' },
  { keywords: ['towel'], icon: '🏖️' },
  { keywords: ['sunscreen', 'sunblock', 'spf'], icon: '🧴' },
  { keywords: ['moisturizer', 'lotion', 'cream'], icon: '🧴' },
  { keywords: ['perfume', 'cologne', 'fragrance'], icon: '💐' },
  { keywords: ['makeup', 'cosmetics'], icon: '💄' },
  { keywords: ['contact lens', 'contacts'], icon: '👁️' },
  { keywords: ['glasses', 'eyeglasses'], icon: '👓' },

  // Clothing & Accessories
  { keywords: ['clothes', 'clothing', 'outfit'], icon: '👕' },
  { keywords: ['shirt', 't-shirt', 'blouse'], icon: '👕' },
  { keywords: ['pants', 'trousers', 'jeans'], icon: '👖' },
  { keywords: ['dress', 'skirt'], icon: '👗' },
  { keywords: ['underwear', 'undergarments'], icon: '🩲' },
  { keywords: ['socks', 'stockings'], icon: '🧦' },
  { keywords: ['shoes', 'sneakers', 'boots'], icon: '👟' },
  { keywords: ['sandals', 'flip flops'], icon: '🩴' },
  { keywords: ['hat', 'cap', 'beanie'], icon: '🧢' },
  { keywords: ['sunglasses'], icon: '🕶️' },
  { keywords: ['jacket', 'coat', 'hoodie'], icon: '🧥' },
  { keywords: ['swimsuit', 'bikini', 'swimming'], icon: '👙' },
  { keywords: ['pajamas', 'sleepwear', 'nightwear'], icon: '👘' },
  { keywords: ['belt'], icon: '👔' },
  { keywords: ['jewelry', 'necklace', 'earrings'], icon: '💎' },
  { keywords: ['watch'], icon: '⌚' },

  // Health & Medicine
  { keywords: ['medicine', 'medication', 'pills'], icon: '💊' },
  { keywords: ['first aid', 'bandage', 'band-aid'], icon: '🩹' },
  { keywords: ['thermometer'], icon: '🌡️' },
  { keywords: ['vitamins', 'supplements'], icon: '💊' },
  { keywords: ['prescription'], icon: '📋' },

  // Food & Snacks
  { keywords: ['snacks', 'food', 'treats'], icon: '🍿' },
  { keywords: ['water bottle', 'bottle'], icon: '🍼' },
  { keywords: ['coffee', 'tea'], icon: '☕' },
  { keywords: ['gum', 'chewing gum'], icon: '🍬' },
  { keywords: ['candy', 'sweets'], icon: '🍭' },

  // Travel Gear
  { keywords: ['luggage', 'suitcase', 'bag'], icon: '🧳' },
  { keywords: ['backpack', 'rucksack'], icon: '🎒' },
  { keywords: ['pillow', 'travel pillow'], icon: '🛏️' },
  { keywords: ['blanket'], icon: '🛏️' },
  { keywords: ['umbrella'], icon: '☂️' },
  { keywords: ['lock', 'padlock'], icon: '🔒' },
  { keywords: ['tags', 'luggage tags'], icon: '🏷️' },

  // Entertainment
  { keywords: ['book', 'novel', 'reading'], icon: '📚' },
  { keywords: ['magazine'], icon: '📰' },
  { keywords: ['games', 'cards'], icon: '🎮' },
  { keywords: ['music', 'playlist'], icon: '🎵' },

  // Miscellaneous
  { keywords: ['keys'], icon: '🔑' },
  { keywords: ['pen', 'pencil'], icon: '✏️' },
  { keywords: ['notebook', 'journal'], icon: '📓' },
  { keywords: ['tissues', 'kleenex'], icon: '🧻' },
  { keywords: ['hand sanitizer', 'sanitizer'], icon: '🧴' },
  { keywords: ['flashlight', 'torch'], icon: '🔦' },
  { keywords: ['laundry', 'detergent'], icon: '🧺' },
];

/**
 * Matches an appropriate icon for a travel item based on its text
 * @param itemText The text of the travel item
 * @returns An emoji icon that matches the item, or a default travel icon
 */
export function getIconForItem(itemText: string): string {
  const normalizedText = itemText.toLowerCase().trim();

  // Find the first matching icon mapping
  for (const mapping of ICON_MAPPINGS) {
    for (const keyword of mapping.keywords) {
      if (normalizedText.includes(keyword.toLowerCase())) {
        return mapping.icon;
      }
    }
  }

  // Default icon for unmatched items
  return '📦';
}

/**
 * Updates an existing item with an appropriate icon
 * @param item The checklist item to update
 * @returns The item with an icon assigned
 */
export function assignIconToItem(item: { text: string; [key: string]: any }): typeof item & { icon: string } {
  return {
    ...item,
    icon: getIconForItem(item.text)
  };
}
