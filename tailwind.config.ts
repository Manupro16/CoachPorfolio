import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Include other directories if necessary
  ],
  darkMode: 'class', // Enables dark mode using the 'class' strategy
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',      // Corresponds to blue-500
        primaryDark: '#1E3A8A',  // Corresponds to blue-900
        textLight: '#F3F4F6',    // Corresponds to gray-100
        textMuted: '#D1D5DB',    // Corresponds to gray-300
        borderDark: '#374151',   // Corresponds to gray-700
        blackOpacity: 'rgba(0, 0, 0, 0.3)', // For opacity
        gray: {
          ...colors.gray,
          850: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'custom-light': '0 2px 4px rgba(255, 255, 255, 0.1)',
        'custom-dark': '0 2px 4px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
    },
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
export default config;
