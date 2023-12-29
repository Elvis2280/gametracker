/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  test: {
    globals: true,
    environment: 'jsdom',
    testNamePattern: 'test',
    exclude: ['node_modules', 'dist', './src/test', './tests-examples'],
    passWithNoTests: true,
    setupFiles: ['./src/__test__/setup.ts'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
