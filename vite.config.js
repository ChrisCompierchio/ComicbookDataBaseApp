import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    VitePWA({
      devOptions: {
        enabled: true, // Enable PWA in development mode
      },
      strategies: 'injectManifest',
      srcDir: "src",
      filenme: "sw.js",
      registerType: "autoUpdate",
      injectManifest: {
        swDest: "dist/sw.js"
      },
      manifest: {
        name: 'Comic Database',
        short_name: 'Comics Database',
        description: 'Personal Comic Database',
        theme_color: "#141414",
        background_color: "#141414",
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: "/icons/512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/icons/512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
  })],
  base: "/ComicbookDatabaseApp/"
})
