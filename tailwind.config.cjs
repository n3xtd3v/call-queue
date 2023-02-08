/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        mainSection: '770px',
      },
      width: {
        600: '600px',
        500: '500px',
      },
    },
  },
  plugins: [],
}
