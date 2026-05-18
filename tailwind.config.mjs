/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1e100a",
        bone: "#faf3e8",
        sand: "#f0e6d0",
        brown: "#2a1810",
        bronze: "#c4922a",
        gold: "#d4a843",
        muted: "#8a7a6a",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
    },
  },
  plugins: [],
};
