/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#E9D8FD',
          600: '#805AD5',
        },
        indigo: {
          800: '#3730A3',
        },
      },
    },
  },
  plugins: [],
}
