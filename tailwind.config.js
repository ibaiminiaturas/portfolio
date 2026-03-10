/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./galleries/**/*.html",
    "./components/**/*.html",
    "./assets/js/**/*.js",
  ],
  safelist: [
  "hidden",
  "block",
  "absolute",
  "relative",
  "bg-gray-800",
  "text-white",
  "mt-2",
  "rounded",
  "w-max",
  "hover:text-gray-300"
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // <-- aquí Montserrat
      },
    },
  },
  plugins: [],
}