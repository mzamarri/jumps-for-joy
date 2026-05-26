import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router'
import { render } from '../test/utils'
import SuccessPage from './success'

function renderSuccessPage(initialEntry: string) {
    return render(
        <Routes>
            <Route path="/success" element={<SuccessPage />} />
        </Routes>,
        { initialEntries: [initialEntry] },
    )
}

describe('SuccessPage', () => {
    it('shows booking confirmation next steps by default', () => {
        renderSuccessPage('/success')

        expect(screen.getByRole('heading', { name: /we received your rental request/i })).toBeInTheDocument()
        expect(screen.getByText(/we will review your request details and follow up to confirm what we can fulfill/i)).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /browse rentals/i })).toHaveAttribute('href', '/rentals')
        expect(screen.getByRole('link', { name: /back home/i })).toHaveAttribute('href', '/')
    })

    it('shows contact-message success copy when source is contact', () => {
        renderSuccessPage('/success?source=contact')

        expect(screen.getByRole('heading', { name: /thanks for reaching out/i })).toBeInTheDocument()
        expect(screen.getByText(/your message was sent successfully/i)).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /view rentals/i })).toHaveAttribute('href', '/rentals')
    })
})
