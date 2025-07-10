/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
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
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: [path.resolve(dirname, '.storybook/vitest.setup.ts')]
      }
    }]
  }
});