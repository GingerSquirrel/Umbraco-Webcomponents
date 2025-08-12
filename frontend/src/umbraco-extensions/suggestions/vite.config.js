import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  build: {
    lib: {
      entry: "src/suggestions-property-editor-ui.element.ts",
      name: 'SuggestionsPropertyEditor',
      fileName: () => 'suggestions.js',
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
