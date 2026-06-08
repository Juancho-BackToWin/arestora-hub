import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'arestora-azul': '#003B8E',
        'arestora-azul-medio': '#1A5FC8',
        'arestora-azul-claro': '#D6E4F7',
        'arestora-azul-suave': '#EEF4FC',
      },
    },
  },
  plugins: [],
}

export default config
