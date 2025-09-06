/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Add the premium font families
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      // Add your custom golden color
      colors: {
        "brand-gold": "rgb(254, 181, 100)",
      },
    },
  },
  plugins: [],
};
