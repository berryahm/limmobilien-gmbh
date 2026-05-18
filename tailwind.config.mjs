/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink:    "#1e100a",   // Tiefstes Dunkelbraun (Text)
        bone:   "#faf3e8",   // Warmes Creme (Hintergrund hell)
        sand:   "#f0e6d0",   // Goldener Sand (Sektionshintergrund)
        brown:  "#2a1810",   // Logo-Dunkelbraun (dunkle Sektionen)
        deep:   "#1c0f08",   // Tiefstes Braun (Footer, CTA)
        bronze: "#c4922a",   // Hauptgold (Akzente, Buttons, Hover)
        gold:   "#d4a843",   // Helles Gold (Überschriften auf Dunkel)
        muted:  "#8a7a6a",   // Warmes Grau (Sekundärtext)
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
