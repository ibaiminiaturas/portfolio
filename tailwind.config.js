/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./galeria/*.html",
    "./components/**/*.html",
    "./assets/js/**/*.js",
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