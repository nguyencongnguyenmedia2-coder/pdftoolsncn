import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ncn: {
          bg: '#0D0B18',
          surface: '#151228',
          card: '#1C1834',
          primary: '#7657F6',
          accent: '#A78BFA',
          text: '#F8FAFC',
          muted: '#A5A0BC',
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444',
        },
      },
      boxShadow: {
        glow: '0 0 28px -4px rgba(118, 87, 246, 0.45)',
        'glow-lg': '0 0 45px -6px rgba(118, 87, 246, 0.65)',
        card: '0 16px 40px -12px rgba(7, 5, 16, 0.65)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;

