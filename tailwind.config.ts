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
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(77,255,237,0.3)" },
          "50%": { boxShadow: "0 0 50px rgba(77,255,237,0.6)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "scan-line": "scan-line 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
