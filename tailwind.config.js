/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        md: '4rem',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FC4D16',
          50: '#FED7CB',
          100: '#FEC8B7',
          200: '#FEA98F',
          300: '#FD8B67',
          400: '#FD6C3E',
          500: '#FC4D16',
          600: '#D73603',
          700: '#A02802',
          800: '#681A01',
          900: '#310C01',
          950: '#150500',
        },
        secondary: {
          DEFAULT: '#D8CAC2',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#F8F5F4',
          400: '#E8E0DB',
          500: '#D8CAC2',
          600: '#C2ACA0',
          700: '#AC8F7E',
          800: '#93725E',
          900: '#715748',
          950: '#604A3D',
        },
        tertiary: {
          DEFAULT: '#F0EDEB',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#F0EDEB',
          600: '#D8D0CB',
          700: '#C0B3AB',
          800: '#A8968B',
          900: '#8F7A6B',
          950: '#7F6C5F',
        },
        black: '#09090a',
      },
      fontFamily: {
        rund: ['Rund Text', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
