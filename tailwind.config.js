/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app/app.vue",
  ],
  theme: {
    extend: {
      colors: {
        aesop: {
          bg: {
            general: 'var(--color-bg-general)',
            product: 'var(--color-bg-product)',
            tag: 'var(--color-bg-tag)',
            secondary: 'var(--color-bg-secondary)',
            tertiary: 'var(--color-bg-tertiary)',
            bloc: 'var(--color-bg-bloc)',
          },
          text: {
            main: 'var(--color-text-main)',
            body: 'var(--color-text-body)',
            disabled: 'var(--color-text-disabled)',
          },
          button: {
            bg: 'var(--color-button-bg)',
            hover: 'var(--color-button-hover)',
          },
          accent: 'var(--color-accent)',
        }
      },
      fontFamily: {
        title: ['var(--font-title)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}


