

import { describe, it, expect } from 'vitest'
import { getIconForItem, assignIconsToItems } from '../lib/iconMatcher'

describe('Icon Matcher', () => {
  describe('getIconForItem', () => {
    it('should return correct icons for exact matches', () => {
      expect(getIconForItem('passport')).toBe('📘')
      expect(getIconForItem('toothbrush')).toBe('🪥')
      expect(getIconForItem('phone charger')).toBe('🔌')
      expect(getIconForItem('sunglasses')).toBe('🕶️')
      expect(getIconForItem('travel adapter')).toBe('🔌')
      expect(getIconForItem('snacks')).toBe('🍿')
    })

    it('should be case insensitive', () => {
      expect(getIconForItem('PASSPORT')).toBe('📘')
      expect(getIconForItem('Toothbrush')).toBe('🪥')
      expect(getIconForItem('Phone Charger')).toBe('🔌')
    })

    it('should handle partial matches', () => {
      expect(getIconForItem('tooth')).toBe('🪥')
      expect(getIconForItem('charge')).toBe('🔌')
      expect(getIconForItem('charger')).toBe('🔌')
      expect(getIconForItem('phone')).toBe('📱')
    })

    it('should handle compound words and phrases', () => {
      expect(getIconForItem('phone charger cable')).toBe('🔌')
      expect(getIconForItem('electric toothbrush')).toBe('🪥')
      expect(getIconForItem('travel phone charger')).toBe('🔌')
    })

    it('should use keyword patterns for partial matches', () => {
      expect(getIconForItem('toothpaste')).toBe('🪥') // contains 'tooth'
      expect(getIconForItem('mobile phone')).toBe('📱') // contains 'phone'
      expect(getIconForItem('reading book')).toBe('📚') // contains 'book'
      expect(getIconForItem('house keys')).toBe('🔑') // contains 'key'
    })

    it('should return default travel icon for unmatched items', () => {
      expect(getIconForItem('unknown item')).toBe('🧳')
      expect(getIconForItem('xyz123')).toBe('🧳')
      expect(getIconForItem('random stuff')).toBe('🧳')
    })

    it('should handle empty and whitespace strings', () => {
      expect(getIconForItem('')).toBe('🧳')
      expect(getIconForItem('   ')).toBe('🧳')
      expect(getIconForItem('\t\n')).toBe('🧳')
    })

    it('should handle default travel items correctly', () => {
      expect(getIconForItem('Passport')).toBe('📘')
      expect(getIconForItem('Toothbrush')).toBe('🪥')
      expect(getIconForItem('Phone charger')).toBe('🔌')
      expect(getIconForItem('Clothes')).toBe('👕')
      expect(getIconForItem('Sunglasses')).toBe('🕶️')
      expect(getIconForItem('Travel adapter')).toBe('🔌')
      expect(getIconForItem('Snacks')).toBe('🍿')
    })

    it('should handle various clothing items', () => {
      expect(getIconForItem('shirt')).toBe('👕')
      expect(getIconForItem('pants')).toBe('👖')
      expect(getIconForItem('shoes')).toBe('👟')
      expect(getIconForItem('socks')).toBe('🧦')
      expect(getIconForItem('jacket')).toBe('🧥')
    })

    it('should handle electronics', () => {
      expect(getIconForItem('laptop')).toBe('💻')
      expect(getIconForItem('camera')).toBe('📷')
      expect(getIconForItem('headphones')).toBe('🎧')
      expect(getIconForItem('power bank')).toBe('🔋')
    })

    it('should handle personal care items', () => {
      expect(getIconForItem('shampoo')).toBe('🧴')
      expect(getIconForItem('soap')).toBe('🧼')
      expect(getIconForItem('deodorant')).toBe('🧴')
      expect(getIconForItem('razor')).toBe('🪒')
    })

    it('should handle medicine and health items', () => {
      expect(getIconForItem('medicine')).toBe('💊')
      expect(getIconForItem('pills')).toBe('💊')
      expect(getIconForItem('bandaid')).toBe('🩹')
      expect(getIconForItem('mask')).toBe('😷')
    })
  })

  describe('assignIconsToItems', () => {
    it('should assign icons to an array of items', () => {
      const items = [
        { text: 'passport' },
        { text: 'toothbrush' },
        { text: 'unknown item' }
      ]

      const result = assignIconsToItems(items)

      expect(result).toEqual([
        { text: 'passport', icon: '📘' },
        { text: 'toothbrush', icon: '🪥' },
        { text: 'unknown item', icon: '🧳' }
      ])
    })

    it('should preserve existing properties while adding icons', () => {
      const items = [
        { id: '1', text: 'passport', checked: true },
        { id: '2', text: 'toothbrush', checked: false }
      ]

      const result = assignIconsToItems(items)

      expect(result).toEqual([
        { id: '1', text: 'passport', checked: true, icon: '📘' },
        { id: '2', text: 'toothbrush', checked: false, icon: '🪥' }
      ])
    })

    it('should handle empty array', () => {
      const result = assignIconsToItems([])
      expect(result).toEqual([])
    })
  })
})


