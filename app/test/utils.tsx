/**
 * Test utilities — wraps components with all providers they need.
 *
 * Usage:
 *   import { render, renderHook } from 'app/test/utils'
 *
 * These are drop-in replacements for @testing-library/react's render and
 * renderHook, but pre-wrapped with MemoryRouter, ToastProvider, CartProvider.
 */
import {
    render as rtlRender,
    renderHook as rtlRenderHook,
    type RenderOptions,
    type RenderHookOptions,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { CartProvider } from 'context/CartContext'
import { ToastProvider } from 'context/ToastContext'
import type { ReactNode } from 'react'

type WrapperOptions = {
    /** Initial URL path, e.g. '/rentals/bounce-house' */
    initialEntries?: string[]
}

function createWrapper({ initialEntries = ['/'] }: WrapperOptions = {}) {
    return function Wrapper({ children }: { children: ReactNode }) {
        return (
            <MemoryRouter initialEntries={initialEntries}>
                <ToastProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </ToastProvider>
            </MemoryRouter>
        )
    }
}

function render(
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'> & WrapperOptions,
) {
    const { initialEntries, ...renderOptions } = options ?? {}
    return rtlRender(ui, {
        wrapper: createWrapper({ initialEntries }),
        ...renderOptions,
    })
}

function renderHook<T>(
    hookFn: () => T,
    options?: Omit<RenderHookOptions<T>, 'wrapper'> & WrapperOptions,
) {
    const { initialEntries, ...hookOptions } = options ?? {}
    return rtlRenderHook(hookFn, {
        wrapper: createWrapper({ initialEntries }),
        ...hookOptions,
    })
}

export * from '@testing-library/react'
export { render, renderHook }
