import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },

      manifest: {
        name: "Cofinity - Cooperative Management System", // Full name
        short_name: "Cofinity",
        description: "  Cooperative Management System",
        theme_color: "#ffffff",
        background_color: "#000000",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable", // Recommended for adaptive icons
          },
        ],
      },

      // === Optional: Better caching strategies ===
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,json}"],
        // Optional: Cache API responses (careful with this in multi-tenant!)
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*\/api\/.*/i,
            handler: "NetworkFirst", // Try network → fallback to cache
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },

      // Optional: Nice offline fallback page
      // injectRegister: 'auto',
      // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg']
    }),
  ],

  // server: {
  //   proxy: {
  //     "/sanctum": {
  //       target: "https://cofinity.beejett.com",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     "/api": {
  //       target: "https://cofinity.beejett.com",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },

  //   host: true,
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
