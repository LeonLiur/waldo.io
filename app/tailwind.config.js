/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      cursor: {
        'bullseye': 'url(../public/bullseye.cur) 5 5, crosshair',
      },
      width: {
        '1/40': '2.5%',
      },
      height: {
        '1/40': '2.5%',
      }
    },
  },
  plugins: [],
}