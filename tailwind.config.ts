import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF7",
        foreground: "#111111",
        muted: "#666666",
        paper: "#FFFFFF",
        linen: "#E8DFD0",
        fog: "#F2F2F2",
        sage: "#6D7D63",
        ink: "#111111",
        border: "rgba(17, 17, 17, 0.12)",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(17, 17, 17, 0.08)",
        line: "0 1px 0 rgba(17, 17, 17, 0.08)",
      },
      borderRadius: {
        xl: "0.5rem",
        "2xl": "0.75rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [animate],
};

export default config;
