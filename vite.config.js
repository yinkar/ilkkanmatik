import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ilkkanmatik',
  plugins: [
    vue(),
    VitePWA({
      workbox: {
        cleanupOutdatedCaches: false,
        sourcemap: true,
      },
      includeAssets: [
        'favicon.png',
        'robots.txt',
        'icon-192.png',
        'icon-512.png',
      ],
      manifest: {
          "name": "Ilkkanmatik",
          "short_name": "Ilkkanmatik",
          "description": "Random idioms of İlkkan from Gibi series",
          "theme_color": "#ffbb00",
          "background_color": "#3c3c3d",
          "icons": [
              {
                  "src": "icon-192.png",
                  "sizes": "192x192",
                  "type": "image/png",
                  "purpose": "any maskable",
              },
              {
                  "src": "icon-512.png",
                  "sizes": "512x512",
                  "type": "image/png",
                  "purpose": "any maskable",
              }
          ],
      },
    }),
  ],
});
