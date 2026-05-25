import { useState, type ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router'
import DetailsSection from './details'
import { initialRequestDraft, type CartOutletContext, type RequestDraft } from './types'

function DraftOutlet({ children, initialDraft = {} }: { children?: ReactNode; initialDraft?: Partial<RequestDraft> }) {
    const [draft, setDraft] = useState<RequestDraft>({
        ...initialRequestDraft,
        ...initialDraft,
    })
    const context: CartOutletContext = { draft, setDraft }

    return children ? <>{children}</> : <Outlet context={context} />
}

function renderDetails(initialDraft?: Partial<RequestDraft>) {
    return render(
        <MemoryRouter initialEntries={['/details']}>
            <Routes>
                <Route element={<DraftOutlet initialDraft={initialDraft} />}>
                    <Route path="/details" element={<DetailsSection />} />
                    <Route path="/review" element={<h1>Review Page</h1>} />
                </Route>
                <Route path="/cart" element={<h1>Cart Page</h1>} />
            </Routes>
        </MemoryRouter>,
    )
}

async function fillRequiredDetails() {
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/first name/i), 'Jane')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/phone number/i), '5551234567')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/street address/i), '123 Party Lane')
    await user.type(screen.getByLabelText(/city/i), 'Austin')
    await user.type(screen.getByLabelText(/state/i), 'tx')
    await user.type(screen.getByLabelText(/zip/i), '78701')
    fireEvent.change(screen.getByLabelText(/rental date/i), { target: { value: '2026-06-15' } })
    fireEvent.change(screen.getByLabelText(/setup time/i), { target: { value: '13:30' } })
    await user.selectOptions(screen.getByLabelText(/duration/i), 'same day')
    await user.type(screen.getByLabelText(/surface type/i), 'Grass')

    return user
}

describe('DetailsSection validation', () => {
    it('keeps the review button muted until every required field is valid', async () => {
        renderDetails()

        const reviewButton = screen.getByRole('button', { name: /review request/i })
        expect(reviewButton.className).toContain('bg-muted')

        await fillRequiredDetails()

        expect(reviewButton.className).toContain('bg-accent')
    })

    it('reveals required-field errors after an attempted review with missing data', async () => {
        const user = userEvent.setup()
        renderDetails()

        await user.click(screen.getByRole('button', { name: /review request/i }))

        expect(screen.getByText(/first name is required/i)).toBeInTheDocument()
        expect(screen.getByText(/phone number is required/i)).toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: /review page/i })).not.toBeInTheDocument()
    })

    it('formats phone numbers while blocking letters and extra digits', async () => {
        const user = userEvent.setup()
        renderDetails()

        const phoneInput = screen.getByLabelText(/phone number/i)
        await user.type(phoneInput, '555abc123456789')

        expect(phoneInput).toHaveValue('(555) 123-4567')
    })

    it('allows backspace to delete phone digits even when mask characters are present', async () => {
        const user = userEvent.setup()
        renderDetails()

        const phoneInput = screen.getByLabelText(/phone number/i)
        await user.type(phoneInput, '123')
        expect(phoneInput).toHaveValue('(123)')

        await user.keyboard('{Backspace}')
        expect(phoneInput).toHaveValue('(12')

        await user.keyboard('{Backspace}')
        expect(phoneInput).toHaveValue('(1')
    })

    it('normalizes state and ZIP input as users type', async () => {
        const user = userEvent.setup()
        renderDetails()

        await user.type(screen.getByLabelText(/state/i), 'texas')
        await user.type(screen.getByLabelText(/zip/i), '7870112345')

        expect(screen.getByLabelText(/state/i)).toHaveValue('TE')
        expect(screen.getByLabelText(/zip/i)).toHaveValue('78701-1234')
    })

    it('navigates to review only after valid required details are entered', async () => {
        renderDetails()
        const user = await fillRequiredDetails()

        await user.click(screen.getByRole('button', { name: /review request/i }))

        expect(screen.getByRole('heading', { name: /review page/i })).toBeInTheDocument()
    })
})
