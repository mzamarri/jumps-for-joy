import { describe, it, expect, beforeEach } from 'vitest'
import { act } from '@testing-library/react'
import { renderHook } from '../../test/utils'
import { CartProvider, useCart } from 'context/cart-context'

const mockItem = {
    id: 'rainbow-castle',
    name: 'Rainbow Castle Bounce House',
    cost: 165,
    description: 'A bright, classic bounce house.',
    quantity: 1,
    categoryId: 'bounce-house',
}

const anotherItem = {
    id: 'party-palace',
    name: 'Party Palace Bounce House',
    cost: 185,
    description: 'A larger bounce house for parties.',
    quantity: 1,
    categoryId: 'bounce-house',
}

/**
 * We render the hook inside CartProvider directly here (no Router needed),
 * so we use the raw renderHook from @testing-library/react with an explicit wrapper.
 */
import { renderHook as rtlRenderHook } from '@testing-library/react'
import type { ReactNode } from 'react'

function wrapper({ children }: { children: ReactNode }) {
    return <CartProvider>{children}</CartProvider>
}

function setup() {
    return rtlRenderHook(() => useCart(), { wrapper })
}

describe('CartContext', () => {
    describe('addItem', () => {
        it('adds a new item to an empty cart', () => {
            const { result } = setup()
            act(() => result.current.addItem(mockItem))
            expect(result.current.cart).toHaveLength(1)
            expect(result.current.cart[0].id).toBe('rainbow-castle')
        })

        it('increments quantity when the same item is added again', () => {
            const { result } = setup()
            act(() => result.current.addItem(mockItem))
            act(() => result.current.addItem(mockItem))
            expect(result.current.cart).toHaveLength(1)
            expect(result.current.cart[0].quantity).toBe(2)
        })

        it('adds multiple distinct items as separate entries', () => {
            const { result } = setup()
            act(() => result.current.addItem(mockItem))
            act(() => result.current.addItem(anotherItem))
            expect(result.current.cart).toHaveLength(2)
        })
    })

    describe('removeItem', () => {
        it('removes an item by id', () => {
            const { result } = setup()
            act(() => result.current.addItem(mockItem))
            act(() => result.current.removeItem(mockItem.id))
            expect(result.current.cart).toHaveLength(0)
        })

        it('does nothing when the id does not exist', () => {
            const { result } = setup()
            act(() => result.current.addItem(mockItem))
            act(() => result.current.removeItem('non-existent'))
            expect(result.current.cart).toHaveLength(1)
        })
    })

    describe('updateQuantity', () => {
        it('updates the quantity of an existing item', () => {
            const { result } = setup()
            act(() => result.current.addItem(mockItem))
            act(() => result.current.updateQuantity(mockItem.id, 5))
            expect(result.current.cart[0].quantity).toBe(5)
        })

        it('removes the item when quantity is set to 0', () => {
            const { result } = setup()
            act(() => result.current.addItem(mockItem))
            act(() => result.current.updateQuantity(mockItem.id, 0))
            expect(result.current.cart).toHaveLength(0)
        })

        it('removes the item when quantity is negative', () => {
            const { result } = setup()
            act(() => result.current.addItem(mockItem))
            act(() => result.current.updateQuantity(mockItem.id, -1))
            expect(result.current.cart).toHaveLength(0)
        })
    })

    describe('updateItem', () => {
        it('merges partial changes into an existing item', () => {
            const { result } = setup()
            act(() => result.current.addItem(mockItem))
            act(() => result.current.updateItem(mockItem.id, { cost: 999 }))
            expect(result.current.cart[0].cost).toBe(999)
            // Other fields should be unchanged
            expect(result.current.cart[0].name).toBe(mockItem.name)
        })
    })

    describe('clearCart', () => {
        it('empties all items from the cart', () => {
            const { result } = setup()
            act(() => result.current.addItem(mockItem))
            act(() => result.current.addItem(anotherItem))
            act(() => result.current.clearCart())
            expect(result.current.cart).toHaveLength(0)
        })
    })

    describe('totalItems', () => {
        it('is 0 for an empty cart', () => {
            const { result } = setup()
            expect(result.current.totalItems).toBe(0)
        })

        it('sums quantities across all items', () => {
            const { result } = setup()
            act(() => result.current.addItem({ ...mockItem, quantity: 2 }))
            act(() => result.current.addItem({ ...anotherItem, quantity: 3 }))
            expect(result.current.totalItems).toBe(5)
        })
    })

    describe('localStorage persistence', () => {
        it('persists cart to localStorage after adding an item', async () => {
            const { result } = setup()
            act(() => result.current.addItem(mockItem))
            // Wait for the write effect to flush
            await act(async () => {})
            const stored = localStorage.getItem('jump-for-joy-cart')
            expect(stored).not.toBeNull()
            const parsed = JSON.parse(stored!)
            expect(parsed.items[0].id).toBe('rainbow-castle')
        })

        it('reads existing cart from localStorage on mount', async () => {
            // Pre-populate localStorage
            localStorage.setItem('jump-for-joy-cart', JSON.stringify({
                version: 1,
                items: [{ ...mockItem }],
            }))
            const { result } = rtlRenderHook(() => useCart(), { wrapper })
            // Wait for the hydration effect
            await act(async () => {})
            expect(result.current.cart).toHaveLength(1)
            expect(result.current.cart[0].id).toBe('rainbow-castle')
        })

        it('ignores stored carts with an unsupported version', async () => {
            localStorage.setItem('jump-for-joy-cart', JSON.stringify({
                version: 999,
                items: [{ ...mockItem }],
            }))

            const { result } = rtlRenderHook(() => useCart(), { wrapper })
            await act(async () => {})

            expect(result.current.cart).toEqual([])
        })

        it('filters invalid stored cart items during hydration', async () => {
            localStorage.setItem('jump-for-joy-cart', JSON.stringify({
                version: 1,
                items: [
                    { ...mockItem },
                    { id: 'bad-item', cost: 'free', quantity: 1 },
                    { id: 'zero-quantity', cost: 100, quantity: 0 },
                ],
            }))

            const { result } = rtlRenderHook(() => useCart(), { wrapper })
            await act(async () => {})

            expect(result.current.cart).toHaveLength(1)
            expect(result.current.cart[0].id).toBe('rainbow-castle')
        })

        it('recovers to an empty cart when localStorage contains invalid JSON', async () => {
            localStorage.setItem('jump-for-joy-cart', '{not json')

            const { result } = rtlRenderHook(() => useCart(), { wrapper })
            await act(async () => {})

            expect(result.current.cart).toEqual([])
        })
    })
})
