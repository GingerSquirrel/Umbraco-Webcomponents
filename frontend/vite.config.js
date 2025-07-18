/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import basicSsl from '@vitejs/plugin-basic-ssl';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    // Removed basicSsl() as we're using manual HTTPS configuration
  ],
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
    port: 3000,
    host: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost+2-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost+2.pem'))
    },
    historyApiFallback: false,
    headers: {
      'Service-Worker-Allowed': '/'
    }
  },
  // Ensure service worker is served with correct MIME type
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // New in recent versions
        includePaths: [path.resolve(__dirname, 'src')],
        additionalData: `
          $umb: ${process.env.VITE_UMB === 'true'};
          @use "/global/styles/mixins.scss" as *;
          @use "/global/styles/typography.scss" as *;
          @use "/global/styles/fonts.scss" as *;
          @use "/global/styles/shadows.scss" as *;
        `
        // Remove SCSS imports until files exist
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
              url: 'https://localhost:3000'
            }
          }
        }
      },
      {
        name: 'storybook',
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(__dirname, '.storybook')
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
                  '--disable-dev-shm-usage',
                  '--ignore-certificate-errors',
                  '--allow-running-insecure-content'
                ]
              }
            }
          },
          setupFiles: [path.resolve(__dirname, '.storybook/vitest.setup.ts')],
          testTimeout: 60000,
          hookTimeout: 30000
        }
      }
    ],
    coverage: {
      provider: 'v8',
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
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        },
        'src/components/**/*.{js,ts}': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        }
      },
      skipFull: false,
      all: true
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts']
  }
});