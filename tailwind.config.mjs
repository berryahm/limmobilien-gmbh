/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Logo-Palette: nur 3 Farben + Creme
        bone:   "#faf3e8",   // Creme – Hintergrund hell
        brown:  "#3a170b",   // Logo-Dunkelbraun – Text + dunkle Sektionen
        cocoa:  "#714928",   // Logo-Mittelbraun – Sekundärtext, Hover-States
        gold:   "#c49e57",   // Logo-Gold – Akzente, Linien, Buttons
        // Aliase für Rückwärtskompatibilität (auf die 3 Logo-Farben gemappt)
        ink:    "#3a170b",
        sand:   "#faf3e8",
        deep:   "#3a170b",
        bronze: "#c49e57",
        muted:  "#714928",
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
