/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#60A5FA',
          600: '#2563EB',
        },
        indigo: {
          800: '#3730A3',
        },
      },
    },
  },
  plugins: [],
}
