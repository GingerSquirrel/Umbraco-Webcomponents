import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'MyFirstExtension',
      fileName: () => 'my-first-extension.js',
      formats: ['es']
    },
    outDir: './dist',
    sourcemap: true,
    rollupOptions: {
      external: [
        /^@umbraco-cms\/backoffice/
      ]
    }
  }
});
