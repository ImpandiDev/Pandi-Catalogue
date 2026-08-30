/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      lineClamp: {
        2: '2',
        3: '3',
        1: '1',
        10: '10',
      }
    },
    fontSize: {
      xs: '0.75rem',
      xxs: '0.85rem',
      sm: '0.8rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    colors: {
      'mainColor': '#b72026',
      'secondColor': "#cb6d57",
      'thirdColor': "#e4af9c",
      'successColor': '#4caf50',
      'dark': '#333',
      'white': '#fff',
      'slate-200': "rgb(226 232 240)",
      'catalogo': '#fff',
      'gray-50': 'rgb(249, 250, 251)',
      'gray-100': 'rgb(243 244 246)',
      'gray-200': 'rgb(229 231 235)',
      'gray-300': 'rgb(209 213 219)',
      'gray-400': 'rgb(156 163 175)',
      'gray-500': 'rgb(107 114 128)',
      'gray-600': 'rgb(75 85 99)',
      'gray-700': 'rgb(55 65 81)',
      'gray-800': '#1f2937',
      'neutral-500': '#737373',
      'neutral-950': '#0a0a0a',
      'slate': 'rgb(226, 232, 240)',
      'black/25': 'rgba(0, 0, 0, 0.25)',
      'red-200': 'rgb(254 226 226)',
      'red-800': 'rgb(153 27 27)',
      'green-200': 'rgb(209 250 229)',
      'green-800': 'rgb(5 150 105)',
      'transparent': 'transparent',
    },
    variants: {
      lineClamp: ['responsive', 'hover']
    }
  },
  plugins: [],
};
