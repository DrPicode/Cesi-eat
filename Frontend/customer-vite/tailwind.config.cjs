/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', "./index.html"],
  theme: {
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      md: '0.375rem',
      lg: '0.625rem',
      full: '9999px',
      large: '12px',
    },
    extend: {
      
      textColor: {
        lightGray: '#808080',
        primary: '#202020',
        secColor: '#FC8019',
      },
      backgroundColor: {
        lightGray: '#F8F8F8',
        mainColor: '#202020',
        secondaryColor: '#FC8019',
      },
      colors: {
        secColor: '#FC8019',
      },
    },
  },
  plugins: [],
};
