/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        secondary: "#06B6D4",
        dark: "#0F172A",
        card: "#111827",
      },

      boxShadow: {
        glow: "0 0 20px rgba(124, 58, 237, 0.5)",
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}