/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // Light Theme Colors
        primary: "#000000", // Chetwode Blue
        secondary: "#94A3B8", // Lavender
        background: "#FFF", // Ghost White
        text: "#614cb5", // Dark Charcoal
        accent: "#F6F6F7", // Coral Red

        // Dark Theme Colors
        "dark-primary": "#725fc8", // Dark Charcoal
        "dark-secondary": "#dedff6", // Saffron
        "dark-background": "#292154", // Gunmetal
        "dark-text": "#c5c4ee", // Lavender
        "dark-accent": "#c5c4ee", // Lavender
        "chetwode-blue": {
          50: "#f5f5fd",
          100: "#eeedfa",
          200: "#dedff6",
          300: "#c5c4ee",
          400: "#a6a2e3",
          500: "#8e84d9",
          600: "#725fc8",
          700: "#614cb5",
          800: "#524097",
          900: "#44367c",
          950: "#292154",
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    {
      tailwindcss: {},
      autoprefixer: {},
    
    },
  ],
  darkMode: "class", // or 'media' based on your preference
};
