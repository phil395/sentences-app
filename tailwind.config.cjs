/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'light-bg': '#f7f8fb'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
