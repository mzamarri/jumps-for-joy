import { describe, it, expect } from 'vitest'
import categories from 'data/rental-categories'

/**
 * Data integrity tests — these act as a contract on the shape of rentalCategories.
 * If someone accidentally removes a required field or creates a duplicate ID,
 * this test suite will catch it immediately.
 */
describe('rentalCategories data integrity', () => {
    it('exports a non-empty array', () => {
        expect(Array.isArray(categories)).toBe(true)
        expect(categories.length).toBeGreaterThan(0)
    })

    it('every category has a non-empty id', () => {
        for (const cat of categories) {
            expect(typeof cat.id).toBe('string')
            expect(cat.id.trim().length).toBeGreaterThan(0)
        }
    })

    it('every category id is URL-safe (no spaces or special chars)', () => {
        const urlSafe = /^[a-z0-9-]+$/
        for (const cat of categories) {
            expect(cat.id).toMatch(urlSafe)
        }
    })

    it('category ids are all unique — no duplicates', () => {
        const ids = categories.map(c => c.id)
        const unique = new Set(ids)
        expect(unique.size).toBe(ids.length)
    })

    it('every category has a name and title', () => {
        for (const cat of categories) {
            expect(typeof cat.name).toBe('string')
            expect(cat.name.trim().length).toBeGreaterThan(0)
            expect(typeof cat.title).toBe('string')
            expect(cat.title.trim().length).toBeGreaterThan(0)
        }
    })

    it('every category has a short description', () => {
        for (const cat of categories) {
            expect(typeof cat.description).toBe('string')
            expect(cat.description.trim().length).toBeGreaterThan(0)
        }
    })

    it('every category has a tagline', () => {
        for (const cat of categories) {
            expect(typeof cat.tagline).toBe('string')
            expect(cat.tagline.trim().length).toBeGreaterThan(0)
        }
    })

    it('every category has a longDescription', () => {
        for (const cat of categories) {
            expect(typeof cat.longDescription).toBe('string')
            expect(cat.longDescription.trim().length).toBeGreaterThan(0)
        }
    })

    it('every category has an image value', () => {
        for (const cat of categories) {
            // image is resolved by Vite to a URL string; just check it exists
            expect(cat.image).toBeTruthy()
        }
    })

    it('contains the expected category ids', () => {
        const ids = categories.map(c => c.id)
        expect(ids).toContain('bounce-house')
        expect(ids).toContain('dry-slides')
        expect(ids).toContain('water-slides')
        expect(ids).toContain('combos')
        expect(ids).toContain('tents')
        expect(ids).toContain('tables-chairs')
        expect(ids).toContain('generators')
    })
})
