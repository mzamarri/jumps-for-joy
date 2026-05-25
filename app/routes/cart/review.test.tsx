import { useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router'
import { CartProvider } from 'context/cart-context'
import { ToastProvider } from 'context/toast-context'
import ReviewSection from './review'
import { initialRequestDraft, type CartItem, type CartOutletContext, type RequestDraft } from './types'
import { sendCartRequestEmails } from '../../lib/emailjs-client'
import { delay } from '../../lib/time'

vi.mock('../../lib/emailjs-client', () => ({
    sendCartRequestEmails: vi.fn(),
}))

vi.mock('../../lib/time', () => ({
    delay: vi.fn(() => Promise.resolve()),
}))

const mockedSendCartRequestEmails = vi.mocked(sendCartRequestEmails)
const mockedDelay = vi.mocked(delay)

const validDraft: RequestDraft = {
    ...initialRequestDraft,
    firstName: 'Jane',
    lastName: 'Doe',
    phoneNumber: '(555) 123-4567',
    email: 'jane@example.com',
    street: '123 Party Lane',
    unit: 'Unit B',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    date: '2026-06-15',
    time: '13:30',
    duration: 'same day',
    eventType: '',
    surfaceType: 'Grass',
    notes: 'Gate code 1234',
}

const cartItem: CartItem = {
    id: 'rainbow-castle',
    name: 'Rainbow Castle Bounce House',
    cost: 165,
    description: 'A bright, classic bounce house.',
    quantity: 2,
    image: 'test-image-stub.png',
}

function DraftOutlet({ initialDraft = validDraft }: { initialDraft?: RequestDraft }) {
    const [draft, setDraft] = useState<RequestDraft>(initialDraft)
    const context: CartOutletContext = { draft, setDraft }

    return <Outlet context={context} />
}

function renderReview({ draft = validDraft, cartItems = [] }: { draft?: RequestDraft; cartItems?: CartItem[] } = {}) {
    if (cartItems.length > 0) {
        localStorage.setItem('jump-for-joy-cart', JSON.stringify({
            version: 1,
            items: cartItems,
        }))
    }

    return render(
        <MemoryRouter initialEntries={['/review']}>
            <ToastProvider>
                <CartProvider>
                    <Routes>
                        <Route element={<DraftOutlet initialDraft={draft} />}>
                            <Route path="/review" element={<ReviewSection />} />
                            <Route path="/details" element={<h1>Details Page</h1>} />
                        </Route>
                        <Route path="/success" element={<h1>Success Page</h1>} />
                    </Routes>
                </CartProvider>
            </ToastProvider>
        </MemoryRouter>,
    )
}

describe('ReviewSection', () => {
    beforeEach(() => {
        mockedSendCartRequestEmails.mockReset()
        mockedDelay.mockClear()
        vi.spyOn(console, 'log').mockImplementation(() => undefined)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders customer details and empty-cart state from the draft/cart context', () => {
        renderReview()

        expect(screen.getByText('Jane')).toBeInTheDocument()
        expect(screen.getByText('Doe')).toBeInTheDocument()
        expect(screen.getByText('No items have been added to your cart yet.')).toBeInTheDocument()
    })

    it('does not submit until the request acknowledgement is checked', async () => {
        const user = userEvent.setup()
        renderReview({ cartItems: [cartItem] })

        await waitFor(() => expect(screen.getByText('Rainbow Castle Bounce House')).toBeInTheDocument())
        await user.click(screen.getByRole('button', { name: /submit request/i }))

        expect(mockedSendCartRequestEmails).not.toHaveBeenCalled()
    })

    it('shows a clear message when trying to submit with an empty cart', async () => {
        const user = userEvent.setup()
        renderReview()

        await user.click(screen.getByLabelText(/i understand this is a request/i))
        await user.click(screen.getByRole('button', { name: /submit request/i }))

        expect(mockedSendCartRequestEmails).not.toHaveBeenCalled()
        expect(screen.getByText(/add at least one rental item/i)).toBeInTheDocument()
    })

    it('sends a complete cart request payload to EmailJS, logs success after a delay, and opens the success page', async () => {
        const user = userEvent.setup()
        mockedSendCartRequestEmails.mockResolvedValue(undefined)
        renderReview({ cartItems: [cartItem] })

        await waitFor(() => expect(screen.getByText('Rainbow Castle Bounce House')).toBeInTheDocument())
        await user.click(screen.getByLabelText(/i understand this is a request/i))
        await user.click(screen.getByRole('button', { name: /submit request/i }))

        await waitFor(() => expect(mockedSendCartRequestEmails).toHaveBeenCalledTimes(1))
        expect(mockedSendCartRequestEmails).toHaveBeenCalledWith(expect.objectContaining({
            fullName: 'Jane Doe',
            firstName: 'Jane',
            email: 'jane@example.com',
            phoneNumber: '(555) 123-4567',
            date: '2026-06-15',
            time: '13:30',
            duration: 'same day',
            eventType: 'Not provided',
            surfaceType: 'Grass',
            fullAddress: '123 Party Lane\nUnit B\nAustin, TX 78701',
            itemsSummary: '2 x Rainbow Castle Bounce House - $330.00',
            notes: 'Gate code 1234',
            subtotal: '$330.00',
            deliveryFee: '$25.00',
            total: '$355.00',
            submittedAt: expect.any(String),
        }))
        expect(mockedDelay).toHaveBeenCalledWith(2000)
        expect(console.log).toHaveBeenCalledWith('Successfully sent')
        expect(await screen.findByRole('heading', { name: /success page/i })).toBeInTheDocument()
    })

    it('allows reviewed fields to be edited and saved before submission', async () => {
        const user = userEvent.setup()
        renderReview()

        await user.click(screen.getAllByRole('button', { name: /edit/i })[0])
        const firstNameInput = screen.getByLabelText(/first name/i)
        await user.clear(firstNameInput)
        await user.type(firstNameInput, 'Janet')
        await user.click(screen.getByRole('button', { name: /save/i }))

        expect(screen.getByText('Janet')).toBeInTheDocument()
        expect(screen.queryByText('Jane')).not.toBeInTheDocument()
    })

    it('surfaces EmailJS errors and re-enables the submit button', async () => {
        const user = userEvent.setup()
        mockedSendCartRequestEmails.mockRejectedValue(new Error('EmailJS failed'))
        renderReview({ cartItems: [cartItem] })

        await waitFor(() => expect(screen.getByText('Rainbow Castle Bounce House')).toBeInTheDocument())
        await user.click(screen.getByLabelText(/i understand this is a request/i))
        await user.click(screen.getByRole('button', { name: /submit request/i }))

        expect(await screen.findByRole('alert')).toHaveTextContent(/there was an error sending your request/i)
        expect(screen.getByRole('button', { name: /submit request/i })).toBeEnabled()
        expect(mockedDelay).not.toHaveBeenCalled()
    })
})
