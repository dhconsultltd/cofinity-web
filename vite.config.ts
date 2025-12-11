import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// import fs from 'fs';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

    server: {
    
    proxy: {
      '/sanctum': {
        target: 'http://10.28.212.236:8000',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://10.28.212.236:8000',
        changeOrigin: true,
        secure: false,
      
      },
    
    },
    
    host: true,


    },
 resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },


});