/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-main': '#2D7455',
        'green-light': '#9e9e9e',
      },
    },
  },
  plugins: [],
};
