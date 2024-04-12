import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import {VitePWA, VitePWAOptions} from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

const pwaOptions: Partial<VitePWAOptions> = {
    base: '/',
    devOptions: {
        enabled: process.env.SW_DEV === 'true',
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
        suppressWarnings: true,
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

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA(pwaOptions)
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
