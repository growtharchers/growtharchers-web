import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://growtharchers.com',
  integrations: [
    sitemap(),
  ],
  build: {
    // Inline small assets — keeps HTTP requests minimal
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      // Remove console.log in production
      drop: ['console'],
    },
  },
});
