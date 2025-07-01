import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: '/',
  build: {
    outDir: '../../UmbracoWebComponents/wwwroot/',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});