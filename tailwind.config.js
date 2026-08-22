/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          brand: '#008080',
          light: '#00a0a0',
          dark: '#006666',
        },
        navy: {
          brand: '#0A192F',
          light: '#112240',
          lighter: '#1e3a5f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
