/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16181d',
        navy: '#273045',
        'navy-deep': '#1a2030',
        muted: '#9aa3b8',
        'muted-2': '#aab0c0',
        cloud: '#f4f5f7',
        'key-bg': '#e0e3e7',
      },
      fontFamily: {
        display: ['Manrope', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        key: '0 1px 0 rgba(0,0,0,0.30)',
        card: '0 24px 48px -16px rgba(39,48,69,0.28)',
        chip: '0 1px 4px rgba(39,48,69,0.10)',
      },
    },
  },
  plugins: [],
}
