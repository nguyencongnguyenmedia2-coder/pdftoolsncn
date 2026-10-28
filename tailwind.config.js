/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0D0B18',
          card: '#17142A',
          cardHover: '#1F1B38',
          workspace: '#121025',
          panel: '#1A1730',
        },
        primary: {
          DEFAULT: '#7657F6',
          light: '#A78BFA',
          dark: '#5836DB',
          hover: '#8B6EF8',
          glow: 'rgba(118, 87, 246, 0.35)',
        },
        accent: {
          border: '#2A2548',
          activeBorder: '#7657F6',
          muted: '#363058',
        },
        text: {
          main: '#F8FAFC',
          muted: '#9692AF',
          dim: '#6D6986',
        },
        status: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px rgba(118, 87, 246, 0.25)',
        'glow-lg': '0 0 40px rgba(118, 87, 246, 0.4)',
        card: '0 8px 24px -4px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

