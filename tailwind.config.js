/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        slate: {
          50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1",
          400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155",
          800: "#1e293b", 900: "#0f172a", 950: "#020617",
        },
        blue: {
          50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd",
          400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8",
          800: "#1e40af", 900: "#1e3a8a",
        },
        purple: {
          50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe",
          400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7c3aed",
          800: "#6b21a8", 900: "#581c87",
        },
        cyan: {
          50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9",
          400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490",
          800: "#155e75", 900: "#164e63",
        },
        emerald: {
          50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7",
          400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857",
          800: "#065f46", 900: "#064e39",
        },
        teal: {
          50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4",
          400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e",
          800: "#115e59", 900: "#134e4a",
        },
        // Warm-neutral palette — restrained, one sparing accent, editorial confidence
        ink: {
          DEFAULT: "#15161a",
          soft: "#44444b",
        },
        mist: {
          50: "#fdfcfb", 100: "#faf8f5", 200: "#f2efe9", 300: "#e8e4dc",
        },
        accent: {
          blue: "#2f5eec",
          purple: "#7c5cfc",
          green: "#0ea570",
        },
        primary: { 500: "#2f5eec", 600: "#2249c9" },
      },
      fontFamily: {
        sans: ["Space Grotesk", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "slide-in": "slideIn 0.8s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 15s ease infinite",
        glitch: "glitch 0.3s ease-in-out",
        "border-draw": "borderDraw 1s ease-out forwards",
        blink: "blink 0.7s step-end infinite",
        "scan": "scan 2s linear infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        marquee: "marquee var(--duration) linear infinite",
      },
      maxWidth: {
        container: "1280px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)", filter: "none" },
          "20%": { transform: "translate(-2px, 2px)", filter: "hue-rotate(90deg)" },
          "40%": { transform: "translate(2px, -2px)", filter: "hue-rotate(-90deg)" },
          "60%": { transform: "translate(0)", filter: "none" },
        },
        borderDraw: {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0, 245, 255, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 245, 255, 0.8), 0 0 60px rgba(0, 245, 255, 0.3)" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
      backdropBlur: { xs: "2px", md: "8px", xl: "20px" },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mist-gradient": "radial-gradient(120% 100% at 20% -10%, #f2efe9 0%, #faf8f5 45%, #fdfcfb 100%)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
        "card-lg": "0 4px 12px rgba(15,23,42,0.05), 0 16px 40px rgba(15,23,42,0.08)",
      },
    },
  },
  plugins: [],
};
