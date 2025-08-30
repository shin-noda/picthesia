import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // default, Vite already uses this
    rollupOptions: {
      output: {
        // Force .js for entry files (avoid .mjs)
        entryFileNames: `[name].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // optional: handy alias for imports
    },
  },
  base: './', // ensures relative paths for Appwrite Sites
});
