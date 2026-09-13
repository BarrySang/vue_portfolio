/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Lucida Sans'", "'Lucida Sans Regular'", "'Lucida Grande'", "'Lucida Sans Unicode'", "Geneva", "Verdana", "sans-serif"],
      },
      colors: {
        surface: '#eef2f6',
        card: '#ffffff',
        navy: '#0b2545',
        'navy-dark': '#081b33',
        'navy-light': '#e7edf5',
        teal: '#0d9488',
        'teal-light': '#ccfbf1',
        muted: '#64748b',
        border: '#dde3ea',
      },
    },
  },
  // plugins: [
  //   require('@tailwindcss/line-clamp'),
  // ],
}

