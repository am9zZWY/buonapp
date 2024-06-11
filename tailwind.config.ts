import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'selago': {
          '50': '#f9f7fb',
          '100': '#f3f0f7',
          '200': '#e5e1ee',
          '300': '#d6cfe3',
          '400': '#bfb2d3',
          '500': '#a693bf',
          '600': '#947aad',
          '700': '#82679a',
          '800': '#6d5681',
          '900': '#5a486a',
          '950': '#3a2e47',
        },
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
      }
    }
  }
}
