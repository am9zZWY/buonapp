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
    '@vite-pwa/nuxt',
    '@nuxt/ui',
    "@nuxtjs/i18n",
    "@nuxt/eslint"
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
  pinia: {
    storesDirs: ['./stores/**'],
    disableVuex: true
  },
  pwa: {
    base: '/',
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true,
      type: 'module',
      navigateFallback: '/',
      suppressWarnings: true
    },
    includeAssets: ['favicon.svg'],
    injectManifest: {
      minify: true,
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    injectRegister: 'auto',
    manifest: {
      name: 'Buonapp',
      short_name: 'Buonapp',
      theme_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      lang: 'en',
      start_url: '/'
    },
    minify: true,
    mode: 'development',
    pwaAssets: {
      config: true
    },
    registerType: 'autoUpdate',
    selfDestroying: true,
    strategies: 'generateSW',
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    }
  },
  runtimeConfig: {
    weatherApiKey: '',
    openaiApiKey: ''
  }
})
