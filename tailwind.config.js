/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          black: '#000000',
          surface: '#111111',
          blue: '#3b82f6',
        }
      },
    },
  },
  safelist: [
    'bg-black', 
    'text-white', 
    'text-gray-400',
    'border-white/10', 
    'border-white/20',
    'bg-white/5',
    'bg-white/10',
    'text-blue-500',
    'min-h-screen',
    'p-4', 'p-8',
    'rounded-xl',
    'flex', 'flex-col', 'items-center'
  ],
  plugins: [],
}