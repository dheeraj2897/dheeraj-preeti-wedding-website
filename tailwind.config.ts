import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f7f3ec",
        ivory: "#fbf8f3",
        sand: "#e8dfce",
        stone: {
          DEFAULT: "#a89c87",
          dark: "#6b5f4d",
        },
        ink: "#2b2724",
        accent: "#9c7a3a",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Montserrat"', "Helvetica", "Arial", "sans-serif"],
        script: ['"Great Vibes"', '"Allura"', "cursive"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      animation: {
        "fade-in": "fade-in 1.2s ease-out both",
        "fade-up": "fade-up 1s ease-out both",
        "soft-pulse": "soft-pulse 4s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
