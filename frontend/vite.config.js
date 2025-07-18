/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import basicSsl from '@vitejs/plugin-basic-ssl';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if we're in development and certificates exist
const isDev = process.env.NODE_ENV !== 'production';
const certKeyPath = path.resolve(__dirname, 'certs/localhost+2-key.pem');
const certPath = path.resolve(__dirname, 'certs/localhost+2.pem');
const certsExist = isDev && fs.existsSync(certKeyPath) && fs.existsSync(certPath);

export default defineConfig({
  plugins: [
    // Removed basicSsl() as we're using manual HTTPS configuration
  ],
  root: 'src',
  publicDir: '../public', // Point to the correct public directory
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
    strictPort: true, // Force port 3000, don't switch to another port
    host: true,
    ...(certsExist && {
      https: {
        key: fs.readFileSync(certKeyPath),
        cert: fs.readFileSync(certPath)
      }
    }),
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
        includePaths: [path.resolve(__dirname, 'src/global/styles'), path.resolve(__dirname, 'src')],
        additionalData: (content, filename) => {
          // Don't inject imports into the global style files themselves to avoid circular dependencies
          const isGlobalStyleFile = filename.includes('global/styles/');
          if (isGlobalStyleFile) {
            return `$umb: ${process.env.VITE_UMB === 'true'};\n${content}`;
          }
          
          return `
            $umb: ${process.env.VITE_UMB === 'true'};
            @use "${path.resolve(__dirname, 'src/global/styles/variables').replace(/\\/g, '/')}" as *;
            @use "${path.resolve(__dirname, 'src/global/styles/base').replace(/\\/g, '/')}" as *;
            @use "${path.resolve(__dirname, 'src/global/styles/mixins').replace(/\\/g, '/')}" as *;
            @use "${path.resolve(__dirname, 'src/global/styles/typography').replace(/\\/g, '/')}" as *;
            @use "${path.resolve(__dirname, 'src/global/styles/fonts').replace(/\\/g, '/')}" as *;
            @use "${path.resolve(__dirname, 'src/global/styles/shadows').replace(/\\/g, '/')}" as *;
            ${content}
          `;
        }
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
    setupFiles: ['./test/setup.ts']
  }
});