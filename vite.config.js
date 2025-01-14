import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['/src/main.jsx'], // Externalize the main.jsx file
    },
  },
});
