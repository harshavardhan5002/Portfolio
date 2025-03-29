/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'; // Import default theme

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Set Playfair Display as the default sans font
        sans: ['"Playfair Display"', ...defaultTheme.fontFamily.sans],
        // Remove serif definition if it exists (it doesn't here, but good practice)
      },
      colors: {
        'teal-accent': '#38b2ac',
        'teal-accent-hover': '#319795',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards', // Keep right animation for potential future use
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards', // Keep up animation for potential future use
      },
      keyframes: {
        fadeIn: { 'from': { opacity: 0, transform: 'translateY(20px)' }, 'to': { opacity: 1, transform: 'translateY(0)' }, },
        fadeInLeft: { 'from': { opacity: 0, transform: 'translateX(-40px)' }, 'to': { opacity: 1, transform: 'translateX(0)' }, },
        fadeInRight: { 'from': { opacity: 0, transform: 'translateX(40px)' }, 'to': { opacity: 1, transform: 'translateX(0)' }, }, // Keep right keyframes
        fadeInUp: { 'from': { opacity: 0, transform: 'translateY(30px)' }, 'to': { opacity: 1, transform: 'translateY(0)' }, }, // Keep up keyframes
      },
    },
  },
  plugins: [],
};
