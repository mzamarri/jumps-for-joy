import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../../test/utils'
import RentalItemCard from 'components/ui/rental-item-card'
import { Route, Routes } from 'react-router'

const mockContent = {
    name: 'Rainbow Castle Bounce House',
    cost: 165,
    smallDescription: 'A bright, classic bounce house.',
    featuredItem: true,
    slug: 'rainbow-castle',
    thumbnailImage: {
        contentType: 'image/png',
        url: 'test-image-stub.png',
    },
}

function renderCard(content = mockContent) {
    return render(<RentalItemCard categorySlug="bounce-house" content={content} />)
}

function renderCardWithRoutes(content = mockContent) {
    return render(
        <Routes>
            <Route path="/" element={<RentalItemCard categorySlug="bounce-house" content={content} />} />
            <Route path="/rentals/:categorySlug/:itemSlug" element={<h1>Rental Details</h1>} />
        </Routes>,
    )
}

describe('RentalItemCard', () => {
    describe('rendering', () => {
        it('displays the item name', () => {
            renderCard()
            expect(screen.getByText('Rainbow Castle Bounce House')).toBeInTheDocument()
        })

        it('displays the item cost', () => {
            renderCard()
            expect(screen.getByText('$165')).toBeInTheDocument()
        })

        it('displays the item summary', () => {
            renderCard()
            expect(screen.getByText('A bright, classic bounce house.')).toBeInTheDocument()
        })

        it('renders an image with the correct alt text', () => {
            renderCard()
            expect(screen.getByAltText('Rainbow Castle Bounce House')).toBeInTheDocument()
        })

        it('renders the Add to Cart button', () => {
            renderCard()
            expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
        })

        it('renders a fallback when item has no image', () => {
            renderCard({ ...mockContent, thumbnailImage: null })
            expect(screen.getByText(/no image available/i)).toBeInTheDocument()
        })
    })

    describe('Add to Cart', () => {
        it('adds the item to cart when the button is clicked', async () => {
            const user = userEvent.setup()
            renderCard()

            await user.click(screen.getByRole('button', { name: /add to cart/i }))

            expect(screen.getByText(/rainbow castle bounce house successfully added/i)).toBeInTheDocument()
            await waitFor(() => {
                const stored = JSON.parse(localStorage.getItem('jump-for-joy-cart') ?? '{}')
                expect(stored.items).toEqual([
                    expect.objectContaining({
                        id: 'rainbow-castle',
                        name: 'Rainbow Castle Bounce House',
                        cost: 165,
                        quantity: 1,
                        description: 'A bright, classic bounce house.',
                    }),
                ])
            })
        })

        it('does not navigate to item detail when Add to Cart is clicked', async () => {
            const user = userEvent.setup()
            renderCardWithRoutes()

            await user.click(screen.getByRole('button', { name: /add to cart/i }))

            expect(screen.queryByRole('heading', { name: /rental details/i })).not.toBeInTheDocument()
        })
    })

    describe('navigation', () => {
        it('is keyboard focusable', () => {
            renderCard()
            const card = screen.getByRole('link')
            expect(card).toHaveAttribute('tabIndex', '0')
        })

        it('has role="link" for accessibility', () => {
            renderCard()
            expect(screen.getByRole('link')).toBeInTheDocument()
        })

        it('navigates to item details when the card is clicked', async () => {
            const user = userEvent.setup()
            renderCardWithRoutes()

            await user.click(screen.getByRole('link'))

            expect(screen.getByRole('heading', { name: /rental details/i })).toBeInTheDocument()
        })

        it('navigates to item details from keyboard Enter', async () => {
            const user = userEvent.setup()
            renderCardWithRoutes()

            screen.getByRole('link').focus()
            await user.keyboard('{Enter}')

            expect(screen.getByRole('heading', { name: /rental details/i })).toBeInTheDocument()
        })
    })
})
