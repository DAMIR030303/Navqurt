import { cn } from '@/lib/utils'

describe('utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
    })

    it('should handle conditional classes', () => {
      expect(cn('px-2', false && 'py-1', 'bg-red-500')).toBe('px-2 bg-red-500')
    })

    it('should handle undefined and null values', () => {
      expect(cn('px-2', undefined, null, 'py-1')).toBe('px-2 py-1')
    })

    it('should merge Tailwind classes without conflicts', () => {
      expect(cn('text-sm text-gray-500', 'text-lg')).toBe('text-gray-500 text-lg')
    })

    it('should handle empty input', () => {
      expect(cn()).toBe('')
    })

    it('should handle array of classes', () => {
      expect(cn(['px-2', 'py-1'])).toBe('px-2 py-1')
    })
  })
})
