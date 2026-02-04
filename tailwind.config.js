/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Lucida Sans'", "'Lucida Sans Regular'", "'Lucida Grande'", "'Lucida Sans Unicode'", "Geneva", "Verdana", "sans-serif"],
      },
    },
  },
  plugins: [],
}

