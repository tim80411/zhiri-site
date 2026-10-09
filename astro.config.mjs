import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zhiri.app',
  output: 'static',
  integrations: [sitemap()],
});
