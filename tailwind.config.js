/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./galeria/*.html",
    "./components/**/*.html",
    "./assets/js/**/*.js",
    "./assets/css/style.css", // 🔹 agregar
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
safelist: [
  "hidden","block","absolute","relative",
  "bg-gray-800","bg-gray-700","bg-gray-600",
  "text-white","mt-2","rounded","w-max",
  'hover:bg-gray-500',
  'hover:text-gray-200',
  'hover:bg-gray-600',
    'hover:bg-yellow-500',
  'hover:bg-gray-700',
  'hover:text-gray-300',
  "text-8xl","text-4xl","text-xl","text-5xl", // tamaños de texto
  "mb-12","mb-5", // márgenes
  "h-[200px]","w-[200px]", // tamaños del minicarrusel
  "gap-5","gap-2","flex","flex-col","flex-row","items-start","items-center","justify-center","flex-shrink-0"
],
  plugins: [],
}