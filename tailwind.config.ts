import { type Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // keep using class-based toggle
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core HSL theme vars (used in ThemeProvider toggle)
        border: "hsl(var(--border, 215 30% 17%))",
        input: "hsl(var(--input, 215 30% 17%))",
        ring: "hsl(var(--ring, 221 83% 53%))",
        background: "hsl(var(--background, 222 47% 7%))",
        foreground: "hsl(var(--foreground, 210 40% 98%))",

        primary: {
          DEFAULT: "hsl(var(--primary, 242 82% 67%))", // neon purple
          foreground: "hsl(var(--primary-foreground, 0 0% 100%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 173 80% 41%))", // neon teal
          foreground: "hsl(var(--secondary-foreground, 0 0% 100%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 48 96% 60%))", // bright yellow
          foreground: "hsl(var(--accent-foreground, 0 0% 10%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84% 60%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 100%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 215 20% 20%))",
          foreground: "hsl(var(--muted-foreground, 215 15% 65%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 220 39% 11%))",
          foreground: "hsl(var(--card-foreground, 0 0% 100%))",
        },
        success: "hsl(var(--success, 142 76% 36%))",
      },

      borderRadius: {
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        neon: "0 0 20px rgba(99, 102, 241, 0.5)", // purple glow
        glow: "0 0 15px hsla(var(--primary, 242 82% 67%), 0.7)",
      },

      keyframes: {
        "neon-pulse": {
          "0%, 100%": { boxShadow: "0 0 10px hsla(var(--primary), 0.5)" },
          "50%": { boxShadow: "0 0 20px hsla(var(--primary), 1)" },
        },
      },

      animation: {
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
