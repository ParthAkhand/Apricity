import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Values come from CSS variables in globals.css, so the accent is swapped in one place.
        ink: { DEFAULT: "rgb(var(--bg-dark-rgb) / <alpha-value>)", 800: "rgb(var(--bg-dark-elev-rgb) / <alpha-value>)", 700: "rgb(var(--ink-700-rgb) / <alpha-value>)", 600: "rgb(var(--ink-600-rgb) / <alpha-value>)" },
        paper: { DEFAULT: "rgb(var(--bg-light-soft-rgb) / <alpha-value>)", 200: "rgb(var(--bg-light-sunk-rgb) / <alpha-value>)" },
        accent: { DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)", d: "rgb(var(--accent-ink-rgb) / <alpha-value>)" },
      },
      borderRadius: { sheet: "var(--radius-sheet)", card: "var(--radius-card)" },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
