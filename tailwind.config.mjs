/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Logo-Palette: 3 Kernfarben + Creme
        bone:   "#faf3e8",   // Creme – Hintergrund hell
        brown:  "#2a1610",   // Logo-Dunkelbraun (Espresso) – Text + dunkle Sektionen
        cocoa:  "#8a7363",   // Abgeschwächtes Braun – Sekundärtext (gleiche Familie)
        gold:   "#c49e57",   // Logo-Gold – Akzente, Linien, Buttons
        // Aliase für Rückwärtskompatibilität
        ink:    "#2a1610",
        sand:   "#faf3e8",
        deep:   "#2a1610",
        bronze: "#c49e57",
        muted:  "#8a7363",
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
