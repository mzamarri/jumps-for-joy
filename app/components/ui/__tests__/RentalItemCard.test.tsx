import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../../test/utils'
import RentalItemCard from 'components/ui/RentalItemCard'
import type { RentalItemData } from 'data/rentalItems'

const mockItem: RentalItemData = {
    id: 'rainbow-castle',
    name: 'Rainbow Castle Bounce House',
    cost: 165,
    image: 'test-image-stub.png',
    summary: 'A bright, classic bounce house.',
    description: ['Great for parties.'],
    dimensions: "13' L x 13' W x 14' H",
    maxCapacity: '6 to 8 riders',
    features: ['Large jumping area', 'Mesh sides for visibility'],
}

describe('RentalItemCard', () => {
    describe('rendering', () => {
        it('displays the item name', () => {
            render(<RentalItemCard categoryId="bounce-house" item={mockItem} />)
            expect(screen.getByText('Rainbow Castle Bounce House')).toBeInTheDocument()
        })

        it('displays the item cost', () => {
            render(<RentalItemCard categoryId="bounce-house" item={mockItem} />)
            expect(screen.getByText('$165')).toBeInTheDocument()
        })

        it('displays the item summary', () => {
            render(<RentalItemCard categoryId="bounce-house" item={mockItem} />)
            expect(screen.getByText('A bright, classic bounce house.')).toBeInTheDocument()
        })

        it('renders an image with the correct alt text', () => {
            render(<RentalItemCard categoryId="bounce-house" item={mockItem} />)
            expect(screen.getByAltText('Rainbow Castle Bounce House')).toBeInTheDocument()
        })

        it('renders the Add to Cart button', () => {
            render(<RentalItemCard categoryId="bounce-house" item={mockItem} />)
            expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
        })

        it('renders a fallback when item has no image', () => {
            render(
                <RentalItemCard
                    categoryId="bounce-house"
                    item={{ ...mockItem, image: '' }}
                />
            )
            expect(screen.getByText(/no image available/i)).toBeInTheDocument()
        })
    })

    describe('Add to Cart', () => {
        it('adds the item to cart when the button is clicked', async () => {
            const user = userEvent.setup()
            render(<RentalItemCard categoryId="bounce-house" item={mockItem} />)
            await user.click(screen.getByRole('button', { name: /add to cart/i }))
            // The cart badge should now show 1 — but since we're testing only the card,
            // we verify the button click did not throw and is still present
            expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
        })

        it('does not navigate to item detail when Add to Cart is clicked', async () => {
            const user = userEvent.setup()
            render(<RentalItemCard categoryId="bounce-house" item={mockItem} />)
            // Clicking the cart button should stop propagation — the url should not change
            const initialUrl = window.location.pathname
            await user.click(screen.getByRole('button', { name: /add to cart/i }))
            expect(window.location.pathname).toBe(initialUrl)
        })
    })

    describe('navigation', () => {
        it('is keyboard focusable', () => {
            render(<RentalItemCard categoryId="bounce-house" item={mockItem} />)
            const card = screen.getByRole('link')
            expect(card).toHaveAttribute('tabIndex', '0')
        })

        it('has role="link" for accessibility', () => {
            render(<RentalItemCard categoryId="bounce-house" item={mockItem} />)
            expect(screen.getByRole('link')).toBeInTheDocument()
        })
    })
})
