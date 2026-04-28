import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#E20074',
        'brand-dark': '#1A1A2E',
      },
    },
  },
  plugins: [],
} satisfies Config;
