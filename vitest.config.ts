import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./app/test/setup.ts'],
        css: false,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            include: ['app/**/*.{ts,tsx}'],
            exclude: [
                'app/test/**',
                'app/**/*.d.ts',
                'app/entry.client.tsx',
                'app/root.tsx',
                'app/catchall.tsx',
                'app/routes.ts',
            ],
        },
    },
    resolve: {
        alias: {
            components: fileURLToPath(new URL('./app/components', import.meta.url)),
            context: fileURLToPath(new URL('./app/context', import.meta.url)),
            data: fileURLToPath(new URL('./app/data', import.meta.url)),
            'app/test': fileURLToPath(new URL('./app/test', import.meta.url)),
        },
    },
})
