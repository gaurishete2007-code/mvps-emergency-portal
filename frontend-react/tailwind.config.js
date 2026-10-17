/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mvps: {
          red: "#b91c1c",
          darkRed: "#991b1b",
          gold: "#d97706",
          dark: "#1f2937"
        }
      }
    },
  },
  plugins: [],
}