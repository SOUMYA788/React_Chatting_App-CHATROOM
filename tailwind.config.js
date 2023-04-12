/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      '2xs':'320px',
      xs:'425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        rubik:[
          "rubik",
          'ui-sans-serif',
        'system-ui',
        ]
      }
    },
  },
  plugins: [],
}

