import { useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router'
import { CartProvider } from 'context/cart-context'
import { ToastProvider } from 'context/toast-context'
import ReviewSection from './review'
import { initialRequestDraft, type CartItem, type CartOutletContext, type RequestDraft } from './types'
import { sendBookingRequestEmails } from '../../lib/emailjs-client'
import { delay } from '../../lib/time'

vi.mock('../../lib/emailjs-client', () => ({
    sendBookingRequestEmails: vi.fn(),
}))

vi.mock('../../lib/time', () => ({
    delay: vi.fn(() => Promise.resolve()),
}))

const mockedSendBookingRequestEmails = vi.mocked(sendBookingRequestEmails)
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
        mockedSendBookingRequestEmails.mockReset()
        mockedDelay.mockClear()
        vi.spyOn(console, 'log').mockImplementation(() => undefined)
        vi.spyOn(console, 'error').mockImplementation(() => undefined)
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

        expect(mockedSendBookingRequestEmails).not.toHaveBeenCalled()
    })

    it('shows a clear message when trying to submit with an empty cart', async () => {
        const user = userEvent.setup()
        renderReview()

        await user.click(screen.getByLabelText(/i understand this is a request/i))
        await user.click(screen.getByRole('button', { name: /submit request/i }))

        expect(mockedSendBookingRequestEmails).not.toHaveBeenCalled()
        expect(screen.getByText(/add at least one rental item/i)).toBeInTheDocument()
    })

    it('sends a complete cart request payload to EmailJS, logs success after a delay, and opens the success page', async () => {
        const user = userEvent.setup()
        mockedSendBookingRequestEmails.mockResolvedValue(undefined)
        renderReview({ cartItems: [cartItem] })

        await waitFor(() => expect(screen.getByText('Rainbow Castle Bounce House')).toBeInTheDocument())
        await user.click(screen.getByLabelText(/i understand this is a request/i))
        await user.click(screen.getByRole('button', { name: /submit request/i }))

        await waitFor(() => expect(mockedSendBookingRequestEmails).toHaveBeenCalledTimes(1))
        expect(mockedSendBookingRequestEmails).toHaveBeenCalledWith(expect.objectContaining({
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

    it('applies details-page phone masking and blocks invalid phone saves while editing', async () => {
        const user = userEvent.setup()
        renderReview()

        await user.click(screen.getAllByRole('button', { name: /edit/i })[2])
        const phoneInput = screen.getByLabelText(/phone number/i)

        await user.clear(phoneInput)
        await user.type(phoneInput, 'abc555123456789')

        expect(phoneInput).toHaveValue('(555) 123-4567')

        await user.clear(phoneInput)
        await user.type(phoneInput, '555')

        expect(phoneInput).toHaveValue('(555)')
        expect(screen.getAllByText(/enter a 10-digit phone number/i)).toHaveLength(2)
        expect(screen.getByRole('button', { name: /save/i })).toBeDisabled()
    })

    it('formats ZIP values and blocks invalid ZIP saves while editing', async () => {
        const user = userEvent.setup()
        renderReview()

        await user.click(screen.getAllByRole('button', { name: /edit/i })[8])
        const zipInput = screen.getByLabelText(/zip/i)

        await user.clear(zipInput)
        await user.type(zipInput, '902101234extra')

        expect(zipInput).toHaveValue('90210-1234')

        await user.clear(zipInput)
        await user.type(zipInput, '12')

        expect(zipInput).toHaveValue('12')
        expect(screen.getAllByText(/enter a valid zip code/i)).toHaveLength(2)
        expect(screen.getByRole('button', { name: /save/i })).toBeDisabled()
    })

    it('shows form validation errors in the submit alert without logging them as code errors', async () => {
        const user = userEvent.setup()
        renderReview({
            draft: {
                ...validDraft,
                email: 'not-an-email',
            },
            cartItems: [cartItem],
        })

        await waitFor(() => expect(screen.getByText('Rainbow Castle Bounce House')).toBeInTheDocument())
        await user.click(screen.getByLabelText(/i understand this is a request/i))
        await user.click(screen.getByRole('button', { name: /submit request/i }))

        expect(await screen.findByRole('alert')).toHaveTextContent(/enter a valid email address/i)
        expect(mockedSendBookingRequestEmails).not.toHaveBeenCalled()
        expect(console.error).not.toHaveBeenCalled()
    })

    it('mirrors edit validation errors in the submit alert area', async () => {
        const user = userEvent.setup()
        renderReview()

        await user.click(screen.getAllByRole('button', { name: /edit/i })[3])
        const emailInput = screen.getByLabelText(/email address/i)

        await user.clear(emailInput)
        await user.type(emailInput, 'bad-email')

        expect(await screen.findByRole('alert')).toHaveTextContent(/enter a valid email address/i)
        expect(screen.getByRole('button', { name: /save/i })).toBeDisabled()
    })

    it('surfaces EmailJS errors and re-enables the submit button', async () => {
        const user = userEvent.setup()
        const emailError = new Error('EmailJS failed')
        mockedSendBookingRequestEmails.mockRejectedValue(emailError)
        renderReview({ cartItems: [cartItem] })

        await waitFor(() => expect(screen.getByText('Rainbow Castle Bounce House')).toBeInTheDocument())
        await user.click(screen.getByLabelText(/i understand this is a request/i))
        await user.click(screen.getByRole('button', { name: /submit request/i }))

        expect(await screen.findByRole('alert')).toHaveTextContent(/there was an error sending your request/i)
        expect(console.error).toHaveBeenCalledWith('Booking request email failed', emailError)
        expect(screen.getByRole('button', { name: /submit request/i })).toBeEnabled()
        expect(mockedDelay).not.toHaveBeenCalled()
    })
})
