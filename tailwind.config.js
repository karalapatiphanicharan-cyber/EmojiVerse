/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#fdfbf7', // Warm cream background
          surface: '#f5f0e8', // Soft beige surface
          paper: '#ffffff',
          accent: '#ff6b6b',
        }
      },
      boxShadow: {
        'skeuo-raised': '8px 8px 16px #d1cdc7, -8px -8px 16px #ffffff',
        'skeuo-pressed': 'inset 4px 4px 8px #d1cdc7, inset -4px -4px 8px #ffffff',
        'skeuo-card': '12px 12px 24px #d1cdc7, -12px -12px 24px #ffffff',
        'skeuo-inner': 'inset 6px 6px 12px #d1cdc7, inset -6px -6px 12px #ffffff',
      }
    },
  },
  plugins: [],
}
