import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'light-plus',
      langs: [],
      wrap: true,
    }
  }
});
