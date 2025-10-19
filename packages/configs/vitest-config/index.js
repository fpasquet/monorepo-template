import { defineConfig } from 'vitest/config';

/**
 * Shared Vitest configuration.
 * @type {import('vitest/config').UserConfigExport}
 */
const config = defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'src/**/*.test.ts', 'src/**/*.spec.ts'],
    },
  },
});

export default config;
