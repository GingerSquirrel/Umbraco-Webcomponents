/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: 'src',
  base: '/',
  build: {
    outDir: '../dist',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]'
      }
    }
  },
  server: {
    port: 3000
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.resolve(__dirname, 'src')],
        additionalData: `
          $umb: ${process.env.VITE_UMB === 'true'};
          @use "global/styles/mixins.scss" as *;
          @use "global/styles/typography.scss" as *;
          @use "global/styles/fonts.scss" as *;
          @use "global/styles/shadows.scss" as *;
        `
      }
    }
  },
  test: {
    globals: true,
    
    projects: [
      {
        name: 'unit',
        test: {
          name: 'unit',
          include: ['**/*.{test,spec}.{js,ts}'],
          exclude: ['**/*.stories.{js,ts}', '**/stories/**'],
          environment: 'jsdom',
          globals: true,
          environmentOptions: {
            jsdom: {
              url: 'http://localhost:3000'
            }
          }
        }
      },
      {
        name: 'storybook',
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook')
          })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium'
              }
            ],
            providerOptions: {
              launch: {
                args: [
                  '--no-sandbox',
                  '--disable-setuid-sandbox',
                  '--disable-dev-shm-usage'
                ]
              }
            }
          },
          setupFiles: [path.resolve(dirname, '.storybook/vitest.setup.ts')],
          testTimeout: 60000,
          hookTimeout: 30000
        }
      }
    ],
    // Coverage configuration
    coverage: {
      provider: 'v8', // or 'c8' for older versions
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'dist/',
        '.storybook/',
        '**/*.stories.@(js|jsx|ts|tsx)',
        '**/*.config.@(js|ts)',
        'coverage/**',
        'test/**',
        'tests/**'
      ],
      include: [
        'src/**/*.{js,ts,jsx,tsx}',
        '!src/**/*.stories.@(js|jsx|ts|tsx)',
        '!src/**/*.test.@(js|jsx|ts|tsx)',
        '!src/**/*.spec.@(js|jsx|ts|tsx)'
      ],
      // Set coverage thresholds
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        },
        // Per-file thresholds
        'src/components/**/*.{js,ts}': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        }
      },
      // Fail if coverage is below thresholds
      skipFull: false,
      all: true
    },
    environment: 'jsdom', // For web components testing
    globals: true,
    setupFiles: ['./test/setup.ts']
  }
});