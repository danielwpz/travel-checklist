
import { describe, it, expect } from 'vitest'
import { getIconForItem, assignIconToItem } from '../lib/iconMatcher'

describe('iconMatcher', () => {
  describe('getIconForItem', () => {
    it('should return correct icons for default travel items', () => {
      expect(getIconForItem('Passport')).toBe('📘')
      expect(getIconForItem('Toothbrush')).toBe('🪥')
      expect(getIconForItem('Phone charger')).toBe('🔌')
      expect(getIconForItem('Clothes')).toBe('👕')
      expect(getIconForItem('Sunglasses')).toBe('🕶️')
      expect(getIconForItem('Travel adapter')).toBe('🔌')
      expect(getIconForItem('Snacks')).toBe('🍿')
    })

    it('should be case insensitive', () => {
      expect(getIconForItem('PASSPORT')).toBe('📘')
      expect(getIconForItem('toothbrush')).toBe('🪥')
      expect(getIconForItem('Phone Charger')).toBe('🔌')
    })

    it('should match partial keywords', () => {
      expect(getIconForItem('My toothbrush')).toBe('🪥')
      expect(getIconForItem('Phone charger cable')).toBe('🔌')
      expect(getIconForItem('Travel sunglasses')).toBe('🕶️')
    })

    it('should return correct icons for various categories', () => {
      // Electronics
      expect(getIconForItem('laptop')).toBe('💻')
      expect(getIconForItem('camera')).toBe('📷')
      expect(getIconForItem('headphones')).toBe('🎧')

      // Clothing
      expect(getIconForItem('shirt')).toBe('👕')
      expect(getIconForItem('pants')).toBe('👖')
      expect(getIconForItem('shoes')).toBe('👟')

      // Personal care
      expect(getIconForItem('shampoo')).toBe('🧴')
      expect(getIconForItem('soap')).toBe('🧼')
      expect(getIconForItem('razor')).toBe('🪒')

      // Documents
      expect(getIconForItem('visa')).toBe('📄')
      expect(getIconForItem('ticket')).toBe('🎫')
      expect(getIconForItem('insurance')).toBe('📋')
    })

    it('should return default icon for unmatched items', () => {
      expect(getIconForItem('random unknown item')).toBe('📦')
      expect(getIconForItem('xyz123')).toBe('📦')
      expect(getIconForItem('')).toBe('📦')
    })

    it('should handle whitespace correctly', () => {
      expect(getIconForItem('  passport  ')).toBe('📘')
      expect(getIconForItem('\ttoothbrush\n')).toBe('🪥')
    })

    it('should match first applicable icon when multiple keywords match', () => {
      // "phone charger" should match phone charger (🔌) before phone (📱)
      expect(getIconForItem('phone charger')).toBe('🔌')
    })
  })

  describe('assignIconToItem', () => {
    it('should add icon property to item', () => {
      const item = { text: 'Passport', id: '1', checked: false }
      const result = assignIconToItem(item)

      expect(result).toEqual({
        text: 'Passport',
        id: '1',
        checked: false,
        icon: '📘'
      })
    })

    it('should preserve all existing properties', () => {
      const item = {
        text: 'Toothbrush',
        id: 'test-id',
        checked: true,
        isDefault: true,
        customProperty: 'value'
      }
      const result = assignIconToItem(item)

      expect(result).toEqual({
        text: 'Toothbrush',
        id: 'test-id',
        checked: true,
        isDefault: true,
        customProperty: 'value',
        icon: '🪥'
      })
    })
  })
})

