/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#E9D8FD',
          400: '#B794F4',
          600: '#805AD5',
          900: '#44337A',
        },
        indigo: {
          800: '#3730A3',
        },
        gray: {
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
