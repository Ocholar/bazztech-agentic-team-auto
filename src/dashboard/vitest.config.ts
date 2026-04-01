import tsconfigPaths from 'vite-tsconfig-paths';

export default {
    plugins: [tsconfigPaths()],
    test: {
        environment: 'node',
        globals: true,
        include: ['src/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
        },
    },
};
