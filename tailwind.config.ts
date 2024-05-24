import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1920px',
      // => @media (min-width: 1920px) { ... }

      '4xl': '2250px',
      // => @media (min-width: 2560px) { ... }
    },
    extend: {
      colors: {
        primary: {
          900: "#ff0015",
          800: "#f05050",
          700: "#ff5b5b"
        },
        secondary: {
          900: "#10c469",
          800: "#28a745"
        },
        tertiary: {
          900: "#3085d6",
          800: "#35b8e0"
        },
        warning: {
          900: "#f9c851"
        },
        dark: {
          900: "#0c0c0d",
          800: "#1c1c1e",
          700: "#313133",
          600: "#37393e",
          500: "#28282b",
          400: "#434344"
        },
        grey: {
          100: "#98a6ad",
          200: "#f9f9f9",
        }
      },
      boxShadow: {
        primary: "0 5px 10px rgba(255, 255, 255, 0.1)",
        secondary: "0 3px 6px rgba(0, 0, 0, 0.2)",
        input: "0 2px 8px rgba(255, 255, 255, 0.10)",
      },
      backgroundImage: {
        'plan-shape': 'url(/assets/images/plan_shape_bg.png)',
      }
    },
  },
  plugins: [],
};
export default config;
