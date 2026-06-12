import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves from /Noon-nano/; dev stays at /
  base: command === 'build' ? '/Noon-nano/' : '/',
}))
