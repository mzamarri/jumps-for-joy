import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router'
import { render } from '../test/utils'
import ContactPage from './contact'
import { sendContactEmails } from '../lib/emailjs-client'
import { delay } from '../lib/time'

vi.mock('../lib/emailjs-client', () => ({
    sendContactEmails: vi.fn(),
}))

vi.mock('../lib/time', () => ({
    delay: vi.fn(() => Promise.resolve()),
}))

const mockedSendContactEmails = vi.mocked(sendContactEmails)
const mockedDelay = vi.mocked(delay)

function renderContactRoute() {
    return render(
        <Routes>
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/success" element={<h1>Success Page</h1>} />
        </Routes>,
        { initialEntries: ['/contact'] },
    )
}

function getContactForm() {
    return screen.getByRole('button', { name: /submit inquiry/i }).closest('form') as HTMLFormElement
}

describe('ContactPage', () => {
    beforeEach(() => {
        mockedSendContactEmails.mockReset()
        mockedDelay.mockClear()
        vi.spyOn(console, 'log').mockImplementation(() => undefined)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders the contact form and business contact details', () => {
        renderContactRoute()

        expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument()
        expect(screen.getByText('(555) 555-0199')).toBeInTheDocument()
        expect(screen.getByText('bookings@jumpforjoy.com')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /submit inquiry/i })).toBeInTheDocument()
    })

    it('does not send when required fields are missing', () => {
        renderContactRoute()

        fireEvent.submit(getContactForm())

        expect(mockedSendContactEmails).not.toHaveBeenCalled()
        expect(screen.getByText(/please enter your name, email, and message/i)).toBeInTheDocument()
    })

    it('shows a validation message for malformed email addresses', async () => {
        const user = userEvent.setup()
        renderContactRoute()

        await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
        await user.type(screen.getByLabelText(/^email/i), 'not-an-email')
        await user.type(screen.getByLabelText(/message/i), 'Do you have rentals available?')
        fireEvent.submit(getContactForm())

        expect(mockedSendContactEmails).not.toHaveBeenCalled()
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    })

    it('sends trimmed form values to EmailJS, logs success after a delay, and opens the success page', async () => {
        const user = userEvent.setup()
        mockedSendContactEmails.mockResolvedValue(undefined)
        renderContactRoute()

        await user.type(screen.getByLabelText(/full name/i), ' Jane Doe ')
        await user.type(screen.getByLabelText(/^email/i), ' jane@example.com ')
        await user.type(screen.getByLabelText(/phone/i), ' (555) 123-4567 ')
        await user.type(screen.getByLabelText(/message/i), ' Please send package details. ')
        fireEvent.submit(getContactForm())

        await waitFor(() => expect(mockedSendContactEmails).toHaveBeenCalledTimes(1))
        expect(mockedSendContactEmails).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Jane Doe',
            email: 'jane@example.com',
            phone: '(555) 123-4567',
            message: 'Please send package details.',
            submittedAt: expect.any(String),
        }))
        expect(mockedDelay).toHaveBeenCalledWith(2000)
        expect(console.log).toHaveBeenCalledWith('Successfully sent')
        expect(await screen.findByRole('heading', { name: /success page/i })).toBeInTheDocument()
    })

    it('uses "Not provided" when the optional phone field is blank', async () => {
        const user = userEvent.setup()
        mockedSendContactEmails.mockResolvedValue(undefined)
        renderContactRoute()

        await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
        await user.type(screen.getByLabelText(/^email/i), 'jane@example.com')
        await user.type(screen.getByLabelText(/message/i), 'Can you help with a school event?')
        fireEvent.submit(getContactForm())

        await waitFor(() => expect(mockedSendContactEmails).toHaveBeenCalledTimes(1))
        expect(mockedSendContactEmails).toHaveBeenCalledWith(expect.objectContaining({
            phone: 'Not provided',
        }))
    })

    it('surfaces EmailJS failures without clearing the entered values', async () => {
        const user = userEvent.setup()
        mockedSendContactEmails.mockRejectedValue(new Error('EmailJS service unavailable'))
        renderContactRoute()

        await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
        await user.type(screen.getByLabelText(/^email/i), 'jane@example.com')
        await user.type(screen.getByLabelText(/message/i), 'Please contact me.')
        fireEvent.submit(getContactForm())

        expect(await screen.findByRole('alert')).toHaveTextContent(/there was an error sending your message/i)
        expect(screen.getByLabelText(/full name/i)).toHaveValue('Jane Doe')
        expect(mockedDelay).not.toHaveBeenCalled()
    })
})
