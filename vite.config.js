import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// Fix for Stellar Wallet Kit
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    global: 'window',
  },
})
