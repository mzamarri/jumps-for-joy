import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../../test/utils'
import Dropdown from 'components/ui/dropdown'

const items = [
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'faq', label: 'FAQ', path: '/faq' },
    { id: 'contact', label: 'Contact', path: '/contact' },
]

describe('Dropdown', () => {
    describe('rendering', () => {
        it('renders the trigger button with the given label', () => {
            render(<Dropdown label="More" items={items} />)
            expect(screen.getByRole('button', { name: /more/i })).toBeInTheDocument()
        })

        it('does not show the menu by default', () => {
            render(<Dropdown label="More" items={items} />)
            expect(screen.queryByRole('menu')).not.toBeInTheDocument()
        })

        it('shows the chevron icon by default', () => {
            render(<Dropdown label="More" items={items} />)
            // ChevronDown renders an SVG inside the button
            const button = screen.getByRole('button')
            expect(button.querySelector('svg')).toBeInTheDocument()
        })

        it('hides the chevron when showChevron is false', () => {
            render(<Dropdown label="More" items={items} showChevron={false} />)
            const button = screen.getByRole('button')
            expect(button.querySelector('svg')).not.toBeInTheDocument()
        })
    })

    describe('open / close behaviour', () => {
        it('opens the menu when the trigger is clicked', async () => {
            const user = userEvent.setup()
            render(<Dropdown label="More" items={items} />)
            await user.click(screen.getByRole('button'))
            expect(screen.getByRole('menu')).toBeInTheDocument()
        })

        it('renders all menu items when open', async () => {
            const user = userEvent.setup()
            render(<Dropdown label="More" items={items} />)
            await user.click(screen.getByRole('button'))
            expect(screen.getByRole('menuitem', { name: /about us/i })).toBeInTheDocument()
            expect(screen.getByRole('menuitem', { name: /faq/i })).toBeInTheDocument()
            expect(screen.getByRole('menuitem', { name: /contact/i })).toBeInTheDocument()
        })

        it('closes the menu when clicked again (toggle)', async () => {
            const user = userEvent.setup()
            render(<Dropdown label="More" items={items} />)
            await user.click(screen.getByRole('button'))
            await user.click(screen.getByRole('button'))
            expect(screen.queryByRole('menu')).not.toBeInTheDocument()
        })

        it('closes the menu when a menu item is clicked', async () => {
            const user = userEvent.setup()
            render(<Dropdown label="More" items={items} />)
            await user.click(screen.getByRole('button'))
            await user.click(screen.getByRole('menuitem', { name: /about us/i }))
            expect(screen.queryByRole('menu')).not.toBeInTheDocument()
        })

        it('closes the menu when the Escape key is pressed', async () => {
            const user = userEvent.setup()
            render(<Dropdown label="More" items={items} />)
            await user.click(screen.getByRole('button'))
            expect(screen.getByRole('menu')).toBeInTheDocument()
            await user.keyboard('{Escape}')
            expect(screen.queryByRole('menu')).not.toBeInTheDocument()
        })

        it('closes the menu when clicking outside the component', async () => {
            const user = userEvent.setup()
            render(
                <div>
                    <Dropdown label="More" items={items} />
                    <div data-testid="outside">outside</div>
                </div>
            )
            await user.click(screen.getByRole('button'))
            expect(screen.getByRole('menu')).toBeInTheDocument()
            await user.click(screen.getByTestId('outside'))
            expect(screen.queryByRole('menu')).not.toBeInTheDocument()
        })
    })

    describe('aria attributes', () => {
        it('sets aria-expanded=false when closed', () => {
            render(<Dropdown label="More" items={items} />)
            expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
        })

        it('sets aria-expanded=true when open', async () => {
            const user = userEvent.setup()
            render(<Dropdown label="More" items={items} />)
            await user.click(screen.getByRole('button'))
            expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
        })
    })

    describe('fullWidth mode', () => {
        it('renders menu without positional width constraints when fullWidth=true', async () => {
            const user = userEvent.setup()
            render(<Dropdown label="Menu" items={items} fullWidth />)
            await user.click(screen.getByRole('button'))
            const menu = screen.getByRole('menu')
            expect(menu.className).toContain('left-0')
            expect(menu.className).toContain('right-0')
        })
    })
})
