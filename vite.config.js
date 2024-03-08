import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import seoPrerender from './prerender'

const brand = process.env.npm_config_brand || 'SG'
const routesArg = process.env.npm_config_routes
const routes = routesArg ? routesArg.split(',').map(item => item.trim()) : null;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envMode = `${brand.toLocaleLowerCase()}.${mode}`
  const env = loadEnv(envMode, process.cwd(), '')

  const processEnvValues = {
    'process.env': Object.entries(env).reduce(
      (prev, [key, val]) => {
        return {
          ...prev,
          [key]: val,
          brand
        }
      },
      {},
    )
  }

  return {
    base: env.BASE,
    define: processEnvValues,
    plugins: [
      react(),
      seoPrerender({
        base: env.BASE,
        selector: 'main',
        routes
      })
    ],
  }
})
