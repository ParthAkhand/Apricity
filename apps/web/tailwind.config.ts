import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0B1220", 800: "#111B2E", 700: "#1A2740", 600: "#2A3A58" },
        paper: { DEFAULT: "#F7F4EE", 200: "#EDE8DE" },
        // Single accent, taken from the logo. `amber-d` is the AA-safe text shade on light backgrounds.
        accent: { DEFAULT: "#F59E0B", d: "#9A5B00" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
