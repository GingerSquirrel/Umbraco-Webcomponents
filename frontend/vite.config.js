import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
        rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          $umb: ${process.env.VITE_UMB === 'true'};
          @use "src/global/styles/mixins.scss" as *;
          @use "src/global/styles/typography.scss" as *;
          @use "src/global/styles/fonts.scss" as *;
        `
      }
    }
  }
});