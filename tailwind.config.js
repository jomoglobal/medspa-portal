/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        spa: {
          50: '#f8f9fa',
          100: '#f0f2f5',
          200: '#e4e7eb',
          300: '#cbd2d9',
          400: '#9aa5b1',
          500: '#7b8794',
          600: '#616e7c',
          700: '#52606d',
          800: '#3e4c59',
          900: '#323f4b',
        },
        calm: {
          50: '#f5f7f7',
          100: '#e8ecec',
          200: '#d1d9d9',
          300: '#b3c1c1',
          400: '#8fa0a0',
          500: '#738585',
          600: '#5d6d6d',
          700: '#4d5a5a',
          800: '#424c4c',
          900: '#3a4242',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e8e3',
          200: '#c7d1c7',
          300: '#a3b3a3',
          400: '#7d927d',
          500: '#607760',
          600: '#4c5f4c',
          700: '#3e4d3e',
          800: '#344034',
          900: '#2d362d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
}
