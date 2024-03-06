import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import seoPrerender from './prerender'

console.log(process.argv)

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dev/event/',
  plugins: [
    react(),
    seoPrerender({
      base: '/dev/event/',
      selector: 'main',
      routes: ["test", "doucumentFiles", "playandwin_Feb_May"]
    })
  ],
})
