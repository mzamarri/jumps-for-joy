import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Auto-cleanup DOM after each test
afterEach(() => {
    cleanup()
    localStorage.clear()
})

// Mock image imports so asset files don't cause errors in jsdom
vi.mock('*.png', () => ({ default: 'test-image-stub.png' }))
vi.mock('*.jpg', () => ({ default: 'test-image-stub.jpg' }))
vi.mock('*.svg', () => ({ default: 'test-image-stub.svg' }))
