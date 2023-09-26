/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '340px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1224px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1680px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [],
}