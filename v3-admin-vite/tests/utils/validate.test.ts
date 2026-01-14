import { isArray, isString, isExternal } from '@@/utils/validate'
import { describe, expect, test } from "vitest"


describe('validate utils', () => {
  describe('isArray', () => {
    test('should return true for arrays', () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)
      expect(isArray(['a', 'b'])).toBe(true)
    })

    test('should return false for non-arrays', () => {
      expect(isArray(null)).toBe(false)
      expect(isArray(undefined)).toBe(false)
      expect(isArray('string')).toBe(false)
      expect(isArray(123)).toBe(false)
      expect(isArray({})).toBe(false)
    })
  })

  describe('isString', () => {
    test('should return true for strings', () => {
      expect(isString('')).toBe(true)
      expect(isString('hello')).toBe(true)
      expect(isString(new String('test'))).toBe(true)
    })

    test('should return false for non-strings', () => {
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
      expect(isString(123)).toBe(false)
      expect(isString([])).toBe(false)
      expect(isString({})).toBe(false)
    })
  })

  describe('isExternal', () => {
    test('should return true for external links', () => {
      expect(isExternal('https://example.com')).toBe(true)
      expect(isExternal('http://example.com')).toBe(true)
      expect(isExternal('mailto:test@example.com')).toBe(true)
      expect(isExternal('tel:+1234567890')).toBe(true)
    })

    test('should return false for internal links', () => {
      expect(isExternal('/path')).toBe(false)
      expect(isExternal('relative/path')).toBe(false)
      expect(isExternal('#anchor')).toBe(false)
      expect(isExternal('ftp://example.com')).toBe(false)
    })
  })
})
