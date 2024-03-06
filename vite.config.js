import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import seoPrerender from './prerender'

const routesArg = process.env.npm_config_routes
const routes = routesArg ? routesArg.split(',').map(item => item.trim()) : null;
console.log("routes: ", routes)

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dev/event/',
  plugins: [
    react(),
    seoPrerender({
      base: '/dev/event/',
      selector: 'main',
      routes
    })
  ],
})
