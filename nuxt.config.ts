const sw = process.env.SW === 'true'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/eslint'
  ],
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    prerender: {
      routes: ['/']
    }
  },
  pwa: {
    base: '/',
    devOptions: {
      enabled: true,
      type: 'module',
      navigateFallback: '/',
      suppressWarnings: true
    },
    includeAssets: ['favicon.svg'],
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    manifest: {
      name: 'Buonapp',
      short_name: 'Buonapp',
      theme_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      lang: 'en',
      start_url: '/'
    },
    mode: 'development',
    registerType: 'autoUpdate',
    selfDestroying: true,
    minify: true
  },
  runtimeConfig: {
    weatherApiKey: ''
  },
  pinia: {
    storesDirs: ['./stores/**'],
    disableVuex: true
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
