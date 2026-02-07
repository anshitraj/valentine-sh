import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { sm: "640px", md: "768px", lg: "900px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      colors: {
        blush: "#fce7f0",
        "blush-deep": "#fbcfe8",
        rose: "#e11d48",
        "rose-soft": "#fb7185",
        cream: "#fffbeb",
        "warm-white": "#fefcfb",
        muted: "#78716c",
        "muted-dark": "#57534e",
        peach: "#ffdab9",
        lavender: "#e6e6fa",
        "baby-blue": "#b8d4e8",
        "mint-green": "#c7f0db",
        "soft-yellow": "#fff4c4",
      },
      boxShadow: {
        soft: "0 4px 14px -2px rgba(225, 29, 72, 0.08)",
        tile: "0 6px 20px -4px rgba(0,0,0,0.06)",
        "tile-hover": "0 12px 28px -6px rgba(225, 29, 72, 0.12)",
        "glow-soft": "0 0 0 2px rgba(255,182,193,0.4), 0 12px 32px -8px rgba(236,72,153,0.15)",
        "modal-cute": "0 20px 60px -12px rgba(236, 72, 153, 0.2), 0 0 0 1px rgba(255,255,255,0.5)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.35s ease-out",
        "scale-in": "scale-in 0.25s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
