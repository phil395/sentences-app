/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.tsx"],
  theme: {
    screens: {
      'xs': '380px',
      'sm': '480px',
      'md': '576px',
      'lg': '768px',
      'xl': '992px',
      '2xl': '1110px'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '10px',
        'md': '15px'
      }
    },
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
