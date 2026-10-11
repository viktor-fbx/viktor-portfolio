// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Determinar si estamos en Netlify
const isNetlify = process.env.NETLIFY === 'true' || process.env.CONTEXT === 'production';

export default defineConfig({
  site: isNetlify 
    ? 'https://viktor-fbx.netlify.app'
    : 'https://IEVN1001-22001439.github.io',
  base: isNetlify 
    ? '/'  // En Netlify no necesitas base path
    : '/viktor-portfolio',
  integrations: [
    sitemap({
      // La raíz "/" solo redirige: no va al sitemap
      filter: (page) => !/^https?:\/\/[^/]+(\/viktor-portfolio)?\/?$/.test(page),
      i18n: { defaultLocale: 'es', locales: { es: 'es', en: 'en', fr: 'fr' } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});