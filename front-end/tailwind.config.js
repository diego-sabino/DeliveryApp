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
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: 'light',
  },
};
