import type { VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  base: '/',
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
    suppressWarnings: true
  },
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'Buonapp: Your daily helper',
    short_name: 'Buonapp',
    theme_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait'
  },
  mode: 'development',
  registerType: 'autoUpdate',
  selfDestroying: true,
  minify: true
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vite-pwa/nuxt'],
  pwa: pwaOptions,
  runtimeConfig: {
    weatherApiKey: ''
  },
  pinia: {
    storesDirs: ['./stores/**'],
    disableVuex: true,
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true
  }
})
