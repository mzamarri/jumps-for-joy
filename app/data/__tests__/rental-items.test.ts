import { describe, it, expect } from 'vitest'
import { getRentalItem, getItemsForCategory } from 'data/rental-items'

describe('getItemsForCategory', () => {
    it('returns an array of items for a valid category', () => {
        const items = getItemsForCategory('bounce-house')
        expect(items).toBeInstanceOf(Array)
        expect(items.length).toBeGreaterThan(0)
    })

    it('returns an empty array for an unknown category', () => {
        expect(getItemsForCategory('does-not-exist')).toEqual([])
    })

    it('returns an empty array when categoryId is undefined', () => {
        expect(getItemsForCategory(undefined)).toEqual([])
    })

    it('returns items that each have the required shape', () => {
        const items = getItemsForCategory('bounce-house')
        for (const item of items) {
            expect(item).toHaveProperty('id')
            expect(item).toHaveProperty('name')
            expect(typeof item.cost).toBe('number')
            expect(item.cost).toBeGreaterThan(0)
            expect(Array.isArray(item.features)).toBe(true)
            expect(Array.isArray(item.description)).toBe(true)
        }
    })

    it('returns different items for different categories', () => {
        const bounceItems = getItemsForCategory('bounce-house')
        const slideItems = getItemsForCategory('dry-slides')
        const bounceIds = bounceItems.map(i => i.id)
        const slideIds = slideItems.map(i => i.id)
        // No item id should appear in both categories
        expect(bounceIds.some(id => slideIds.includes(id))).toBe(false)
    })
})

describe('getRentalItem', () => {
    it('returns the correct item for a valid category and itemId', () => {
        const item = getRentalItem('bounce-house', 'rainbow-castle')
        expect(item).toBeDefined()
        expect(item?.id).toBe('rainbow-castle')
    })

    it('returns undefined for an unknown itemId within a valid category', () => {
        expect(getRentalItem('bounce-house', 'this-does-not-exist')).toBeUndefined()
    })

    it('returns undefined for an unknown categoryId', () => {
        expect(getRentalItem('unknown-category', 'rainbow-castle')).toBeUndefined()
    })

    it('returns undefined when both args are undefined', () => {
        expect(getRentalItem(undefined, undefined)).toBeUndefined()
    })

    it('returned item has a positive cost', () => {
        const item = getRentalItem('bounce-house', 'rainbow-castle')
        expect(item?.cost).toBeGreaterThan(0)
    })

    it('returned item has at least one feature', () => {
        const item = getRentalItem('bounce-house', 'rainbow-castle')
        expect(item?.features.length).toBeGreaterThan(0)
    })
})
