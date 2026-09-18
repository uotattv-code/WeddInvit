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
        background: "var(--background)",
        foreground: "var(--foreground)",
        wedding: {
          gold: "#D4AF37",
          burgundy: "#5B1424",
          sage: "#7D8C7C",
          cream: "#FDFBF7",
          ivory: "#F9F6F0",
          charcoal: "#262626",
          navy: "#1A2B3C",
          blush: "#E8C5C8"
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        script: ["var(--font-script)", "Alex Brush", "cursive"],
        cinzel: ["Cinzel", "serif"]
      }
    },
  },
  plugins: [],
};
export default config;
