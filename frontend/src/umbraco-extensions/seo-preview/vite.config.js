import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: "src/seo-preview-property-editor-ui.element.ts",
      name: 'SEOPreviewPropertyEditor',
      fileName: () => 'seo-preview.js',
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
