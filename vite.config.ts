import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';

// Load environment variables from .env files
dotenv.config();

const port = parseInt(process.env.PORT || '5173', 10);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port, // Use the dynamically loaded port
    allowedHosts: ['candidate-search-pdrr.onrender.com'], // Replace with your Render domain
  },
});
