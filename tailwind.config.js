/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        navy: 'rgb(var(--color-navy) / <alpha-value>)',
        'navy-dark': 'rgb(var(--color-navy-dark) / <alpha-value>)',
        'navy-light': 'rgb(var(--color-navy-light) / <alpha-value>)',
        teal: 'rgb(var(--color-teal) / <alpha-value>)',
        'teal-light': 'rgb(var(--color-teal-light) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
      },
    },
  },
  // plugins: [
  //   require('@tailwindcss/line-clamp'),
  // ],
}
