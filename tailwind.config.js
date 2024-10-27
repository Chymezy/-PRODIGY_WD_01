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
      },
      transition: {
        colors: 'color 0.3s ease',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
