/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,scss,svg}",
  ],
  theme: {
    screens: {
      'xl': '1440px',
      'md': '1024px',
    },
    extend: {
      colors: {
        primary: {"300":"#7dd3fc","400":"#38bdf8","500":"#0ea5e9","600":"#0284c7","700":"#0369a1"}
      }
    },
    
  },
  plugins: [],
}

