import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Koyu kahve + bej + krem renk paleti
        coffee: {
          50: '#f8f6f3',
          100: '#ede8e1',
          200: '#ddd3c4',
          300: '#c9b89e',
          400: '#b69d7a',
          500: '#a68661',
          600: '#987455',
          700: '#7e5e47',
          800: '#69503e',
          900: '#584435',
          950: '#2f231b',
        },
        beige: {
          50: '#faf9f7',
          100: '#f4f1ed',
          200: '#e8e1d7',
          300: '#d9ccbb',
          400: '#c8b49a',
          500: '#b89c7e',
          600: '#a68568',
          700: '#8a6e56',
          800: '#725b49',
          900: '#5e4c3d',
          950: '#32271f',
        },
        cream: {
          50: '#fcfbf9',
          100: '#f8f5f0',
          200: '#f0ebe0',
          300: '#e4dac6',
          400: '#d5c4a5',
          500: '#c8af89',
          600: '#b89970',
          700: '#9c7f5c',
          800: '#81694e',
          900: '#6a5642',
          950: '#382c22',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
