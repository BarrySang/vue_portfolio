/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Lucida Sans'", "'Lucida Sans Regular'", "'Lucida Grande'", "'Lucida Sans Unicode'", "Geneva", "Verdana", "sans-serif"],
      },
      colors: {
        surface: '#f3f0f0',
        card: '#e4e8ea',
        accent: '#d4d2e8',
        muted: '#6b7280',
      },
    },
  },
  plugins: [],
}

