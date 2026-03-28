import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080808",
        "bg-elevated": "#111111",
        card: "#161616",
        border: {
          DEFAULT: "#222222",
          hover: "#333333",
        },
        cyan: {
          brand: "#4DFFED",
          dark: "#00CCC0",
        },
        emerald: {
          brand: "#34D399",
        },
        amber: {
          brand: "#FBBF24",
        },
        muted: "#888888",
        dim: "#555555",
      },
      fontFamily: {
        barlow: ["var(--font-barlow)", "system-ui", "sans-serif"],
        manrope: ["var(--font-manrope)", "system-ui", "sans-serif"],
        courier: ["var(--font-courier)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
